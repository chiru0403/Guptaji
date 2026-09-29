import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';

function Block({ title, children }) {
  return (
    <section className="space-y-3 border-t border-[#ecd9c0] pt-8 text-base leading-relaxed text-muted">
      <h2 className="font-display text-2xl text-maroon">{title}</h2>
      {children}
    </section>
  );
}

export default function Terms() {
  return (
    <>
      <PageMeta
        title="Terms & Conditions"
        description="Terms and conditions for using the Gupta Namkin website and placing orders."
      />
      <section className="bg-[#fff9ec] py-16 md:py-20">
        <article className="mx-auto max-w-3xl px-5 md:px-7">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-saffron">Gupta Namkin</p>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,5vw,4rem)] leading-tight text-maroon">
            Terms & Conditions
          </h1>
          <p className="mt-3 text-sm font-semibold text-[#8a685c]">Last Updated: September 2026</p>

          <div className="mt-8 space-y-4 text-base leading-relaxed text-muted">
            <p>
              Welcome to <strong>Gupta Namkin</strong>.
            </p>
            <p>
              These Terms & Conditions govern your use of the Gupta Namkin website and the purchase of
              products or services offered through our website, WhatsApp, telephone, or other official
              ordering channels.
            </p>
            <p>
              By accessing our website, placing an order, or using our services, you agree to these
              Terms & Conditions. Please read them carefully before making a purchase.
            </p>
          </div>

          <div className="mt-10 space-y-8">
            <Block title="1. About Gupta Namkin">
              <p>
                <strong>Gupta Namkin</strong> is a Yavatmal-based namkeen and snack brand serving
                customers with a range of traditional snacks and food products.
              </p>
              <p>
                Our products may include <strong>Sev, Mixture, Chakli, Papad, Sweet Bites, Gift Boxes</strong>,
                and other products introduced from time to time.
              </p>
              <p>
                <strong>Business Address:</strong>
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
            </Block>

            <Block title="2. Use of Our Website">
              <p>You may use our website to:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Browse our products</li>
                <li>View product information and prices</li>
                <li>Place orders, where online ordering is available</li>
                <li>Contact Gupta Namkin</li>
                <li>Make product or bulk-order enquiries</li>
                <li>Access information about offers and gift boxes</li>
                <li>Learn more about our brand and services</li>
              </ul>
              <p>
                You agree not to misuse the website, interfere with its operation, attempt unauthorized
                access, submit false information, or use the website for unlawful purposes.
              </p>
            </Block>

            <Block title="3. Product Information">
              <p>
                We make reasonable efforts to provide accurate information about our products, including
                their names, descriptions, prices, packaging, ingredients, quantities, and images.
              </p>
              <p>
                However, because our food products may be prepared in batches, there may be minor
                variations in <strong>appearance, colour, shape, size, texture, or packaging</strong>.
              </p>
              <p>
                Product images displayed on the website are primarily for representation. The actual
                product or packaging may vary slightly.
              </p>
            </Block>

            <Block title="4. Product Availability">
              <p>All products displayed on our website are subject to availability.</p>
              <p>
                Some products, flavours, packaging sizes, gift boxes, or festive items may only be
                available during specific periods or while stocks last.
              </p>
              <p>
                If a product becomes unavailable after you place an order, we may contact you to offer
                an alternative, modify the order with your approval, or provide an appropriate refund
                for the unavailable item where applicable.
              </p>
            </Block>

            <Block title="5. Pricing">
              <p>
                Product prices will be displayed on our website or communicated to you when placing an
                order.
              </p>
              <p>
                Prices may change from time to time due to changes in raw material costs, packaging,
                taxes, delivery charges, promotional offers, or other business factors.
              </p>
              <p>
                The price applicable to your order will generally be the price displayed or confirmed at
                the time the order is placed, subject to correction of genuine pricing or technical
                errors.
              </p>
              <p>
                Delivery or shipping charges, where applicable, may be shown separately before the order
                is confirmed.
              </p>
            </Block>

            <Block title="6. Orders">
              <p>When placing an order, you agree to provide accurate and complete information, including your:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Name</li>
                <li>Contact number</li>
                <li>Delivery address</li>
                <li>Product selection</li>
                <li>Quantity</li>
                <li>Other information reasonably required to complete the order</li>
              </ul>
              <p>Please verify your order details before confirming your purchase.</p>
              <p>
                Once an order has entered preparation, packing, or dispatch, changes or cancellations may
                not always be possible, particularly because many of our products are food items.
              </p>
            </Block>

            <Block title="7. Order Confirmation">
              <p>Placing an order does not necessarily mean that the order has been finally accepted.</p>
              <p>
                An order may be considered confirmed after the required details and, where applicable,
                payment have been successfully received and the order has been accepted by Gupta Namkin.
              </p>
              <p>We may contact you if additional information is required to process your order.</p>
            </Block>

            <Block title="8. Payments">
              <p>Depending on the options available, payments may be accepted through methods such as:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>UPI</li>
                <li>Debit or credit cards</li>
                <li>Net banking</li>
                <li>Payment gateways</li>
                <li>Other approved payment methods</li>
              </ul>
              <p>Online payments may be processed through third-party payment service providers.</p>
              <p>
                <strong>
                  Gupta Namkin will never ask you to share your UPI PIN, CVV, OTP, or banking password
                  through WhatsApp, telephone calls, or ordinary messages.
                </strong>
              </p>
              <p>Customers should never share such confidential payment credentials with anyone.</p>
            </Block>

            <Block title="9. Failed or Pending Payments">
              <p>
                If money is deducted from your account but your order is not confirmed, please contact
                us with the relevant transaction details.
              </p>
              <p>
                Payment confirmation and refunds for failed transactions may depend on the payment
                gateway, bank, UPI provider, or other financial service involved.
              </p>
              <p>Processing times may therefore vary.</p>
            </Block>

            <Block title="10. Delivery">
              <p>
                We will make reasonable efforts to deliver confirmed orders within the estimated
                delivery period communicated to the customer.
              </p>
              <p>However, delivery times may vary due to factors such as:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Customer location</li>
                <li>Product availability</li>
                <li>Order volume</li>
                <li>Festivals or peak periods</li>
                <li>Weather conditions</li>
                <li>Transport or logistics delays</li>
                <li>Events beyond our reasonable control</li>
              </ul>
              <p>
                An estimated delivery date or time should not be considered an absolute guarantee unless
                specifically confirmed otherwise.
              </p>
            </Block>

            <Block title="11. Correct Delivery Information">
              <p>
                Customers are responsible for providing a complete and accurate delivery address and
                contact number.
              </p>
              <p>
                Gupta Namkin may not be responsible for delays or unsuccessful deliveries caused by
                incorrect, incomplete, or outdated information provided by the customer.
              </p>
              <p>
                Additional delivery charges may apply if an order needs to be shipped again because of
                incorrect customer information or an unsuccessful delivery attempt.
              </p>
            </Block>

            <Block title="12. Freshness and Storage">
              <p>
                Gupta Namkin takes care to prepare and pack products with a focus on freshness and
                quality.
              </p>
              <p>After receiving your order, please:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Store products according to the instructions on the packaging</li>
                <li>Keep opened products properly sealed</li>
                <li>Protect products from moisture and excessive heat</li>
                <li>Consume products within the recommended period</li>
              </ul>
              <p>Product quality after opening may depend on storage and handling conditions.</p>
            </Block>

            <Block title="13. Allergies and Ingredients">
              <p>
                Our products may contain or be prepared in facilities that handle ingredients such as{' '}
                <strong>
                  peanuts, tree nuts, wheat/gluten, milk or dairy ingredients, gram flour, spices,
                  seeds, or other potential allergens
                </strong>
                , depending on the product.
              </p>
              <p>
                Customers with food allergies, intolerances, or specific dietary requirements should
                carefully check the product information and packaging before consumption.
              </p>
              <p>
                If you have a serious food allergy or are uncertain about a particular product, please
                contact us before placing an order.
              </p>
            </Block>

            <Block title="14. Returns, Replacements & Refunds">
              <p>
                Because Gupta Namkin primarily sells <strong>food and perishable/consumable products</strong>,
                products generally cannot be returned simply because of a change of mind after delivery.
              </p>
              <p>However, if you receive:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>An incorrect product</li>
                <li>A damaged or opened package</li>
                <li>A product that appears defective or unfit for consumption</li>
                <li>A materially different item from what you ordered</li>
              </ul>
              <p>
                please contact us as soon as reasonably possible after receiving your order.
              </p>
              <p>
                We may request{' '}
                <strong>
                  photographs, videos, packaging details, batch information, order details, or proof of
                  purchase
                </strong>{' '}
                to verify the issue.
              </p>
              <p>
                After verification, Gupta Namkin may provide an appropriate{' '}
                <strong>replacement, refund, store credit, or other reasonable resolution</strong>,
                depending on the circumstances and applicable law.
              </p>
              <p>
                Nothing in these Terms is intended to limit any mandatory consumer rights available
                under applicable law.
              </p>
            </Block>

            <Block title="15. Order Cancellation">
              <p>If you wish to cancel an order, please contact us as soon as possible.</p>
              <p>
                Cancellation may be possible if the order has not yet entered preparation, packing, or
                dispatch.
              </p>
              <p>Once an order has been prepared, packed, or dispatched, cancellation may not be available.</p>
              <p>
                Any applicable refund will be processed through an appropriate payment method and may
                take additional time to appear in your account depending on your bank or payment
                provider.
              </p>
            </Block>

            <Block title="16. Offers and Promotional Codes">
              <p>From time to time, Gupta Namkin may introduce:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Discounts</li>
                <li>Promotional codes</li>
                <li>Festival offers</li>
                <li>Gift-box offers</li>
                <li>Combo offers</li>
                <li>Special customer promotions</li>
              </ul>
              <p>
                Each offer may have its own eligibility criteria, validity period, minimum order value,
                availability, or other conditions.
              </p>
              <p>Unless specifically stated otherwise, offers may not be combined.</p>
            </Block>

            <Block title="17. Bulk Orders and Gift Boxes">
              <p>
                Customers may contact Gupta Namkin for{' '}
                <strong>
                  festive gift boxes, corporate gifting, family functions, celebrations, events, or
                  other bulk requirements
                </strong>
                .
              </p>
              <p>
                Pricing, packaging, quantities, delivery schedules, advance payments, customization, and
                cancellation conditions for bulk orders may be separately agreed upon before
                confirmation.
              </p>
            </Block>

            <Block title="18. Intellectual Property">
              <p>
                Unless otherwise stated, the content available on the Gupta Namkin website—including our{' '}
                <strong>
                  brand name, logo, product photographs, graphics, designs, written content, packaging
                  elements, and other original materials
                </strong>
                —belongs to Gupta Namkin or is used with appropriate permission.
              </p>
              <p>
                Such content may not be copied, reproduced, commercially used, modified, or distributed
                without appropriate authorization, except where permitted by law.
              </p>
            </Block>

            <Block title="19. Customer Reviews and Feedback">
              <p>
                If you voluntarily provide a review, testimonial, suggestion, photograph, or other
                feedback, you confirm that the material you submit is lawful and does not violate
                another person&apos;s rights.
              </p>
              <p>
                Where we wish to use identifiable customer photographs, videos, or similar personal
                content for promotional purposes, appropriate permission should be obtained where
                required.
              </p>
            </Block>

            <Block title="20. Third-Party Services">
              <p>Our website may use or provide access to third-party services such as:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Payment gateways</li>
                <li>Delivery partners</li>
                <li>Maps</li>
                <li>WhatsApp</li>
                <li>Social media platforms</li>
                <li>Other technology services</li>
              </ul>
              <p>These services may operate under their own terms, conditions, and privacy policies.</p>
              <p>
                Gupta Namkin is not responsible for the independent operation of third-party platforms
                beyond our reasonable control.
              </p>
            </Block>

            <Block title="21. Website Availability">
              <p>We aim to keep our website accessible and functioning properly.</p>
              <p>
                However, access may occasionally be interrupted because of maintenance, technical
                problems, server issues, updates, or circumstances beyond our reasonable control.
              </p>
              <p>We do not guarantee that the website will always operate without interruption or error.</p>
            </Block>

            <Block title="22. Limitation of Liability">
              <p>
                To the extent permitted by applicable law, Gupta Namkin will not be responsible for
                indirect or consequential losses arising solely from circumstances beyond our reasonable
                control.
              </p>
              <p>
                Nothing in these Terms & Conditions excludes or limits liability or customer rights
                where such exclusion or limitation is prohibited by applicable law.
              </p>
            </Block>

            <Block title="23. Privacy">
              <p>
                Your use of our website and services is also subject to our{' '}
                <Link to="/privacy" className="font-semibold text-saffron underline">
                  Privacy Policy
                </Link>
                , which explains how we collect, use, share, and protect personal information.
              </p>
              <p>
                We encourage you to read the Privacy Policy before placing an order or providing
                personal information.
              </p>
            </Block>

            <Block title="24. Changes to These Terms">
              <p>
                Gupta Namkin may update these Terms & Conditions from time to time to reflect changes in
                our products, services, website, business operations, or applicable requirements.
              </p>
              <p>
                The latest version will be published on this page along with an updated{' '}
                <strong>“Last Updated”</strong> date.
              </p>
            </Block>

            <Block title="25. Governing Law and Jurisdiction">
              <p>
                These Terms & Conditions will be governed by the <strong>applicable laws of India</strong>.
              </p>
              <p>
                Subject to applicable consumer protection and other mandatory laws, disputes relating to
                these Terms, our website, or our services will be handled by the courts or competent
                authorities having appropriate jurisdiction, including where applicable in{' '}
                <strong>Yavatmal, Maharashtra</strong>.
              </p>
            </Block>
          </div>

          <div className="mt-12 border-t border-[#ecd9c0] pt-8">
            <h2 className="font-display text-3xl text-maroon">Questions? We&apos;re Here to Help.</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              We want your experience with Gupta Namkin to be as satisfying as the taste inside every
              pack.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              If you have a question about an order, product, payment, delivery, or these Terms &
              Conditions, please contact us:
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              <strong>Gupta Namkin</strong>
              <br />
              Chapmanwadi, Guru Mandir Road
              <br />
              Yavatmal, Maharashtra – 445001
              <br />
              India
            </p>
            <p className="mt-3 text-base text-muted">
              <strong>Phone / WhatsApp:</strong> 8378815442
            </p>
            <p className="mt-8 font-display text-3xl text-maroon">Gupta Namkin</p>
            <p className="mt-2 font-semibold text-maroon">Traditional Taste. Freshness You Can Trust.</p>
            <p className="mt-1 text-sm font-black uppercase tracking-[0.16em] text-saffron">
              Since 1992 · Yavatmal
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
