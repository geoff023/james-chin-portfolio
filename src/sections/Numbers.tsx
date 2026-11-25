import { useInView } from '../components/Sketches'
import s from './Numbers.module.css'

// Stat, where it sits on the page (%), and the point in the drawing its leader line runs to (viewBox units).
const stats = [
  { n: '14', label: 'Issues', sub: 'one drink each, since 2019', pos: s.tl, from: [150, 95], to: [656, 286] },
  { n: '42,500', label: 'Copies', sub: 'printed, most of them driven', pos: s.bl, from: [335, 400], to: [506, 540] },
  { n: '438', label: 'Kopitiams', sub: 'visited, notebook open', pos: s.tr, from: [1060, 95], to: [660, 70] },
  { n: '1', label: 'Shop cat', sub: 'Ah Boy, Ipoh, asleep', pos: s.br, from: [1140, 400], to: [812, 396] },
]

// a kopitiam corner in red pencil: fan, marble table with a cup and this issue, a tied bundle of
// copies on the floor, two stools, and Ah Boy asleep on one of them
const scene = [
  // ceiling fan
  'M660 0v48', 'M620 52c10-8 70-8 80 0c-10 8-70 8-80 0z', 'M622 54c-60 0-120 8-170 16', 'M698 54c60 4 110 14 150 26', 'M660 58c-2 16-8 26-14 34',
  // marble table
  'M470 300c0-18 260-18 260 0s-260 18-260 0z', 'M472 302c0 6 256 6 256 0', 'M600 318v190', 'M592 318v190', 'M540 510c0-12 112-12 112 0',
  // kopitiam cup on its saucer, standing on the table top
  'M506 296c0-6 68-6 68 0s-68 6-68 0z', 'M516 268h48c-2 16-6 26-24 26s-22-10-24-26z', 'M516 268c0-4 48-4 48 0',
  'M564 274c11 0 11 15-2 15', 'M532 258c-3-6 3-9 0-14M548 258c-3-6 3-9 0-14',
  // two magazines stacked on the table, in perspective
  'M612 290l68-7 20 8-68 8z', 'M612 290v5l20 9v-5', 'M632 304l68-8v-5', 'M628 292l34-4M632 296l24-3',
  // a tied bundle of copies on the floor
  'M478 560v-32h56v32', 'M478 528l10-9h56l-10 9', 'M544 519v32l-10 9', 'M506 528v32M478 544h56', 'M520 519l-8 9',
  // left stool
  'M360 430c0-10 104-10 104 0s-104 10-104 0z', 'M366 438l-10 120M458 438l10 120M386 444l-4 114M438 444l4 114', 'M362 446c0-8 100-8 100 0',
  // right stool
  'M748 430c0-10 104-10 104 0s-104 10-104 0z', 'M754 438l-10 120M846 438l10 120M774 444l-4 114M826 444l4 114',
  // Ah Boy: loaf-shaped and asleep, round head at the front, tail curled round his paws
  'M744 394a16 15 0 1 1 32 0a16 15 0 1 1 -32 0',
  'M747 385L744 369L757 379', 'M767 379L776 367L777 385',
  'M750 395q4 3 8 0', 'M764 395q4 3 8 0', 'M760 401l2 2 2-2',
  'M774 400C790 391 838 392 848 426',
  'M748 405C744 415 748 424 760 426',
  'M848 426C860 432 858 444 842 442C820 440 796 442 776 437',
  'M756 426q7 4 14 0',
  // floor
  'M200 560c120 4 240-4 400 0s300 6 420-2',
]

export function Numbers() {
  const [ref, seen] = useInView<HTMLDivElement>()

  return (
    <section id="numbers" data-folio="14" className={s.numbers} aria-labelledby="numbers-title">
      <div className={s.head}>
        <h2 id="numbers-title" className={s.title}><span className="swash">B</span>y the numbers</h2>
        <p className={s.sub}>Seven years of a magazine, give or take a cat.</p>
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
