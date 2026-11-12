import { Link } from 'react-router-dom';
import { useCart } from '../cart';

export default function Toast() {
  const { notice, dismissNotice } = useCart();

  return (
    <div className='toast-region' role='status' aria-live='polite' aria-atomic='true'>
      {notice && (
        <div className='toast' key={notice.id}>
          <span className='toast-text'>{notice.text}</span>
          <Link to='/cart' className='toast-link' onClick={dismissNotice}>
            View cart
          </Link>
          <button type='button' className='toast-close' aria-label='Dismiss message' onClick={dismissNotice}>
            <svg viewBox='0 0 24 24' width='18' height='18' fill='none' stroke='currentColor' strokeWidth='2.400' strokeLinecap='round' aria-hidden='true' focusable='false'>
              <path d='M6 6l12 12M18 6L6 18' />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
