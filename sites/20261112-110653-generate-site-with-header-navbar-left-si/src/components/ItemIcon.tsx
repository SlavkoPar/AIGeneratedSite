import type { ReactNode } from 'react';

interface ItemIconProps {
  slug: string;
  size?: number;
  className?: string;
}

function shape(slug: string): ReactNode {
  switch (slug) {
    case 'apple':
      return (
        <>
          <path d="M32 20c-6-5-18-3-18 12 0 12 8 24 14 24 2 0 3-1 4-1s2 1 4 1c6 0 14-12 14-24 0-15-12-17-18-12z" fill="#e5484d" />
          <path d="M21 30c0-4 2-7 5-8" stroke="#ffb3b5" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M32 20c0-5 2-9 5-11" stroke="#6b4423" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M37 13c4-5 10-4 12-3-2 5-8 7-12 3z" fill="#4caf50" />
        </>
      );
    case 'pear':
      return (
        <>
          <path d="M32 14c-6 0-8 6-9 12-1 5-9 9-9 19 0 9 8 14 18 14s18-5 18-14c0-10-8-14-9-19-1-6-3-12-9-12z" fill="#b5cc3a" />
          <path d="M21 44c0-4 2-7 5-9" stroke="#e4f08f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M32 14c0-4 1-7 3-9" stroke="#6b4423" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M35 9c4-4 9-3 11-2-2 4-7 6-11 2z" fill="#4caf50" />
        </>
      );
    case 'banana':
      return (
        <>
          <path d="M10 36c10 10 30 8 40-16l5 2c-6 30-36 36-49 20-1-3 1-6 4-6z" fill="#f7c948" />
          <path d="M12 42c12 8 28 4 37-12" stroke="#d9a521" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M49 21l1-7 6 2-1 7z" fill="#7a5c1e" />
        </>
      );
    case 'carrots':
      return (
        <>
          <path d="M41 22c-2-8 1-14 5-17 2 5 2 10-1 14 5-4 11-4 14-2-2 5-8 8-16 7z" fill="#4caf50" />
          <path d="M42 21c5 5 3 11-2 16L13 57c-4 2-7-1-5-5l19-27c5-6 10-9 15-4z" fill="#f08a24" />
          <path d="M30 30l5 5M23 40l5 5M17 49l4 4" stroke="#c96a12" strokeWidth="2" strokeLinecap="round" fill="none" />
        </>
      );
    case 'onions':
      return (
        <>
          <path d="M32 15c-1-4-1-8 0-11M32 15c2-4 5-6 8-7" stroke="#4caf50" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M32 14c-4 9-20 12-20 27 0 10 9 17 20 17s20-7 20-17c0-15-16-18-20-27z" fill="#b65fa8" />
          <path d="M32 20c-5 9-12 12-12 21 0 6 3 10 7 13M32 20c5 9 12 12 12 21 0 6-3 10-7 13" stroke="#e3a9da" strokeWidth="2" strokeLinecap="round" fill="none" />
        </>
      );
    case 'garlic':
      return (
        <>
          <path d="M32 8c-2 9-18 14-18 31 0 11 8 17 18 17s18-6 18-17c0-17-16-22-18-31z" fill="#f6f0e4" stroke="#b8ac97" strokeWidth="2" strokeLinejoin="round" />
          <path d="M32 16c-7 12-7 28 0 40M32 16c7 12 7 28 0 40" stroke="#b8ac97" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M28 56h8" stroke="#8d8270" strokeWidth="3" strokeLinecap="round" />
        </>
      );
    case 'cabbage':
      return (
        <>
          <circle cx="32" cy="34" r="24" fill="#5aa845" />
          <path d="M12 28c6-12 20-18 30-12 9 5 12 16 8 26" fill="#8fd070" />
          <circle cx="32" cy="36" r="14" fill="#b9e89a" />
          <path d="M32 24v24M32 34l-9-7M32 38l9-7M32 44l-8-4" stroke="#5aa845" strokeWidth="2" strokeLinecap="round" fill="none" />
        </>
      );
    case 'potatoes':
      return (
        <>
          <ellipse cx="32" cy="34" rx="25" ry="18" transform="rotate(-18 32 34)" fill="#c69a5d" />
          <path d="M14 34c1-8 8-14 16-16" stroke="#e2c08d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="24" cy="36" r="2" fill="#8a6532" />
          <circle cx="37" cy="28" r="2" fill="#8a6532" />
          <circle cx="42" cy="39" r="2" fill="#8a6532" />
          <circle cx="31" cy="44" r="1.5" fill="#8a6532" />
        </>
      );
    default:
      return <circle cx="32" cy="32" r="20" fill="#9aa5b1" />;
  }
}

export default function ItemIcon({ slug, size = 24, className }: ItemIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      {shape(slug)}
    </svg>
  );
}
