import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import type { Drink } from '../data/order'
import { GlassPoster } from './GlassPoster'

const GlassScene = lazy(() => import('../three/GlassScene'))

// feature check only: actually creating a WebGL context here cost ~1 s of CPU on load (and ~5 s on a
// throttled phone). If the context still fails later, the scene's own error path keeps the poster.
const hasWebGL = () => typeof WebGL2RenderingContext !== 'undefined'

// if WebGL is listed but the context can't be created (blocked GPU, old driver), keep the poster
class KeepPoster extends Component<{ poster: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.poster : this.props.children
  }
}

// SVG poster paints first. The 3D glass (three.js, ~270 KB gzip, seconds of CPU on a phone) only loads
// once the visitor does something: on desktop any mouse move, scroll or key; on touch screens only a
// tap on the glass itself, so scrolling past on a phone never pays for it.
export function GlassStage({ drink, label, className }: { drink: Drink; label: string; className?: string }) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (!hasWebGL() || matchMedia('(pointer: coarse)').matches) return
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
      {/* sized to the slot, poured in the current drink's colour */}
      <GlassPoster style={{ height: '100%', width: 'auto', maxWidth: '100%' }} liquid={drink.liquid} ice={drink.ice} />
    </div>
  )

  return (
    <div
      className={className} /* must give it a position (relative/absolute) for the bleed */
      onPointerDown={ready || !hasWebGL() ? undefined : () => setReady(true)}
    >
      {ready ? (
        <KeepPoster poster={poster}>
          <Suspense fallback={poster}>
            {/* canvas bleeds past the slot so the straw and rim never clip, even mid-tilt */}
            <div style={{ position: 'absolute', inset: '-25% -35%' }}>
              <GlassScene drink={drink} label={label} />
            </div>
          </Suspense>
        </KeepPoster>
      ) : poster}
    </div>
  )
}
