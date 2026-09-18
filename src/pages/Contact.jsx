import { Phone, MessageCircle, MapPin, Clock, ArrowRight } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import WhatsAppButton from '../components/WhatsAppButton';
import { site, waLink } from '../data/site';

export default function Contact() {
  function onSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const parts = [
      f.get('subject') || 'General Enquiry',
      `${f.get('name')}`,
      f.get('mobile') ? `Mobile: ${f.get('mobile')}` : '',
      f.get('email') ? `Email: ${f.get('email')}` : '',
      f.get('message'),
    ].filter(Boolean);
    window.open(waLink(parts.join(' — ')), '_blank');
  }

  return (
    <>
      <PageMeta
        title="Contact Us"
        description="Visit or contact Gupta Namkin in Yavatmal. Call or WhatsApp 8378815442."
      />

      <section className="bg-night py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-5 md:px-7 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-gold">
              Visit or Contact Us
            </span>
            <h1 className="mt-3 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[0.98] tracking-tight">
              Your next snack break starts <em className="italic text-saffron">here.</em>
            </h1>

            <div className="mt-8 space-y-1">
              <a
                href={`tel:${site.phoneTel}`}
                className="flex items-start gap-4 border-b border-white/10 py-4 transition hover:text-gold"
              >
                <Phone className="mt-1 shrink-0 text-gold" size={22} />
                <span>
                  <small className="block text-[9px] tracking-widest text-[#d9aa75]">CALL US</small>
                  <b className="text-sm font-bold">{site.phoneDisplay}</b>
                </span>
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 border-b border-white/10 py-4 transition hover:text-gold"
              >
                <MessageCircle className="mt-1 shrink-0 text-gold" size={22} />
                <span>
                  <small className="block text-[9px] tracking-widest text-[#d9aa75]">WHATSAPP</small>
                  <b className="text-sm font-bold">Chat with Gupta Namkin</b>
                </span>
              </a>
              <div className="flex items-start gap-4 border-b border-white/10 py-4">
                <MapPin className="mt-1 shrink-0 text-gold" size={22} />
                <span>
                  <small className="block text-[9px] tracking-widest text-[#d9aa75]">SHOP ADDRESS</small>
                  <b className="block max-w-md text-sm font-bold">{site.address}</b>
                </span>
              </div>
              <div className="flex items-start gap-4 border-b border-white/10 py-4">
                <Clock className="mt-1 shrink-0 text-gold" size={22} />
                <span>
                  <small className="block text-[9px] tracking-widest text-[#d9aa75]">OPENING HOURS</small>
                  <b className="text-sm font-bold">{site.openingHours}</b>
                </span>
              </div>
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

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
              <MapPin size={32} className="mb-3 text-gold" />
              <b className="font-display text-xl">Map location</b>
              <p className="mt-2 text-sm leading-relaxed text-[#d7bdb5]">
                Exact Google Maps pin will be embedded after confirmation. Directions currently open
                an address search for the shop location.
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="self-start rounded-3xl bg-[#fff8eb] p-8 text-ink">
            <h2 className="mt-0 mb-5 font-display text-3xl text-maroon">Send an enquiry</h2>
            <div className="mb-3 grid gap-3 sm:grid-cols-2">
              <input
                name="name"
                required
                placeholder="Your name"
                className="w-full rounded-xl border border-[#e3cdb4] px-4 py-3.5 outline-none focus:border-saffron"
              />
              <input
                name="mobile"
                required
                placeholder="Mobile number"
                className="w-full rounded-xl border border-[#e3cdb4] px-4 py-3.5 outline-none focus:border-saffron"
              />
            </div>
            <input
              name="email"
              type="email"
              placeholder="Email (optional)"
              className="mb-3 w-full rounded-xl border border-[#e3cdb4] px-4 py-3.5 outline-none focus:border-saffron"
            />
            <input
              name="subject"
              placeholder="Order type / subject"
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
              Send via WhatsApp <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
