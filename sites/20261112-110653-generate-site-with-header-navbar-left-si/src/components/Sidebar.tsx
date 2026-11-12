import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { groups } from '../data';
import ItemIcon from './ItemIcon';

interface SidebarProps {
  open: boolean;
}

export default function Sidebar({ open }: SidebarProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    groups.forEach((g) => {
      initial[g.id] = true;
    });
    return initial;
  });

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside id="sidebar" className={open ? 'sidebar open' : 'sidebar'}>
      <nav aria-label="Products">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-home active' : 'nav-home')}>
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <span>Overview</span>
        </NavLink>

        {groups.map((group) => {
          const isOpen = expanded[group.id];
          const listId = 'nav-group-' + group.id;
          return (
            <div className="nav-group" key={group.id}>
              <button
                type="button"
                className="nav-group-toggle"
                aria-expanded={isOpen}
                aria-controls={listId}
                onClick={() => toggle(group.id)}
              >
                <span className="nav-group-name">{group.name}</span>
                <span className="nav-group-count" aria-hidden="true">{group.items.length}</span>
                <svg
                  className={isOpen ? 'chevron chevron-open' : 'chevron'}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <ul id={listId} className="nav-list" hidden={!isOpen}>
                {group.items.map((item) => (
                  <li key={item.slug}>
                    <NavLink
                      to={'/item/' + item.slug}
                      className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    >
                      <ItemIcon slug={item.slug} size={24} />
                      <span>{item.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
