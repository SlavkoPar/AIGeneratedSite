import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../cart';

interface HeaderProps {
  navOpen: boolean;
  onToggleNav: () => void;
}

export default function Header({ navOpen, onToggleNav }: HeaderProps) {
  const { count } = useCart();
  const cartLabel = 'Cart, ' + count + (count === 1 ? ' item' : ' items');

  return (
    <header className="header">
      <button
        type="button"
        className="menu-button"
        aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={navOpen}
        aria-controls="sidebar"
        onClick={onToggleNav}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          {navOpen ? (
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          )}
        </svg>
      </button>
      <Link to="/" className="brand">
        <svg width="32" height="32" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
          <circle cx="32" cy="32" r="30" fill="#ffffff" />
          <path d="M18 40c0-12 10-22 28-22 0 16-8 28-22 28-2 0-4-1-6-2z" fill="#2f8f4e" />
          <path d="M16 50c6-10 14-18 24-24" stroke="#1c5c31" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
        <span>Fresh Market</span>
      </Link>
      <p className="header-tagline">Fruit &amp; vegetables, picked daily</p>
      <NavLink
        to="/cart"
        className={({ isActive }) => (isActive ? 'cart-link active' : 'cart-link')}
        aria-label={cartLabel}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M3 4h2.5l2.2 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 7H6.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9.5" cy="19" r="1.6" fill="currentColor" />
          <circle cx="17" cy="19" r="1.6" fill="currentColor" />
        </svg>
        <span className="cart-link-text">Cart</span>
        <span className="cart-count" aria-hidden="true">{count}</span>
      </NavLink>
    </header>
  );
}
