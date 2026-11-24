import { useEffect, useRef, useState } from 'react'
import s from './Cursor.module.css'

type Mode = 'dot' | 'link' | 'tilt'
const enabled = () =>
  matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !matchMedia('(prefers-reduced-motion: reduce)').matches

// A red ink dot that trails the pointer: rings over anything clickable, says "tilt" over the glass.
// The native cursor stays; this only adds to it.
export function Cursor() {
  const [on] = useState(enabled)
  const [mode, setMode] = useState<Mode>('dot')
  const dot = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!on) return
    const pos = { x: -100, y: -100, tx: -100, ty: -100 }
    let raf = 0
    const tick = () => {
      pos.x += (pos.tx - pos.x) * 0.25
      pos.y += (pos.ty - pos.y) * 0.25
      dot.current!.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      raf = Math.abs(pos.tx - pos.x) + Math.abs(pos.ty - pos.y) > 0.3 ? requestAnimationFrame(tick) : 0
    }
    const move = (e: PointerEvent) => {
      pos.tx = e.clientX
      pos.ty = e.clientY
      const t = e.target as Element
      setMode(t.closest?.('[data-cursor="tilt"]') ? 'tilt' : t.closest?.('a, button, select, label, [role="slider"], [tabindex="0"]') ? 'link' : 'dot')
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const leave = () => { pos.tx = pos.ty = -100; if (!raf) raf = requestAnimationFrame(tick) }
    addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => {
      removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      cancelAnimationFrame(raf)
    }
  }, [on])

  if (!on) return null
  return (
    <div ref={dot} className={s.cursor} data-mode={mode} aria-hidden="true">
      <span className={s.ink} />
      <span className={s.word}>tilt</span>
    </div>
  )
}
