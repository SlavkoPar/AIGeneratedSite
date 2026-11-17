window.SHOP = {
  groups: [
    {
      id: 'fruit',
      name: 'Fruit',
      items: [
        { id: 'apple', name: 'Apple', price: 2.49, unit: 'kg', origin: 'Poland', calories: 52, season: 'Autumn', color: 'Red, green or yellow', description: 'Crisp and juicy, great fresh, baked or pressed into juice.',
          icon: `<svg viewBox='0 0 64 64' aria-hidden='true'><path d='M32 20c-6-5-20-4-20 12 0 14 9 25 16 25 3 0 3-1 4-1s1 1 4 1c7 0 16-11 16-25 0-16-14-17-20-12z' fill='#d93a3a'/><path d='M32 20c0-6 2-11 6-13' stroke='#6b4423' stroke-width='3' fill='none' stroke-linecap='round'/><path d='M36 14c4-5 11-5 14-3-2 5-8 7-14 3z' fill='#4caf50'/></svg>` },
        { id: 'pear', name: 'Pear', price: 3.1, unit: 'kg', origin: 'Italy', calories: 57, season: 'Late summer', color: 'Green to yellow', description: 'Sweet, soft and fragrant with a smooth, grainy-fine flesh.',
          icon: `<svg viewBox='0 0 64 64' aria-hidden='true'><path d='M32 14c-6 0-8 7-9 12-1 4-9 8-9 19 0 9 8 15 18 15s18-6 18-15c0-11-8-15-9-19-1-5-3-12-9-12z' fill='#a8c63a'/><path d='M32 14c0-4 1-8 4-10' stroke='#6b4423' stroke-width='3' fill='none' stroke-linecap='round'/><path d='M36 8c4-3 10-2 12 0-3 4-9 4-12 0z' fill='#3f9b45'/></svg>` },
        { id: 'banana', name: 'Banana', price: 1.89, unit: 'kg', origin: 'Ecuador', calories: 89, season: 'All year', color: 'Yellow', description: 'Energy-rich tropical fruit, perfect for snacks and smoothies.',
          icon: `<svg viewBox='0 0 64 64' aria-hidden='true'><path d='M10 16c2 22 14 38 40 36 5 0 6-5 2-6-18-2-26-12-28-28-1-4-14-6-14-2z' fill='#f6d33c' stroke='#c9a517' stroke-width='2' stroke-linejoin='round'/><path d='M10 16c-1-4 2-7 5-8l3 7z' fill='#6b4423'/></svg>` }
      ]
    },
    {
      id: 'vegetables',
      name: 'Vegetables',
      items: [
        { id: 'carrots', name: 'Carrots', price: 1.2, unit: 'kg', origin: 'Netherlands', calories: 41, season: 'Autumn', color: 'Orange', description: 'Crunchy and sweet root vegetable rich in beta-carotene.',
          icon: `<svg viewBox='0 0 64 64' aria-hidden='true'><path d='M24 22c6-4 14-2 18 4 2 3 0 7-3 11L14 58c-3 2-7-2-5-5l11-26c1-2 2-4 4-5z' fill='#f08a1c'/><path d='M22 34l6 2M18 44l6 2M30 26l5 2' stroke='#c26a0c' stroke-width='2' stroke-linecap='round'/><path d='M40 24c0-8 3-14 8-16M42 24c4-5 10-8 15-7M43 27c6-1 10 1 13 5' stroke='#3f9b45' stroke-width='4' fill='none' stroke-linecap='round'/></svg>` },
        { id: 'onions', name: 'Onions', price: 0.99, unit: 'kg', origin: 'Spain', calories: 40, season: 'All year', color: 'Yellow-brown', description: 'A kitchen staple with a strong aroma that turns sweet when cooked.',
          icon: `<svg viewBox='0 0 64 64' aria-hidden='true'><path d='M32 8c2 8 3 10 6 13 10 3 16 11 16 21 0 10-9 16-22 16S10 52 10 42c0-10 6-18 16-21 3-3 4-5 6-13z' fill='#d9a04a'/><path d='M32 22c-7 6-10 16-8 36M32 22c7 6 10 16 8 36' stroke='#a8742a' stroke-width='2' fill='none'/></svg>` },
        { id: 'garlic', name: 'Garlic', price: 8.9, unit: 'kg', origin: 'Spain', calories: 149, season: 'Summer', color: 'White', description: 'Pungent bulbs made of cloves; adds depth to almost any savoury dish.',
          icon: `<svg viewBox='0 0 64 64' aria-hidden='true'><path d='M32 6c2 6 3 9 6 12 10 3 16 12 16 22 0 10-9 16-22 16S10 50 10 40c0-10 6-19 16-22 3-3 4-6 6-12z' fill='#f4efe6' stroke='#b9ae9a' stroke-width='2'/><path d='M32 18c-8 8-9 30-4 38M32 18c8 8 9 30 4 38' stroke='#b9ae9a' stroke-width='2' fill='none'/><path d='M26 58h12' stroke='#b9ae9a' stroke-width='3' stroke-linecap='round'/></svg>` },
        { id: 'cabbage', name: 'Cabbage', price: 1.5, unit: 'piece', origin: 'Germany', calories: 25, season: 'Autumn', color: 'Green', description: 'Dense leafy head, delicious raw in salads or cooked in stews.',
          icon: `<svg viewBox='0 0 64 64' aria-hidden='true'><circle cx='32' cy='34' r='24' fill='#7fbf5a'/><path d='M32 10c-10 10-10 38 0 48M32 10c10 10 10 38 0 48M10 30c14 6 30 6 44 0M12 42c13 5 27 5 40 0' stroke='#4f9a3a' stroke-width='2.5' fill='none' stroke-linecap='round'/></svg>` },
        { id: 'potatoes', name: 'Potatoes', price: 0.89, unit: 'kg', origin: 'Poland', calories: 77, season: 'All year', color: 'Brown skin, pale flesh', description: 'Versatile tuber: boil, bake, mash or fry.',
          icon: `<svg viewBox='0 0 64 64' aria-hidden='true'><path d='M12 30c2-12 16-20 30-17 12 3 14 14 10 26-4 12-18 18-30 14-9-3-12-12-10-23z' fill='#c79a5b'/><g fill='#8a6330'><circle cx='24' cy='28' r='2'/><circle cx='38' cy='24' r='2'/><circle cx='34' cy='40' r='2'/><circle cx='22' cy='42' r='2'/><circle cx='44' cy='36' r='2'/></g></svg>` }
      ]
    }
  ]
};
