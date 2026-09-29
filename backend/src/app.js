import { randomUUID, timingSafeEqual } from 'crypto';
import cors from 'cors';
import express from 'express';
import { getCategories, getGallery, getProducts, getSite } from './catalog.js';
import { insertEnquiry, insertOrder, listEnquiries, listOrders, updateEnquiryStatus, updateOrderStatus } from './db.js';

const ORDER_STATUSES = ['new', 'confirmed', 'completed', 'cancelled'];
const ENQUIRY_STATUSES = ['new', 'contacted', 'closed'];

function createRef(prefix) {
  const stamp = Date.now().toString(36).toUpperCase();
  const salt = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `${prefix}-${stamp}${salt}`;
}

function cleanLine(value, max) {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

function cleanText(value, max) {
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    .trim()
    .slice(0, max);
}

function mobileOf(value) {
  let digits = String(value ?? '').replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length > 10) digits = digits.slice(-10);
  else if (digits.startsWith('0')) digits = digits.replace(/^0+/, '');
  return /^[6-9]\d{9}$/.test(digits) ? digits : '';
}

function tokensMatch(provided, expected) {
  const left = Buffer.from(provided);
  const right = Buffer.from(expected);
  if (left.length !== right.length || left.length === 0) return false;
  return timingSafeEqual(left, right);
}

function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_TOKEN || '';
  const header = req.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : (req.get('x-admin-key') || '').trim();
  if (!tokensMatch(token, expected)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
}

function rateLimit(max, windowMs) {
  const hits = new Map();
  return (req, res, next) => {
    const now = Date.now();
    const recent = (hits.get(req.ip) || []).filter((time) => now - time < windowMs);
    if (recent.length >= max) {
      res.status(429).json({ error: 'Too many requests. Please try again in a few minutes.' });
      return;
    }
    recent.push(now);
    hits.set(req.ip, recent);
    next();
  };
}

