import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page">
      <h1>Page not found</h1>
      <p className="lead">We could not find what you were looking for.</p>
      <p>
        <Link to="/" className="text-link">Back to the overview</Link>
      </p>
    </div>
  );
}
