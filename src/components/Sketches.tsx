import { useEffect, useRef, useState, type ReactNode } from 'react'

// Red-pencil line drawings. Placeholders until the traced illustrations land; same stroke rules.
function Sketch({ children, className, view = '0 0 120 120' }: { children: ReactNode; className?: string; view?: string }) {
  return (
    <svg
      viewBox={view}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export const KopiCup = (p: { className?: string }) => (
  <Sketch {...p}>
    <path d="M30 48c2 22 8 34 30 34s28-12 30-34z" />
    <path d="M28 47c10 3 52 3 64 0" />
    <path d="M90 56c12-2 14 14 1 16" />
    <path d="M18 86c10 8 74 8 84 0" />
    <path d="M52 38c-4-6 4-10 0-16M66 38c-4-6 4-10 0-16" opacity="0.6" />
  </Sketch>
)

export const MagStack = (p: { className?: string }) => (
  <Sketch {...p}>
    <path d="M22 84l70-8 8 10-70 9z" />
    <path d="M24 74l70-8 6 9" />
    <path d="M26 64l66-7 6 9-68 8" />
    <path d="M38 70l30-4M40 80l40-5" opacity="0.6" />
  </Sketch>
)

export const TwoCups = (p: { className?: string }) => (
  <Sketch {...p}>
    <path d="M16 60c1 16 5 24 18 24s17-8 18-24z" />
    <path d="M68 60c1 16 5 24 18 24s17-8 18-24z" />
    <path d="M30 40c6-10 18-12 26-6M64 34c8-6 20-2 24 8" />
    <path d="M50 26l4 6-7 1M92 36l-2 7-6-3" />
  </Sketch>
)

export const MapPin = (p: { className?: string }) => (
  <Sketch {...p}>
    <path d="M14 30l28-8 34 10 30-8v68l-30 8-34-10-28 8z" />
    <path d="M42 22v68M76 32v68" opacity="0.5" />
    <path d="M24 82c10-6 14-20 28-22s20 12 34-6" strokeDasharray="3 6" />
    <path d="M86 52c-8-10-10-16-10-20a10 10 0 0 1 20 0c0 4-2 10-10 20z" />
  </Sketch>
)

export const Bubbles = (p: { className?: string }) => (
  <Sketch {...p}>
    <path d="M14 30c0-8 6-12 14-12h40c8 0 12 4 12 12v14c0 8-4 12-12 12H38l-14 12 2-12c-8 0-12-4-12-12z" />
    <path d="M106 64c0-8-6-12-14-12H58c-8 0-12 4-12 12v12c0 8 4 12 12 12h28l14 10-2-10c6 0 8-4 8-12z" />
    <path d="M28 36h36M60 70h32M60 78h20" opacity="0.6" />
  </Sketch>
)

export const FilmCamera = (p: { className?: string }) => (
  <Sketch {...p}>
    <path d="M14 40h92v50H14z" />
    <path d="M24 40v-8h18v8M84 40v-6h12v6" />
    <circle cx="60" cy="65" r="18" />
    <circle cx="60" cy="65" r="9" />
    <path d="M14 52h22M84 52h22" opacity="0.5" />
  </Sketch>
)

export const GridPage = (p: { className?: string }) => (
  <Sketch {...p}>
    <path d="M24 14h72v92H24z" />
    <path d="M36 14v92M48 14v92M60 14v92M72 14v92M84 14v92" opacity="0.3" />
    <path d="M30 24h40M30 30h28" />
    <path d="M42 46h62v34H42z" />
    <path d="M30 90h24M30 96h30" opacity="0.6" />
  </Sketch>
)

export const Myvi = (p: { className?: string }) => (
  <Sketch {...p}>
    <path d="M12 78c0-8 4-12 12-14l14-16c4-4 8-6 14-6h22c8 0 12 4 16 10l8 12c8 2 10 6 10 14v4H12z" />
    <path d="M42 50l-8 14h56l-10-14z" opacity="0.6" />
    <circle cx="34" cy="84" r="9" />
    <circle cx="88" cy="84" r="9" />
    <path d="M62 34l4-10 6 10" opacity="0.6" />
  </Sketch>
)

export const Kettle = (p: { className?: string }) => (
  <Sketch {...p}>
    <path d="M34 50c-4 10-6 26-2 40 10 6 38 6 48 0 4-14 2-30-2-40z" />
    <path d="M34 50c8-6 36-6 44 0" />
    <path d="M78 62c10 0 16-8 24-30" />
    <path d="M44 44c0-10 6-18 12-18s12 8 12 18" />
    <path d="M52 22h8" />
  </Sketch>
)

export const Stools = (p: { className?: string }) => (
  <Sketch {...p}>
    <path d="M28 40c0-6 64-6 64 0s-64 6-64 0z" />
    <path d="M30 46c0-4 60-4 60 0M32 52c0-4 56-4 56 0" />
    <path d="M34 46l-6 52M86 46l6 52M44 54l-2 44M76 54l2 44" />
  </Sketch>
)

export const Cat = (p: { className?: string }) => (
  <Sketch {...p}>
    <path d="M18 84c0-18 18-30 40-30s36 10 40 22c2 8-2 10-8 10H24c-4 0-6-0-6-2z" />
    <path d="M86 62l4-14 8 12M74 56l2-14 8 10" />
    <path d="M18 84c-8-2-10-10-4-14" />
    <path d="M80 72q4 2 8 0" opacity="0.6" />
  </Sketch>
)

export const Programme = (p: { className?: string }) => (
  <Sketch {...p}>
    <path d="M20 22l40 6v76l-40-6z" />
    <path d="M60 28l40-6v76l-40 6z" />
    <path d="M28 40l24 3M28 48l18 2M68 38l22-3M68 46l16-2" opacity="0.6" />
    <path d="M30 64c6-8 16-8 20 0s-10 14-20 0z" />
    <circle cx="80" cy="66" r="9" />
  </Sketch>
)

export const Tote = (p: { className?: string }) => (
  <Sketch {...p}>
    <path d="M24 46h72l-6 60H30z" />
    <path d="M42 46c0-22 36-22 36 0" />
    <path d="M38 70h44M38 80h30" opacity="0.6" />
    <path d="M60 56l4 8 8 1-6 6 2 8-8-4-8 4 2-8-6-6 8-1z" />
  </Sketch>
)

export const CupSleeve = (p: { className?: string }) => (
  <Sketch {...p}>
    <path d="M34 30h52l-8 80H42z" />
    <path d="M30 24h60v6H30z" />
    <path d="M37 54h46l-3 30H40z" />
    <path d="M46 66h28M48 74h18" opacity="0.6" />
    <path d="M52 16c-3-5 3-8 0-12M66 16c-3-5 3-8 0-12" opacity="0.5" />
  </Sketch>
)

export const MenuBoard = (p: { className?: string }) => (
  <Sketch {...p}>
    <path d="M18 18h84v66H18z" />
    <path d="M28 30h36M28 40h28M28 50h32M28 60h24M28 70h30" opacity="0.6" />
    <path d="M84 30h8M84 40h8M84 50h8M84 60h8M84 70h8" opacity="0.6" />
    <path d="M40 84l-8 24M80 84l8 24" />
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
