import { useEffect, useRef, useState, type ReactNode } from 'react'

// Red-pencil line drawings with a flat second ink printed a hair off register underneath, like a
// two-colour riso job. The second ink is the issue colour unless a parent sets --sketch-ink.
type P = { className?: string }
function Sketch({ children, ink, className }: { children: ReactNode; ink?: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      {ink && <g className="sketch-ink" transform="translate(3 2.5)">{ink}</g>}
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  )
}

// kopitiam cup on a saucer: thick rim, two-stripe band, spoon, steam
export const KopiCup = (p: P) => (
  <Sketch {...p} ink={<>
    <path d="M33 47c0-3 12-5.5 27-5.5s27 2.5 27 5.5-12 5.5-27 5.5-27-2.5-27-5.5z" />
    <path d="M31.5 60c11 4 46 4 57 0l-.6 7c-11 4-45 4-56 0z" />
    <path d="M14 91c4 5 22 8 46 8s42-3 46-8c-6 7-24 11-46 11s-40-4-46-11z" />
  </>}>
    <path d="M12 90c0-5 21-9 48-9s48 4 48 9-21 12-48 12-48-5-48-12z" />
    <path d="M33 88.5c7 2.5 47 2.5 54 0" opacity="0.5" />
    <path d="M30 47c0 17 3 30 11 37 11 5 27 5 38 0 8-7 11-20 11-37" />
    <path d="M30 47c0-4 13-7 30-7s30 3 30 7-13 7-30 7-30-3-30-7z" />
    <path d="M36 48.5c6 2 42 2 48 0" opacity="0.55" />
    <path d="M31.5 60c11 4 46 4 57 0M32 67c11 4 45 4 56 0" />
    <path d="M90 53.5c9-3 16 2 15 9.5s-8 11-17 10" />
    <path d="M89.5 59c6-1 9.5 1 9 4.5s-4 6-10 5.5" />
    <path d="M78 96c9-2 17-5 23-9.5" />
    <path d="M101 86.5c2-3 7-3.5 7.5-.5s-4 4.5-7.5 3" />
    <path d="M48 34c-5-6 5-10 0-16M60 31c-5-6 5-10 0-16M72 34c-5-6 5-10 0-16" opacity="0.55" />
  </Sketch>
)

// three issues stacked a little askew, the top cover showing its masthead and picture
export const MagStack = (p: P) => (
  <Sketch {...p} ink={<>
    <path d="M18 56l56 8 30-12-56-7z" />
    <path d="M15 67l57 8 32-13v6l-32 13-57-8z" />
  </>}>
    <path d="M18 56l56 8 30-12-56-7z" />
    <path d="M18 56v5l56 8 30-12v-5" />
    <path d="M15 67l57 8 32-13M15 73l57 8 32-13M15 67v6M104 62v6" />
    <path d="M19 79l56 8 30-12M19 85l56 8 30-12M19 79v6M105 75v6" />
    <path d="M30 53.5l22 3" strokeWidth="3" />
    <path d="M47 58l20 2.8 10-4-20-2.8z" />
    <path d="M30 58.5l10 1.4" opacity="0.6" />
    <path d="M22 76l44 6M26 88l44 6" opacity="0.35" />
  </Sketch>
)

// the drink argument: two glasses, two drinks, ice and straws leaning at each other
export const TwoCups = (p: P) => (
  <Sketch {...p} ink={<>
    <path d="M21 60c8 2 24 2 32 0l-3.4 36c-.3 3-2.4 5-5.4 5H29.8c-3 0-5.1-2-5.4-5z" />
    <path d="M66 64c8 2 24 2 32 0l-3 32c-.3 3-2.4 5-5.4 5H74.4c-3 0-5.1-2-5.4-5z" />
  </>}>
    <path d="M18 44l5 52c.3 3 2.5 5 5.5 5h17c3 0 5.2-2 5.5-5l5-52" />
    <path d="M18 44c0-2 8.5-3 19-3s19 1 19 3-8.5 3-19 3-19-1-19-3z" />
    <path d="M64 50l4.5 46c.3 3 2.5 5 5.5 5h16c3 0 5.2-2 5.5-5l4.5-46" />
    <path d="M64 50c0-2 8-3 18-3s18 1 18 3-8 3-18 3-18-1-18-3z" />
    <path d="M21 60c8 2 24 2 32 0M66 64c8 2 24 2 32 0" opacity="0.6" />
    <path d="M27 67l8-2 2 7.5-8 2zM38 76l7 1-.8 7-7-1zM74 71l7-1.5 1.5 7-7 1.5z" />
    <path d="M43 46l8-26M47 46l8-25M51 20l4 1" />
    <path d="M77 52l-6-24M81 51l-6-24M71 28l4-1" />
    <path d="M62 22v-7M55 25l-4-5M69 25l4-5" opacity="0.6" />
  </Sketch>
)

