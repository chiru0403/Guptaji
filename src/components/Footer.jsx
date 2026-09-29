import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { navLinks, policyLinks, waLink } from '../data/site';
import { useCatalog } from '../context/CatalogContext';

function phoneLabel(site) {
  const digits = String(site.phoneDisplay || '').replace(/\D/g, '');
  if (digits.length === 10) return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  return site.phoneDisplay || site.phoneTel || '';
}

function SocialIcon({ href, label, children }) {
  const className =
    'grid h-10 w-10 place-items-center rounded-full border border-[#c4a574]/70 text-[#e6d3b3] transition hover:border-[#e6d3b3] hover:text-white';
  if (!href) {
    return (
      <span className={className} aria-hidden="true">
        {children}
      </span>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={className}>
      {children}
    </a>
  );
}

export default function Footer() {
  const { site } = useCatalog();
  const social = site.social || {};

  return (
    <footer className="bg-[#1c140e] text-[#e6d3b3]">
      <div className="grid w-full items-start gap-10 px-6 py-12 md:px-8 lg:grid-cols-[auto_auto_auto_1fr] lg:gap-16">
        <div>
          <div className="flex h-12 items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-[#e07a2f] bg-[#3a2418] font-display text-xl text-[#f0c27a]">
              G
            </span>
            <span>
              <b className="block font-display text-2xl leading-none text-[#f3e6cf]">{site.name}</b>
              <small className="mt-1 block whitespace-nowrap text-[10px] font-semibold tracking-[0.22em] text-[#c4a574]">
                ROASTED · SPICED · YOURS
              </small>
            </span>
          </div>
          <p className="mt-5 text-sm text-[#d7c4a4]">Roasted fresh, shipped fast — since 1990.</p>
          <p className="mt-3 whitespace-nowrap text-[11px] font-semibold tracking-[0.16em] text-[#8b9a45]">
            HAND-TEMPERED · SMALL-BATCH · ZERO PRESERVATIVES
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col items-start gap-2.5">
          {navLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium leading-none text-[#f0e2c8] transition hover:text-[#f0c27a] ${
                index === 0 ? 'flex h-12 items-center' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Policies" className="flex flex-col items-start gap-2.5">
          {policyLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium leading-none text-[#f0e2c8] transition hover:text-[#f0c27a] ${
                index === 0 ? 'flex h-12 items-center' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="lg:justify-self-end lg:text-right">
          <p className="flex h-12 items-center text-[11px] font-semibold leading-none tracking-[0.22em] text-[#c4a574] lg:justify-end">
            ORDER & FOLLOW
          </p>
          <div className="mt-4 flex items-center gap-3 lg:justify-end">
            <SocialIcon href={waLink()} label="WhatsApp">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 11.5A8.5 8.5 0 0 1 7.1 18.2L4 19.5l1.4-3A8.5 8.5 0 1 1 20 11.5Z" />
              </svg>
            </SocialIcon>
            <SocialIcon href={social.instagram} label="Instagram">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="4" y="4" width="16" height="16" rx="4" />
                <circle cx="12" cy="12" r="3.5" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
              </svg>
            </SocialIcon>
            <SocialIcon href={social.facebook} label="Facebook">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1Z" />
              </svg>
            </SocialIcon>
            <SocialIcon href={site.mapsSearchUrl} label="Location">
              <MapPin size={16} />
            </SocialIcon>
          </div>
          <p className="mt-4 text-sm text-[#e6d3b3]">WhatsApp: {phoneLabel(site)}</p>
        </div>
      </div>

      <div className="px-6 pb-6 text-xs text-[#b7a48a] md:px-8">
        © {new Date().getFullYear()} {site.name}. All crunch reserved.
      </div>
    </footer>
  );
}
