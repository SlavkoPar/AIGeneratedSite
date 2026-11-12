interface ProduceIconProps {
  id: string;
  size?: number;
  className?: string;
}

function renderShape(id: string) {
  switch (id) {
    case 'apple':
      return (
        <>
          <path d='M32 20c-6-5-18-3-18 11 0 12 8 23 14 23 2 0 3-1 4-1s2 1 4 1c6 0 14-11 14-23 0-14-12-16-18-11z' fill='#e23d3d' />
          <path d='M32 20c0-5 2-9 5-11' stroke='#6b4226' strokeWidth='2.5' fill='none' strokeLinecap='round' />
          <path d='M36 13c4-5 10-5 13-3-2 5-8 7-13 3z' fill='#4caf50' />
          <path d='M20 30c0-4 2-6 5-7' stroke='#ffffff' strokeOpacity='0.6' strokeWidth='2.5' fill='none' strokeLinecap='round' />
        </>
      );
    case 'pear':
      return (
        <>
          <path d='M32 16c-6 0-8 6-9 12-1 5-7 8-7 16 0 8 7 12 16 12s16-4 16-12c0-8-6-11-7-16-1-6-3-12-9-12z' fill='#c5d43a' />
          <path d='M32 16c0-4 1-6 3-8' stroke='#6b4226' strokeWidth='2.5' fill='none' strokeLinecap='round' />
          <path d='M35 11c4-4 9-3 12-1-3 4-8 5-12 1z' fill='#4caf50' />
          <path d='M22 42c0-4 2-7 4-9' stroke='#ffffff' strokeOpacity='0.6' strokeWidth='2.5' fill='none' strokeLinecap='round' />
        </>
      );
    case 'banana':
      return (
        <>
          <path d='M12 22c2 18 16 30 36 28 4 0 6-3 4-5-14 0-28-8-34-24-1-3-6-2-6 1z' fill='#f7d038' />
          <path d='M12 22l-1-6 4-1 2 5z' fill='#7a5a2b' />
          <path d='M16 26c5 13 16 21 30 22' stroke='#d9a400' strokeWidth='2' fill='none' strokeLinecap='round' />
          <circle cx='51' cy='47' r='2' fill='#7a5a2b' />
        </>
      );
    case 'carrots':
      return (
        <>
          <path d='M40 22c0-6 2-10 6-13 1 4 0 8-2 11 4-3 8-4 12-2-3 4-8 6-13 6z' fill='#4caf50' />
          <path d='M40 22c4 4 3 9-1 13L16 56c-3 2-6-1-4-4l15-27c3-5 9-7 13-3z' fill='#f28c28' />
          <path d='M30 28l4 4M25 36l4 4M20 45l3 3' stroke='#c96a10' strokeWidth='2' strokeLinecap='round' />
        </>
      );
    case 'onions':
      return (
        <>
          <path d='M32 18c-1-4-1-7 0-10M32 18c1-4 3-6 5-8' stroke='#6a9a3b' strokeWidth='2.5' fill='none' strokeLinecap='round' />
          <path d='M32 18c-4 6-18 10-18 23 0 9 8 15 18 15s18-6 18-15c0-13-14-17-18-23z' fill='#b565a7' />
          <path d='M32 24c-5 8-8 14-6 28M32 24c5 8 8 14 6 28' stroke='#8e4585' strokeWidth='2' fill='none' strokeLinecap='round' />
          <path d='M28 56v3M32 56v4M36 56v3' stroke='#8a7a5a' strokeWidth='1.5' strokeLinecap='round' />
        </>
      );
    case 'garlic':
      return (
        <>
          <path d='M32 10c-1 8-4 12-10 17-5 4-8 9-8 15 0 9 8 14 18 14s18-5 18-14c0-6-3-11-8-15-6-5-9-9-10-17z' fill='#f3ead8' stroke='#c9b99a' strokeWidth='2' strokeLinejoin='round' />
          <path d='M32 22c-5 10-6 22-3 33M32 22c5 10 6 22 3 33' stroke='#c9b99a' strokeWidth='2' fill='none' strokeLinecap='round' />
          <path d='M28 57v3M32 57v4M36 57v3' stroke='#a8926a' strokeWidth='1.5' strokeLinecap='round' />
        </>
      );
    case 'cabbage':
      return (
        <>
          <circle cx='32' cy='34' r='24' fill='#7cb342' />
          <circle cx='32' cy='34' r='15' fill='#9ccc65' />
          <path d='M32 12v44M32 30c-6-6-12-8-18-8M32 30c6-6 12-8 18-8M32 44c-5-4-11-5-16-4M32 44c5-4 11-5 16-4' stroke='#558b2f' strokeWidth='2' fill='none' strokeLinecap='round' />
        </>
      );
    case 'potatoes':
      return (
        <>
          <ellipse cx='32' cy='34' rx='23' ry='17' fill='#c49a6c' transform='rotate(-15 32 34)' />
          <circle cx='22' cy='34' r='2' fill='#8d6e4a' />
          <circle cx='34' cy='27' r='1.8' fill='#8d6e4a' />
          <circle cx='41' cy='37' r='2' fill='#8d6e4a' />
          <circle cx='30' cy='42' r='1.5' fill='#8d6e4a' />
          <path d='M18 28c3-4 7-6 11-7' stroke='#ffffff' strokeOpacity='0.45' strokeWidth='2.5' fill='none' strokeLinecap='round' />
        </>
      );
    default:
      return <circle cx='32' cy='32' r='20' fill='#9e9e9e' />;
  }
}

export default function ProduceIcon({ id, size = 24, className }: ProduceIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox='0 0 64 64'
      aria-hidden='true'
      focusable='false'
    >
      {renderShape(id)}
    </svg>
  );
}
