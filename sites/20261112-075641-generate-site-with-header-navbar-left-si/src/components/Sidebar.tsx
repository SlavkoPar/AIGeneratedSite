import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../cart';
import { groups } from '../data';
import { CartIcon, ChevronIcon, ItemIcon } from '../icons';

interface SidebarProps {
  open: boolean;
}

type ExpandedState = Record<string, boolean>;

function buildState(value: boolean): ExpandedState {
  const state: ExpandedState = {};
  groups.forEach((g) => {
    state[g.id] = value;
  });
  return state;
}

export default function Sidebar({ open }: SidebarProps) {
  const [expanded, setExpanded] = useState<ExpandedState>(() => buildState(true));
  const location = useLocation();
  const { count } = useCart();

  // Make sure the group of the currently viewed item is visible after navigation.
  useEffect(() => {
    const match = location.pathname.match(/^\/item\/([^/]+)/);
    if (!match) return;
    const group = groups.find((g) => g.items.some((i) => i.id === match[1]));
    if (group) {
      setExpanded((prev) => (prev[group.id] ? prev : { ...prev, [group.id]: true }));
    }
  }, [location.pathname]);

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside id='sidebar' className={open ? 'sidebar is-open' : 'sidebar'}>
      <nav aria-label='Product categories'>
        <NavLink to='/' end className={({ isActive }) => (isActive ? 'nav-home active' : 'nav-home')}>
          <svg viewBox='0 0 24 24' width='20' height='20' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true' focusable='false'>
            <path d='M3 11l9-7 9 7M5 10v10h14V10' />
          </svg>
          Overview
        </NavLink>
        <NavLink to='/cart' className={({ isActive }) => (isActive ? 'nav-home nav-cart active' : 'nav-home nav-cart')}>
          <CartIcon size={20} />
          Cart
          {count > 0 && (
            <span className='nav-count'>
              {count}
              <span className='visually-hidden'>{count === 1 ? ' item in cart' : ' items in cart'}</span>
            </span>
          )}
        </NavLink>

        <div className='nav-tools'>
          <button type='button' onClick={() => setExpanded(buildState(true))}>
            Expand all
          </button>
          <button type='button' onClick={() => setExpanded(buildState(false))}>
            Collapse all
          </button>
        </div>

        {groups.map((group) => {
          const isOpen = Boolean(expanded[group.id]);
          const panelId = 'nav-group-' + group.id;
          return (
            <section className='nav-group' key={group.id}>
              <h2 className='nav-group-heading'>
                <button
                  type='button'
                  className={isOpen ? 'nav-group-toggle is-open' : 'nav-group-toggle'}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(group.id)}
                >
                  <ChevronIcon />
                  <span className='nav-group-name'>{group.name}</span>
                  <span className='nav-group-count' aria-hidden='true'>
                    {group.items.length}
                  </span>
                </button>
              </h2>
              <ul id={panelId} className='nav-list' hidden={!isOpen}>
                {group.items.map((item) => (
                  <li key={item.id}>
                    <NavLink to={'/item/' + item.id} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                      <span className='nav-icon' style={{ backgroundColor: item.tint }}>
                        <ItemIcon id={item.id} size={22} />
                      </span>
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </nav>
    </aside>
  );
}
