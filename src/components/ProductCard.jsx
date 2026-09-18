import { ArrowRight } from 'lucide-react';
import { waProductLink } from '../data/site';

export default function ProductCard({ product }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-sand shadow-md shadow-maroon/5 transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-maroon/10">
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-black ${
            product.available
              ? 'bg-emerald-50 text-leaf'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {product.available ? 'Available' : 'Out of Stock'}
        </span>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
      </div>
      <div className="p-4">
        <p className="text-[9px] font-black uppercase tracking-wider text-saffron">{product.cat}</p>
        <div className="mt-1 flex items-center justify-between gap-2">
          <h3 className="font-display text-xl text-maroon">{product.name}</h3>
          <span className="text-lg font-extrabold text-saffron">₹{product.price}</span>
        </div>
        <p className="mt-2 min-h-10 text-xs leading-relaxed text-muted/90">{product.desc}</p>
        <a
          href={waProductLink(product.name, product.price)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-between border-t border-[#f0dfc9] pt-3 text-xs font-black text-maroon transition hover:text-saffron"
        >
          Order on WhatsApp <ArrowRight size={16} />
        </a>
      </div>
    </article>
  );
}
