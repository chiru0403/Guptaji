import { Link } from 'react-router-dom';
import { site, navLinks } from '../data/site';

export default function Footer() {
  return (
    <footer className="bg-[#1e0d0b] pb-5 pt-14 text-[#d7bdb5]">
      <div className="mx-auto grid max-w-[1180px] items-start gap-10 px-5 md:grid-cols-[1fr_1.5fr_1fr] md:px-7">
        <div className="flex items-center gap-2.5">
          <span className="grid h-11 w-11 place-items-center rounded-full border-[3px] border-gold bg-maroon font-display text-[27px] text-gold">
            G
          </span>
          <span>
            <b className="block font-display text-[22px] leading-[18px] text-white">Gupta</b>
            <small className="text-[9px] font-extrabold tracking-[0.25em] text-saffron">NAMKIN</small>
          </span>
        </div>
        <p className="m-0 text-[13px] leading-relaxed">
          {site.address}
          <br />
          Phone / WhatsApp: {site.phoneDisplay}
          <br />
          Opening Hours: {site.openingHours}
        </p>
        <div className="flex flex-wrap gap-4 text-xs font-bold">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="transition hover:text-gold">
              {l.label.replace(' Us', '').replace(' & Festive Orders', '')}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-9 flex max-w-[1180px] flex-col justify-between gap-2 border-t border-white/10 px-5 pt-5 text-[11px] sm:flex-row md:px-7">
        <span>© {new Date().getFullYear()} Gupta Namkin. All rights reserved.</span>
        <span>Fresh Taste • Trusted Quality</span>
      </div>
    </footer>
  );
}
