import { Link } from 'react-router-dom';
import { LogoIcon } from '../icons';

interface HeaderProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
}

export default function Header({ menuOpen, onToggleMenu }: HeaderProps) {
  return (
    <header className='header'>
      <button
        type='button'
        className='menu-button'
        aria-expanded={menuOpen}
        aria-controls='sidebar'
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        onClick={onToggleMenu}
      >
        <svg width='22' height='22' viewBox='0 0 22 22' aria-hidden='true' focusable='false'>
          {menuOpen ? (
            <path d='M5 5l12 12M17 5L5 17' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' />
          ) : (
            <path d='M3 6h16M3 11h16M3 16h16' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' />
          )}
        </svg>
      </button>
      <Link to='/' className='brand'>
        <LogoIcon />
        <span>
          <span className='brand-name'>Fresh Market</span>
          <span className='brand-sub'>Fruit and vegetables, picked daily</span>
        </span>
      </Link>
    </header>
  );
}
