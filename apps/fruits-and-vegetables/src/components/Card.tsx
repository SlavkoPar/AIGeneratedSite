import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { routeFor } from '../data'
import type { Item } from '../types'

export function Card({ item }: { item: Item }) {
  return (
    <Link
      className="card"
      to={`/${routeFor(item)}`}
      style={{ '--accent': item.color } as CSSProperties}
    >
      <span className="card-emoji" aria-hidden="true">{item.emoji}</span>
      <span className="card-name">{item.name}</span>
      <span className="card-meta">{item.season}</span>
    </Link>
  )
}

export function Grid({ list }: { list: Item[] }) {
  return (
    <div className="grid">
      {list.map((item) => <Card key={item.slug} item={item} />)}
    </div>
  )
}
