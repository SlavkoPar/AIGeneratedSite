import { useState } from 'react'
import { Group } from '../components/Group'
import { fruits, items, vegetables } from '../data'
import { usePageTitle } from '../hooks'

export default function Home() {
  usePageTitle('')
  const [open, setOpen] = useState({ fruits: true, vegetables: true })
  const allOpen = open.fruits && open.vegetables
  const setAll = (value: boolean) => setOpen({ fruits: value, vegetables: value })

  return (
    <>
      <section className="hero">
        <h1>Fruits &amp; Vegetables</h1>
        <p>A small guide to {items.length} everyday fruits and vegetables. Pick one to see when it is in season, what it offers nutritionally, and a tip for using it.</p>
        <button type="button" className="toggle-all" onClick={() => setAll(!allOpen)}>
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </section>
      <Group
        id="fruits"
        title="Fruits"
        to="/fruits"
        list={fruits}
        open={open.fruits}
        onToggle={() => setOpen((o) => ({ ...o, fruits: !o.fruits }))}
      />
      <Group
        id="vegetables"
        title="Vegetables"
        to="/vegetables"
        list={vegetables}
        open={open.vegetables}
        onToggle={() => setOpen((o) => ({ ...o, vegetables: !o.vegetables }))}
      />
    </>
  )
}
