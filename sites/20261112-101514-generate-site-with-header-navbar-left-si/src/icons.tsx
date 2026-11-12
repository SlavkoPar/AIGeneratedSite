import type { ReactNode } from 'react';

interface ItemIconProps {
  id: string;
  size?: number;
  title?: string;
}

const shapes: Record<string, ReactNode> = {
  apple: (
    <>
      <path d='M24 15c-4-3-12-2-14 6-2 8 3 19 9 20 2 .3 3-1 5-1s3 1.3 5 1c6-1 11-12 9-20-2-8-10-9-14-6z' fill='#e5484d' />
      <path d='M24 15c0-4 1-7 4-9' stroke='#6b4226' strokeWidth='2' strokeLinecap='round' fill='none' />
      <path d='M27 10c3-4 8-4 10-3-1 4-5 6-10 3z' fill='#4caf50' />
      <path d='M15 21c1-2 3-3 5-3' stroke='#ffd0d2' strokeWidth='2' strokeLinecap='round' fill='none' />
    </>
  ),
  pear: (
    <>
      <path d='M24 12c-4 0-6 3-6 8 0 4-7 6-7 14 0 6 6 9 13 9s13-3 13-9c0-8-7-10-7-14 0-5-2-8-6-8z' fill='#c5d63d' />
      <path d='M24 12c0-3 1-5 3-7' stroke='#6b4226' strokeWidth='2' strokeLinecap='round' fill='none' />
      <path d='M26 8c3-3 7-3 9-2-1 3-5 5-9 2z' fill='#4caf50' />
      <path d='M16 33c0-3 1-5 3-7' stroke='#eef5a8' strokeWidth='2' strokeLinecap='round' fill='none' />
    </>
  ),
  banana: (
    <>
      <path d='M8 14c2 14 12 24 30 22 3-.4 4-3 2-4-12 0-22-6-27-19-.8-2-5-2-5 1z' fill='#f7d038' />
      <path d='M8 14l-1-5 4-1 2 5z' fill='#6b4226' />
      <path d='M12 20c4 9 12 14 24 14' stroke='#d9a900' strokeWidth='1.5' strokeLinecap='round' fill='none' />
    </>
  ),
  carrots: (
    <>
      <path d='M27 19c-1-6 1-11 4-14 2 4 1 9-1 13M30 20c3-5 8-7 12-6-1 4-5 7-10 8' fill='#4caf50' />
      <path d='M20 18c6-4 12 0 12 6-2 8-12 16-20 20-2 1-3 0-2-2 3-8 6-18 10-24z' fill='#f5862e' />
      <path d='M21 24l4 3M17 31l4 3M14 37l3 2' stroke='#c96412' strokeWidth='1.5' strokeLinecap='round' fill='none' />
    </>
  ),
  onions: (
    <>
      <path d='M24 10c-1-3 0-5 1-6' stroke='#4caf50' strokeWidth='2.5' strokeLinecap='round' fill='none' />
      <path d='M24 10c2 5 14 8 14 19 0 8-6 13-14 13s-14-5-14-13c0-11 12-14 14-19z' fill='#a855a0' />
      <path d='M24 14c-5 6-7 14-5 26M24 14c5 6 7 14 5 26' stroke='#d9a3d4' strokeWidth='1.5' strokeLinecap='round' fill='none' />
      <path d='M22 42v3M26 42v3' stroke='#8a6d4b' strokeWidth='1.5' strokeLinecap='round' />
    </>
  ),
  garlic: (
    <>
      <path d='M24 6c1 6 2 9 8 14 5 4 6 10 3 16-2 4-6 6-11 6s-9-2-11-6c-3-6-2-12 3-16 6-5 7-8 8-14z' fill='#f3ecdf' stroke='#b9a98c' strokeWidth='1.5' strokeLinejoin='round' />
      <path d='M24 14c-3 8-4 18-2 27M24 14c3 8 4 18 2 27' stroke='#b9a98c' strokeWidth='1.5' strokeLinecap='round' fill='none' />
    </>
  ),
  cabbage: (
    <>
      <circle cx='24' cy='25' r='18' fill='#5aa84a' />
      <path d='M24 8c9 2 14 9 14 17s-5 15-14 17c-9-2-14-9-14-17S15 10 24 8z' fill='#7cc36a' />
      <path d='M24 14c5 2 8 6 8 11s-3 9-8 11c-5-2-8-6-8-11s3-9 8-11z' fill='#a5dd92' />
      <path d='M24 14v22M24 22l5-3M24 27l-5-3' stroke='#5aa84a' strokeWidth='1.5' strokeLinecap='round' fill='none' />
    </>
  ),
  potatoes: (
    <>
      <ellipse cx='24' cy='26' rx='17' ry='12' transform='rotate(-15 24 26)' fill='#c69a5d' />
      <circle cx='17' cy='25' r='1.5' fill='#8f6a3a' />
      <circle cx='27' cy='21' r='1.5' fill='#8f6a3a' />
      <circle cx='30' cy='29' r='1.5' fill='#8f6a3a' />
      <circle cx='21' cy='32' r='1.2' fill='#8f6a3a' />
      <path d='M13 22c2-3 5-5 9-6' stroke='#e2c08e' strokeWidth='2' strokeLinecap='round' fill='none' />
    </>
  ),
};

export function ItemIcon({ id, size = 24, title }: ItemIconProps) {
  const a11y = title
    ? { role: 'img' as const, 'aria-label': title }
    : { 'aria-hidden': true as const, focusable: false as const };
  return (
    <svg className='item-icon' width={size} height={size} viewBox='0 0 48 48' {...a11y}>
      {shapes[id] ?? <circle cx='24' cy='24' r='16' fill='#9aa5a0' />}
    </svg>
  );
}

export function ChevronIcon() {
  return (
    <svg className='chevron' width='16' height='16' viewBox='0 0 16 16' aria-hidden='true' focusable='false'>
      <path d='M4 6l4 4 4-4' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' fill='none' />
    </svg>
  );
}

export function LogoIcon() {
  return (
    <svg width='34' height='34' viewBox='0 0 48 48' aria-hidden='true' focusable='false'>
      <rect width='48' height='48' rx='10' fill='#ffffff' fillOpacity='0.16' />
      <path d='M12 34c0-14 10-22 24-22 0 14-8 24-22 24z' fill='#d8f3c4' />
      <path d='M12 38c4-10 10-16 18-20' stroke='#2f7d4f' strokeWidth='2.5' strokeLinecap='round' fill='none' />
    </svg>
  );
}
