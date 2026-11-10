export type ItemType = 'fruit' | 'vegetable'

export interface Item {
  slug: string
  name: string
  emoji: string
  type: ItemType
  /** Accent colour used for cards and badges. */
  color: string
  season: string
  /** Approximate kcal per 100 g, raw. */
  calories: number
  nutrients: string[]
  description: string
  tip: string
  /** Optional botanical note, e.g. "Botanically a fruit". */
  note?: string
}
