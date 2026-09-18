import { useEffect } from 'react';

export default function PageMeta({ title, description }) {
  useEffect(() => {
    document.title = title
      ? `${title} | Gupta Namkin`
      : 'Gupta Namkin | Fresh Taste. Trusted Quality.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      description ||
        'Gupta Namkin — fresh namkeen and snacks in Yavatmal. Order on WhatsApp.'
    );
  }, [title, description]);

  return null;
}
