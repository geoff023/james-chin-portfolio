// Client work. Every brand here is fictional (plan §2: nothing implies a real endorsement).
export type Commission = {
  slug: string
  client: string
  year: string
  scope: string[]
  title: string
  brief: string
  did: string[]
  facts: [string, string][]
  tint: string
  image?: string // public/images/commissions/*.webp when the photos land (plan §9 F)
  page: string
}

export const commissions: Commission[] = [
  {
    slug: 'hawker-futures',
    client: 'Hawker Futures Festival',
    year: '2025',
    scope: ['Identity', 'Printed programme', 'Totes'],
    title: 'A night market, not a trade fair',
    brief:
      'A three-day food festival in a Penang car park wanted to stop looking like a trade fair. The stalls were already a night market. The branding just had to catch up.',
    did: [
      'Two-ink riso programme, red and blue, so every copy prints a little differently.',
      'Stall names hand-painted by a signwriter in Georgetown, then scanned for the whole identity.',
      'Totes printed with the festival map, which people kept using as a map.',
    ],
    facts: [['Programme', '64 pp, riso'], ['Printed', '8,000'], ['Stalls', '41'], ['Signwriter', '1, very patient']],
    tint: '#7FAEDB',
    page: '24',
  },
  {
    slug: 'toast-and-kettle',
    client: 'Toast & Kettle',
    year: '2024',
    scope: ['Menus', 'Cup sleeves', 'Signage'],
    title: 'Six cafés, one shorter menu',
    brief:
      'A café group in Kuala Lumpur with a menu that kept getting longer. They asked for a redesign. We mostly asked them to take things off it.',
    did: [
      'Menu cut from four pages to one, set big enough to read from the queue.',
      'Cup sleeves printed with the kopitiam order code, so regulars can order like their uncles.',
      'Signage in enamel and plywood, built to survive six years of steam.',
    ],
    facts: [['Outlets', '6'], ['Menu', '4 pages to 1'], ['Sleeves a year', '120,000'], ['Items removed', '23']],
    tint: '#F5CB4C',
    page: '27',
  },
]
