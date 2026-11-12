import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ItemPage from './pages/ItemPage';
import CartPage from './pages/CartPage';
import NotFound from './pages/NotFound';
import { useCart } from './cart';

export default function App() {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const location = useLocation();
  const { announcement } = useCart();

  useEffect(() => {
    setNavOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNavOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="app">
      <a className="skip-link" href="#main" onClick={(e) => {
        e.preventDefault();
        document.getElementById('main')?.focus();
      }}>
        Skip to content
      </a>
      <Header navOpen={navOpen} onToggleNav={() => setNavOpen((v) => !v)} />
      <Sidebar open={navOpen} />
      {navOpen && <div className="backdrop" onClick={() => setNavOpen(false)} aria-hidden="true" />}
      <main id="main" className="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:slug" element={<ItemPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <div className="visually-hidden" role="status" aria-live="polite">
        {announcement.text && <span key={announcement.id}>{announcement.text}</span>}
      </div>
    </div>
  );
}
