import { Link } from 'react-router-dom';

interface HeaderProps {
  navOpen: boolean;
  onToggleNav: () => void;
}

export default function Header({ navOpen, onToggleNav }: HeaderProps) {
  return (
    <header className='header'>
      <button
        type='button'
        className='menu-button'
        aria-expanded={navOpen}
        aria-controls='site-nav'
        aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
        onClick={onToggleNav}
      >
        <svg width='22' height='22' viewBox='0 0 24 24' aria-hidden='true' focusable='false'>
          {navOpen ? (
            <path d='M6 6l12 12M18 6L6 18' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' />
          ) : (
            <path d='M4 7h16M4 12h16M4 17h16' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' />
          )}
        </svg>
      </button>
      <Link to='/' className='brand'>
        <svg width='30' height='30' viewBox='0 0 64 64' aria-hidden='true' focusable='false'>
          <circle cx='32' cy='32' r='30' fill='#ffffff' fillOpacity='0.18' />
          <path d='M18 44c0-16 10-26 28-26 0 18-10 28-26 28l-4 4' fill='none' stroke='#ffffff' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round' />
          <path d='M22 42c6-8 12-13 18-16' fill='none' stroke='#ffffff' strokeWidth='3' strokeLinecap='round' />
        </svg>
        <span className='brand-text'>
          <span className='brand-name'>Fresh Market</span>
          <span className='brand-sub'>Fruit &amp; vegetables catalogue</span>
        </span>
      </Link>
    </header>
  );
}
