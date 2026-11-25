# Kurang Manis: the portfolio of James Chin

James Chin (fictional) started *Kurang Manis* in 2019, a print quarterly about what Southeast Asia
drinks, and still makes every issue himself: he picks the drink, edits the words, designs the pages
and drives the boxes. This is his site, built like an issue of his magazine. Tilt the glass.

**Live:** [james-chin-portfolio.vercel.app](https://james-chin-portfolio.vercel.app)

<!-- Hero GIF: record the glass tilt + a Shelf pick (e.g. with ScreenToGif) and save as docs/hero.gif -->

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
- red-pencil line drawings that sketch themselves in as you read;
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
- **Small things:** a "Now serving" line that follows your local time, glossary cards on drink
  words, a first-visit roller-shutter intro, magnetic stamp buttons, an ink-dot cursor, a letter-
  shaped contact form with a postage-stamp success state, and a 404 that was too sweet.

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

Lighthouse on the production build (`npm run preview`, Lighthouse 12):

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Home, desktop | 95 | 100 | 100 | 100 |
| Home, mobile (simulated) | 63–68 | 100 | 100 | 100 |
| Issue 10, mobile (simulated) | 92 | 100 | 100 | 100 |

- The 3D glass is code-split and only loads after the visitor first moves, touches, scrolls or
  presses a key; until then a line-drawn SVG glass stands in (also the fallback with no WebGL).
  Phones get fewer transmission samples and a lower-resolution buffer.
- Home on a simulated phone is held back by first-render cost under 4× CPU throttling with software
  rendering: the blurred washes, the grain filter and thirteen frosted `backdrop-filter` covers.
  Unthrottled, the first render is a single ~70 ms task.
- `prefers-reduced-motion` turns off drift, ripples, sloshing, drawing-in, the shutter and the
  cursor; the toys still work. Everything is keyboard-reachable (glass and tea pull take the arrow
  keys), small red text uses a darker ink that passes AA on every issue tint, and form errors are
  linked to their fields.

## Credits & process

- Type: Instrument Serif, Pinyon Script, Archivo (variable width) and Nanum Pen Script, self-hosted
  via Fontsource.
- Portrait of James: red line illustration, cleaned up and recoloured to the site's riso red.
  _Add how it was made (drawn by hand / AI-assisted and edited)._
- Line drawings of cups, stools, the cat and friends are drawn in code as SVG and are placeholders
  for traced illustrations.
- Case-study spreads currently show sketches; photographs are still to come. When they arrive,
  set `photo` on each spread in `src/data/caseStudies.ts` and they get a riso duotone automatically.
- Built with help from Claude Code.

## Licence

MIT. See [LICENSE](LICENSE).