// folded road map, a dashed route up to the estate, a pin at the top
export const MapPin = (p: P) => (
  <Sketch {...p} ink={<>
    <path d="M42 23l36 10v66l-36-10z" />
    <path d="M86 62c-8-10-11-16-11-21a11 11 0 0 1 22 0c0 5-3 11-11 21z" />
  </>}>
    <path d="M12 32l30-9 36 10 30-9v66l-30 9-36-10-30 9z" />
    <path d="M42 23v66M78 33v66" opacity="0.5" />
    <path d="M48 42c8 1 16 7 14 14s-12 7-17 1M52 47c4 1 7 4 6 7" opacity="0.45" />
    <path d="M22 84c8-5 10-16 20-18s14 10 24 6 8-14 18-16" strokeDasharray="2 5" />
    <path d="M17 80l5 5M22 80l-5 5" />
    <path d="M86 62c-8-10-11-16-11-21a11 11 0 0 1 22 0c0 5-3 11-11 21z" />
    <circle cx="86" cy="41" r="3.6" />
    <path d="M80 66c4 2 8 2 12 0" opacity="0.5" />
  </Sketch>
)

// interviews: two speech bubbles, one quoting
export const Bubbles = (p: P) => (
  <Sketch {...p} ink={
    <path d="M12 26c0-6 4-10 10-10h46c6 0 10 4 10 10v20c0 6-4 10-10 10H36l-14 11 3-11h-3c-6 0-10-4-10-10z" />
  }>
    <path d="M12 26c0-6 4-10 10-10h46c6 0 10 4 10 10v20c0 6-4 10-10 10H36l-14 11 3-11h-3c-6 0-10-4-10-10z" />
    <path d="M24 30h40M24 38h30M24 46h18" opacity="0.6" />
    <path d="M108 60c0-6-4-10-10-10H56c-6 0-10 4-10 10v18c0 6 4 10 10 10h26l14 11-3-11h5c6 0 10-4 10-10z" />
    <path d="M58 61c-2 2-2 5 0 6M64 61c-2 2-2 5 0 6" />
    <path d="M70 65h26M58 76h30" opacity="0.6" />
  </Sketch>
)

// rangefinder film camera: leatherette, rewind knob, shutter button, big lens
export const FilmCamera = (p: P) => (
  <Sketch {...p} ink={<>
    <path d="M12 56h28v28H17c-3 0-5-2-5-5zM80 56h28v23c0 3-2 5-5 5H80z" />
    <circle cx="60" cy="65" r="13" />
  </>}>
    <path d="M12 44c0-3 2-5 5-5h86c3 0 5 2 5 5v40c0 3-2 5-5 5H17c-3 0-5-2-5-5z" />
    <path d="M20 39v-5c0-1.5 1-2.5 2.5-2.5h11c1.5 0 2.5 1 2.5 2.5v5" />
    <path d="M84 39v-4h10v4M89 35v-3" />
    <path d="M18 46h14v7H18zM88 46h12v7H88z" />
    <path d="M12 56h28M80 56h28" opacity="0.5" />
    <circle cx="60" cy="65" r="20" />
    <circle cx="60" cy="65" r="13" />
    <circle cx="60" cy="65" r="4.5" />
    <path d="M53 58c2-2 5-3 8-3" opacity="0.6" />
    <path d="M12 48H8M108 48h4" />
  </Sketch>
)

// layout: an open spread on a column grid, headline and text left, picture right
export const GridPage = (p: P) => (
  <Sketch {...p} ink={<path d="M64 42l40-3v30l-40 3z" />}>
    <path d="M10 30l48 4v66l-48-4z" />
    <path d="M58 34l52-4v66l-52 4z" />
    <path d="M22 31v66M34 32v66M46 33v66M71 33v66M84 32v66M97 31v66" opacity="0.22" />
    <path d="M16 42l34 3" strokeWidth="3" />
    <path d="M16 49l24 2" />
    <path d="M16 60l36 3M16 66l36 3M16 72l30 2.5M16 78l34 3M16 84l24 2" opacity="0.5" />
    <path d="M64 42l40-3v30l-40 3z" />
    <path d="M64 80l28-2M64 86l20-1.5" opacity="0.5" />
  </Sketch>
)

// the delivery Myvi, boxes of the new issue strapped to the roof
export const Myvi = (p: P) => (
  <Sketch {...p} ink={<>
    <path d="M42 36h22v9H42zM66 39h16v6H66z" />
    <path d="M38 64l10-11c2-2 4-3 7-3h7v14zM67 50h10c3 0 5 1 7 3.5l7 10.5H67z" />
  </>}>
    <path d="M10 80c0-7 3-11 10-13l15-16c4-4 9-6 15-6h28c7 0 11 3 15 9l9 13c9 2 13 6 13 14v2c0 2-1 3-3 3h-7a12 12 0 0 0-24 0H46a12 12 0 0 0-24 0h-9c-2 0-3-1-3-3z" />
    <path d="M38 64l10-11c2-2 4-3 7-3h7v14zM67 50h10c3 0 5 1 7 3.5l7 10.5H67z" />
    <path d="M64 66v18M68 70h5" />
    <circle cx="34" cy="87" r="9" />
    <circle cx="93" cy="87" r="9" />
    <circle cx="34" cy="87" r="3" />
    <circle cx="93" cy="87" r="3" />
    <path d="M42 45v-9h22v9M66 45v-6h16v6" />
    <path d="M40 40h44" opacity="0.6" />
    <path d="M110 72h4M12 72h3" />
  </Sketch>
)

