export type GroupName = 'Fruit' | 'Vegetables';

export interface Product {
  id: string;
  name: string;
  group: GroupName;
  tagline: string;
  description: string;
  price: number;
  unit: string;
  tint: string;
  characteristics: { label: string; value: string }[];
}

export const groups: GroupName[] = ['Fruit', 'Vegetables'];

export const products: Product[] = [
  {
    id: 'apple',
    name: 'Apple',
    group: 'Fruit',
    tagline: 'Crisp, juicy and refreshingly sweet.',
    description:
      'A classic red apple with firm flesh and a balanced sweet and tart flavour. Great for snacking, baking and salads.',
    price: 2.49,
    unit: 'kg',
    tint: '#fde8e8',
    characteristics: [
      { label: 'Colour', value: 'Red with a green blush' },
      { label: 'Taste', value: 'Sweet and slightly tart' },
      { label: 'Season', value: 'August to November' },
      { label: 'Origin', value: 'Poland' },
      { label: 'Energy', value: '52 kcal per 100 g' },
      { label: 'Storage', value: 'Cool place, up to 4 weeks' },
    ],
  },
  {
    id: 'pear',
    name: 'Pear',
    group: 'Fruit',
    tagline: 'Soft, buttery and delicately fragrant.',
    description:
      'A ripe green pear with tender, juicy flesh. Lovely on a cheese board, poached in syrup or eaten straight away.',
    price: 3.19,
    unit: 'kg',
    tint: '#f3f7d6',
    characteristics: [
      { label: 'Colour', value: 'Yellow green' },
      { label: 'Taste', value: 'Sweet and mellow' },
      { label: 'Season', value: 'September to January' },
      { label: 'Origin', value: 'Italy' },
      { label: 'Energy', value: '57 kcal per 100 g' },
      { label: 'Storage', value: 'Ripen at room temperature, then chill' },
    ],
  },
  {
    id: 'banana',
    name: 'Banana',
    group: 'Fruit',
    tagline: 'Creamy energy in its own wrapper.',
    description:
      'A naturally sweet banana that is rich in potassium. Perfect for breakfast, smoothies and banana bread.',
    price: 1.89,
    unit: 'kg',
    tint: '#fdf4cf',
    characteristics: [
      { label: 'Colour', value: 'Bright yellow' },
      { label: 'Taste', value: 'Sweet and creamy' },
      { label: 'Season', value: 'All year round' },
      { label: 'Origin', value: 'Ecuador' },
      { label: 'Energy', value: '89 kcal per 100 g' },
      { label: 'Storage', value: 'Room temperature, 3 to 5 days' },
    ],
  },
  {
    id: 'carrots',
    name: 'Carrots',
    group: 'Vegetables',
    tagline: 'Crunchy, sweet and full of colour.',
    description:
      'Bright orange carrots with a satisfying crunch. Eat them raw, roast them with honey or add them to soups.',
    price: 1.29,
    unit: 'kg',
    tint: '#fdebd9',
    characteristics: [
      { label: 'Colour', value: 'Deep orange' },
      { label: 'Taste', value: 'Sweet and earthy' },
      { label: 'Season', value: 'June to October' },
      { label: 'Origin', value: 'Netherlands' },
      { label: 'Energy', value: '41 kcal per 100 g' },
      { label: 'Storage', value: 'Refrigerate, up to 3 weeks' },
    ],
  },
  {
    id: 'onions',
    name: 'Onions',
    group: 'Vegetables',
    tagline: 'The flavourful start of every good dish.',
    description:
      'Red onions with a mild bite and a touch of sweetness. Ideal for salads, pickles, sauces and slow caramelising.',
    price: 0.99,
    unit: 'kg',
    tint: '#f5e3f3',
    characteristics: [
      { label: 'Colour', value: 'Purple red' },
      { label: 'Taste', value: 'Sharp, sweet when cooked' },
      { label: 'Season', value: 'July to September' },
      { label: 'Origin', value: 'Spain' },
      { label: 'Energy', value: '40 kcal per 100 g' },
      { label: 'Storage', value: 'Dry and dark, up to 2 months' },
    ],
  },
  {
    id: 'garlic',
    name: 'Garlic',
    group: 'Vegetables',
    tagline: 'Small bulb, big character.',
    description:
      'Aromatic garlic bulbs with plump cloves. A little goes a long way in marinades, roasts and pasta sauces.',
    price: 0.69,
    unit: 'bulb',
    tint: '#f4efe4',
    characteristics: [
      { label: 'Colour', value: 'Ivory white' },
      { label: 'Taste', value: 'Pungent and savoury' },
      { label: 'Season', value: 'June to August' },
      { label: 'Origin', value: 'France' },
      { label: 'Energy', value: '149 kcal per 100 g' },
      { label: 'Storage', value: 'Dry and airy, up to 3 months' },
    ],
  },
  {
    id: 'cabbage',
    name: 'Cabbage',
    group: 'Vegetables',
    tagline: 'Leafy, crisp and wonderfully versatile.',
    description:
      'A dense green cabbage with crisp leaves. Shred it for slaw, braise it slowly or ferment it into sauerkraut.',
    price: 1.59,
    unit: 'head',
    tint: '#e3f3dd',
    characteristics: [
      { label: 'Colour', value: 'Fresh green' },
      { label: 'Taste', value: 'Mild and slightly peppery' },
      { label: 'Season', value: 'September to March' },
      { label: 'Origin', value: 'Germany' },
      { label: 'Energy', value: '25 kcal per 100 g' },
      { label: 'Storage', value: 'Refrigerate, up to 2 weeks' },
    ],
  },
  {
    id: 'potatoes',
    name: 'Potatoes',
    group: 'Vegetables',
    tagline: 'Comfort food in its purest form.',
    description:
      'All purpose potatoes with a fluffy texture. Mash them, roast them, fry them or bake them whole.',
    price: 0.89,
    unit: 'kg',
    tint: '#f3e8d8',
    characteristics: [
      { label: 'Colour', value: 'Golden brown skin' },
      { label: 'Taste', value: 'Mild and earthy' },
      { label: 'Season', value: 'July to October' },
      { label: 'Origin', value: 'Ireland' },
      { label: 'Energy', value: '77 kcal per 100 g' },
      { label: 'Storage', value: 'Cool and dark, up to 2 months' },
    ],
  },
];

export function formatPrice(p: Product): string {
  return `$${p.price.toFixed(2)}`;
}
