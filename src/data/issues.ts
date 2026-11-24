import type { Drink } from './order'

export type Issue = {
  no: string
  slug: string
  title: string
  drink: string // as ordered, Malay/Hokkien/Cantonese
  drinkEn: string
  accent: string // page wash + cover tint
  featured: boolean // has a case study; the rest are sold out
  line: string // one line, shown on the shelf
  glass: Drink // what the 3D glass pours when this issue is picked
}

const g = (liquid: string, o: Partial<Drink> = {}): Drink => ({
  liquid,
  milk: null,
  foam: liquid,
  foamH: 0,
  ice: true,
  fill: 0.8,
  ...o,
})

// Newest first.
export const issues: Issue[] = [
  {
    no: '12', slug: 'pink-is-a-flavour', title: 'Pink Is a Flavour', drink: 'Bandung', drinkEn: 'rose syrup + milk',
    accent: '#F2A7B5', featured: true,
    line: 'Wedding drinks, Hari Raya tables, and why rose syrup is that colour.',
    glass: g('#EE9AAB', { foam: '#F8D3DA', foamH: 0.04 }),
  },
  {
    no: '11', slug: 'cham', title: 'Half and Half', drink: 'Cham', drinkEn: 'coffee + tea',
    accent: '#A87C5A', featured: false,
    line: 'Coffee and tea in one glass. Nobody agrees who did it first.',
    glass: g('#6E4630', { milk: '#E9D9BD', foam: '#C9A27E', foamH: 0.03 }),
  },
  {
    no: '10', slug: 'the-long-pull', title: 'The Long Pull', drink: 'Teh Tarik', drinkEn: 'pulled milk tea',
    accent: '#C98A4B', featured: true,
    line: 'Teh tarik as performance, with a fold-out poster of pull heights.',
    glass: g('#B9783F', { foam: '#F1DFC2', foamH: 0.1, ice: false, fill: 0.78 }),
  },
  {
    no: '09', slug: 'pressed', title: 'Pressed', drink: 'Air Tebu', drinkEn: 'sugarcane juice',
    accent: '#9CC36B', featured: true,
    line: 'The last hand-cranked presses in Penang. Three generations, one stall.',
    glass: g('#B9CF79', { foam: '#DCE7B0', foamH: 0.03 }),
  },
  {
    no: '08', slug: 'lychee-soda', title: 'Fizz', drink: 'Lychee Soda', drinkEn: 'lychee + soda',
    accent: '#EFC9CF', featured: false,
    line: 'Hawker-centre fizz. Peeled lychees sinking slowly.',
    glass: g('#F4E6E4', { foam: '#FFFFFF', foamH: 0.015 }),
  },
  {
    no: '07', slug: 'the-6am-shift', title: 'The 6am Shift', drink: 'Kopi O', drinkEn: 'black coffee, sweet',
    accent: '#8A5A3C', featured: true,
    line: 'A week with the uncles who open Ipoh’s kopitiams before dawn.',
    glass: g('#2E1B11', { foam: '#5B3A29', foamH: 0.015, ice: false, fill: 0.76 }),
  },
  {
    no: '06', slug: 'ice-kosong', title: 'An Issue About Nothing', drink: 'Ice Kosong', drinkEn: 'iced water',
    accent: '#BFD8E8', featured: false,
    line: 'Iced water, free at most stalls. 48 pages about it anyway.',
    glass: g('#DDEBF2'),
  },
  {
    no: '05', slug: 'chrysanthemum', title: 'Grandmother’s Kettle', drink: 'Kek Hwa', drinkEn: 'chrysanthemum tea',
    accent: '#E8C25A', featured: false,
    line: 'The yellow tea that cools you down, according to every grandmother.',
    glass: g('#E2B94E', { fill: 0.78 }),
  },
  {
    no: '04', slug: 'soya-bean', title: 'Morning Market', drink: 'Air Soya', drinkEn: 'soy milk',
    accent: '#E5D7B4', featured: false,
    line: 'Pasar pagi soy milk, poured into a plastic bag, tied with a straw.',
    glass: g('#EEE3C8', { foam: '#F7F0DE', foamH: 0.03 }),
  },
  {
    no: '03', slug: 'limau-asam-boi', title: 'The Plum at the Bottom', drink: 'Limau Asam Boi', drinkEn: 'lime + sour plum',
    accent: '#C6D46E', featured: false,
    line: 'Lime juice with a salted plum you save for last.',
    glass: g('#CFDA86', { milk: '#B3342A' }),
  },
  {
    no: '02', slug: 'barley-ais', title: 'Cloudy, Cold', drink: 'Barley Ais', drinkEn: 'iced barley water',
    accent: '#E3CF8F', featured: false,
    line: 'Cloudy, cold, a few grains at the bottom. The default lunch drink.',
    glass: g('#E8DAA8', { milk: '#D2BE84' }),
  },
  {
    no: '01', slug: 'milo-dinosaur', title: 'Extinct Is a Strong Word', drink: 'Milo Dinosaur', drinkEn: 'iced Milo, more Milo on top',
    accent: '#7A563A', featured: false,
    line: 'Iced Milo buried under a heap of Milo powder. Spoon required.',
    glass: g('#6B4A33', { foam: '#4A3020', foamH: 0.08 }),
  },
  {
    no: '00', slug: 'kopi-peng', title: 'Dad’s Shop', drink: 'Kopi Peng', drinkEn: 'iced coffee with milk',
    accent: '#9A6B4A', featured: false,
    line: 'Sixteen riso pages about one Ipoh kopitiam. 200 copies, left on tables.',
    glass: g('#7A5238', { milk: '#F3E6CC', foam: '#B08A68', foamH: 0.03 }),
  },
]

export const currentIssue = issues[0]

// home page sections, in reading order; drives the folio. `contents: false` = folio only.
export const sections = [
  { id: 'cover', title: 'Cover', page: '01', contents: true },
  { id: 'shelf', title: 'The Shelf', page: '08', contents: true },
  { id: 'statement', title: 'On Sugar', page: '12', contents: false },
  { id: 'numbers', title: 'By the Numbers', page: '14', contents: false },
  { id: 'process', title: 'How an Issue Gets Made', page: '16', contents: true },
  { id: 'commissions', title: 'Commissions', page: '24', contents: true },
  { id: 'masthead', title: 'Masthead', page: '30', contents: true },
  { id: 'letters', title: 'Letters to the Editor', page: '34', contents: true },
] as const
