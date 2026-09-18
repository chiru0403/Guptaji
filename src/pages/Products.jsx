import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import ProductCard from '../components/ProductCard';
import { categories, products } from '../data/products';

export default function Products() {
  const [params] = useSearchParams();
  const paramCat = params.get('cat') || 'All';
  const [cat, setCat] = useState(categories.includes(paramCat) ? paramCat : 'All');
  const [q, setQ] = useState('');

  useEffect(() => {
    if (categories.includes(paramCat)) setCat(paramCat);
  }, [paramCat]);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === 'All' || p.cat === cat) &&
          p.name.toLowerCase().includes(q.toLowerCase())
      ),
    [cat, q]
  );

  return (
    <>
      <PageMeta
        title="Products"
        description="Browse Gupta Namkin namkeen and snacks in Yavatmal. Every listed pack at ₹200. Order on WhatsApp."
      />

      <section className="bg-[#f7ead7] py-16 md:py-20">
        <div className="mx-auto max-w-[1180px] px-5 md:px-7">
          <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-saffron">
                Our Menu
              </span>
              <h1 className="mt-2 font-display text-[clamp(2.4rem,4.5vw,4rem)] leading-tight tracking-tight text-maroon">
                Find your <em className="italic text-saffron">favourite crunch.</em>
              </h1>
            </div>
            <p className="max-w-sm leading-relaxed text-muted">
              Browse our popular namkeen and snacks. Every listed product is currently shown at ₹200.
            </p>
          </div>

          <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`cursor-pointer rounded-full border px-3.5 py-2 text-xs font-extrabold transition ${
                    cat === c
                      ? 'border-maroon bg-maroon text-white'
                      : 'border-[#d8bfa4] bg-[#fff8ec] text-[#69453c] hover:border-saffron'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="flex min-w-[210px] items-center gap-2 rounded-full border border-[#dec9af] bg-white px-3.5 py-2">
              <Search size={18} className="text-[#89695f]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search snacks..."
                className="w-full border-0 bg-transparent text-sm outline-none"
                aria-label="Search products"
              />
            </label>
          </div>

          {filtered.length === 0 ? (
            <p className="py-16 text-center text-muted">No products match your search.</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
