import PageMeta from '../components/PageMeta';

export default function ShippingPolicy() {
  return (
    <>
      <PageMeta
        title="Shipping Policy"
        description="Pickup and delivery notes for Gupta Namkin orders in Yavatmal."
      />
      <section className="bg-[#fff9ec] py-16 md:py-20">
        <article className="mx-auto max-w-3xl px-5 md:px-7">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-saffron">Gupta Namkin</p>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,5vw,4rem)] leading-tight text-maroon">
            Shipping Policy
          </h1>
          <div className="mt-8 space-y-4 text-base leading-relaxed text-muted">
            <p>
              Gupta Namkin is at Chapmanwadi, Guru Mandir Road, Yavatmal - 445001, Maharashtra. You can
              collect your order from the shop after it is confirmed on WhatsApp.
            </p>
            <p>
              If delivery is available for your area, the shop will confirm the delivery area, time, and
              any charge on WhatsApp before the order is final. Delivery charges are not added on this
              website.
            </p>
            <p>
              Namkeen is packed fresh. Please take delivery or pickup at the time shared with you so the
              crunch and flavour stay as intended. Festive and bulk orders may need extra preparation
              time.
            </p>
            <p>Opening hours: To be confirmed.</p>
          </div>
        </article>
      </section>
    </>
  );
}
