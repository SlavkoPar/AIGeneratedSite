import { NavLink } from 'react-router-dom';
import Icon from './Icon';
import { navItems } from '../data/nav';

interface SidebarProps {
  open: boolean;
}

export default function Sidebar({ open }: SidebarProps) {
  return (
    <aside id='sidebar' className={open ? 'sidebar is-open' : 'sidebar'}>
      <nav aria-label='Main'>
        <p className='sidebar-heading'>Navigate</p>
        <ul className='nav-list'>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className='sidebar-card'>
        <p className='sidebar-card-title'>Have a project in mind?</p>
        <p>Tell us a little about it and we will reply within two working days.</p>
        <NavLink to='/contact' className='text-link'>
          Start a conversation <Icon name='arrow' size={16} />
        </NavLink>
      </div>
    </aside>
  );
}
