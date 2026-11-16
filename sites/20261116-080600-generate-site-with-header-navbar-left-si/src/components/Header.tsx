import { Link } from 'react-router-dom';
import Icon from './Icon';

interface HeaderProps {
  navOpen: boolean;
  onToggleNav: () => void;
}

export default function Header({ navOpen, onToggleNav }: HeaderProps) {
  return (
    <header className='header'>
      <button
        type='button'
        className='menu-btn'
        aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={navOpen}
        aria-controls='sidebar'
        onClick={onToggleNav}
      >
        <Icon name={navOpen ? 'close' : 'menu'} size={22} />
      </button>
      <Link to='/' className='brand' aria-label='Meridian Studio, home'>
        <span className='brand-mark' aria-hidden='true'>
          <svg viewBox='0 0 32 32' width='30' height='30'>
            <rect width='32' height='32' rx='8' fill='currentColor' />
            <path d='M8 23V9l8 9 8-9v14' fill='none' stroke='var(--on-accent)' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </span>
        <span className='brand-name'>Meridian</span>
        <span className='brand-tag'>Studio</span>
      </Link>
      <div className='header-spacer' />
      <Link to='/contact' className='btn btn-primary btn-small'>
        Get in touch
      </Link>
    </header>
  );
}
