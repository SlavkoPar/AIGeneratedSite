import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { bySlug, fruits, items, routeFor, vegetables } from './data.js'

function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Fruits & Vegetables` : 'Fruits & Vegetables'
  }, [title])
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

function Card({ item }) {
  return (
    <Link className="card" to={`/${routeFor(item)}`} style={{ '--accent': item.color }}>
      <span className="card-emoji" aria-hidden="true">{item.emoji}</span>
      <span className="card-name">{item.name}</span>
      <span className="card-meta">{item.season}</span>
    </Link>
  )
}

function Grid({ list }) {
  return (
    <div className="grid">
      {list.map((item) => <Card key={item.slug} item={item} />)}
    </div>
  )
}

function Group({ id, title, to, list, open, onToggle }) {
  return (
    <section className="group">
      <h2>
        <button
          type="button"
          className="toggle"
          aria-expanded={open}
          aria-controls={`group-${id}`}
          aria-label={`${open ? 'Collapse' : 'Expand'} ${title}`}
          onClick={onToggle}
        >
          <span className={open ? 'chevron open' : 'chevron'} aria-hidden="true">▸</span>
        </button>
        <Link to={to}>{title}</Link> <span className="count">{list.length}</span>
      </h2>
      <div id={`group-${id}`} hidden={!open}>
        <Grid list={list} />
      </div>
    </section>
  )
}

function Home() {
  usePageTitle('')
  const [open, setOpen] = useState({ fruits: true, vegetables: true })
  const allOpen = open.fruits && open.vegetables
  const setAll = (value) => setOpen({ fruits: value, vegetables: value })
  return (
    <>
      <section className="hero">
        <h1>Fruits &amp; Vegetables</h1>
        <p>A small guide to {items.length} everyday fruits and vegetables. Pick one to see when it is in season, what it offers nutritionally, and a tip for using it.</p>
        <button type="button" className="toggle-all" onClick={() => setAll(!allOpen)}>
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </section>
      <Group id="fruits" title="Fruits" to="/fruits" list={fruits} open={open.fruits}
        onToggle={() => setOpen((o) => ({ ...o, fruits: !o.fruits }))} />
      <Group id="vegetables" title="Vegetables" to="/vegetables" list={vegetables} open={open.vegetables}
        onToggle={() => setOpen((o) => ({ ...o, vegetables: !o.vegetables }))} />
    </>
  )
}

function Category({ title, list }) {
  usePageTitle(title)
  return (
    <section>
      <h1>{title} <span className="count">{list.length}</span></h1>
      <Grid list={list} />
    </section>
  )
}

function Detail({ type }) {
  const { slug } = useParams()
  const item = bySlug[slug]
  const valid = item && item.type === type
  usePageTitle(valid ? item.name : 'Not found')
  if (!valid) return <NotFound />

  const siblings = items.filter((i) => i.type === type)
  const index = siblings.findIndex((i) => i.slug === item.slug)
  const prev = siblings[(index - 1 + siblings.length) % siblings.length]
  const next = siblings[(index + 1) % siblings.length]
  const listPath = type === 'fruit' ? '/fruits' : '/vegetables'

  return (
    <article className="detail" style={{ '--accent': item.color }}>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link> / <Link to={listPath}>{type === 'fruit' ? 'Fruits' : 'Vegetables'}</Link> / {item.name}
      </nav>
      <header className="detail-head">
        <span className="detail-emoji" aria-hidden="true">{item.emoji}</span>
        <div>
          <h1>{item.name}</h1>
          <p className="badge">{type === 'fruit' ? 'Fruit' : 'Vegetable'}</p>
        </div>
      </header>
      <p className="lead">{item.description}</p>
      {item.note && <p className="note">{item.note}</p>}
      <dl className="facts">
        <div><dt>Season</dt><dd>{item.season}</dd></div>
        <div><dt>Calories</dt><dd>about {item.calories} kcal per 100 g</dd></div>
        <div><dt>Rich in</dt><dd>{item.nutrients.join(', ')}</dd></div>
      </dl>
      <h2>Kitchen tip</h2>
      <p>{item.tip}</p>
      <nav className="pager" aria-label="More">
        <Link to={`/${routeFor(prev)}`}>← {prev.name}</Link>
        <Link to={`/${routeFor(next)}`}>{next.name} →</Link>
      </nav>
    </article>
  )
}

function NotFound() {
  usePageTitle('Not found')
  return (
    <section className="hero">
      <h1>Page not found</h1>
      <p><Link to="/">Back to all fruits and vegetables</Link></p>
    </section>
  )
}

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
      <footer className="site-footer">Calories are approximate values for raw produce. Seasons are for temperate Northern Hemisphere climates.</footer>
    </>
  )
}
