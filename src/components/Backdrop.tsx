import s from './Backdrop.module.css'

// Paper grain (a small tiled noise image; a live SVG noise filter cost seconds of paint on phones)
// + slow riso colour washes. Fixed, behind everything.
export function Backdrop() {
  return (
    <div className={s.backdrop} aria-hidden="true">
      <div className={s.sky} />
      <span className={`${s.wash} ${s.a}`} />
      <span className={`${s.wash} ${s.b}`} />
      <span className={`${s.wash} ${s.c}`} />
      <div className={s.grain} />
    </div>
  )
}
