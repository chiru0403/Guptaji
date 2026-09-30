import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import ProductCard from '../components/ProductCard';
import { getCategories, getProduct, getProducts } from '../api';

export default function Products() {
  const [params] = useSearchParams();
  const paramCat = params.get('cat') || 'All';
  const [cat, setCat] = useState(paramCat);
  const [categories, setCategories] = useState(['All']);
  const [q, setQ] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    getCategories()
      .then((nextCategories) => {
        if (cancelled) return;
        const known = Array.isArray(nextCategories) && nextCategories.length ? nextCategories : ['All'];
        setCategories(known);
        setCat((current) => (known.includes(current) ? current : 'All'));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Could not load products.');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setCat(paramCat);
  }, [paramCat]);

  useEffect(() => {
    let cancelled = false;
    const term = q.trim();
    const timer = setTimeout(async () => {
      if (!term) setLoading(true);
      setError('');
      try {
        let next = [];
        if (/^\d+$/.test(term)) {
          try {
            const product = await getProduct(term);
            next = product?.id != null ? [product] : [];
          } catch {
            next = [];
          }
        } else {
          next = await getProducts({ category: term ? '' : cat, q: term });
        }
        if (!cancelled) setProducts(Array.isArray(next) ? next : []);
      } catch (err) {
        if (!cancelled) {
          setProducts([]);
          setError(err.message || 'Could not load products.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, term ? 200 : 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [q, cat]);

  function chooseCategory(nextCat) {
    setCat(nextCat);
  }

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
          </div>

          <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => chooseCategory(c)}
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
            <form
              className="flex w-full min-w-[210px] items-center gap-2 rounded-full border border-[#dec9af] bg-white px-3.5 py-2 lg:w-[280px]"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <button
                type="submit"
                aria-label="Search products"
                className="grid place-items-center text-[#89695f]"
              >
                <Search size={18} />
              </button>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name or product id"
                className="w-full border-0 bg-transparent text-sm outline-none"
                aria-label="Search products"
              />
            </form>
          </div>

          {loading ? (
            <p className="py-16 text-center text-muted">Loading products...</p>
          ) : error ? (
            <p className="py-16 text-center text-muted">{error}</p>
          ) : products.length === 0 ? (
            <p className="py-16 text-center text-muted">No products match your search.</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
