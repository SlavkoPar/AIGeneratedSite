import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks'

export default function NotFound() {
  usePageTitle('Not found')
  return (
    <section className="hero">
      <h1>Page not found</h1>
      <p><Link to="/">Back to all fruits and vegetables</Link></p>
    </section>
  )
}
