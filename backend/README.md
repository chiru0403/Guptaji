# Gupta Namkin API

The website talks to this API. The API saves products, orders, and enquiries in PostgreSQL.

## Folder structure

```
backend/
  server.js            starts the API and connects to PostgreSQL
  src/app.js           routes: products, orders, enquiries
  src/db.js            tables, seed, and SQL queries
  src/catalog.js       category list built from products
  data/products.json   first-time product seed
  data/site.json       shop name, phone, address
  data/gallery.json    gallery photos
  .env                 your PostgreSQL password (not committed)
```

## Flow

1. Browser calls `http://localhost:5000/api/...`
2. `server.js` opens PostgreSQL and creates the database `gupta_namkin` if it does not exist.
3. `src/db.js` creates the tables and copies the JSON catalogue in only when a table is empty.
4. `src/app.js` reads and writes those tables.

```
React site  ->  Express API  ->  PostgreSQL
                 /api/products     products
                 /api/orders       orders
                 /api/enquiries    enquiries
```

## Tables

| Table | What it stores |
| --- | --- |
| site | Shop address, phone, social links |
| products | Name, category, price, photo, availability |
| gallery | Gallery image URL and alt text |
| orders | Customer name, mobile, cart items, total, status |
| enquiries | Contact and bulk messages |

Order status: `new`, `confirmed`, `completed`, `cancelled`.

Enquiry status: `new`, `contacted`, `closed`.

## Use it in pgAdmin

1. Open pgAdmin and note the PostgreSQL password for the `postgres` user.
2. Copy `backend/.env.example` to `backend/.env`.
3. Set the password in this line:

```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/gupta_namkin
```

4. Start the API:

```bash
cd backend
npm install
npm run dev
```

5. In pgAdmin, refresh Databases. Open `gupta_namkin` and look at Schemas, public, Tables.

The API creates `gupta_namkin` and the tables. You do not need to run the SQL by hand.

## Endpoints

- `GET /api/health`
- `GET /api/site`
- `GET /api/categories`
- `GET /api/gallery`
- `GET /api/products` — optional `?category=` and `?q=`
- `GET /api/products/:id`
- `POST /api/orders` — `{ name, mobile, instructions, discountCode, items: [{ productId, qty }] }`
- `POST /api/enquiries` — `{ type: "contact" | "bulk", name, mobile, email, subject, orderType, message }`

Admin routes need `Authorization: Bearer <ADMIN_TOKEN>` from `.env`.

- `GET /api/orders`
- `PATCH /api/orders/:id` — `{ "status": "confirmed" }`
- `GET /api/enquiries`
- `PATCH /api/enquiries/:id` — `{ "status": "contacted" }`
