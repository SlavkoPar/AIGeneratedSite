import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setNavOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNavOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navOpen]);

  const skipToMain = (e: MouseEvent<HTMLAnchorElement>) => {
    // Avoid changing the hash, which HashRouter would treat as a route.
    e.preventDefault();
    document.getElementById('main')?.focus();
  };

  return (
    <div className='app'>
      <a className='skip-link' href='#main' onClick={skipToMain}>
        Skip to content
      </a>
      <Header navOpen={navOpen} onToggleNav={() => setNavOpen((v) => !v)} />
      <div className='body'>
        <Sidebar open={navOpen} />
        {navOpen && <div className='backdrop' onClick={() => setNavOpen(false)} aria-hidden='true' />}
        <main id='main' className='main' tabIndex={-1}>
          <div className='main-inner'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/services' element={<Services />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
