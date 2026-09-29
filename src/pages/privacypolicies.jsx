import PageMeta from '../components/PageMeta';

const sections = [
  {
    title: '1. Information We May Collect',
    body: (
      <>
        <p>Depending on how you interact with Gupta Namkin, we may collect information such as:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Your name</li>
          <li>Mobile number</li>
          <li>Email address</li>
          <li>Billing and delivery address</li>
          <li>Order and purchase details</li>
          <li>Enquiries, feedback, or messages you send us</li>
          <li>Information submitted through contact or order forms</li>
          <li>
            Basic technical information such as browser type, device information, IP address, and
            website usage data, where applicable
          </li>
        </ul>
        <p>
          We only aim to collect information that is reasonably required to provide our products and
          services or operate our website.
        </p>
      </>
    ),
  },
  {
    title: '2. How We Use Your Information',
    body: (
      <>
        <p>We may use the information we collect to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Process and manage your orders</li>
          <li>Deliver products to the address provided by you</li>
          <li>
            Contact you regarding an order, enquiry, payment, delivery, or customer-support request
          </li>
          <li>Provide customer service</li>
          <li>Send order confirmations and important service updates</li>
          <li>Improve our products, website, and customer experience</li>
          <li>Prevent misuse, fraudulent transactions, or security issues</li>
          <li>Maintain business and transaction records where required</li>
          <li>Comply with applicable legal or regulatory requirements</li>
        </ul>
        <p>
          Where appropriate and permitted, we may also send you information about new products,
          festive offers, gift boxes, or special promotions. You may ask us to stop promotional
          communications.
        </p>
      </>
    ),
  },
  {
    title: '3. Payment Information',
    body: (
      <>
        <p>
          If online payment facilities are available on our website, payments may be processed through
          third-party payment service providers.
        </p>
        <p>
          Gupta Namkin does not intend to directly store sensitive payment credentials such as your
          complete debit/credit card details, UPI PIN, CVV, or banking passwords.
        </p>
        <p>
          Payment providers may process your information according to their own privacy policies and
          security practices.
        </p>
      </>
    ),
  },
  {
    title: '4. Delivery Information',
    body: (
      <p>
        When you place an order, information such as your{' '}
        <strong>name, phone number, delivery address, and relevant order details</strong> may need to
        be shared with delivery, logistics, or service partners solely for processing and delivering
        your order.
      </p>
    ),
  },
  {
    title: '5. WhatsApp and Customer Enquiries',
    body: (
      <>
        <p>
          If you contact Gupta Namkin through{' '}
          <strong>WhatsApp, telephone, email, social media, or a website contact form</strong>, we may
          use the information you provide to respond to your enquiry and assist you.
        </p>
        <p>
          Please avoid sending sensitive personal or financial information through ordinary messages
          unless it is specifically required for completing a transaction.
        </p>
      </>
    ),
  },
  {
    title: '6. Cookies and Website Data',
    body: (
      <>
        <p>
          Our website may use cookies or similar technologies to help the website function properly,
          understand website usage, remember certain preferences, and improve the browsing experience.
        </p>
        <p>Where required, you may be provided with options to manage non-essential cookies.</p>
      </>
    ),
  },
  {
    title: '7. How We Share Information',
    body: (
      <>
        <p>
          <strong>We do not sell or rent your personal information to third parties.</strong>
        </p>
        <p>
          We may share limited information with trusted service providers where reasonably necessary to
          operate our business, such as:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Payment service providers</li>
          <li>Delivery and logistics partners</li>
          <li>Website hosting and technology providers</li>
          <li>Customer communication providers</li>
          <li>Professional advisers or authorities where legally required</li>
        </ul>
        <p>
          Such information should only be shared to the extent necessary for the relevant service or
          legal requirement.
        </p>
      </>
    ),
  },
  {
    title: '8. How We Protect Your Information',
    body: (
      <>
        <p>
          We take reasonable administrative and technical measures to protect personal information
          against unauthorized access, misuse, alteration, disclosure, or loss.
        </p>
        <p>
          However, no website, internet transmission, or electronic storage system can be guaranteed to
          be completely secure.
        </p>
      </>
    ),
  },
  {
    title: '9. How Long We Keep Information',
    body: (
      <p>
        We retain personal information only for as long as reasonably necessary for the purposes for
        which it was collected, including fulfilling orders, providing customer support, maintaining
        necessary business records, resolving disputes, and meeting applicable legal or regulatory
        requirements.
      </p>
    ),
  },
  {
    title: '10. Your Choices and Rights',
    body: (
      <>
        <p>
          Subject to applicable law, you may contact us regarding the personal information you have
          provided to us, including requests to correct or update inaccurate information or exercise
          other applicable privacy rights.
        </p>
        <p>You may also ask us to stop sending promotional communications.</p>
        <p>
          Certain information may still need to be retained where required for legitimate business,
          accounting, transaction, fraud-prevention, or legal purposes.
        </p>
      </>
    ),
  },
  {
    title: "11. Children's Privacy",
    body: (
      <>
        <p>
          Our website and products are intended for general customers and are not designed specifically
          to collect personal information from children.
        </p>
        <p>
          If we become aware that personal information relating to a child has been provided in
          circumstances where parental or guardian consent is required, we will take appropriate steps
          in accordance with applicable requirements.
        </p>
      </>
    ),
  },
  {
    title: '12. Third-Party Services and Links',
    body: (
      <>
        <p>
          Our website may contain links to or integrations with third-party services, including
          payment, delivery, social media, maps, or communication platforms.
        </p>
        <p>
          These third parties may have their own privacy policies and practices. Gupta Namkin is not
          responsible for the privacy practices of independent third-party websites or services.
        </p>
      </>
    ),
  },
  {
    title: '13. Changes to This Privacy Policy',
    body: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our website,
          services, business practices, or applicable requirements.
        </p>
        <p>
          When we make changes, the updated version will be published on this page with a revised{' '}
          <strong>“Last Updated”</strong> date.
        </p>
      </>
    ),
  },
  {
    title: '14. Contact Us',
    body: (
      <>
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy or your
          personal information, you can contact us:
        </p>
        <p>
          <strong>Gupta Namkin</strong>
          <br />
          Chapmanwadi, Guru Mandir Road
          <br />
          Yavatmal, Maharashtra – 445001
          <br />
          India
        </p>
        <p>
          <strong>Phone / WhatsApp:</strong> 8378815442
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicies() {
  return (
    <>
      <PageMeta
        title="Privacy Policy"
        description="How Gupta Namkin collects, uses, and protects your personal information."
      />
      <section className="bg-[#fff9ec] py-16 md:py-20">
        <article className="mx-auto max-w-3xl px-5 md:px-7">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-saffron">Gupta Namkin</p>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,5vw,4rem)] leading-tight text-maroon">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm font-semibold text-[#8a685c]">Last Updated: September 2026</p>

          <div className="mt-8 space-y-4 text-base leading-relaxed text-muted">
            <p>
              At <strong>Gupta Namkin</strong>, we value the trust you place in us. Your privacy is
              important to us, and we are committed to handling your personal information responsibly
              and transparently.
            </p>
            <p>
              This Privacy Policy explains what information we may collect when you visit our website,
              place an order, contact us, or use our services, and how we may use and protect that
              information.
            </p>
            <p>
              By using our website or providing your information to us, you acknowledge the practices
              described in this Privacy Policy.
            </p>
          </div>

          <div className="mt-10 space-y-8">
            {sections.map((section) => (
              <section key={section.title} className="space-y-3 text-base leading-relaxed text-muted">
                <h2 className="font-display text-2xl text-maroon">{section.title}</h2>
                {section.body}
              </section>
            ))}
          </div>

          <div className="mt-12 border-t border-[#ecd9c0] pt-8">
            <h2 className="font-display text-2xl text-maroon">Your Taste. Your Trust. Your Privacy.</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              For more than three decades, <strong>Gupta Namkin</strong> has been built on the trust of
              its customers. We aim to extend the same care we put into our products to the information
              you share with us.
            </p>
            <p className="mt-4 font-semibold text-maroon">
              Gupta Namkin — Traditional Taste. Freshness You Can Trust.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
