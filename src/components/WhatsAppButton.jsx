import { MessageCircle } from 'lucide-react';
import { waLink } from '../data/site';

const variants = {
  primary:
    'bg-saffron text-white shadow-lg shadow-saffron/25 hover:bg-saffron-dark hover:-translate-y-0.5',
  cream: 'bg-cream text-maroon hover:-translate-y-0.5',
  ghost: 'bg-transparent text-maroon border-[1.5px] border-[#cfae8b] hover:border-saffron',
  green: 'bg-[#22a35a] text-white shadow-lg hover:-translate-y-0.5',
  link: 'text-maroon text-sm font-black gap-1.5 px-0 py-0',
};

export default function WhatsAppButton({
  href,
  children = 'Order on WhatsApp',
  className = '',
  variant = 'primary',
}) {
  return (
    <a
      href={href || waLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-extrabold transition duration-200 ${variants[variant] || variants.primary} ${className}`}
    >
      <MessageCircle size={18} />
      {children}
    </a>
  );
}
