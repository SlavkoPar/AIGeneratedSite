export interface Characteristic {
  label: string;
  value: string;
}

export interface Item {
  slug: string;
  name: string;
  price: number;
  unit: string;
  tagline: string;
  description: string;
  characteristics: Characteristic[];
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
        slug: 'apple',
        name: 'Apple',
        price: 2.49,
        unit: 'per kg',
        tagline: 'Crisp, juicy and sweet with a hint of tartness.',
        description:
          'A classic all-rounder: great for snacking, baking into pies or slicing into salads. Keeps well in a cool place.',
        characteristics: [
          { label: 'Colour', value: 'Red' },
          { label: 'Taste', value: 'Sweet, slightly tart' },
          { label: 'Texture', value: 'Crisp' },
          { label: 'Season', value: 'Autumn' },
          { label: 'Energy', value: '52 kcal / 100 g' },
          { label: 'Origin', value: 'Poland' },
          { label: 'Storage', value: 'Up to 4 weeks, refrigerated' },
        ],
      },
      {
        slug: 'pear',
        name: 'Pear',
        price: 3.19,
        unit: 'per kg',
        tagline: 'Soft, fragrant and honey-sweet when ripe.',
        description:
          'Buttery flesh with a delicate aroma. Lovely fresh, poached, or paired with cheese and nuts.',
        characteristics: [
          { label: 'Colour', value: 'Yellow-green' },
          { label: 'Taste', value: 'Sweet, floral' },
          { label: 'Texture', value: 'Soft, juicy' },
          { label: 'Season', value: 'Late summer to autumn' },
          { label: 'Energy', value: '57 kcal / 100 g' },
          { label: 'Origin', value: 'Italy' },
          { label: 'Storage', value: '3-5 days at room temperature' },
        ],
      },
      {
        slug: 'banana',
        name: 'Banana',
        price: 1.79,
        unit: 'per kg',
        tagline: 'Creamy, naturally sweet energy in its own wrapper.',
        description:
          'A handy snack rich in potassium. Perfect in smoothies, on porridge, or baked into banana bread once overripe.',
        characteristics: [
          { label: 'Colour', value: 'Yellow' },
          { label: 'Taste', value: 'Sweet, mild' },
          { label: 'Texture', value: 'Creamy' },
          { label: 'Season', value: 'All year' },
          { label: 'Energy', value: '89 kcal / 100 g' },
          { label: 'Origin', value: 'Ecuador' },
          { label: 'Storage', value: '2-7 days at room temperature' },
        ],
      },
    ],
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    items: [
      {
        slug: 'carrots',
        name: 'Carrots',
        price: 1.29,
        unit: 'per kg',
        tagline: 'Crunchy, sweet roots packed with beta-carotene.',
        description:
          'Equally good raw, roasted or simmered in soups and stews. A kitchen staple with a naturally sweet flavour.',
        characteristics: [
          { label: 'Colour', value: 'Orange' },
          { label: 'Taste', value: 'Sweet, earthy' },
          { label: 'Texture', value: 'Crunchy' },
          { label: 'Season', value: 'Summer to winter' },
          { label: 'Energy', value: '41 kcal / 100 g' },
          { label: 'Origin', value: 'Netherlands' },
          { label: 'Storage', value: '3-4 weeks, refrigerated' },
        ],
      },
      {
        slug: 'onions',
        name: 'Onions',
        price: 0.99,
        unit: 'per kg',
        tagline: 'The savoury base of countless dishes.',
        description:
          'Sharp when raw and mellow and sweet when cooked. Caramelise slowly for the best depth of flavour.',
        characteristics: [
          { label: 'Colour', value: 'Red-purple' },
          { label: 'Taste', value: 'Pungent, sweet when cooked' },
          { label: 'Texture', value: 'Firm, layered' },
          { label: 'Season', value: 'All year' },
          { label: 'Energy', value: '40 kcal / 100 g' },
          { label: 'Origin', value: 'Spain' },
          { label: 'Storage', value: '1-2 months, cool and dry' },
        ],
      },
      {
        slug: 'garlic',
        name: 'Garlic',
        price: 0.69,
        unit: 'per bulb',
        tagline: 'Small bulb, big aromatic punch.',
        description:
          'Adds warmth and depth to sauces, roasts and marinades. Roast whole for a soft, sweet and spreadable treat.',
        characteristics: [
          { label: 'Colour', value: 'White' },
          { label: 'Taste', value: 'Pungent, spicy' },
          { label: 'Texture', value: 'Firm cloves' },
          { label: 'Season', value: 'Summer' },
          { label: 'Energy', value: '149 kcal / 100 g' },
          { label: 'Origin', value: 'France' },
          { label: 'Storage', value: 'Up to 3 months, cool and dry' },
        ],
      },
      {
        slug: 'cabbage',
        name: 'Cabbage',
        price: 1.49,
        unit: 'per head',
        tagline: 'Leafy, crunchy and wonderfully versatile.',
        description:
          'Shred it for slaw, ferment it into sauerkraut, or braise it gently. Rich in vitamin C and fibre.',
        characteristics: [
          { label: 'Colour', value: 'Green' },
          { label: 'Taste', value: 'Mild, slightly peppery' },
          { label: 'Texture', value: 'Crunchy leaves' },
          { label: 'Season', value: 'Autumn to spring' },
          { label: 'Energy', value: '25 kcal / 100 g' },
          { label: 'Origin', value: 'Germany' },
          { label: 'Storage', value: '2-3 weeks, refrigerated' },
        ],
      },
      {
        slug: 'potatoes',
        name: 'Potatoes',
        price: 0.89,
        unit: 'per kg',
        tagline: 'Hearty, comforting and endlessly adaptable.',
        description:
          'Boil, mash, roast or fry. These all-purpose potatoes hold their shape well and turn golden in the oven.',
        characteristics: [
          { label: 'Colour', value: 'Golden brown' },
          { label: 'Taste', value: 'Mild, earthy' },
          { label: 'Texture', value: 'Starchy, fluffy when cooked' },
          { label: 'Season', value: 'All year' },
          { label: 'Energy', value: '77 kcal / 100 g' },
          { label: 'Origin', value: 'Ireland' },
          { label: 'Storage', value: '1-2 months, dark and cool' },
        ],
      },
    ],
  },
];

export function findItem(slug: string | undefined): { item: Item; group: Group } | undefined {
  for (const group of groups) {
    const item = group.items.find((i) => i.slug === slug);
    if (item) return { item, group };
  }
  return undefined;
}

export function formatPrice(price: number): string {
  return '$' + price.toFixed(2);
}
