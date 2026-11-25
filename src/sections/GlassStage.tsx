import { lazy, Suspense, useEffect, useState } from 'react'
import type { Drink } from '../data/order'
import { GlassPoster } from './GlassPoster'

const GlassScene = lazy(() => import('../three/GlassScene'))

const hasWebGL = () => {
  try {
    return !!document.createElement('canvas').getContext('webgl2')
  } catch {
    return false
  }
}

// SVG poster paints first. The 3D glass (three.js, ~270 KB gzip, seconds of CPU on a phone) only loads
// once the visitor does something: moves the mouse, touches, scrolls or presses a key.
export function GlassStage({ drink, label, className }: { drink: Drink; label: string; className?: string }) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (!hasWebGL()) return
    const events = ['pointermove', 'pointerdown', 'touchstart', 'keydown', 'wheel', 'scroll'] as const
    const go = () => {
      events.forEach((e) => removeEventListener(e, go))
      setReady(true)
    }
    events.forEach((e) => addEventListener(e, go, { passive: true }))
    return () => events.forEach((e) => removeEventListener(e, go))
  }, [])

  const poster = (
    <div role="img" aria-label={label} style={{ height: '100%', display: 'grid', placeItems: 'center' }}>
      <GlassPoster />
    </div>
  )

  return (
    <div className={className}>{/* className must give it a position (relative/absolute) for the bleed */}
      {ready ? (
        <Suspense fallback={poster}>
          {/* canvas bleeds past the slot so the straw and rim never clip, even mid-tilt */}
          <div style={{ position: 'absolute', inset: '-25% -35%' }}>
            <GlassScene drink={drink} label={label} />
          </div>
        </Suspense>
      ) : poster}
    </div>
  )
}
