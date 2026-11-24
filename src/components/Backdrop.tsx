import s from './Backdrop.module.css'

// Paper grain (SVG noise) + slow riso colour washes. Fixed, behind everything.
export function Backdrop() {
  return (
    <div className={s.backdrop} aria-hidden="true">
      <div className={s.sky} />
      <span className={`${s.wash} ${s.a}`} />
      <span className={`${s.wash} ${s.b}`} />
      <span className={`${s.wash} ${s.c}`} />
      <svg className={s.grain} width="100%" height="100%">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0.11  0 0 0 0 0.1  0 0 0 0 0.09  0 0 0 0.55 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  )
}
