import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { groups, products, type GroupName } from '../data';
import { ChevronIcon, ItemIcon } from '../icons';

interface SidebarProps {
  open: boolean;
}

export default function Sidebar({ open }: SidebarProps) {
  const location = useLocation();
  const [expanded, setExpanded] = useState<Record<GroupName, boolean>>({
    Fruit: true,
    Vegetables: true,
  });

  // Make sure the group of the currently viewed item is visible.
  useEffect(() => {
    const match = location.pathname.match(/^\/item\/([^/]+)/);
    if (!match) return;
    const current = products.find((p) => p.id === match[1]);
    if (current) {
      setExpanded((prev) => (prev[current.group] ? prev : { ...prev, [current.group]: true }));
    }
  }, [location.pathname]);

  const toggle = (group: GroupName) => setExpanded((prev) => ({ ...prev, [group]: !prev[group] }));

  return (
    <nav id='sidebar' className={open ? 'sidebar open' : 'sidebar'} aria-label='Products'>
      <NavLink to='/' end className={({ isActive }) => (isActive ? 'nav-link home active' : 'nav-link home')}>
        All products
      </NavLink>
      {groups.map((group) => {
        const isOpen = expanded[group];
        const listId = `group-${group.toLowerCase()}`;
        const items = products.filter((p) => p.group === group);
        return (
          <section className='nav-group' key={group}>
            <h2 className='nav-group-heading'>
              <button
                type='button'
                className='nav-group-button'
                aria-expanded={isOpen}
                aria-controls={listId}
                onClick={() => toggle(group)}
              >
                <span>{group}</span>
                <span className='nav-count'>{items.length}</span>
                <ChevronIcon />
              </button>
            </h2>
            <ul id={listId} className='nav-list' hidden={!isOpen}>
              {items.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={`/item/${item.id}`}
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  >
                    <ItemIcon id={item.id} size={26} />
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </nav>
  );
}
