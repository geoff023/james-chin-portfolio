import { useInView } from '../components/Sketches'
import s from './Numbers.module.css'

// Stat, where it sits on the page (%), and the point in the drawing its leader line runs to (viewBox units).
const stats = [
  { n: '13', label: 'Issues', sub: 'one drink each', pos: s.tl, from: [150, 95], to: [628, 300] },
  { n: '39,000', label: 'Copies', sub: 'printed, give or take', pos: s.bl, from: [335, 400], to: [410, 470] },
  { n: '412', label: 'Kopitiams', sub: 'visited, notebook open', pos: s.tr, from: [1060, 95], to: [660, 70] },
  { n: '1', label: 'Shop cat', sub: 'Ah Boy, Ipoh, asleep', pos: s.br, from: [1140, 400], to: [800, 392] },
]

// a kopitiam corner in red pencil: fan, marble table, cup, magazines, stools, the cat
const scene = [
  'M660 0v48', 'M620 52c10-8 70-8 80 0c-10 8-70 8-80 0z', 'M622 54c-60 0-120 8-170 16', 'M698 54c60 4 110 14 150 26', 'M660 58c-2 16-8 26-14 34',
  'M470 300c0-18 260-18 260 0s-260 18-260 0z', 'M472 302c0 6 256 6 256 0', 'M600 318v190', 'M592 318v190',
  'M540 510c0-12 112-12 112 0', 'M552 296c2 10 6 16 18 16s16-6 18-16z', 'M548 312c8 4 36 4 44 0', 'M560 286c-3-6 3-9 0-14M576 286c-3-6 3-9 0-14',
  'M612 300l50-8 10 8-52 8z', 'M614 292l48-8 8 7',
  'M360 430c0-10 104-10 104 0s-104 10-104 0z', 'M366 438l-10 120M458 438l10 120M386 444l-4 114M438 444l4 114', 'M362 446c0-8 100-8 100 0',
  'M748 430c0-10 104-10 104 0s-104 10-104 0z', 'M754 438l-10 120M846 438l10 120M774 444l-4 114M826 444l4 114',
  'M760 426c0-20 18-34 42-34s38 12 42 24c2 8-2 10-8 10h-68c-6 0-8 0-8 0z', 'M830 402l4-14 8 12M816 396l2-14 8 10', 'M760 426c-10-2-12-12-4-16',
  'M200 560c120 4 240-4 400 0s300 6 420-2',
]

export function Numbers() {
  const [ref, seen] = useInView<HTMLDivElement>()

  return (
    <section id="numbers" className={s.numbers} aria-labelledby="numbers-title">
      <div className={s.head}>
        <h2 id="numbers-title" className={s.title}>By the numbers</h2>
        <p className={s.sub}>Since 2019, give or take a cat.</p>
      </div>

      <div ref={ref} className={`${s.stage} ${seen ? s.seen : ''}`}>
        <svg viewBox="0 0 1200 600" className={s.drawing} aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <g className={s.scene}>
            {scene.map((d, i) => (
              <path key={i} d={d} pathLength={1} style={{ transitionDelay: `${0.2 + i * 0.05}s` }} />
            ))}
          </g>
          <g className={s.leaders}>
            {stats.map((x, i) => (
              <g key={x.n} style={{ transitionDelay: `${1.4 + i * 0.15}s` }}>
                <path d={`M${x.from[0]} ${x.from[1]} L${x.to[0]} ${x.to[1]}`} pathLength={1} style={{ transitionDelay: `${1.4 + i * 0.15}s` }} />
                <circle cx={x.to[0]} cy={x.to[1]} r="5" />
              </g>
            ))}
          </g>
        </svg>

        <dl className={s.stats}>
          {stats.map((x) => (
            <div key={x.n} className={`${s.stat} ${x.pos}`}>
              <dt className={s.label}>
                {x.label} <span className={s.statSub}>{x.sub}</span>
              </dt>
              <dd className={s.n}>{x.n}</dd>
            </div>
          ))}
        </dl>
      </div>

      <span className={`label ${s.folio}`} aria-hidden="true">14</span>
    </section>
  )
}
