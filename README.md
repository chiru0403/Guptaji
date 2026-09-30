# Gupta Namkin Website

Multi-page React website for **Gupta Namkin** (Yavatmal) — product catalogue with WhatsApp order enquiry.

## Pages

- `/` — Home
- `/about` — About Us
- `/products` — Products / Menu (filter + search)
- `/bulk-orders` — Bulk & Festive Orders
- `/gallery` — Gallery (lightbox)
- `/contact` — Contact Us

## Stack

- React + Vite
- React Router
- Tailwind CSS
- Lucide icons

## Run locally

The website calls `https://gupta-namkin-backend.vercel.app` unless `VITE_API_URL` is set. To use a backend on this machine, copy `.env.example` to `.env` and set `VITE_API_URL=http://localhost:5000`, then start that API first.

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

In a second terminal, from the website folder:

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

Orders and enquiries are saved by the API and still open WhatsApp so the shop can confirm them. Read saved records with the admin token in `backend/.env`. See `backend/README.md`.

## Production build

```bash
npm run build
npm run preview
```

## Business details

- Address: Chapmanwadi, Guru Mandir Road, Yavatmal - 445001, Maharashtra
- Phone / WhatsApp: 8378815442
- Listed product price: ₹200

Update contact info and products in:

- `backend/data/site.json`
- `backend/data/products.json`
- `backend/data/gallery.json`

The files in `src/data/` are the fallback used when the API is offline. Keep them in step with the backend data.
