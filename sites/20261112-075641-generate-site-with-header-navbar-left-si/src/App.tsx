import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import ItemPage from './pages/ItemPage';
import CartPage from './pages/CartPage';
import NotFound from './pages/NotFound';

export default function App() {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setNavOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNavOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navOpen]);

  return (
    <div className='app'>
      <a className='skip-link' href='#main'>
        Skip to content
      </a>
      <Header navOpen={navOpen} onToggleNav={() => setNavOpen((v) => !v)} />
      <Sidebar open={navOpen} />
      {navOpen && <div className='backdrop' onClick={() => setNavOpen(false)} aria-hidden='true' />}
      <main id='main' className='main' tabIndex={-1}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/item/:id' element={<ItemPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </div>
  );
}
