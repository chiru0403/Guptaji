import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import { createOrder } from '../api';
import { useCart } from '../context/CartContext';
import { waCartLink } from '../data/site';

const packingCharge = 0;

export default function Cart() {
  const { items, total, changeQty, removeItem, clearCart } = useCart();
  const [instructions, setInstructions] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(null);
  const grandTotal = total + packingCharge;

  async function checkout() {
    const customerName = name.trim();
    const digits = mobile.replace(/\D/g, '');
    const customerMobile = digits.startsWith('91') && digits.length > 10
      ? digits.slice(-10)
      : digits.replace(/^0+/, '');
    if (customerName.length < 2) {
      setError('Name must be at least 2 characters.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(customerMobile)) {
      setError('Enter a 10-digit mobile number starting with 6, 7, 8, or 9.');
      return;
    }
    if (items.length === 0) {
      setError('Add at least one product before placing the order.');
      return;
    }

    setError('');
    setSubmitting(true);
    const snapshot = items;
    const waWindow = window.open('', '_blank', 'noopener,noreferrer');
    try {
      const order = await createOrder({
        name: customerName,
        mobile: customerMobile,
        instructions,
        discountCode,
        items: snapshot.map((item) => ({ productId: item.id, qty: item.qty })),
      });
      const link = waCartLink(snapshot, {
        name: customerName,
        mobile: customerMobile,
        instructions,
        discountCode,
        orderNo: order.orderNo,
      });
      if (waWindow) waWindow.location.href = link;
      else window.location.href = link;
      clearCart();
      setSaved({
        orderNo: order.orderNo,
        link,
        total: order.total,
        status: order.status,
      });
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
        title="Cart"
        description="Review your Gupta Namkin cart and send the order on WhatsApp."
      />

      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-[1100px] px-5 md:px-7">
          {saved && (
            <div className="mb-10 rounded-2xl border border-[#ecd9c0] bg-[#fff8eb] px-6 py-8 text-center">
              <h1 className="font-display text-4xl text-maroon">Order {saved.orderNo} is saved</h1>
              <p className="mx-auto mt-3 max-w-md text-sm text-[#666]">
                Saved to the shop as {saved.status || 'new'}
                {saved.total != null ? ` · ₹${saved.total}.00` : ''}. WhatsApp opens to 8378815442
                with this order.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={saved.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-saffron px-5 py-2.5 text-sm font-bold text-white hover:bg-saffron-dark"
                >
                  Open WhatsApp
                </a>
                <Link
                  to="/products"
                  className="rounded-full border border-saffron px-5 py-2.5 text-sm font-bold text-saffron hover:bg-saffron hover:text-white"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}

          {items.length === 0 && !saved && (
            <div className="py-16 text-center">
              <h1 className="font-display text-4xl text-maroon">Your cart is empty</h1>
              <Link
                to="/products"
                className="mt-8 inline-flex rounded-full bg-saffron px-6 py-3 text-sm font-extrabold text-white hover:bg-saffron-dark"
              >
                Continue Shopping
              </Link>
            </div>
          )}

          {items.length > 0 && (
            <>
              <ul className="divide-y divide-[#ececec] border-y border-[#ececec]">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-3 py-5 sm:grid sm:grid-cols-[88px_minmax(0,1.4fr)_0.8fr_auto_auto_auto] sm:items-center sm:gap-6"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-[72px] w-[72px] shrink-0 rounded-md object-cover sm:h-20 sm:w-20"
                    />
                    <div className="min-w-0 flex-1 sm:contents">
                    <div className="min-w-0">
                      <p className="font-semibold text-[#222]">{item.name}</p>
                      {item.pakeg ? (
                        <span className="mt-1 inline-block rounded-full bg-saffron px-2.5 py-0.5 text-[11px] font-bold text-white">
                          {item.pakeg}
                        </span>
                      ) : null}
                      <p className="mt-1 text-sm text-[#888] sm:hidden">₹{item.price}</p>
                    </div>
                    <p className="hidden text-sm text-[#444] sm:block">₹{item.price}.00</p>
                    <div className="mt-3 flex items-center justify-between gap-3 sm:mt-0 sm:contents">
                    <div className="inline-flex items-center rounded-md border border-[#e4e4e4]">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name}`}
                        onClick={() => changeQty(item.id, item.qty - 1)}
                        className="grid h-9 w-9 place-items-center text-[#666]"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="min-w-6 text-center text-sm">{item.qty}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name}`}
                        onClick={() => changeQty(item.id, item.qty + 1)}
                        className="grid h-9 w-9 place-items-center text-[#666]"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="text-sm font-medium text-[#222]">₹{item.price * item.qty}.00</p>
                    <button
                      type="button"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => {
                        const ok = window.confirm(`Delete ${item.name} from your cart?`);
                        if (ok) removeItem(item.id);
                      }}
                      className="text-saffron hover:text-saffron-dark"
                    >
                      <Trash size={18} />
                    </button>
                    </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="rounded-full bg-saffron px-5 py-2.5 text-sm font-bold text-white hover:bg-saffron-dark"
                >
                  Continue Shopping
                </Link>
                <button
                  type="button"
                  onClick={clearCart}
                  className="rounded-full bg-saffron px-5 py-2.5 text-sm font-bold text-white hover:bg-saffron-dark"
                >
                  Clear Cart
                </button>
              </div>

              <div className="mt-10">
                <label className="block text-sm text-[#333]">
                  Special instructions
                  <textarea
                    value={instructions}
                    onChange={(event) => setInstructions(event.target.value)}
                    rows={5}
                    className="mt-3 w-full resize-y rounded-sm border border-[#d9d9d9] p-3 text-sm outline-none focus:border-saffron"
                  />
                </label>

                <div className="mx-auto mt-8 w-full max-w-md text-center">
                  <div className="flex items-center justify-between text-sm text-[#333]">
                    <span>Packing & Handling Charges</span>
                    <span>{packingCharge === 0 ? '₹0.00' : `₹${packingCharge}.00`}</span>
                  </div>
                  <h2 className="mt-6 text-2xl font-medium text-[#222]">Cart Totals</h2>
                  <div className="mt-3 grid grid-cols-2 border border-[#e6e6e6] text-sm">
                    <div className="border-r border-[#e6e6e6] px-4 py-3">Total</div>
                    <div className="px-4 py-3 text-right">₹{grandTotal}.00</div>
                  </div>

                  {showCode ? (
                    <input
                      value={discountCode}
                      onChange={(event) => setDiscountCode(event.target.value)}
                      placeholder="Enter discount code"
                      className="mt-5 w-full rounded-full border border-[#e4e4e4] px-4 py-2.5 text-sm outline-none focus:border-saffron"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowCode(true)}
                      className="mx-auto mt-5 block rounded-full bg-saffron px-5 py-2.5 text-sm font-bold text-white hover:bg-saffron-dark"
                    >
                      Have a discount code?
                    </button>
                  )}

                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    placeholder="Your name"
                    className="mt-5 w-full rounded-full border border-[#e4e4e4] px-4 py-2.5 text-sm outline-none focus:border-saffron"
                  />
                  <input
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value)}
                    required
                    inputMode="tel"
                    placeholder="Mobile number"
                    className="mt-3 w-full rounded-full border border-[#e4e4e4] px-4 py-2.5 text-sm outline-none focus:border-saffron"
                  />
                  {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
                  <button
                    type="button"
                    onClick={checkout}
                    disabled={submitting}
                    className="mx-auto mt-3 flex w-fit rounded-full bg-saffron px-5 py-2.5 text-sm font-bold text-white hover:bg-saffron-dark disabled:opacity-60"
                  >
                    {submitting ? 'Saving order...' : 'Place order'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
