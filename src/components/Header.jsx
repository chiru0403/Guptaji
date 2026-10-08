import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart } from 'lucide-react';
import { navLinks } from '../data/site';
import { useCart } from '../context/CartContext';
import { useCatalog } from '../context/CatalogContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [query, setQuery] = useState('');
  const headerRef = useRef(null);
  const lastScrollY = useRef(0);
  const searchInputRef = useRef(null);
  const { count, addItem } = useCart();
  const { products } = useCatalog();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onCartPage = pathname === '/cart';

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter((product) => product.name.toLowerCase().includes(q));
  }, [products, query]);

  useEffect(() => {
    function onPointerDown(event) {
      if (!headerRef.current?.contains(event.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    document.documentElement.classList.toggle('header-hidden', hidden);
    return () => document.documentElement.classList.remove('header-hidden');
  }, [hidden]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      if (menuOpen || searchOpen || y < 48) {
        setHidden(false);
      } else if (delta > 8) {
        setHidden(true);
      } else if (delta < -8) {
        setHidden(false);
      }
      lastScrollY.current = y;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen, searchOpen]);

  function openSearch() {
    setMenuOpen(false);
    setSearchOpen((open) => !open);
  }

  function addAndOrder(product) {
    addItem(product);
    setSearchOpen(false);
    navigate('/cart');
  }

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 border-b border-[#f0dfca] bg-sand/95 backdrop-blur-md transition-transform duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0 shadow-sm'
      }`}
    >
      <div className="relative flex h-[78px] w-full items-center justify-between px-4 sm:px-6">
        <Link to="/" className="z-10 flex shrink-0 items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-[3px] border-gold bg-maroon font-display text-[27px] text-gold">
            G
          </span>
          <span>
            <b className="block font-display text-[22px] leading-[18px] text-maroon">Gupta</b>
            <small className="text-[9px] font-extrabold tracking-[0.25em] text-saffron">NAMKIN</small>
          </span>
        </Link>

        <nav
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } absolute inset-x-0 top-[78px] z-40 max-h-[calc(100vh-78px)] flex-col gap-5 overflow-y-auto bg-sand p-6 shadow-lg lg:absolute lg:inset-x-auto lg:top-1/2 lg:left-1/2 lg:flex lg:max-h-none lg:-translate-x-1/2 lg:-translate-y-1/2 lg:flex-row lg:gap-5 lg:overflow-visible lg:bg-transparent lg:p-0 lg:shadow-none`}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `relative text-sm font-bold after:absolute after:bottom-[-8px] after:left-0 after:h-0.5 after:bg-saffron after:transition-all ${
                  isActive
                    ? 'text-saffron after:right-0'
                    : 'text-ink after:right-full hover:after:right-0'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="z-10 ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            type="button"
            aria-label="Search products"
            aria-expanded={searchOpen}
            onClick={openSearch}
            className={`grid h-11 w-11 place-items-center rounded-full transition ${
              searchOpen ? 'bg-maroon text-white' : 'text-maroon hover:bg-[#f3e4d2]'
            }`}
          >
            <Search size={20} />
          </button>

          {!onCartPage && (
            <Link
              to="/cart"
              aria-label={`Cart, ${count} items`}
              onClick={() => {
                setSearchOpen(false);
                setMenuOpen(false);
              }}
              className="relative grid h-11 w-11 place-items-center rounded-full text-maroon transition hover:bg-[#f3e4d2]"
            >
              <ShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-saffron px-1 text-[10px] font-black text-white">
                  {count}
                </span>
              )}
            </Link>
          )}

          <button
            type="button"
            className="grid h-11 w-11 place-items-center border-0 bg-transparent text-maroon lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => {
              setSearchOpen(false);
              setMenuOpen((open) => !open);
            }}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="absolute inset-x-4 top-[78px] z-50 rounded-2xl border border-[#ecd9c0] bg-white p-4 shadow-2xl sm:inset-x-auto sm:right-4 sm:w-[min(100vw-2rem,420px)] md:right-7">
          <label className="flex items-center gap-2 rounded-full border border-[#dec9af] px-3 py-2">
            <Search size={16} className="text-[#89695f]" />
            <input
              ref={searchInputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search snacks..."
              aria-label="Search snacks"
              className="w-full border-0 bg-transparent text-sm outline-none"
            />
          </label>

          <div className="mt-3 max-h-80 overflow-y-auto">
            {!query.trim() && (
              <p className="px-1 py-6 text-center text-sm text-muted">Type a product name to see matches.</p>
            )}
            {query.trim() && results.length === 0 && (
              <p className="px-1 py-6 text-center text-sm text-muted">No products match “{query.trim()}”.</p>
            )}
            {results.length > 0 && (
              <ul className="space-y-2">
                {results.map((product) => (
                  <li
                    key={product.id}
                    onClick={() => {
                      setSearchOpen(false);
                      navigate(`/products/${product.id}`);
                    }}
                    className="flex cursor-pointer items-center gap-3 rounded-xl bg-cream p-2"
                  >
                    <img src={product.img} alt="" className="h-12 w-12 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-maroon">{product.name}</p>
                      {product.pakeg ? (
                        <span className="mt-1 inline-block rounded-full bg-saffron px-2 py-0.5 text-[10px] font-bold text-white">
                          {product.pakeg}
                        </span>
                      ) : null}
                      <p className="text-xs text-saffron">₹{product.price}</p>
                    </div>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        addAndOrder(product);
                      }}
                      className="rounded-full bg-saffron px-3 py-1.5 text-[11px] font-extrabold text-white hover:bg-saffron-dark"
                    >
                      Add
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

    </header>
  );
}
