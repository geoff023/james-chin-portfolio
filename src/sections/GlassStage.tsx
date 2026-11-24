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

// SVG poster paints first; the 3D glass loads after and fades in over it.
export function GlassStage({ drink, label, className }: { drink: Drink; label: string; className?: string }) {
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(hasWebGL()), []) // effects run after first paint

  const poster = (
    <div role="img" aria-label={label} style={{ height: '100%', display: 'grid', placeItems: 'center' }}>
      <GlassPoster />
    </div>
  )

  return (
    <div className={className} style={{ position: 'relative' }}>
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