export function createApp() {
  const app = express();
  const origins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://127.0.0.1:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.use(cors({ origin: origins }));
  app.use(express.json({ limit: '100kb' }));

  app.get('/', async (_req, res) => {
    const site = await getSite();
    res.json({
      ok: true,
      name: site.name || 'Gupta Namkin',
      message: 'Gupta Namkin API is running.',
      health: '/api/health',
    });
  });

  app.get('/.well-known/appspecific/com.chrome.devtools.json', (_req, res) => {
    res.type('application/json').send('{}');
  });

  app.get('/api/health', async (_req, res) => {
    const site = await getSite();
    res.json({ ok: true, name: site.name || 'Gupta Namkin', database: 'postgresql' });
  });

  app.get('/api/site', async (_req, res) => {
    res.json(await getSite());
  });

  app.get('/api/categories', async (_req, res) => {
    res.json(await getCategories());
  });

  app.get('/api/gallery', async (_req, res) => {
    res.json(await getGallery());
  });

  app.get('/api/products', async (req, res) => {
    const category = cleanLine(req.query.category, 80);
    const q = cleanLine(req.query.q, 80).toLowerCase();
    const list = (await getProducts()).filter((product) => {
      const categoryMatch = !category || category === 'All' || product.cat === category;
      const searchMatch = !q || String(product.name).toLowerCase().includes(q);
      return categoryMatch && searchMatch;
    });
    res.json(list);
  });

  app.get('/api/products/:id', async (req, res) => {
    const product = (await getProducts()).find((item) => String(item.id) === req.params.id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(product);
  });

  const writeLimit = rateLimit(20, 15 * 60 * 1000);

  app.post('/api/orders', writeLimit, async (req, res) => {
    const body = req.body || {};
    const name = cleanLine(body.name, 80);
    const mobile = mobileOf(body.mobile);
    const instructions = cleanText(body.instructions, 500);
    const discountCode = cleanLine(body.discountCode, 40);
    if (name.length < 2 || !mobile || !Array.isArray(body.items) || body.items.length === 0) {
      res.status(400).json({ error: 'Name, a valid mobile number, and at least one item are required.' });
      return;
    }
    if (body.items.length > 50) {
      res.status(400).json({ error: 'An order can include at most 50 items.' });
      return;
    }

    const products = await getProducts();
    const lines = [];
    for (const item of body.items) {
      const product = products.find((entry) => entry.id === Number(item?.productId));
      const qty = Number(item?.qty);
      if (!product || !product.available || !Number.isInteger(qty) || qty < 1 || qty > 100) {
        res.status(400).json({ error: 'Each item must be an available product with a quantity from 1 to 100.' });
        return;
      }
      lines.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        qty,
        lineTotal: product.price * qty,
      });
    }

    const order = {
      id: randomUUID(),
      orderNo: createRef('GN'),
      name,
      mobile,
      instructions,
      discountCode,
      items: lines,
      total: lines.reduce((sum, line) => sum + line.lineTotal, 0),
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    res.status(201).json(await insertOrder(order));
  });

  app.get('/api/orders', requireAdmin, async (req, res) => {
    const status = cleanLine(req.query.status, 20);
    res.json(await listOrders(status));
  });

  app.patch('/api/orders/:id', requireAdmin, async (req, res) => {
    const status = cleanLine(req.body?.status, 20);
    if (!ORDER_STATUSES.includes(status)) {
      res.status(400).json({ error: `Status must be one of: ${ORDER_STATUSES.join(', ')}.` });
      return;
    }
    const updated = await updateOrderStatus(req.params.id, status);
    if (!updated) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json(updated);
  });

  app.post('/api/enquiries', writeLimit, async (req, res) => {
    const body = req.body || {};
    const type = body.type === 'bulk' ? 'bulk' : body.type === 'contact' ? 'contact' : '';
    const name = cleanLine(body.name, 80);
    const mobile = mobileOf(body.mobile);
    const email = cleanLine(body.email, 120).toLowerCase();
    const subject = cleanLine(body.subject, 120);
    const orderType = cleanLine(body.orderType, 80);
    const message = cleanText(body.message, 2000);
    if (!type) {
      res.status(400).json({ error: 'Type must be contact or bulk.' });
      return;
    }
    if (name.length < 2) {
      res.status(400).json({ error: 'Name must be at least 2 characters.' });
      return;
    }
    if (!mobile) {
      res.status(400).json({ error: 'Enter a 10-digit mobile number starting with 6, 7, 8, or 9.' });
      return;
    }
    if (message.length < 2) {
      res.status(400).json({ error: 'Message must be at least 2 characters.' });
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ error: 'Enter a valid email address or leave it blank.' });
      return;
    }

    const enquiry = {
      id: randomUUID(),
      ref: createRef(type === 'bulk' ? 'BULK' : 'ENQ'),
      type,
      name,
      mobile,
      email,
      subject,
      orderType,
      message,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    res.status(201).json(await insertEnquiry(enquiry));
  });

  app.get('/api/enquiries', requireAdmin, async (req, res) => {
    const type = cleanLine(req.query.type, 20);
    res.json(await listEnquiries(type));
  });

  app.patch('/api/enquiries/:id', requireAdmin, async (req, res) => {
    const status = cleanLine(req.body?.status, 20);
    if (!ENQUIRY_STATUSES.includes(status)) {
      res.status(400).json({ error: `Status must be one of: ${ENQUIRY_STATUSES.join(', ')}.` });
      return;
    }
    const updated = await updateEnquiryStatus(req.params.id, status);
    if (!updated) {
      res.status(404).json({ error: 'Enquiry not found' });
      return;
    }
    res.json(updated);
  });

  app.use((err, _req, res, _next) => {
    if (err?.type === 'entity.parse.failed') {
      res.status(400).json({ error: 'Invalid JSON.' });
      return;
    }
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  });

  return app;
}
