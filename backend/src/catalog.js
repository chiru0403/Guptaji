import { getGallery, getProducts, getSite } from './db.js';

const CATEGORY_ORDER = [
  'Traditional Namkeen',
  'Mixtures',
  'Roasted Snacks',
  'Fresh Snacks',
  'Festive / Gift Packs',
];

export { getGallery, getProducts, getSite };

export async function getCategories() {
  const names = new Set((await getProducts()).map((product) => product.cat).filter(Boolean));
  const ordered = CATEGORY_ORDER.filter((name) => names.has(name));
  for (const name of names) {
    if (!ordered.includes(name)) ordered.push(name);
  }
  return ['All', ...ordered];
}
