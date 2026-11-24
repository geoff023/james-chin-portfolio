import { useEffect, useRef } from 'react'

// Rubber-stamp buttons lean toward a nearby cursor. Mouse only; off under reduced motion.
export function useMagnet<T extends HTMLElement>(radius = 140, pull = 0.22) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const near = Math.hypot(dx, dy) < radius
      el.style.translate = near ? `${(dx * pull).toFixed(1)}px ${(dy * pull).toFixed(1)}px` : ''
    }
    addEventListener('pointermove', move, { passive: true })
    return () => {
      removeEventListener('pointermove', move)
      el.style.translate = ''
    }
  }, [radius, pull])
  return ref
}
