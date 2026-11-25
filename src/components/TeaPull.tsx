import { useEffect, useRef, useState } from 'react'
import s from './TeaPull.module.css'

// Pull the tea: drag the top mug up (or hold ↑). Higher and steadier makes more foam.
const MAX_CM = 90
const FOAM_CM = 4.5
const verdicts = ['Again.', 'Not bad, boss.', 'You could work a mamak shift.', 'Uncle is impressed. Uncle is never impressed.']
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches

type Result = { cm: number; foam: string; stars: number }

export default function TeaPull() {
  const sim = useRef({ h: 0, target: 0, holding: false, foam: 0, max: 0, jitter: 0, t: 0, raf: 0, last: 0 })
  const svg = useRef<SVGSVGElement>(null)
  const drag = useRef<{ y: number; h: number } | null>(null)
  const [, frame] = useState(0)
  const [result, setResult] = useState<Result | null>(null)

  useEffect(() => () => cancelAnimationFrame(sim.current.raf), [])

  function loop(now: number) {
    const m = sim.current
    const dt = Math.min((now - (m.last || now)) / 1000, 1 / 30)
    m.last = now
    m.t += dt
    const prev = m.h
    m.h += (m.target - m.h) * (1 - Math.exp(-dt * 10))
    if (m.holding) {
      const speed = Math.abs(m.h - prev) / (dt || 1)
      m.jitter += (speed - m.jitter) * 0.1
      m.max = Math.max(m.max, m.h)
      const steady = Math.max(0, 1 - m.jitter * 1.5)
      if (m.h > 0.12) m.foam = Math.min(1, m.foam + dt * (0.01 + m.h * 0.14) * steady)
    }
    frame((x) => x + 1)
    if (m.holding || m.h > 0.002) m.raf = requestAnimationFrame(loop)
    else m.raf = 0
  }
  const kick = () => {
    const m = sim.current
    if (!m.raf) {
      m.last = 0
      m.raf = requestAnimationFrame(loop)
    }
  }

  function start() {
    sim.current.holding = true
    setResult(null)
    kick()
  }
  function release() {
    const m = sim.current
    if (!m.holding) return
    m.holding = false
    m.target = 0
    if (m.max > 0.05) {
      setResult({
        cm: Math.round(m.max * MAX_CM),
        foam: (m.foam * FOAM_CM).toFixed(1),
        stars: m.foam < 0.25 ? 1 : m.foam < 0.5 ? 2 : m.foam < 0.8 ? 3 : 4,
      })
    }
    kick()
  }
  function reset() {
    Object.assign(sim.current, { foam: 0, max: 0, jitter: 0 })
    setResult(null)
    frame((x) => x + 1)
  }

  const m = sim.current
  const yTop = 262 - m.h * 236 // top mug's lip: rests just above the bottom mug, 90cm at the top
  const pouring = m.holding && m.h > 0.04
  const wob = calm ? 0 : Math.sin(m.t * 14) * 3
  // the stream leaves from the mug's left rim (its pivot) and lands in the bottom mug
  const stream = `M150 ${yTop} C ${150 + wob} ${yTop + (352 - yTop) * 0.4}, ${158 - wob} ${yTop + (352 - yTop) * 0.75}, 160 352`
  const foamPx = m.foam * 36
  const cm = Math.round(m.h * MAX_CM)

  return (
    <div className={s.wrap}>
      <div
        className={s.stage}
        role="slider"
        tabIndex={0}
        aria-label="Pull height"
        aria-valuemin={0}
        aria-valuemax={MAX_CM}
        aria-valuenow={cm}
        aria-valuetext={`${cm} centimetres, ${(m.foam * FOAM_CM).toFixed(1)} centimetres of foam`}
        onKeyDown={(e) => {
          if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return
          e.preventDefault()
          if (!m.holding) start()
          m.target = Math.min(1, Math.max(0, m.target + (e.key === 'ArrowUp' ? 0.06 : -0.06)))
          kick()
        }}
        onKeyUp={(e) => e.key === 'ArrowUp' && release()}
        onBlur={release}
      >
        <svg
          ref={svg}
          viewBox="0 -70 320 510"
          className={s.svg}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId)
            drag.current = { y: e.clientY, h: m.h }
            start()
          }}
          onPointerMove={(e) => {
            if (!drag.current) return
            const scale = svg.current!.getBoundingClientRect().height / 510
            m.target = Math.min(1, Math.max(0, drag.current.h + (drag.current.y - e.clientY) / (236 * scale)))
          }}
          onPointerUp={() => { drag.current = null; release() }}
          onPointerCancel={() => { drag.current = null; release() }}
          aria-hidden="true"
        >
          {/* height ruler */}
          <g className={s.ruler}>
            {Array.from({ length: 10 }, (_, i) => (
              <g key={i}>
                <path d={`M282 ${262 - i * 26.2}h14`} />
                <text x="270" y={266 - i * 26.2}>{i * 10}</text>
              </g>
            ))}
            <path d={`M296 ${yTop}h-20`} className={s.marker} />
          </g>

          {pouring && <path d={stream} className={s.stream} />}

          {/* bottom mug: tea, then foam on top */}
          <g>
            <rect x="122" y={418 - 22 - foamPx} width="76" height={22 + foamPx} className={s.tea} />
            <rect x="122" y={418 - 22 - foamPx} width="76" height={Math.max(foamPx, 0.01)} className={s.foam} />
            <path d="M118 350 L124 420 H196 L202 350" className={s.mug} />
            <path d="M202 366c18 0 18 34 -2 34" className={s.mug} />
          </g>

          {/* top mug, pivoting on its left rim: upright at rest, tipped well over to pour */}
          <g transform={`translate(150 ${yTop}) rotate(${pouring ? -112 : 0})`} className={s.topMug}>
            <rect x="0" y="0" width="70" height="66" rx="4" className={s.tea} opacity={pouring ? 0.9 : 0.6} />
            <path d="M-4 -4 L2 68 H68 L74 -4" className={s.mug} />
            <path d="M74 12c18 0 18 34 -2 34" className={s.mug} />
          </g>
        </svg>
      </div>

      <div className={s.readout}>
        <p className={s.big}>{cm}<span>cm</span></p>
        <p className="label">Pull height, live</p>
        <div className={s.result} aria-live="polite">
          {result ? (
            <>
              <p className={s.facts}>
                Pull height {result.cm}cm, foam {result.foam}cm. Uncle rating:{' '}
                <span aria-label={`${result.stars} of 4`}>{'★'.repeat(result.stars)}{'☆'.repeat(4 - result.stars)}</span>
              </p>
              <p className={`hand ${s.verdict}`}>{verdicts[result.stars - 1]}</p>
              <button type="button" className={`label ${s.reset}`} onClick={reset}>Pour it back</button>
            </>
          ) : (
            <p className={s.hint}>Higher pulls froth more, but only if you hold it steady.</p>
          )}
        </div>
      </div>
    </div>
  )
}
