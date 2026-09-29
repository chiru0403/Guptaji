import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Gift,
  MessageCircle,
  MapPin,
  Phone,
} from 'lucide-react';
import PageMeta from '../components/PageMeta';
import ProductCard from '../components/ProductCard';
import WhatsAppButton from '../components/WhatsAppButton';
import { waLink } from '../data/site';
import { useCatalog } from '../context/CatalogContext';

export default function Home() {
  const { products, categories, site } = useCatalog();
  const categoryNames = categories.filter((name) => name !== 'All');
  const popular = useMemo(() => products.filter((p) => p.popular).slice(0, 8), [products]);

  return (
    <>
      <PageMeta
        title="Home"
        description="Gupta Namkin — fresh namkeen and snacks in Yavatmal. Fresh Taste. Trusted Quality. Order on WhatsApp."
      />

      {/* Full-bleed hero */}
      <section className="relative min-h-[92vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=1800&q=85"
          alt="Assorted Indian namkeen from Gupta Namkin"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night/90 via-maroon/75 to-saffron/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(245,189,72,0.25),transparent_45%)]" />

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-[1180px] flex-col justify-center px-5 py-20 md:px-7">
          <div className="max-w-xl animate-fade-up">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.2em] text-gold">
              <Sparkles size={15} /> Yavatmal&apos;s neighbourhood snack stop
            </span>
            <h1 className="mt-4 font-display text-[clamp(3rem,8vw,5.5rem)] leading-[0.95] tracking-tight text-white">
              Gupta{' '}
              <span className="text-gold">Namkin</span>
            </h1>
            <p className="mt-3 font-display text-[clamp(1.5rem,3.5vw,2.4rem)] italic text-cream">
              Fresh Taste. Trusted Quality.
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-cream/85 md:text-lg">
              Traditional namkeen, crunchy mixtures and crowd-favourite snacks — made for everyday
              cravings, family time and celebrations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-saffron px-6 py-4 font-extrabold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-saffron-dark"
              >
                Explore Products <ArrowRight size={18} />
              </Link>
              <WhatsAppButton
                href={waLink()}
                variant="cream"
                className="px-6 py-4"
              >
                WhatsApp Order
              </WhatsAppButton>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-[13px] font-bold text-cream/90">
              {['Fresh & flavourful', 'Clear ₹200 pricing', 'Easy WhatsApp enquiry'].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={17} className="text-gold" /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-maroon py-3.5 text-sm font-black tracking-[0.2em] text-[#ffd98a] whitespace-nowrap">
        <div className="w-max animate-marquee">
          CRUNCHY • FRESH • FLAVOURFUL • TRADITIONAL • MADE FOR SHARING • CRUNCHY • FRESH •
          FLAVOURFUL • TRADITIONAL • MADE FOR SHARING •{' '}
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-20 md:px-7 md:py-24">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-saffron">
              Popular Products
            </span>
            <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight tracking-tight text-maroon">
              Find your <em className="italic text-saffron">favourite crunch.</em>
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 font-bold text-maroon transition hover:text-saffron"
          >
            View full menu <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="bg-[#f7ead7] py-20 md:py-24">
        <div className="mx-auto max-w-[1180px] px-5 md:px-7">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-saffron">
            Why Gupta Namkin
          </span>
          <h2 className="mt-2 mb-10 font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight tracking-tight text-maroon">
            Local flavours, served with <em className="italic text-saffron">care.</em>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Sparkles, title: 'Fresh Products', text: 'Popular snacks for everyday moments.' },
              { icon: ShieldCheck, title: 'Quality Ingredients', text: 'Consistent taste and careful handling.' },
              { icon: Gift, title: 'Hygienic Preparation', text: 'Clean handling you can trust.' },
              { icon: MessageCircle, title: 'Fair Pricing', text: 'Clear ₹200 packs and easy WhatsApp orders.' },
            ].map((item) => (
              <div key={item.title} className="border-t border-[#e4cdb2] pt-5">
                <item.icon className="text-saffron" size={22} />
                <b className="mt-2 mb-1 block text-maroon">{item.title}</b>
                <span className="text-xs text-[#89695f]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-20 md:px-7 md:py-24">
        <span className="text-xs font-black uppercase tracking-[0.2em] text-saffron">
          Product Categories
        </span>
        <h2 className="mt-2 mb-10 font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight tracking-tight text-maroon">
          Browse by <em className="italic text-saffron">craving.</em>
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {categoryNames.map((name) => (
            <Link
              key={name}
              to={`/products?cat=${encodeURIComponent(name)}`}
              className="rounded-2xl border border-[#ecd9c0] bg-cream p-5 transition hover:-translate-y-0.5 hover:border-saffron hover:shadow-md"
            >
              <b className="block font-display text-xl text-maroon">{name}</b>
              <span className="text-xs text-[#89695f]">View products</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1180px] items-center gap-12 px-5 pb-20 md:px-7 lg:grid-cols-2">
        <img
          src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80"
          alt="Traditional namkeen preparation"
          className="h-[400px] w-full rounded-[7.5rem_7.5rem_1.75rem_1.75rem] object-cover shadow-2xl shadow-maroon/15 md:h-[500px]"
        />
        <div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-saffron">About Preview</span>
          <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight tracking-tight text-maroon">
            Your neighbourhood namkeen stop in <em className="italic text-saffron">Yavatmal.</em>
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            Gupta Namkin serves customers from Chapmanwadi, Guru Mandir Road with fresh taste, quality
            ingredients and dependable service — at clear, simple prices.
          </p>
          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-2 font-extrabold text-maroon transition hover:text-saffron"
          >
            Read our story <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="mx-auto mb-20 max-w-[1180px] px-5 md:px-7">
        <div className="grid items-center gap-10 overflow-hidden rounded-[2.2rem] bg-maroon px-8 py-14 text-white md:px-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-gold">
              Bulk & Festive Orders
            </span>
            <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight tracking-tight">
              Make every gathering <em className="italic text-saffron">more delicious.</em>
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-[#e5c8bd]">
              Planning a celebration, office event or festive gift? Talk to us for bulk and assorted
              namkeen enquiries.
            </p>
            <WhatsAppButton
              href={waLink('Hello Gupta Namkin, I want to enquire about Bulk / Festive Order.')}
              variant="cream"
              className="mt-8"
            >
              Enquire on WhatsApp
            </WhatsAppButton>
          </div>
          <div className="mx-auto flex h-[230px] w-[230px] flex-col items-center justify-center rounded-full bg-saffron shadow-[0_0_0_30px_#ffffff08,0_0_0_60px_#ffffff05] md:h-[280px] md:w-[280px]">
            <Gift size={72} className="text-gold" />
            <span className="mt-2 text-center font-display text-2xl font-black leading-none md:text-3xl">
              FESTIVE
              <br />
              FAVOURITES
            </span>
          </div>
        </div>
      </section>

      <section className="bg-night py-20 text-white">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 md:grid-cols-2 md:px-7">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-gold">Visit Us</span>
            <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight tracking-tight">
              Find us in <em className="italic text-saffron">Chapmanwadi.</em>
            </h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 shrink-0 text-gold" size={20} />
                <span>{site.address}</span>
              </div>
              <a href={`tel:${site.phoneTel}`} className="flex items-center gap-3 transition hover:text-gold">
                <Phone className="text-gold" size={20} />
                {site.phoneDisplay}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={site.mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-saffron px-5 py-3 font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-saffron-dark"
              >
                <MapPin size={18} /> Get Directions
              </a>
              <WhatsAppButton variant="cream" />
            </div>
          </div>
          <div className="flex min-h-[220px] flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-8">
            <MapPin size={40} className="mb-4 text-gold" />
            <b className="font-display text-2xl">Shop location</b>
            <p className="mt-2 text-sm leading-relaxed text-[#d7bdb5]">
              Verified Google Maps pin will be embedded once confirmed. Use Get Directions for the
              address search meanwhile.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
