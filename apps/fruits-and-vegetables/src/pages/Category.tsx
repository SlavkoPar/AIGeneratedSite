import { Grid } from '../components/Card'
import { usePageTitle } from '../hooks'
import type { Item } from '../types'

export default function Category({ title, list }: { title: string; list: Item[] }) {
  usePageTitle(title)
  return (
    <section>
      <h1>{title} <span className="count">{list.length}</span></h1>
      <Grid list={list} />
    </section>
  )
}
