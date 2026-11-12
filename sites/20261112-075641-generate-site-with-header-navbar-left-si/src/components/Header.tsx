import { Link } from 'react-router-dom';
import { useCart } from '../cart';
import { CartIcon } from '../icons';

interface HeaderProps {
  navOpen: boolean;
  onToggleNav: () => void;
}

export default function Header({ navOpen, onToggleNav }: HeaderProps) {
  const { count } = useCart();
  const cartLabel = 'Shopping cart, ' + count + (count === 1 ? ' item' : ' items');

  return (
    <header className='header'>
      <button
        type='button'
        className='menu-button'
        aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={navOpen}
        aria-controls='sidebar'
        onClick={onToggleNav}
      >
        <svg viewBox='0 0 24 24' width='24' height='24' fill='none' stroke='currentColor' strokeWidth='2.200' strokeLinecap='round' aria-hidden='true' focusable='false'>
          {navOpen ? <path d='M6 6l12 12M18 6L6 18' /> : <path d='M4 7h16M4 12h16M4 17h16' />}
        </svg>
      </button>
      <Link to='/' className='brand'>
        <svg viewBox='0 0 64 64' width='34' height='34' aria-hidden='true' focusable='false'>
          <circle cx='32' cy='32' r='30' fill='#ffffff' fillOpacity='0.15' />
          <path d='M32 24c-5-4-15-2-15 10 0 9 6 17 11 17 2 0 3-1 4-1s2 1 4 1c5 0 11-8 11-17 0-12-10-14-15-10z' fill='#ffffff' />
          <path d='M32 24c0-4 1-7 4-9' stroke='#ffffff' strokeWidth='3' strokeLinecap='round' fill='none' />
          <path d='M35 17c3-4 8-4 10-2-2 4-6 5-10 2z' fill='#b9e6a3' />
        </svg>
        <span className='brand-text'>
          <span className='brand-name'>Fresh Market</span>
          <span className='brand-sub'>Fruit and vegetables catalogue</span>
        </span>
      </Link>
      <div className='header-actions'>
        <span className='header-badge'>Demo prices</span>
        <Link to='/cart' className='cart-link' aria-label={cartLabel}>
          <CartIcon />
          <span className='cart-link-text'>Cart</span>
          {count > 0 && (
            <span className='cart-count' aria-hidden='true'>
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
