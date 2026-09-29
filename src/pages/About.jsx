import { Link } from 'react-router-dom';
import { ArrowRight, Heart, ShieldCheck, Sparkles, MapPin, Gift } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import WhatsAppButton from '../components/WhatsAppButton';

const range = ['Crispy Sev', 'Chakli', 'Mixture', 'Papad', 'Sweet Bites', 'Gift Boxes'];

const defines = [
  { icon: Sparkles, title: 'Traditional Taste. Freshness You Can Trust.' },
  { icon: ShieldCheck, title: 'More Than Three Decades of Experience.' },
  { icon: Heart, title: 'And a Special Bond with Yavatmal.' },
];

export default function About() {
  return (
    <>
      <PageMeta
        title="About Us"
        description="The story of Gupta Namkin — from one cart in Yavatmal’s Adhavadi Market in 1990 to a family favourite since 1992."
      />

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_15%_20%,#ffe7b8_0,transparent_32%),linear-gradient(120deg,#fff9ec,#fff1dc)]">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-5 py-16 md:px-7 md:py-24 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="animate-fade-up">
            <span className="text-xs font-black uppercase tracking-[0.22em] text-saffron">
              Since 1992 · Yavatmal
            </span>
            <h1 className="mt-4 font-display text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[0.98] tracking-tight text-maroon">
              A taste Yavatmal has loved for{' '}
              <em className="italic text-saffron">generations.</em>
            </h1>
            <p className="mt-6 max-w-xl font-display text-xl leading-snug text-maroon/90 md:text-2xl">
              One cart. One kadai. One recipe book. And a dream to turn great taste into a lasting
              identity.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              The story of Gupta Namkin did not begin in a large factory or a fancy store. It began
              with hard work, a special recipe, and a simple passion — to serve people fresh,
              delicious namkeen made with care.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <article className="rounded-3xl bg-maroon p-6 text-white shadow-xl shadow-maroon/20">
              <p className="font-display text-5xl text-gold">1992</p>
              <p className="mt-3 text-sm leading-relaxed text-cream/90">
                A small cart and a single kadai in Adhavadi Market. Fresh Sev, tasted by hand, served
                in newspaper cones.
              </p>
            </article>
            {/* <article className="mt-8 rounded-3xl border border-[#ecd9c0] bg-white p-6 shadow-lg shadow-maroon/5">
              <p className="font-display text-5xl text-saffron">1992</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Gupta Namkin took shape at Chapmanwadi, Guru Mandir Road — a familiar name for
                families across Yavatmal.
              </p>
            </article> */}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1180px] items-center gap-12 px-5 py-20 md:px-7 lg:grid-cols-2">
        <img
          src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1100&q=80"
          alt="Fresh sev and traditional namkeen"
          className="h-[460px] w-full rounded-[7rem_7rem_1.5rem_1.5rem] object-cover shadow-2xl shadow-maroon/15 md:h-[540px]"
        />
        <div>
          <span className="text-xs font-black uppercase tracking-[0.22em] text-saffron">The beginning</span>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight tracking-tight text-maroon">
            A humble start people kept coming back for.
          </h2>
          <p className="mt-5 leading-relaxed text-muted">
            In 1990, our founder began this journey in Yavatmal’s Adhavadi Market, with a small cart
            and a single kadai. Fresh Sev was prepared in small batches, personally tasted to ensure
            its flavour and quality, and served to customers in traditional newspaper cones.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            It was a humble beginning, but the taste kept people coming back. Their love and trust
            eventually gave shape to Gupta Namkin in 1992. From Chapmanwadi, Guru Mandir Road,
            Yavatmal, the journey continued, gradually becoming a familiar and loved name among
            families across the city.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-maroon">
            <MapPin size={16} className="text-saffron" />
            Chapmanwadi, Guru Mandir Road, Yavatmal
          </p>
        </div>
      </section>

      <section className="bg-maroon py-20 text-white md:py-24">
        <div className="mx-auto max-w-[1180px] px-5 md:px-7">
          <span className="text-xs font-black uppercase tracking-[0.22em] text-gold">Our way</span>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4.2vw,3.4rem)] leading-tight tracking-tight">
            The kadais grew, but our way never changed.
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-[#f3d7cc]">
            Over the years, our business grew, our range expanded, and the Gupta Namkin family became
            bigger. But the philosophy with which we started remains at the heart of everything we
            do — keep it fresh, make it flavourful, and never compromise on quality.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                title: 'Small batches',
                text: 'Even today, our namkeen is prepared in small batches, so every batch gets close attention.',
              },
              {
                title: 'Taste, checked',
                text: 'The taste and quality are carefully checked before it reaches your home.',
              },
              {
                title: 'Packed fresh',
                text: 'Packed fresh to preserve the crunch and flavour our customers know us for.',
              },
            ].map((item) => (
              <article key={item.title} className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/15">
                <h3 className="font-display text-2xl text-gold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#f6e4dc]">{item.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 max-w-3xl font-display text-2xl leading-snug text-cream md:text-3xl">
            True craftsmanship is not about producing more — it is about giving taste and quality the
            attention they deserve.
          </p>
        </div>
      </section>

      <section className="bg-[#f7ead7] py-20 md:py-24">
        <div className="mx-auto max-w-[1180px] px-5 md:px-7">
          <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.22em] text-saffron">
                The range
              </span>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.3rem)] leading-tight tracking-tight text-maroon">
                A taste for every occasion.
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-muted">
                Today, Gupta Namkin offers a growing range of traditional favourites. From morning tea
                and evening snacks to welcoming guests and celebrating festivals, we want Gupta Namkin
                to be part of the moments that bring families together.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {range.map((name) => (
                <span
                  key={name}
                  className="rounded-full bg-white px-4 py-2 text-sm font-bold text-maroon shadow-sm"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <article className="rounded-3xl bg-white p-7 shadow-sm">
              <Gift className="text-saffron" size={26} />
              <h3 className="mt-4 font-display text-2xl text-maroon">Without preservatives</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                We prepare our products without preservatives, because great namkeen should taste
                delicious and be made with carefully selected ingredients.
              </p>
            </article>
            <article className="rounded-3xl bg-white p-7 shadow-sm">
              <Sparkles className="text-saffron" size={26} />
              <h3 className="mt-4 font-display text-2xl text-maroon">Without palm oil</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                No palm oil — only the right preparation methods, so the crunch and flavour stay true
                to the recipes families already know.
              </p>
            </article>
          </div>
          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 font-extrabold text-maroon transition hover:text-saffron"
          >
            Explore the menu <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-20 md:px-7 md:py-24">
        <span className="text-xs font-black uppercase tracking-[0.22em] text-saffron">Since 1990</span>
        <h2 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4vw,3.3rem)] leading-tight tracking-tight text-maroon">
          A relationship with taste that began in 1990.
        </h2>
        <p className="mt-4 max-w-2xl text-muted">More than three decades have passed, and much has changed.</p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {[
            ['From one small cart,', 'the journey grew.'],
            ['From one kadai,', 'there are now many.'],
            ['From a few traditional favourites,', 'our range has expanded.'],
            ['From our first customers,', 'the Gupta Namkin family has continued to grow.'],
          ].map(([from, to]) => (
            <li key={from} className="rounded-2xl border border-[#ecd9c0] bg-cream px-6 py-5">
              <p className="text-sm text-muted">{from}</p>
              <p className="mt-1 font-display text-2xl text-maroon">{to}</p>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-3xl text-lg leading-relaxed text-ink">
          But <strong>the heart of Gupta Namkin remains the same.</strong> Whenever a family opens a
          packet today, it carries decades of experience, our traditional recipes, the hard work
          behind every batch, and the trust that the people of Yavatmal have placed in us.
        </p>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">
          Some of our customers have been with us for years, and today a new generation is enjoying
          and sharing the same familiar taste with their families. For us, there could be no greater
          achievement.
        </p>
      </section>

      <section className="bg-night py-20 text-white md:py-24">
        <div className="mx-auto max-w-[1180px] px-5 md:px-7">
          <h2 className="max-w-4xl font-display text-[clamp(2.1rem,4.4vw,3.6rem)] leading-tight tracking-tight">
            Born in Yavatmal. Made with tradition.{' '}
            <em className="italic text-gold">Loved across generations.</em>
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-[#ead8d0]">
            No matter how far we grow, we will always remember where our story began. Our roots remain
            firmly in Yavatmal, and our purpose remains simple — to create a taste so fresh, authentic
            and memorable that after the very first bite, you know:
          </p>
          <p className="mt-6 font-display text-2xl text-cream md:text-3xl">
            “Yes, this is the taste of Gupta Namkin.”
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {defines.map((item) => (
              <article key={item.title} className="rounded-3xl bg-white/6 p-6 ring-1 ring-white/10">
                <item.icon className="text-gold" size={22} />
                <p className="mt-4 font-display text-xl leading-snug">{item.title}</p>
              </article>
            ))}
          </div>

          <div className="mt-14 border-t border-white/10 pt-10">
            <p className="font-display text-4xl text-white md:text-5xl">Gupta Namkin</p>
            <p className="mt-3 max-w-xl text-lg text-[#ead8d0]">
              A story that began with one kadai… and became a part of thousands of delicious moments.
            </p>
            <p className="mt-3 text-sm font-black uppercase tracking-[0.18em] text-gold">
              Since 1992 · Yavatmal
            </p>
            <WhatsAppButton variant="cream" className="mt-8" />
          </div>
        </div>
      </section>
    </>
  );
}
