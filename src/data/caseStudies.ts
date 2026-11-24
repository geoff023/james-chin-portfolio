// Case-study pages for the four in-print issues (plan §2). Keyed by issue slug.
// `photos` stays empty until plan §9 B/C land in public/images/spreads/; plates show sketches until then.
export type Sketch = 'cup' | 'stack' | 'grid' | 'camera' | 'kettle' | 'cat' | 'stools' | 'pin' | 'bubbles' | 'cups'

export type CaseStudy = {
  slug: string
  brief: string
  decisions: { label: string; text: string; art: Sketch }[]
  spreads: { caption: string; art: Sketch; photo?: string }[] // irregular grid: large, small, small, tall
  facts: [string, string][]
  note: string
  page: string // folio where the story starts
}

export const caseStudies: Record<string, CaseStudy> = {
  'the-6am-shift': {
    slug: 'the-6am-shift',
    page: '40',
    brief:
      'A week with the uncles who open Ipoh’s kopitiams before dawn. The issue had to feel like 5:40am: half-lit, quiet, smelling of charcoal, and nobody talking yet.',
    decisions: [
      { label: 'Typeface', art: 'grid', text: 'A condensed serif, cut tight, because the shop signs in Old Town are all capitals squeezed onto narrow boards.' },
      { label: 'Paper', art: 'stack', text: 'Munken Pure 120gsm, uncoated, so the film grain sinks into the paper instead of sitting on top of it.' },
      { label: 'Cover', art: 'cup', text: 'One cup on a marble table, shot from above at 5:52am. The only issue we printed without a cover line.' },
    ],
    spreads: [
      { caption: 'Fig. 1: Uncle Lim, 5:42am', art: 'kettle' },
      { caption: 'Fig. 2: the first pot of the day', art: 'cup' },
      { caption: 'Fig. 3: shutters at half-mast', art: 'stools' },
      { caption: 'Fig. 4: a regular and his morning paper', art: 'bubbles' },
    ],
    facts: [['Pages', '96'], ['Print run', '3,000'], ['Paper', 'Munken Pure 120gsm'], ['Days on the road', '9']],
    note: 'we drank 61 kopi O that week. I stopped counting the sugar.',
  },
  pressed: {
    slug: 'pressed',
    page: '48',
    brief:
      'The last hand-cranked sugarcane presses in Penang, and the family that has run one stall for three generations. The issue had to be as green, as loud and as sticky as the press.',
    decisions: [
      { label: 'Format', art: 'stack', text: 'Tall and narrow, 17 × 28 cm, the proportions of a stalk of cane. It doesn’t fit on most shelves. Bookshops forgave us.' },
      { label: 'Typeface', art: 'grid', text: 'A heavy grotesk for the headlines, borrowed from the hand-painted price boards above every stall.' },
      { label: 'Paper', art: 'pin', text: 'A recycled 140gsm offset stock with a faint green cast, so even the white pages look a little like juice.' },
    ],
    spreads: [
      { caption: 'Fig. 1: the press, a 1974 model', art: 'stools' },
      { caption: 'Fig. 2: cane, stacked by height', art: 'stack' },
      { caption: 'Fig. 3: three generations, one stool', art: 'bubbles' },
      { caption: 'Fig. 4: to go, in a plastic bag with a straw', art: 'cup' },
    ],
    facts: [['Pages', '84'], ['Print run', '3,000'], ['Paper', 'Recycled offset 140gsm'], ['Days on the road', '12']],
    note: 'the grandfather wouldn’t let me crank it. fair.',
  },
  'the-long-pull': {
    slug: 'the-long-pull',
    page: '56',
    brief:
      'Teh tarik as performance. We measured the pour at eleven mamak stalls, late at night under fluorescent light, and printed every height to scale on a fold-out poster.',
    decisions: [
      { label: 'Format', art: 'stack', text: 'A four-panel fold-out poster bound into the middle, with each stall’s pull drawn to real height.' },
      { label: 'Numbers', art: 'grid', text: 'Figures set enormous, because the issue is really a measuring tape with essays attached.' },
      { label: 'Cover', art: 'cups', text: 'Just the stream of tea between two mugs, running off the top and bottom edges. No mugs on the front.' },
    ],
    spreads: [
      { caption: 'Fig. 1: 74cm, Jalan Doraisamy, 11:40pm', art: 'cups' },
      { caption: 'Fig. 2: the foam test', art: 'cup' },
      { caption: 'Fig. 3: two mugs, forty years', art: 'kettle' },
      { caption: 'Fig. 4: the poster, unfolded', art: 'grid' },
    ],
    facts: [['Pages', '72 + poster'], ['Print run', '3,000'], ['Paper', 'Munken Print Cream 115gsm'], ['Nights on the road', '7']],
    note: 'my best pull was 31cm. most of it landed in the mug.',
  },
  'pink-is-a-flavour': {
    slug: 'pink-is-a-flavour',
    page: '64',
    brief:
      'Wedding drinks, Hari Raya open houses, and why rose syrup is that colour. The current issue, and the pinkest thing we have ever sent to a printer.',
    decisions: [
      { label: 'Ink', art: 'cup', text: 'A fluorescent pink riso ink, mixed by eye to match a bottle of rose syrup from a Kampung Baru sundry shop.' },
      { label: 'Paper', art: 'stack', text: 'A tinted uncoated 120gsm, the exact pink of bandung at one part syrup to four parts milk.' },
      { label: 'Cover', art: 'bubbles', text: 'A glass of bandung photographed through the plastic window of a wedding tent, 4pm, everything blushing.' },
    ],
    spreads: [
      { caption: 'Fig. 1: the open-house table, Hari Raya', art: 'cups' },
      { caption: 'Fig. 2: syrup, one part in four', art: 'cup' },
      { caption: 'Fig. 3: the wedding tent at 4pm', art: 'stools' },
      { caption: 'Fig. 4: a jug that has seen thirty weddings', art: 'kettle' },
    ],
    facts: [['Pages', '88'], ['Print run', '3,000'], ['Paper', 'Tinted uncoated 120gsm'], ['Days on the road', '10']],
    note: 'turns out it’s mostly the colouring. we printed that anyway.',
  },
}
