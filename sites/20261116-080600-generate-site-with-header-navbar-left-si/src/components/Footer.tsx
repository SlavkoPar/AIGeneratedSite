import { Link } from 'react-router-dom';
import { navItems } from '../data/nav';

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-inner'>
        <div>
          <p className='footer-brand'>Meridian Studio</p>
          <p className='footer-note'>Thoughtful websites for small teams.</p>
        </div>
        <nav aria-label='Footer'>
          <ul className='footer-links'>
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className='footer-copy'>© {new Date().getFullYear()} Meridian Studio. All rights reserved.</p>
      </div>
    </footer>
  );
}
