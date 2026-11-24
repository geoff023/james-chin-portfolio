// Riso-style line glass. Cover poster / 3D fallback, and the art on each Shelf cover.
// The colour plate is printed slightly off from the red line plate, on purpose.
const iceCubes = (
  <>
    <rect x="78" y="160" width="46" height="42" rx="8" transform="rotate(-12 101 181)" />
    <rect x="132" y="176" width="44" height="40" rx="8" transform="rotate(9 154 196)" />
    <rect x="96" y="214" width="40" height="38" rx="8" transform="rotate(4 116 233)" />
  </>
)

export function GlassPoster({
  className,
  liquid = 'var(--issue-accent)',
  ice = true,
}: {
  className?: string
  liquid?: string
  ice?: boolean
}) {
  return (
    <svg viewBox="0 0 260 420" className={className} aria-hidden="true" fill="none">
      <path fill={liquid} transform="translate(6 4)" d="M44 150 C80 142 180 158 216 148 L200 392 C170 400 90 400 60 392 Z" />
      {ice && <g fill="var(--paper)" opacity="0.55" transform="translate(6 4)">{iceCubes}</g>}
      <g stroke="var(--riso-red)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {/* tumbler, slight flare, wobbly */}
        <path d="M30 70 C60 64 200 66 230 72 L206 398 C176 410 86 410 56 399 Z" />
        <path d="M33 92 C80 98 180 96 228 91" opacity="0.5" />
        {/* surface */}
        <path d="M44 150 C80 142 180 158 216 148" />
        {ice && iceCubes}
        {/* straw */}
        <path d="M150 380 L176 26 L214 10" strokeWidth="9" opacity="0.9" />
        {/* highlights */}
        <path d="M58 120 L66 300" opacity="0.6" />
        <path d="M60 320 L62 340" opacity="0.6" />
        {/* condensation drops */}
        <path d="M196 230 q3 6 0 9 q-3 -3 0 -9z" />
        <path d="M70 360 q3 6 0 9 q-3 -3 0 -9z" />
      </g>
    </svg>
  )
}
