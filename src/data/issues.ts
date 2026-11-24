export type Issue = {
  no: string
  title: string
  drink: string // as ordered, Malay/Hokkien
  drinkEn: string
  accent: string
}

// ponytail: only the current issue for now; full catalogue lands with The Shelf (phase 3)
export const currentIssue: Issue = {
  no: '12',
  title: 'Pink Is a Flavour',
  drink: 'Bandung',
  drinkEn: 'rose syrup + milk',
  accent: '#F2A7B5',
}

// home page sections, in reading order; drives the folio + contents page
export const sections = [
  { id: 'cover', title: 'Cover', page: '01' },
  { id: 'shelf', title: 'The Shelf', page: '08' },
  { id: 'process', title: 'How an Issue Gets Made', page: '16' },
  { id: 'commissions', title: 'Commissions', page: '24' },
  { id: 'masthead', title: 'Masthead', page: '30' },
  { id: 'letters', title: 'Letters to the Editor', page: '34' },
] as const