// enamel kopitiam kettle: banded body, lid and knob, arched handle, long spout, steam
export const Kettle = (p: P) => (
  <Sketch {...p} ink={<>
    <path d="M29 72c16 6 46 6 62 0l1 8c-16 6-48 6-64 0z" />
    <path d="M38 50c4-7 40-7 44 0-6 3-38 3-44 0z" />
  </>}>
    <path d="M28 92c-4-14-2-30 6-40 9-4 43-4 52 0 8 10 10 26 6 40-12 6-52 6-64 0z" />
    <path d="M38 50c4-7 40-7 44 0" />
    <path d="M55 43c0-4 10-4 10 0" />
    <path d="M36 50c-4-24 52-24 48 0" />
    <path d="M86 70c10-2 14-10 19-26M90 80c12-4 16-14 21-34M105 44l6 2" />
    <path d="M29 72c16 6 46 6 62 0M28 80c16 6 48 6 64 0" opacity="0.7" />
    <path d="M44 86l3 1" opacity="0.5" />
    <path d="M112 38c-4-5 3-9 0-14" opacity="0.55" />
  </Sketch>
)

// red plastic kopitiam stool: round seat with the finger hole, four splayed legs, a ring
export const Stools = (p: P) => (
  <Sketch {...p} ink={<>
    <path d="M24 38c0-6 16-10 36-10s36 4 36 10v6c0 6-16 10-36 10s-36-4-36-10z" />
    <path d="M30 51l-9 49h6l7-47zM90 51l9 49h-6l-7-47z" />
  </>}>
    <path d="M24 38c0-6 16-10 36-10s36 4 36 10-16 10-36 10-36-4-36-10z" />
    <path d="M24 38v6c0 6 16 10 36 10s36-4 36-10v-6" />
    <path d="M53 37c0-2 3-3.2 7-3.2s7 1.2 7 3.2-3 3.2-7 3.2-7-1.2-7-3.2z" />
    <path d="M33 33c6-2 14-3 22-3.4" opacity="0.5" />
    <path d="M30 51l-9 49h6l7-47M90 51l9 49h-6l-7-47" />
    <path d="M46 54.5l-3 43h5l2-42.5M74 54.5l3 43h-5l-2-42.5" />
    <path d="M24.5 82c12 5 59 5 71 0" />
  </Sketch>
)

// Ah Boy, the shop cat, asleep in a loaf with his tail wrapped round
export const Cat = (p: P) => (
  <Sketch {...p} ink={<>
    <path d="M30 64c8-6 22-8 34-6-2 8-6 14-14 16-8 1-16-2-20-10z" />
    <path d="M89 57l1-7 4 4zM106 53l3-4 1 6z" />
  </>}>
    <path d="M14 90c0-20 16-34 40-34 14 0 26 5 33 13" />
    <path d="M14 90h72" />
    <path d="M84 70c0-10 7-16 15-16s15 6 15 16-6 15-15 15-15-5-15-15z" />
    <path d="M87 58l1-11 8 7M106 54l5-8 2 12" />
    <path d="M91 70c2 1.5 4 1.5 6 0M103 70c2 1.5 4 1.5 6 0" />
    <path d="M98.5 75l1.5 1.5 1.5-1.5" />
    <path d="M113 74l6-1M113 77l6 1M85 74l-6-1" opacity="0.6" />
    <path d="M84 90c0-3 4-5 9-5s9 2 9 5" />
    <path d="M14 90c-6 0-7 7-1 8 10 2 30 2 44-1" />
    <path d="M40 58c3 5 3 10 1 15M52 56c3 6 3 12 1 17M64 57c3 6 2 11 0 15" opacity="0.5" />
  </Sketch>
)

// A wobbly hand-drawn ring. Deterministic per seed, so it doesn't change between renders.
export function handCircle(seed: number, r = 44, c = 50) {
  let s = seed * 9301 + 49297
  const rand = () => ((s = (s * 9301 + 49297) % 233280) / 233280) - 0.5
  const pts: string[] = []
  const start = rand() * Math.PI
  const turns = 1.12 // overshoot, like a pen that doesn't quite stop
  for (let i = 0; i <= 28; i++) {
    const a = start + (i / 28) * Math.PI * 2 * turns
    const rr = r + rand() * 3.5 + (i / 28) * 2
    pts.push(`${(c + Math.cos(a) * rr).toFixed(1)} ${(c + Math.sin(a) * rr * 0.94).toFixed(1)}`)
  }
  return 'M' + pts.join(' L')
}

// Fires once when the element scrolls into view.
export function useInView<T extends Element>(margin = '0px 0px -15% 0px') {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin: margin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [margin])
  return [ref, seen] as const
}
