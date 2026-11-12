import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ItemPage from './pages/ItemPage';
import NotFound from './pages/NotFound';

export default function App() {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const location = useLocation();

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

  const skipToContent = () => {
    const main = document.getElementById('main');
    if (main) main.focus();
  };

  return (
    <div className='app'>
      <button type='button' className='skip-link' onClick={skipToContent}>
        Skip to content
      </button>
      <Header navOpen={navOpen} onToggleNav={() => setNavOpen((v) => !v)} />
      <NavBar open={navOpen} />
      {navOpen && <div className='backdrop' onClick={() => setNavOpen(false)} aria-hidden='true' />}
      <main id='main' className='main' tabIndex={-1}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/item/:id' element={<ItemPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
