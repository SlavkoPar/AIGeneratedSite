import type { IconName } from '../components/Icon';

export interface NavItem {
  to: string;
  label: string;
  icon: IconName;
  end?: boolean;
}

export const navItems: NavItem[] = [
  { to: '/', label: 'Home', icon: 'home', end: true },
  { to: '/about', label: 'About', icon: 'users' },
  { to: '/services', label: 'Services', icon: 'grid' },
  { to: '/contact', label: 'Contact', icon: 'mail' },
];
