import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className='page-head'>
      <p className='eyebrow'>404</p>
      <h1>Page not found</h1>
      <p className='lead'>The page you were looking for does not exist or has moved.</p>
      <div className='actions'>
        <Link to='/' className='btn btn-primary'>
          Back to home
        </Link>
      </div>
    </section>
  );
}
