const LIVE_API = 'https://gupta-namkin-backend.vercel.app';
const LOCAL_API = 'http://localhost:5000';

export const API_BASE = String(
  import.meta.env.VITE_API_URL || (import.meta.env.DEV ? LOCAL_API : LIVE_API),
).replace(/\/$/, '');

async function readJson(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Could not load data from the shop server.');
  }
  return data;
}

async function getJson(path) {
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`);
  } catch {
    throw new Error('Could not reach the shop server.');
  }
  return readJson(response);
}

export function getProducts({ category = '', q = '' } = {}) {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.set('category', category);
  if (q) params.set('q', q);
  const query = params.toString();
  return getJson(`/api/products${query ? `?${query}` : ''}`);
}

export function getProduct(productId) {
  return getJson(`/api/products/${encodeURIComponent(productId)}`);
}

export function getCategories() {
  return getJson('/api/categories');
}

export function getGallery() {
  return getJson('/api/gallery');
}

export function getSite() {
  return getJson('/api/site');
}

async function postJson(path, body) {
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error('Could not reach the shop server. You can still send this on WhatsApp.');
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Could not save your request.');
  }
  return data;
}

export function createOrder(body) {
  return postJson('/api/orders', body);
}

export function createEnquiry(body) {
  return postJson('/api/enquiries', body);
}
