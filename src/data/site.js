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
    instagram: null,
    facebook: null,
  },
  mapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Chapmanwadi, Guru Mandir Road, Yavatmal - 445001, Maharashtra'),
};

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/products', label: 'Products' },
  { to: '/bulk-orders', label: 'Bulk & Festive Orders' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact Us' },
];

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
