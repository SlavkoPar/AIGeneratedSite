export interface Characteristic {
  label: string;
  value: string;
}

export interface ProduceItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  unit: string;
  color: string;
  characteristics: Characteristic[];
}

export interface ProduceGroup {
  id: string;
  name: string;
  items: ProduceItem[];
}

export const groups: ProduceGroup[] = [
  {
    id: 'fruit',
    name: 'Fruit',
    items: [
      {
        id: 'apple',
        name: 'Apple',
        tagline: 'Crisp, juicy and refreshingly sweet.',
        description:
          'A classic red apple with a firm bite and balanced sweetness. Great as a snack, in salads or baked into a pie.',
        price: 2.49,
        unit: 'kg',
        color: '#e23d3d',
        characteristics: [
          { label: 'Variety', value: 'Gala' },
          { label: 'Origin', value: 'Poland' },
          { label: 'Season', value: 'September - November' },
          { label: 'Taste', value: 'Sweet, mildly tart' },
          { label: 'Energy', value: '52 kcal / 100 g' },
          { label: 'Storage', value: 'Cool and dark, up to 4 weeks' },
        ],
      },
      {
        id: 'pear',
        name: 'Pear',
        tagline: 'Soft, buttery flesh with a honeyed aroma.',
        description:
          'A fragrant green-yellow pear that ripens at room temperature. Lovely with cheese, in desserts or simply on its own.',
        price: 3.19,
        unit: 'kg',
        color: '#a9b92a',
        characteristics: [
          { label: 'Variety', value: 'Conference' },
          { label: 'Origin', value: 'Belgium' },
          { label: 'Season', value: 'August - October' },
          { label: 'Taste', value: 'Sweet, floral' },
          { label: 'Energy', value: '57 kcal / 100 g' },
          { label: 'Storage', value: 'Ripen at room temperature, then chill' },
        ],
      },
      {
        id: 'banana',
        name: 'Banana',
        tagline: 'Naturally sweet energy in its own wrapper.',
        description:
          'Creamy and filling, the banana is a go-to snack for breakfast and sport. Overripe ones are perfect for baking.',
        price: 1.79,
        unit: 'kg',
        color: '#d9a400',
        characteristics: [
          { label: 'Variety', value: 'Cavendish' },
          { label: 'Origin', value: 'Ecuador' },
          { label: 'Season', value: 'All year' },
          { label: 'Taste', value: 'Sweet, creamy' },
          { label: 'Energy', value: '89 kcal / 100 g' },
          { label: 'Storage', value: 'Room temperature, 5 - 7 days' },
        ],
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
        tagline: 'Crunchy, bright and full of beta-carotene.',
        description:
          'Sweet orange roots that work raw, roasted, steamed or juiced. A kitchen staple for soups and stews.',
        price: 1.29,
        unit: 'kg',
        color: '#f28c28',
        characteristics: [
          { label: 'Variety', value: 'Nantes' },
          { label: 'Origin', value: 'Netherlands' },
          { label: 'Season', value: 'June - November' },
          { label: 'Taste', value: 'Sweet, earthy' },
          { label: 'Energy', value: '41 kcal / 100 g' },
          { label: 'Storage', value: 'Refrigerated, up to 3 weeks' },
        ],
      },
      {
        id: 'onions',
        name: 'Onions',
        tagline: 'The flavour base of countless dishes.',
        description:
          'Red onions with a mild bite and a touch of sweetness. Excellent raw in salads or slowly caramelised.',
        price: 0.99,
        unit: 'kg',
        color: '#a14f93',
        characteristics: [
          { label: 'Variety', value: 'Red Baron' },
          { label: 'Origin', value: 'Spain' },
          { label: 'Season', value: 'July - October' },
          { label: 'Taste', value: 'Pungent, slightly sweet' },
          { label: 'Energy', value: '40 kcal / 100 g' },
          { label: 'Storage', value: 'Dry and airy, up to 2 months' },
        ],
      },
      {
        id: 'garlic',
        name: 'Garlic',
        tagline: 'Small cloves, bold character.',
        description:
          'Aromatic bulbs that mellow and sweeten when roasted. A little goes a long way in sauces and marinades.',
        price: 6.49,
        unit: 'kg',
        color: '#a8926a',
        characteristics: [
          { label: 'Variety', value: 'Softneck white' },
          { label: 'Origin', value: 'Italy' },
          { label: 'Season', value: 'June - August' },
          { label: 'Taste', value: 'Sharp, aromatic' },
          { label: 'Energy', value: '149 kcal / 100 g' },
          { label: 'Storage', value: 'Dry and dark, up to 3 months' },
        ],
      },
      {
        id: 'cabbage',
        name: 'Cabbage',
        tagline: 'Leafy, crunchy and wonderfully versatile.',
        description:
          'A dense green head for slaws, stir-fries, soups and fermenting. Keeps well and stretches far.',
        price: 1.09,
        unit: 'kg',
        color: '#5d9a2e',
        characteristics: [
          { label: 'Variety', value: 'White cabbage' },
          { label: 'Origin', value: 'Germany' },
          { label: 'Season', value: 'August - December' },
          { label: 'Taste', value: 'Mild, slightly peppery' },
          { label: 'Energy', value: '25 kcal / 100 g' },
          { label: 'Storage', value: 'Refrigerated, up to 4 weeks' },
        ],
      },
      {
        id: 'potatoes',
        name: 'Potatoes',
        tagline: 'Comfort food in its most humble form.',
        description:
          'All-round potatoes that mash, roast and fry beautifully. Golden flesh with a naturally buttery flavour.',
        price: 0.89,
        unit: 'kg',
        color: '#a67c4e',
        characteristics: [
          { label: 'Variety', value: 'Yukon Gold' },
          { label: 'Origin', value: 'Ireland' },
          { label: 'Season', value: 'July - October' },
          { label: 'Taste', value: 'Buttery, earthy' },
          { label: 'Energy', value: '77 kcal / 100 g' },
          { label: 'Storage', value: 'Cool, dark and dry, up to 2 months' },
        ],
      },
    ],
  },
];

export const allItems: ProduceItem[] = groups.flatMap((g) => g.items);

export function findGroupOfItem(itemId: string): ProduceGroup | undefined {
  return groups.find((g) => g.items.some((i) => i.id === itemId));
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
