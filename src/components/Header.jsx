import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { navLinks, waLink } from '../data/site';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-[78px] items-center gap-6 border-b border-[#f0dfca] bg-sand/95 px-5 backdrop-blur-md md:px-7 lg:px-[max(1.75rem,calc((100vw-1180px)/2))]">
      <Link to="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
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
          open ? 'flex' : 'hidden'
        } absolute inset-x-0 top-[78px] flex-col gap-5 bg-sand p-6 shadow-lg md:static md:mx-auto md:flex md:flex-row md:gap-6 md:bg-transparent md:p-0 md:shadow-none`}
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            onClick={() => setOpen(false)}
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
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-saffron px-4 py-3 text-sm font-extrabold text-white md:hidden"
        >
          <MessageCircle size={18} /> Order on WhatsApp
        </a>
      </nav>

      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden items-center gap-2 rounded-full bg-saffron px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-saffron/25 transition hover:-translate-y-0.5 hover:bg-saffron-dark lg:inline-flex"
      >
        <MessageCircle size={18} /> Order on WhatsApp
      </a>

      <button
        type="button"
        className="ml-auto border-0 bg-transparent text-maroon md:hidden"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
