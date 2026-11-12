import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { groups, findGroupOfItem } from '../data';
import ProduceIcon from './ProduceIcon';

interface NavBarProps {
  open: boolean;
}

type ExpandedState = Record<string, boolean>;

function initialState(): ExpandedState {
  const state: ExpandedState = {};
  groups.forEach((g) => {
    state[g.id] = true;
  });
  return state;
}

export default function NavBar({ open }: NavBarProps) {
  const [expanded, setExpanded] = useState<ExpandedState>(initialState);
  const location = useLocation();

  // Make sure the group of the currently viewed item is visible.
  useEffect(() => {
    const match = location.pathname.match(/^\/item\/([^/]+)/);
    if (!match) return;
    const group = findGroupOfItem(match[1]);
    if (group) {
      setExpanded((prev) => (prev[group.id] ? prev : { ...prev, [group.id]: true }));
    }
  }, [location.pathname]);

  const toggle = (groupId: string) => {
    setExpanded((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const setAll = (value: boolean) => {
    const next: ExpandedState = {};
    groups.forEach((g) => {
      next[g.id] = value;
    });
    setExpanded(next);
  };

  return (
    <nav id='site-nav' className={`sidebar${open ? ' is-open' : ''}`} aria-label='Produce'>
      <div className='sidebar-top'>
        <NavLink to='/' end className={({ isActive }) => 'nav-link nav-home' + (isActive ? ' active' : '')}>
          <svg width='22' height='22' viewBox='0 0 24 24' aria-hidden='true' focusable='false'>
            <path d='M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z' fill='none' stroke='currentColor' strokeWidth='2' strokeLinejoin='round' />
          </svg>
          <span>Overview</span>
        </NavLink>
        <div className='sidebar-actions'>
          <button type='button' className='text-button' onClick={() => setAll(true)}>
            Expand all
          </button>
          <button type='button' className='text-button' onClick={() => setAll(false)}>
            Collapse all
          </button>
        </div>
      </div>

      {groups.map((group) => {
        const isOpen = Boolean(expanded[group.id]);
        const listId = `nav-group-${group.id}`;
        return (
          <div className='nav-group' key={group.id}>
            <button
              type='button'
              className='group-toggle'
              aria-expanded={isOpen}
              aria-controls={listId}
              onClick={() => toggle(group.id)}
            >
              <span>{group.name}</span>
              <span className='group-count'>{group.items.length}</span>
              <svg className={`chevron${isOpen ? ' is-open' : ''}`} width='16' height='16' viewBox='0 0 24 24' aria-hidden='true' focusable='false'>
                <path d='M8 5l8 7-8 7' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </button>
            <ul id={listId} className='nav-list' hidden={!isOpen}>
              {group.items.map((item) => (
                <li key={item.id}>
                  <NavLink to={`/item/${item.id}`} className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
                    <ProduceIcon id={item.id} size={24} />
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
