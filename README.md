# Kurang Manis: the portfolio of James Chin

James Chin (fictional) started *Kurang Manis* in 2019, a print quarterly about what Southeast Asia
drinks, and still makes every issue himself: he picks the drink, edits the words, designs the pages
and drives the boxes. This is his site, built like an issue of his magazine. Tilt the glass.

**Live:** [james-chin-portfolio.vercel.app](https://james-chin-portfolio.vercel.app)

## Concept

James grew up above his parents' kopitiam in Ipoh, spent six years designing hotel menus in
Singapore, then left to start a magazine where every issue is about one drink, from kopi O to teh O
in the highlands. His design studio work (the commissions) pays for the printing. So the site opens
like an issue of his magazine and is told in his voice:

- a **layered cover** for the current issue: clouds, the *Kurang Manis* masthead, then hills that
  rise over it as you scroll (depth scrolling), printed as two-ink riso;
- an **editor's letter** from James, then everything he has published;
- a **running folio** (page number) in the header instead of a progress bar, and a **Contents
  page** instead of a menu;
- riso-ink colour washes, paper grain and misregistered titles, all tinted by the issue you pick;
- two-ink line drawings, with the process and numbers drawings sketching themselves in as you read;
- copy in James's voice: short, specific, a bit dry. *Kurang manis* means "less sweet".

Every person, brand, award and stockist on the site is made up. The drinks are real.

## Highlights

- **The glass.** A procedurally built 3D tumbler (lathe geometry, transmission glass) with a custom
  liquid shader: the surface stays level and sloshes when you drag or arrow-key the glass, ripples,
  and **drains as you scroll down the page**. At the footer it's empty; *Order another* refills it.
- **"Your order, boss?"** Tap the kopitiam order code (Kopi / Teh, O / C, Siew Dai, Kosong, Gau,
  Peng) and the glass rebuilds the drink live while an order chit prints.
- **The Shelf.** Thirteen frosted covers; picking one pours that drink into the glass and retints
  the whole page.
- **Case studies** for the four in-print issues, with a page-turn transition between them and a
  **tea-pull toy** on Issue 10 (pull higher and steadier for more foam and a better uncle rating).
- **Small things:** a page wash tinted by whatever's served at your local hour, glossary cards on
  drink words, magnetic stamp buttons, a letter-shaped contact form with a postage-stamp success
  state, and a 404 that was too sweet.

## Stack

Vite · React 19 · TypeScript · React Router 7 (data router, view transitions) · three.js with
@react-three/fiber and drei · CSS Modules + custom properties. No UI kit, no animation library:
motion is CSS plus IntersectionObserver.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the build on http://localhost:4173
```

Logic self-checks (no test framework needed):

```bash
node src/data/order.check.ts     # kopitiam order code → drink
node src/data/serving.check.ts   # "Now serving" by hour
```

The contact form opens the visitor's mail app by default. To post letters to a form service
instead, set `VITE_FORM_ENDPOINT` (for example a Formspree URL) before building.

## Performance & accessibility

Lighthouse 12 on the production build (`npm run preview`):

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Home, desktop | 97 | 100 | 100 | 100 |
| Home, mobile (simulated) | 55 | 100 | 100 | 100 |
| Issue 10, mobile (simulated) | 87 | 100 | 100 | 100 |

Home on a simulated phone is the one trade-off: the 3D glass loads by itself there (no tap), and
compiling it is a single long task under Lighthouse's 4× CPU throttle. With the glass left as the
SVG poster, the same page scores in the mid-70s.

- The cover paints first: only the cover renders on load, the rest of the page follows in a React
  transition, and the hills image is preloaded as the LCP.
- The 3D glass is code-split and swaps in without a tap: with a mouse on the first move, scroll or
  key; on touch screens a few seconds after load, when the browser is idle. Until then a line-drawn SVG glass stands in (also the fallback with no WebGL, or if the context fails).
  Phones get fewer transmission samples and a lower-resolution buffer.
- Phones skip the expensive paint: no `backdrop-filter`, still colour washes drawn as radial
  gradients instead of blurs, a tiled grain image instead of an SVG filter, and 560px drink images.
- `prefers-reduced-motion` turns off drift, parallax, ripples, sloshing and drawing-in; the toys
  still work. Everything is keyboard-reachable (glass and tea pull take the arrow
  keys), small red text uses a darker ink that passes AA on every issue tint, and form errors are
  linked to their fields.

## Credits & process

- Type: Instrument Serif, Pinyon Script, Archivo (variable width) and Nanum Pen Script, self-hosted
  via Fontsource.
- AI-assisted imagery, generated with ChatGPT and edited for the site: the drink photographs on
  the Shelf, the cover clouds and hills, the commission pieces (festival programme, tote, café menu
  and cup) and the portrait of James. Each was cropped, colour-graded to the riso palette and given
  halftone and grain in CSS.
- Line drawings (cups, stools, maps, the cat and friends) are drawn by hand in code as two-ink SVG.
- Case-study spreads use those drawings as plates. To swap in photographs, set `photo` on a spread
  in `src/data/caseStudies.ts` and it gets a riso duotone automatically.
- Built with help from Claude Code.

## Licence

MIT. See [LICENSE](LICENSE).
