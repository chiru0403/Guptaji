import { ShieldCheck, Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import WhatsAppButton from '../components/WhatsAppButton';

export default function About() {
  return (
    <>
      <PageMeta
        title="About Us"
        description="Learn about Gupta Namkin — fresh taste, quality ingredients and hygienic snacks from Yavatmal."
      />

      <section className="bg-gradient-to-br from-[#fff9ec] to-[#fff4df] py-16 md:py-20">
        <div className="mx-auto max-w-[1180px] px-5 md:px-7">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-saffron">Our Story</span>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] tracking-tight text-maroon">
            Local flavours, served with <em className="italic text-saffron">care.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Gupta Namkin is a local namkeen and snacks brand serving customers from Chapmanwadi, Guru
            Mandir Road, Yavatmal. Our focus is on fresh taste, quality ingredients, hygienic handling
            and dependable service.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1180px] items-center gap-14 px-5 py-20 md:px-7 lg:grid-cols-2">
        <img
          src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80"
          alt="Gupta Namkin namkeen selection"
          className="h-[420px] w-full rounded-[7.5rem_7.5rem_1.75rem_1.75rem] object-cover shadow-2xl shadow-maroon/15 md:h-[520px]"
        />
        <div>
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] tracking-tight text-maroon">
            Traditional snacks for every day and every celebration.
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            We aim to bring traditional and popular snack varieties to customers in convenient packs at
            clear prices. From tea-time munching to festive sharing, Gupta Namkin is made for every
            craving.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {[
              { icon: ShieldCheck, title: 'Quality Promise', text: 'Consistent taste and careful selection.' },
              { icon: Sparkles, title: 'Freshness First', text: 'Snacks prepared and packed with care.' },
              { icon: Heart, title: 'Hygienic Handling', text: 'Clean processes you can trust.' },
              { icon: CheckCircle2, title: 'Customer Commitment', text: 'Friendly service and clear pricing.' },
            ].map((item) => (
              <div key={item.title} className="border-t border-[#e4cdb2] pt-4">
                <item.icon className="text-saffron" size={22} />
                <b className="mt-2 block text-maroon">{item.title}</b>
                <span className="text-xs text-[#89695f]">{item.text}</span>
              </div>
            ))}
          </div>
          <WhatsAppButton className="mt-10" />
        </div>
      </section>
    </>
  );
}
