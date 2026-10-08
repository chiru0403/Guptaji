import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { waProductLink } from '../data/site';
import { useCatalog } from '../context/CatalogContext';

export default function ProductDetail() {
  const { products, site, ready } = useCatalog();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = products.find((item) => String(item.id) === String(id));
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setQty(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!ready) {
    return (
      <section className="bg-sand px-5 py-24 text-center text-muted">Loading this snack...</section>
    );
  }

  if (!product) {
    return (
      <section className="bg-sand px-5 py-20 text-center">
        <h1 className="font-display text-4xl text-maroon">Product not found</h1>
        <Link to="/products" className="mt-6 inline-block font-bold text-saffron">
          Back to products
        </Link>
      </section>
    );
  }

  const related = products
    .filter((item) => item.cat === product.cat && String(item.id) !== String(product.id))
    .slice(0, 4);

  function addToCart() {
    if (!product.available) return;
    addItem(product, qty);
    navigate('/cart');
  }

  return (
    <>
      <PageMeta title={product.name} description={product.desc} />
      <section className="overflow-hidden bg-sand py-8 md:py-12">
        <div className="mx-auto max-w-[1180px] px-5 md:px-7">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-maroon transition hover:text-saffron"
          >
            <ArrowLeft size={16} /> Back to menu
          </Link>

          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div className="relative animate-fade-up">
              <div className="absolute -left-6 -top-6 hidden h-28 w-28 rounded-full bg-gold/40 md:block" />
              <div className="absolute -bottom-8 -right-6 hidden h-36 w-36 rounded-full bg-saffron/20 md:block" />
              <div className="relative overflow-hidden rounded-[2.2rem] bg-maroon shadow-2xl shadow-maroon/20">
                <img
                  src={product.img}
                  alt={product.name}
                  className="h-[320px] w-full object-cover sm:h-[460px]"
                />
                <span
                  className={`absolute left-5 top-5 rounded-full px-3 py-1 text-[11px] font-black ${
                    product.available ? 'bg-cream text-leaf' : 'bg-white text-red-700'
                  }`}
                >
                  {product.available ? 'Available today' : 'Out of stock'}
                </span>
              </div>
            </div>

            <div className="animate-fade-up rounded-[2rem] border border-[#ecd9c0] bg-white p-6 shadow-xl shadow-maroon/5 md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-saffron">{product.cat}</p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-maroon sm:text-5xl">
                {product.name}
              </h1>
              {product.pakeg ? (
                <span className="mt-3 inline-block rounded-full bg-saffron px-3 py-1 text-xs font-bold text-white">
                  {product.pakeg}
                </span>
              ) : null}
              <p className="mt-4 max-w-md leading-relaxed text-muted">{product.desc}</p>

              <div className="mt-6 inline-flex items-end gap-2 rounded-2xl bg-cream px-4 py-3">
                <span className="font-display text-4xl text-maroon">₹{product.price}</span>
                <span className="mb-1 text-xs font-bold text-muted">per pack</span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center rounded-full border border-[#e4cdb2] bg-sand">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQty((value) => Math.max(1, value - 1))}
                    className="grid h-12 w-12 place-items-center text-maroon transition hover:text-saffron"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="min-w-6 text-center text-sm font-black">{qty}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQty((value) => value + 1)}
                    className="grid h-12 w-12 place-items-center text-maroon transition hover:text-saffron"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  type="button"
                  disabled={!product.available}
                  onClick={addToCart}
                  className="rounded-full bg-saffron px-8 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-saffron/30 transition hover:-translate-y-0.5 hover:bg-saffron-dark disabled:translate-y-0 disabled:opacity-40 disabled:shadow-none"
                >
                  Add to cart · ₹{product.price * qty}
                </button>
              </div>

              <p className="mt-4 text-xs text-muted">Pack price includes listed taxes. Ask on WhatsApp for delivery.</p>

              <div className="mt-8 flex items-center gap-3 border-t border-[#f0dfca] pt-5 text-sm text-maroon">
                <span className="font-semibold">Share</span>
                <a
                  href={waProductLink(product.name, product.price)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#ecd9c0] transition hover:-translate-y-0.5 hover:border-saffron hover:text-saffron"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M20 11.5A8.5 8.5 0 0 1 7.1 18.2L4 19.5l1.4-3A8.5 8.5 0 1 1 20 11.5Z" />
                  </svg>
                </a>
                <a
                  href={site.social?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#ecd9c0] transition hover:-translate-y-0.5 hover:border-saffron hover:text-saffron"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="4" y="4" width="16" height="16" rx="4" />
                    <circle cx="12" cy="12" r="3.5" />
                  </svg>
                </a>
                <a
                  href={site.social?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#ecd9c0] transition hover:-translate-y-0.5 hover:border-saffron hover:text-saffron"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-3xl text-maroon">
                More from <em className="italic text-saffron">{product.cat}</em>
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
