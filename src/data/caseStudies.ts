// Case-study pages for the four in-print issues (plan §2). Keyed by issue slug.
// `photos` stays empty until plan §9 B/C land in public/images/spreads/; plates show sketches until then.
export type Sketch = 'cup' | 'stack' | 'grid' | 'camera' | 'kettle' | 'cat' | 'stools' | 'pin' | 'bubbles' | 'cups'

export type CaseStudy = {
  slug: string
  brief: string
  decisions: { label: string; text: string; art: Sketch }[]
  spreads: { caption: string; art: Sketch; photo?: string }[] // irregular grid: large, small, small, tall
  facts: [string, string][]
  role: string[] // what James did on it himself
  outcome: string // what happened after it went to print
  note: string
  page: string // folio where the story starts
}

export const caseStudies: Record<string, CaseStudy> = {
  'above-the-clouds': {
    slug: 'above-the-clouds',
    page: '72',
    brief:
      'Two weeks driving up to the highland tea estates, above the cloud line, to find out what teh O tastes like where it starts. The issue had to feel like a cold morning: wide, quiet, and mostly sky.',
    decisions: [
      { label: 'Format', art: 'stack', text: 'Landscape, 28 × 21 cm, so the hills can run across a whole spread without a fold through the middle of them.' },
      { label: 'Ink', art: 'cup', text: 'Two riso inks only, blue and green, overprinted where the hills meet the sky. The tea is the one thing printed in brown.' },
      { label: 'Cover', art: 'pin', text: 'The masthead set behind the hills, so you have to look past the landscape to read the name. Nobody asked for that. I did it anyway.' },
    ],
    spreads: [
      { caption: 'Fig. 1: the estate road at 5:10am', art: 'pin' },
      { caption: 'Fig. 2: first pour of the day', art: 'cup' },
      { caption: 'Fig. 3: pickers’ shed, plastic stools', art: 'stools' },
      { caption: 'Fig. 4: the cloud line from the top terrace', art: 'stack' },
    ],
    facts: [['Pages', '104'], ['Print run', '3,500'], ['Paper', 'Munken Pure 100gsm'], ['Days on the road', '14']],
    role: ['Editor', 'Art direction', 'Layout', 'Driving'],
    outcome: 'The current issue. 3,500 printed, our largest run, and the first one stocked in Tokyo before it came out in Kuala Lumpur.',
    note: 'it was 11 degrees. I packed one jumper.',
  },
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
    role: ['Editor', 'Art direction', 'Layout', 'Cover photograph'],
    outcome: 'Sold out in three weeks. Two of the uncles asked for copies to keep behind the counter, and one still has it there.',
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
    role: ['Editor', 'Art direction', 'Layout', 'Interviews'],
    outcome: 'Our first reprint. The stall framed the cover, and the Penang bookshops took twice their usual order.',
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
    role: ['Editor', 'Art direction', 'Poster design', 'Measuring tape'],
    outcome: 'The poster outsold the magazine. Eleven mamak stalls have it on the wall; one uses it to settle arguments.',
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
    role: ['Editor', 'Art direction', 'Ink mixing', 'Layout'],
    outcome: 'Sold out the week before Hari Raya. Three wedding planners now email us about bandung.',
    note: 'turns out it’s mostly the colouring. we printed that anyway.',
  },
}
