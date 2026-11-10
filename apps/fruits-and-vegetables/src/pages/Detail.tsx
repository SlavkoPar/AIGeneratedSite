import type { CSSProperties } from 'react'
import { Link, useParams } from 'react-router-dom'
import { bySlug, items, routeFor } from '../data'
import { usePageTitle } from '../hooks'
import type { ItemType } from '../types'
import NotFound from './NotFound'

export default function Detail({ type }: { type: ItemType }) {
  const { slug = '' } = useParams()
  const item = bySlug[slug]
  const valid = item !== undefined && item.type === type
  usePageTitle(valid ? item.name : 'Not found')
  if (!valid) return <NotFound />

  const siblings = items.filter((i) => i.type === type)
  const index = siblings.findIndex((i) => i.slug === item.slug)
  const prev = siblings[(index - 1 + siblings.length) % siblings.length]
  const next = siblings[(index + 1) % siblings.length]
  const listPath = type === 'fruit' ? '/fruits' : '/vegetables'

  return (
    <article className="detail" style={{ '--accent': item.color } as CSSProperties}>
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
