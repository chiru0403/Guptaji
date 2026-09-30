import { useState } from 'react';
import { Gift, PartyPopper, Building2, Sparkles } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import WhatsAppButton from '../components/WhatsAppButton';
import { createEnquiry } from '../api';
import { waLink } from '../data/site';

export default function BulkOrders() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const mobileDigits = String(f.get('mobile') || '').replace(/\D/g, '');
    const mobile = mobileDigits.startsWith('91') && mobileDigits.length > 10
      ? mobileDigits.slice(-10)
      : mobileDigits.replace(/^0+/, '');
    const email = String(f.get('email') || '').trim();
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError('Enter a 10-digit mobile number starting with 6, 7, 8, or 9.');
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address or leave it blank.');
      return;
    }
    const payload = {
      type: 'bulk',
      name: String(f.get('name') || '').trim(),
      mobile,
      email,
      subject: String(f.get('subject') || '').trim(),
      orderType: String(f.get('orderType') || '').trim(),
      message: String(f.get('message') || '').trim(),
    };
    setSubmitting(true);
    setError('');
    const waWindow = window.open('', '_blank', 'noopener,noreferrer');
    try {
      const enquiry = await createEnquiry(payload);
      const msg = [
        `Bulk enquiry ${enquiry.ref}`,
        payload.subject,
        payload.name,
        `Customer mobile: ${payload.mobile}`,
        payload.email && `Email: ${payload.email}`,
        payload.orderType && `Order type: ${payload.orderType}`,
        payload.message,
      ]
        .filter(Boolean)
        .join('\n');
      const link = waLink(msg);
      if (waWindow) waWindow.location.href = link;
      else window.location.href = link;
      setSaved({ ...enquiry, link });
      form.reset();
    } catch (err) {
      waWindow?.close();
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
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
          <div className="mx-auto flex h-52 w-52 flex-col items-center justify-center rounded-full bg-saffron shadow-[0_0_0_12px_#ffffff08,0_0_0_24px_#ffffff05] sm:h-[240px] sm:w-[240px] sm:shadow-[0_0_0_30px_#ffffff08,0_0_0_60px_#ffffff05] md:h-[300px] md:w-[300px]">
            <Gift size={48} className="text-gold sm:h-20 sm:w-20" />
            <span className="mt-2 text-center font-display text-xl font-black leading-none sm:text-3xl">
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
            Your enquiry is saved to the shop. We will contact you on the mobile number you enter.
          </p>
          <input
            name="name"
            required
            placeholder="Name, for example Sharma Stores"
            className="mb-3 w-full rounded-xl border border-[#e3cdb4] px-4 py-3.5 outline-none focus:border-saffron"
          />
          <input
            name="mobile"
            required
            inputMode="numeric"
            placeholder="Mobile number"
            className="mb-3 w-full rounded-xl border border-[#e3cdb4] px-4 py-3.5 outline-none focus:border-saffron"
          />
          <input
            name="email"
            type="email"
            placeholder="Email, for example store@email.com"
            className="mb-3 w-full rounded-xl border border-[#e3cdb4] px-4 py-3.5 outline-none focus:border-saffron"
          />
          <input
            name="subject"
            placeholder="Subject, for example Wedding order"
            className="mb-3 w-full rounded-xl border border-[#e3cdb4] px-4 py-3.5 outline-none focus:border-saffron"
          />
          <input
            name="orderType"
            placeholder="Order type, for example Wedding"
            className="mb-3 w-full rounded-xl border border-[#e3cdb4] px-4 py-3.5 outline-none focus:border-saffron"
          />
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Message, for example Need 20 packs of sev for a wedding."
            className="mb-4 w-full resize-y rounded-xl border border-[#e3cdb4] px-4 py-3.5 outline-none focus:border-saffron"
          />
          {error && <p className="mb-3 text-sm text-red-700">{error}</p>}
          {saved && (
            <div className="mb-4 rounded-2xl bg-cream px-4 py-3 text-sm text-maroon">
              <p className="font-bold">Enquiry {saved.ref} sent</p>
              <p className="mt-1 text-muted">
                {saved.status} · {saved.subject || saved.orderType || 'Bulk order'}
              </p>
              <a href={saved.link} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-bold underline">
                Open WhatsApp
              </a>
            </div>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-saffron px-5 py-3.5 font-extrabold text-white transition hover:bg-saffron-dark disabled:opacity-60"
          >
            {submitting ? 'Sending enquiry...' : 'Send enquiry'}
          </button>
        </form>
      </section>
    </>
  );
}
