import pg from 'pg';
import { readJson } from './store.js';

const { Pool, Client } = pg;

let pool;

function databaseUrl() {
  const user = process.env.PGUSER;
  const password = process.env.PGPASSWORD;
  const host = process.env.PGHOST;
  const database = process.env.PGDATABASE;
  if (user && password && host && database) {
    const port = process.env.PGPORT || '5432';
    return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${encodeURIComponent(database)}`;
  }
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('PostgreSQL login is missing. Set PGUSER, PGPASSWORD, PGHOST, and PGDATABASE in backend/.env.');
  }
  return url;
}

export function getPool() {
  if (!pool) pool = new Pool({ connectionString: databaseUrl() });
  return pool;
}

function quoteIdent(name) {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
    throw new Error('Database name in DATABASE_URL must use only letters, numbers, and underscores.');
  }
  return `"${name}"`;
}

const schema = `
CREATE TABLE IF NOT EXISTS site (
  id SMALLINT PRIMARY KEY CHECK (id = 1),
  data JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  cat TEXT NOT NULL,
  description TEXT NOT NULL,
  img TEXT NOT NULL,
  price INTEGER NOT NULL,
  available BOOLEAN NOT NULL DEFAULT TRUE,
  popular BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS gallery (
  id INTEGER PRIMARY KEY,
  src TEXT NOT NULL,
  alt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY,
  order_no TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  instructions TEXT NOT NULL DEFAULT '',
  discount_code TEXT NOT NULL DEFAULT '',
  items JSONB NOT NULL,
  total INTEGER NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY,
  ref TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  subject TEXT NOT NULL DEFAULT '',
  order_type TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ
);
`;

function iso(value) {
  if (!value) return undefined;
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

export function mapProduct(row) {
  return {
    id: row.id,
    name: row.name,
    cat: row.cat,
    desc: row.description,
    img: row.img,
    price: row.price,
    available: row.available,
    popular: row.popular,
  };
}

function mapOrder(row) {
  const order = {
    id: row.id,
    orderNo: row.order_no,
    name: row.name,
    mobile: row.mobile,
    instructions: row.instructions,
    discountCode: row.discount_code,
    items: row.items,
    total: row.total,
    status: row.status,
    createdAt: iso(row.created_at),
  };
  const updatedAt = iso(row.updated_at);
  if (updatedAt) order.updatedAt = updatedAt;
  return order;
}

function mapEnquiry(row) {
  const enquiry = {
    id: row.id,
    ref: row.ref,
    type: row.type,
    name: row.name,
    mobile: row.mobile,
    email: row.email,
    subject: row.subject,
    orderType: row.order_type,
    message: row.message,
    status: row.status,
    createdAt: iso(row.created_at),
  };
  const updatedAt = iso(row.updated_at);
  if (updatedAt) enquiry.updatedAt = updatedAt;
  return enquiry;
}

async function ensureDatabase() {
  const url = new URL(databaseUrl());
  const dbName = decodeURIComponent(url.pathname.replace(/^\//, ''));
  if (!dbName || dbName === 'postgres') {
    throw new Error('DATABASE_URL must name an application database, for example gupta_namkin.');
  }

  const adminUrl = new URL(url);
  adminUrl.pathname = '/postgres';
  const client = new Client({ connectionString: adminUrl.toString() });
  await client.connect();
  try {
    const existing = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);
    if (existing.rowCount === 0) {
      await client.query(`CREATE DATABASE ${quoteIdent(dbName)}`);
    }
  } finally {
    await client.end();
  }
  return dbName;
}

async function seedIfEmpty() {
  const db = getPool();
  const siteCount = await db.query('SELECT COUNT(*)::int AS count FROM site');
  if (siteCount.rows[0].count === 0) {
    const site = readJson('site.json', {});
    if (site && typeof site === 'object' && !Array.isArray(site) && Object.keys(site).length > 0) {
      await db.query('INSERT INTO site (id, data) VALUES (1, $1::jsonb)', [JSON.stringify(site)]);
    }
  }

  const productCount = await db.query('SELECT COUNT(*)::int AS count FROM products');
  if (productCount.rows[0].count === 0) {
    const products = readJson('products.json', []);
    for (const product of Array.isArray(products) ? products : []) {
      await db.query(
        `INSERT INTO products (id, name, cat, description, img, price, available, popular)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          product.id,
          product.name,
          product.cat,
          product.desc,
          product.img,
          product.price,
          Boolean(product.available),
          Boolean(product.popular),
        ]
      );
    }
  }

  const galleryCount = await db.query('SELECT COUNT(*)::int AS count FROM gallery');
  if (galleryCount.rows[0].count === 0) {
    const gallery = readJson('gallery.json', []);
    let id = 1;
    for (const item of Array.isArray(gallery) ? gallery : []) {
      await db.query('INSERT INTO gallery (id, src, alt) VALUES ($1, $2, $3)', [id, item.src, item.alt]);
      id += 1;
    }
  }

  const orderCount = await db.query('SELECT COUNT(*)::int AS count FROM orders');
  if (orderCount.rows[0].count === 0) {
    const orders = readJson('orders.json', []);
    for (const order of Array.isArray(orders) ? orders : []) {
      await db.query(
        `INSERT INTO orders
          (id, order_no, name, mobile, instructions, discount_code, items, total, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8, $9, $10, $11)`,
        [
          order.id,
          order.orderNo,
          order.name,
          order.mobile,
          order.instructions || '',
          order.discountCode || '',
          JSON.stringify(order.items || []),
          order.total,
          order.status,
          order.createdAt,
          order.updatedAt || null,
        ]
      );
    }
  }

  const enquiryCount = await db.query('SELECT COUNT(*)::int AS count FROM enquiries');
  if (enquiryCount.rows[0].count === 0) {
    const enquiries = readJson('enquiries.json', []);
    for (const enquiry of Array.isArray(enquiries) ? enquiries : []) {
      await db.query(
        `INSERT INTO enquiries
          (id, ref, type, name, mobile, email, subject, order_type, message, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          enquiry.id,
          enquiry.ref,
          enquiry.type,
          enquiry.name,
          enquiry.mobile,
          enquiry.email || '',
          enquiry.subject || '',
          enquiry.orderType || '',
          enquiry.message,
          enquiry.status,
          enquiry.createdAt,
          enquiry.updatedAt || null,
        ]
      );
    }
  }
}

export async function initDb() {
  const dbName = await ensureDatabase();
  await getPool().query(schema);
  await seedIfEmpty();
  const host = new URL(databaseUrl()).hostname;
  console.log(`Connected to PostgreSQL database "${dbName}" on ${host}`);
}

export async function getProducts() {
  const { rows } = await getPool().query(
    'SELECT id, name, cat, description, img, price, available, popular FROM products ORDER BY id'
  );
  return rows.map(mapProduct);
}

export async function getSite() {
  const { rows } = await getPool().query('SELECT data FROM site WHERE id = 1');
  return rows[0]?.data ?? {};
}

export async function getGallery() {
  const { rows } = await getPool().query('SELECT src, alt FROM gallery ORDER BY id');
  return rows;
}

export async function insertOrder(order) {
  const { rows } = await getPool().query(
    `INSERT INTO orders
      (id, order_no, name, mobile, instructions, discount_code, items, total, status, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8, $9, $10)
     RETURNING *`,
    [
      order.id,
      order.orderNo,
      order.name,
      order.mobile,
      order.instructions,
      order.discountCode,
      JSON.stringify(order.items),
      order.total,
      order.status,
      order.createdAt,
    ]
  );
  return mapOrder(rows[0]);
}

export async function listOrders(status) {
  const { rows } = status
    ? await getPool().query('SELECT * FROM orders WHERE status = $1 ORDER BY created_at', [status])
    : await getPool().query('SELECT * FROM orders ORDER BY created_at');
  return rows.map(mapOrder);
}

export async function updateOrderStatus(id, status) {
  const { rows } = await getPool().query(
    'UPDATE orders SET status = $2, updated_at = NOW() WHERE id = $1 RETURNING *',
    [id, status]
  );
  return rows[0] ? mapOrder(rows[0]) : null;
}

export async function insertEnquiry(enquiry) {
  const { rows } = await getPool().query(
    `INSERT INTO enquiries
      (id, ref, type, name, mobile, email, subject, order_type, message, status, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
     RETURNING *`,
    [
      enquiry.id,
      enquiry.ref,
      enquiry.type,
      enquiry.name,
      enquiry.mobile,
      enquiry.email,
      enquiry.subject,
      enquiry.orderType,
      enquiry.message,
      enquiry.status,
      enquiry.createdAt,
    ]
  );
  return mapEnquiry(rows[0]);
}

export async function listEnquiries(type) {
  const { rows } = type
    ? await getPool().query('SELECT * FROM enquiries WHERE type = $1 ORDER BY created_at', [type])
    : await getPool().query('SELECT * FROM enquiries ORDER BY created_at');
  return rows.map(mapEnquiry);
}

export async function updateEnquiryStatus(id, status) {
  const { rows } = await getPool().query(
    'UPDATE enquiries SET status = $2, updated_at = NOW() WHERE id = $1 RETURNING *',
    [id, status]
  );
  return rows[0] ? mapEnquiry(rows[0]) : null;
}
