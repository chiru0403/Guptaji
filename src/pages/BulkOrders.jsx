import { Gift, PartyPopper, Building2, Sparkles } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import WhatsAppButton from '../components/WhatsAppButton';
import { waLink } from '../data/site';

export default function BulkOrders() {
  function onSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = `Bulk / Festive Enquiry - ${f.get('name')} (${f.get('mobile')}): ${f.get('orderType')} — ${f.get('message')}`;
    window.open(waLink(msg), '_blank');
  }

  return (
    <>
      <PageMeta
        title="Bulk & Festive Orders"
        description="Party, office, corporate and festive namkeen orders from Gupta Namkin, Yavatmal."
      />

      <section className="bg-maroon py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 md:px-7 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-gold">
              Bulk & Festive Orders
            </span>
            <h1 className="mt-3 font-display text-[clamp(2.4rem,5vw,4.25rem)] leading-[0.98] tracking-tight">
              Make every gathering <em className="italic text-saffron">more delicious.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#e5c8bd]">
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
          <div className="mx-auto flex h-[240px] w-[240px] flex-col items-center justify-center rounded-full bg-saffron shadow-[0_0_0_30px_#ffffff08,0_0_0_60px_#ffffff05] md:h-[300px] md:w-[300px]">
            <Gift size={80} className="text-gold" />
            <span className="mt-2 text-center font-display text-3xl font-black leading-none">
              FESTIVE
              <br />
              FAVOURITES
            </span>
            <b className="mt-3 text-[#ffd88c]">Gupta Namkin</b>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-20 md:px-7">
        <div className="mb-14 grid gap-6 md:grid-cols-3">
          {[
            { icon: PartyPopper, title: 'Parties & Events', text: 'Assorted packs for birthdays and gatherings.' },
            { icon: Building2, title: 'Office & Corporate', text: 'Reliable bulk supply for teams and clients.' },
            { icon: Sparkles, title: 'Festive Gifting', text: 'Gift-ready namkeen boxes for celebrations.' },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-[#ecd9c0] bg-cream p-6 shadow-sm">
              <item.icon className="text-saffron" size={28} />
              <h2 className="mt-3 font-display text-2xl text-maroon">{item.title}</h2>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
            </div>
          ))}
        </div>

        <form
          onSubmit={onSubmit}
          className="mx-auto max-w-xl rounded-3xl border border-[#ecd9c0] bg-sand p-8 shadow-lg shadow-maroon/5"
        >
          <h2 className="mt-0 mb-2 font-display text-3xl text-maroon">Send a bulk enquiry</h2>
          <p className="mb-6 text-sm text-muted">
            We&apos;ll open WhatsApp with your details so you can confirm quantity and timing.
          </p>
          <input
            name="name"
            required
            placeholder="Your name"
            className="mb-3 w-full rounded-xl border border-[#e3cdb4] px-4 py-3.5 outline-none focus:border-saffron"
          />
          <input
            name="mobile"
            required
            placeholder="Mobile number"
            className="mb-3 w-full rounded-xl border border-[#e3cdb4] px-4 py-3.5 outline-none focus:border-saffron"
          />
          <input
            name="orderType"
            placeholder="Order type (party / office / festive)"
            className="mb-3 w-full rounded-xl border border-[#e3cdb4] px-4 py-3.5 outline-none focus:border-saffron"
          />
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Tell us what you need..."
            className="mb-4 w-full resize-y rounded-xl border border-[#e3cdb4] px-4 py-3.5 outline-none focus:border-saffron"
          />
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-saffron px-5 py-3.5 font-extrabold text-white transition hover:bg-saffron-dark"
          >
            Send via WhatsApp
          </button>
        </form>
      </section>
    </>
  );
}
