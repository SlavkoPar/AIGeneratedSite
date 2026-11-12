import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='page not-found'>
      <p className='eyebrow'>404</p>
      <h1>Page not found</h1>
      <p className='lead'>We could not find that product on our shelves.</p>
      <Link to='/' className='button'>
        Back to overview
      </Link>
    </div>
  );
}
