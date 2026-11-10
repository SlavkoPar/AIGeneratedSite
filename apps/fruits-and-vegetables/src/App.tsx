import { NavLink, Link, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { fruits, vegetables } from './data'
import Category from './pages/Category'
import Detail from './pages/Detail'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <header className="site-header">
        <Link to="/" className="brand">🥕 Fruits &amp; Vegetables</Link>
        <nav>
          <NavLink to="/fruits">Fruits</NavLink>
          <NavLink to="/vegetables">Vegetables</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fruits" element={<Category title="Fruits" list={fruits} />} />
          <Route path="/vegetables" element={<Category title="Vegetables" list={vegetables} />} />
          <Route path="/fruit/:slug" element={<Detail type="fruit" />} />
          <Route path="/vegetable/:slug" element={<Detail type="vegetable" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="site-footer">
        Calories are approximate values for raw produce. Seasons are for temperate Northern Hemisphere climates.
      </footer>
    </>
  )
}
