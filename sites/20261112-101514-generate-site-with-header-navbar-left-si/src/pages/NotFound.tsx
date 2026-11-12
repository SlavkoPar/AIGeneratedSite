import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='page'>
      <section className='intro'>
        <h1>Page not found</h1>
        <p>We could not find that product. It may be out of season.</p>
        <p>
          <Link to='/' className='text-link'>
            Back to all products
          </Link>
        </p>
      </section>
    </div>
  );
}
