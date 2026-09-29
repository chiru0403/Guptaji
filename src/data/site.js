export const site = {
  name: 'Gupta Namkin',
  tagline: 'Fresh Taste. Trusted Quality.',
  phoneDisplay: '8378815442',
  phoneTel: '+918378815442',
  phoneWa: '918378815442',
  address: 'Chapmanwadi, Guru Mandir Road, Yavatmal - 445001, Maharashtra',
  openingHours: 'To be confirmed',
  email: null,
  social: {
    instagram: 'https://www.instagram.com/unplanet_engineer_0403/',
    facebook: 'https://www.facebook.com/AarawKing',
  },
  mapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Chapmanwadi, Guru Mandir Road, Yavatmal - 445001, Maharashtra'),
};

export const policyLinks = [
  { to: '/terms', label: 'Terms & Conditions' },
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/shipping', label: 'Shipping Policy' },
];

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/products', label: 'Products' },
  { to: '/bulk-orders', label: 'Bulk & Festive Orders' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact Us' },
];

export function adoptSite(next) {
  if (!next || typeof next !== 'object') return site;
  const { social, ...rest } = next;
  Object.assign(site, rest);
  if (social && typeof social === 'object') {
    site.social = { ...site.social, ...social };
  }
  return site;
}

export function waLink(message = '') {
  const text =
    message ||
    'Hello Gupta Namkin, I would like to know more about your products.';
  return `https://wa.me/${site.phoneWa}?text=${encodeURIComponent(text)}`;
}

export function waProductLink(name, price = 200) {
  return waLink(
    `Hello Gupta Namkin, I want to order ${name} priced at ₹${price}. Please share availability and order details.`
  );
}

export function waCartLink(
  items,
  { name = '', mobile = '', instructions = '', discountCode = '', orderNo = '' } = {}
) {
  const lines = items
    .map((item, index) => `${index + 1}. ${item.name} x ${item.qty} — ₹${item.price * item.qty}`)
    .join('\n');
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const notes = [
    name.trim() ? `Name: ${name.trim()}` : '',
    mobile.trim() ? `Mobile: ${mobile.trim()}` : '',
    orderNo ? `Order ref: ${orderNo}` : '',
    instructions.trim() ? `Special instructions: ${instructions.trim()}` : '',
    discountCode.trim() ? `Discount code: ${discountCode.trim()}` : '',
  ]
    .filter(Boolean)
    .join('\n');
  return waLink(
    `Hello Gupta Namkin, I want to order:\n${lines}\nTotal: ₹${total}${notes ? `\n${notes}` : ''}\nPlease share availability and order details.`
  );
}
