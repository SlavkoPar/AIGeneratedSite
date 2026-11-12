export type ItemId =
  | 'apple'
  | 'pear'
  | 'banana'
  | 'carrots'
  | 'onions'
  | 'garlic'
  | 'cabbage'
  | 'potatoes';

export interface Item {
  id: ItemId;
  name: string;
  tagline: string;
  description: string;
  price: number;
  unit: string;
  origin: string;
  season: string;
  calories: string;
  taste: string;
  storage: string;
  tint: string;
}

export interface Group {
  id: string;
  name: string;
  items: Item[];
}

export const groups: Group[] = [
  {
    id: 'fruit',
    name: 'Fruit',
    items: [
      {
        id: 'apple',
        name: 'Apple',
        tagline: 'Crisp, juicy and endlessly snackable.',
        description:
          'A classic red apple with firm flesh and a balanced sweet-tart flavour. Great eaten fresh, baked into pies or sliced into salads.',
        price: 2.49,
        unit: 'per kg',
        origin: 'Poland',
        season: 'September to November',
        calories: '52 kcal / 100 g',
        taste: 'Sweet with a light tartness',
        storage: 'Refrigerate, keeps up to 4 weeks',
        tint: '#fde5e4',
      },
      {
        id: 'pear',
        name: 'Pear',
        tagline: 'Soft, fragrant and honey-sweet.',
        description:
          'A buttery green pear that ripens from the inside out. Lovely with cheese, poached in spices or simply eaten over the sink.',
        price: 3.19,
        unit: 'per kg',
        origin: 'Italy',
        season: 'August to October',
        calories: '57 kcal / 100 g',
        taste: 'Mellow, floral and sweet',
        storage: 'Ripen at room temperature, then chill',
        tint: '#f1f6d3',
      },
      {
        id: 'banana',
        name: 'Banana',
        tagline: 'Natural energy in its own wrapper.',
        description:
          'A creamy yellow banana rich in potassium. Perfect for breakfast bowls, smoothies and banana bread once the skin gets freckled.',
        price: 1.29,
        unit: 'per kg',
        origin: 'Ecuador',
        season: 'All year round',
        calories: '89 kcal / 100 g',
        taste: 'Creamy and sweet',
        storage: 'Room temperature, away from other fruit',
        tint: '#fdf3c7',
      },
    ],
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    items: [
      {
        id: 'carrots',
        name: 'Carrots',
        tagline: 'Crunchy, bright and naturally sweet.',
        description:
          'Vivid orange carrots full of beta-carotene. Roast them with honey, grate them into slaw or enjoy them raw with a dip.',
        price: 0.99,
        unit: 'per kg',
        origin: 'Netherlands',
        season: 'June to November',
        calories: '41 kcal / 100 g',
        taste: 'Earthy and sweet',
        storage: 'Refrigerate, keeps 3 to 4 weeks',
        tint: '#fde8d2',
      },
      {
        id: 'onions',
        name: 'Onions',
        tagline: 'The start of almost every good meal.',
        description:
          'Red onions with a mild bite and a beautiful colour. Slice them raw for salads or cook them slowly until soft and caramelised.',
        price: 0.89,
        unit: 'per kg',
        origin: 'Spain',
        season: 'July to October',
        calories: '40 kcal / 100 g',
        taste: 'Sharp raw, sweet when cooked',
        storage: 'Cool, dark and dry place',
        tint: '#f3e1f0',
      },
      {
        id: 'garlic',
        name: 'Garlic',
        tagline: 'Small bulb, enormous flavour.',
        description:
          'Plump white garlic bulbs with tight cloves. Crush for a punchy kick or roast whole until mellow, soft and spreadable.',
        price: 5.9,
        unit: 'per kg',
        origin: 'France',
        season: 'June to August',
        calories: '149 kcal / 100 g',
        taste: 'Pungent and savoury',
        storage: 'Dry, airy place, keeps for months',
        tint: '#f4efe4',
      },
      {
        id: 'cabbage',
        name: 'Cabbage',
        tagline: 'Leafy, hearty and full of crunch.',
        description:
          'A dense green cabbage head with crisp leaves. Shred it for coleslaw, ferment it into sauerkraut or braise it with butter.',
        price: 1.15,
        unit: 'per head',
        origin: 'Germany',
        season: 'September to March',
        calories: '25 kcal / 100 g',
        taste: 'Fresh and slightly peppery',
        storage: 'Refrigerate, keeps up to 2 weeks',
        tint: '#e2f3dc',
      },
      {
        id: 'potatoes',
        name: 'Potatoes',
        tagline: 'Comfort food in its purest form.',
        description:
          'All-purpose potatoes with golden skin and fluffy flesh. Mash, roast, fry or boil them: they rarely disappoint.',
        price: 0.79,
        unit: 'per kg',
        origin: 'Ireland',
        season: 'All year round',
        calories: '77 kcal / 100 g',
        taste: 'Mild, earthy and starchy',
        storage: 'Cool, dark place, never in the fridge',
        tint: '#f3e7d5',
      },
    ],
  },
];

export const allItems: Item[] = groups.flatMap((g) => g.items);

export function findItem(id: string | undefined): { item: Item; group: Group } | undefined {
  for (const group of groups) {
    const item = group.items.find((i) => i.id === id);
    if (item) return { item, group };
  }
  return undefined;
}

export function formatPrice(price: number): string {
  return '$' + price.toFixed(2);
}
