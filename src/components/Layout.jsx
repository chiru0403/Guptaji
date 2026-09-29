import { Outlet } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { waLink } from '../data/site';
import { useCatalog } from '../context/CatalogContext';

export default function Layout() {
  useCatalog();
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-[22px] right-[22px] z-[60] grid h-14 w-14 place-items-center rounded-full bg-[#22a35a] text-white shadow-xl transition hover:scale-105"
      >
        <MessageCircle size={26} fill="currentColor" />
      </a>
    </div>
  );
}
