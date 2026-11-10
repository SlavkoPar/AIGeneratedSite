import { Link } from 'react-router-dom'
import type { Item } from '../types'
import { Grid } from './Card'

interface GroupProps {
  id: string
  title: string
  to: string
  list: Item[]
  open: boolean
  onToggle: () => void
}

/** A collapsible section: chevron button toggles, the title still links to the full list. */
export function Group({ id, title, to, list, open, onToggle }: GroupProps) {
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
