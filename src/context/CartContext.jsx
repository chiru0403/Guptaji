import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'gupta-namkin-cart';

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => {
    function addItem(product, qty = 1) {
      const amount = Math.max(1, qty);
      setItems((prev) => {
        const found = prev.find((item) => item.id === product.id);
        if (found) {
          return prev.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + amount } : item
          );
        }
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            pakeg: product.pakeg || '',
            qty: amount,
          },
        ];
      });
    }

    function removeItem(id) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }

    function clearCart() {
      setItems([]);
    }

    function changeQty(id, qty) {
      if (qty < 1) {
        removeItem(id);
        return;
      }
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, qty } : item)));
    }

    const count = items.reduce((sum, item) => sum + item.qty, 0);
    const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);

    return { items, addItem, removeItem, clearCart, changeQty, count, total };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error('useCart must be used within CartProvider');
  return cart;
}
