import type { ReactNode } from 'react';
import type { ItemId } from './data';

interface ItemIconProps {
  id: ItemId;
  size?: number;
  title?: string;
}

function shapes(id: ItemId): ReactNode {
  switch (id) {
    case 'apple':
      return (
        <>
          <path d='M32 20c-6-5-20-3-20 13 0 12 8 23 14 23 3 0 4-1.500 6-1.500s3 1.500 6 1.500c6 0 14-11 14-23 0-16-14-18-20-13z' fill='#e5484d' />
          <path d='M19 31c1-4 4-7 8-7' stroke='#ffffff' strokeOpacity='0.55' strokeWidth='3' strokeLinecap='round' fill='none' />
          <path d='M32 20c0-5 2-9 5-11' stroke='#7a4a21' strokeWidth='3' strokeLinecap='round' fill='none' />
          <path d='M36 13c4-5 10-5 13-3-2 5-8 7-13 3z' fill='#4caf50' />
        </>
      );
    case 'pear':
      return (
        <>
          <path d='M32 14c-6 0-8 6-9 12-1 5-9 9-9 18 0 9 8 14 18 14s18-5 18-14c0-9-8-13-9-18-1-6-3-12-9-12z' fill='#c5d93b' />
          <path d='M21 42c0-4 2-7 5-9' stroke='#ffffff' strokeOpacity='0.55' strokeWidth='3' strokeLinecap='round' fill='none' />
          <path d='M32 14c0-4 1-6 4-8' stroke='#7a4a21' strokeWidth='3' strokeLinecap='round' fill='none' />
          <path d='M35 9c4-4 9-3 12-1-3 4-8 5-12 1z' fill='#4caf50' />
        </>
      );
    case 'banana':
      return (
        <>
          <path d='M10 18c0 22 18 36 42 32l2-6c-18 2-32-8-38-28z' fill='#f7d038' />
          <path d='M14 30c5 11 15 17 28 18' stroke='#d9a91a' strokeWidth='2' strokeLinecap='round' fill='none' />
          <path d='M9 18l8-2-1-5-7 2z' fill='#7a5a21' />
          <circle cx='53' cy='47' r='3' fill='#7a5a21' />
        </>
      );
    case 'carrots':
      return (
        <>
          <path d='M40 22c0-8 3-13 8-16 1 5 0 10-4 14 5-3 10-3 14 0-4 4-10 5-16 4z' fill='#4caf50' />
          <path d='M40 20c5 5 4 10 0 14L16 56c-3 2-8-2-6-6l20-26c3-4 6-7 10-4z' fill='#f58a1f' />
          <path d='M30 30l4 4M24 38l4 4M18 46l3 3' stroke='#c96a10' strokeWidth='2.500' strokeLinecap='round' fill='none' />
        </>
      );
    case 'onions':
      return (
        <>
          <path d='M32 16c-1-4 0-8 2-10' stroke='#8a9a3a' strokeWidth='3' strokeLinecap='round' fill='none' />
          <path d='M32 14c-3 6-18 12-18 26 0 10 8 16 18 16s18-6 18-16c0-14-15-20-18-26z' fill='#b565a7' />
          <path d='M32 20c-5 8-8 16-8 22s3 11 8 14M32 20c5 8 8 16 8 22s-3 11-8 14' stroke='#8e4585' strokeWidth='2' strokeLinecap='round' fill='none' />
          <path d='M28 56l-2 4M32 56v5M36 56l2 4' stroke='#a08060' strokeWidth='2' strokeLinecap='round' fill='none' />
        </>
      );
    case 'garlic':
      return (
        <>
          <path d='M32 8c-1 6-2 9-4 12h8c-2-3-3-6-4-12z' fill='#d9ccb0' />
          <path d='M32 16c-4 6-20 10-20 26 0 9 9 14 20 14s20-5 20-14c0-16-16-20-20-26z' fill='#f3ead7' stroke='#c9b99a' strokeWidth='2' />
          <path d='M32 20c-6 8-9 16-9 22s3 10 9 13M32 20c6 8 9 16 9 22s-3 10-9 13' stroke='#c9b99a' strokeWidth='2' strokeLinecap='round' fill='none' />
          <path d='M29 56l-1 4M35 56l1 4' stroke='#a08060' strokeWidth='2' strokeLinecap='round' fill='none' />
        </>
      );
    case 'cabbage':
      return (
        <>
          <circle cx='32' cy='33' r='25' fill='#5fae52' />
          <path d='M10 30c4-12 14-18 22-18s18 6 22 18c-6-6-14-8-22-8s-16 2-22 8z' fill='#7cc36a' />
          <circle cx='32' cy='36' r='16' fill='#a5d98f' />
          <path d='M32 22v32M32 36c-5-5-9-6-13-6M32 36c5-5 9-6 13-6M32 46c-4-3-7-4-10-4M32 46c4-3 7-4 10-4' stroke='#4e9a45' strokeWidth='2' strokeLinecap='round' fill='none' />
        </>
      );
    case 'potatoes':
      return (
        <>
          <path d='M12 32c2-13 15-20 28-16 11 3 17 13 13 24-4 11-19 17-30 13-8-3-13-11-11-21z' fill='#c79a5b' />
          <path d='M20 28c2-4 6-7 11-8' stroke='#ffffff' strokeOpacity='0.4' strokeWidth='3' strokeLinecap='round' fill='none' />
          <circle cx='26' cy='38' r='2' fill='#8d6a3a' />
          <circle cx='38' cy='30' r='2' fill='#8d6a3a' />
          <circle cx='42' cy='42' r='2' fill='#8d6a3a' />
          <circle cx='31' cy='47' r='1.500' fill='#8d6a3a' />
        </>
      );
    default:
      return null;
  }
}

export function ItemIcon({ id, size = 24, title }: ItemIconProps) {
  const labelled = Boolean(title);
  return (
    <svg
      className='item-icon'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 64 64'
      width={size}
      height={size}
      role={labelled ? 'img' : undefined}
      aria-label={labelled ? title : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable='false'
    >
      {shapes(id)}
    </svg>
  );
}

export function ChevronIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      className='chevron'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width={size}
      height={size}
      fill='none'
      stroke='currentColor'
      strokeWidth='2.500'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      focusable='false'
    >
      <path d='M9 6l6 6-6 6' />
    </svg>
  );
}

export function CartIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      className='cart-icon'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width={size}
      height={size}
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      focusable='false'
    >
      <path d='M3 4h2.500l2.300 10.500h10.200l2-7.500H6.600' />
      <circle cx='9.500' cy='19' r='1.400' />
      <circle cx='17' cy='19' r='1.400' />
    </svg>
  );
}

export function TrashIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width={size}
      height={size}
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      focusable='false'
    >
      <path d='M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3' />
    </svg>
  );
}
