import { useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import BulkOrders from './pages/BulkOrders';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import PrivacyPolicies from './pages/privacypolicies';
import Terms from './pages/terms';
import ShippingPolicy from './pages/Shipping Policy';

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="bulk-orders" element={<BulkOrders />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<PrivacyPolicies />} />
          <Route path="shipping" element={<ShippingPolicy />} />
        </Route>
      </Routes>
    </>
  );
}
