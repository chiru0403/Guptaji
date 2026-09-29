import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Minus, Plus } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import { useCart } from '../context/CartContext';
import { waProductLink } from '../data/site';
import { useCatalog } from '../context/CatalogContext';

export default function ProductDetail() {
  const { products, site } = useCatalog();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = products.find((item) => String(item.id) === String(id));
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);

  if (!product) {
    return (
      <section className="bg-white px-5 py-20 text-center">
        <h1 className="font-display text-4xl text-maroon">Product not found</h1>
        <Link to="/products" className="mt-6 inline-block font-bold text-saffron">
          Back to products
        </Link>
      </section>
    );
  }

  const photos = [product.img];

  function addToCart() {
    if (!product.available) return;
    addItem(product, qty);
    navigate('/cart');
  }

  return (
    <>
      <PageMeta title={product.name} description={product.desc} />
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto grid max-w-[1180px] items-start gap-8 px-5 md:px-7 lg:grid-cols-[72px_1.1fr_0.9fr]">
          <div className="flex gap-3 lg:flex-col">
            {photos.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(index)}
                className={`h-16 w-16 overflow-hidden rounded-md border bg-white ${
                  active === index ? 'border-saffron' : 'border-[#e6e6e6]'
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          <div className="flex min-h-[420px] items-center justify-center">
            <img
              src={photos[active]}
              alt={product.name}
              className="max-h-[520px] w-full object-contain"
            />
          </div>

          <div>
            <h1 className="font-display text-4xl text-[#222]">{product.name}</h1>
            <p className="mt-4 text-2xl font-medium text-[#222]">₹{product.price}.00</p>
            <p className="mt-2 text-sm text-[#666]">
              MRP inclusive of all taxes. Shipping charges additional.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-md border border-[#e4e4e4]">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((value) => Math.max(1, value - 1))}
                  className="grid h-11 w-11 place-items-center text-[#666]"
                >
                  <Minus size={16} />
                </button>
                <span className="min-w-6 text-center text-sm">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((value) => value + 1)}
                  className="grid h-11 w-11 place-items-center text-[#666]"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                type="button"
                disabled={!product.available}
                onClick={addToCart}
                className="rounded-full bg-saffron px-8 py-3 text-sm font-bold text-white hover:bg-saffron-dark disabled:opacity-40"
              >
                Add To Cart
              </button>
            </div>

            <p className="mt-8 text-sm text-[#222]">
              <span className="font-semibold">Product Type :</span> {product.cat}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#444]">{product.desc}</p>

            <div className="mt-6 flex items-center gap-3 text-sm text-[#222]">
              <span className="font-semibold">Share:</span>
              <a
                href={waProductLink(product.name, product.price)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on WhatsApp"
                className="grid h-8 w-8 place-items-center rounded-full border border-[#ddd] text-[#333] hover:border-saffron hover:text-saffron"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20 11.5A8.5 8.5 0 0 1 7.1 18.2L4 19.5l1.4-3A8.5 8.5 0 1 1 20 11.5Z" />
                </svg>
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-8 w-8 place-items-center rounded-full border border-[#ddd] text-[#333] hover:border-saffron hover:text-saffron"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="4" y="4" width="16" height="16" rx="4" />
                  <circle cx="12" cy="12" r="3.5" />
                </svg>
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-8 w-8 place-items-center rounded-full border border-[#ddd] text-[#333] hover:border-saffron hover:text-saffron"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
