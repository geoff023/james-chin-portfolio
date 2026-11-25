import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react'
import { GlossaryTerm } from '../components/GlossaryTerm'
import {
  Bubbles, Cat, FilmCamera, GridPage, handCircle, Kettle, MapPin, Myvi, Stools, TwoCups, useInView,
} from '../components/Sketches'
import s from './Process.module.css'

const steps: { title: string; short: string; body: ReactNode; note: string; Art: ComponentType<{ className?: string }> }[] = [
  {
    title: 'The Drink', short: 'Pick one. Argue for a month.',
    body: 'Four of us, one table, a month of arguing about which drink gets the next issue. I get the deciding vote, and the blame. Whoever loses has to find out why they were wrong.',
    note: 'bandung won 3–1', Art: TwoCups,
  },
  {
    title: 'Tasting Trip', short: 'Two weeks, a notebook, a film camera.',
    body: 'Two weeks on the road from Ipoh to wherever the drink is best. I order the same thing at every stall and write it down twice: before it arrives, and after.',
    note: '47 glasses. 2 regrets.', Art: MapPin,
  },
  {
    title: 'Interviews', short: 'Owners, regulars, the uncle with opinions.',
    body: <>Stall owners, the regulars at 6am, and the one uncle at every <GlossaryTerm word="kopitiam">shop</GlossaryTerm> who has opinions. I record everything and print the parts nobody would put on a menu.</>,
    note: 'mostly the uncle', Art: Bubbles,
  },
  {
    title: 'The Shoot', short: 'One roll per location. No reshoots.',
    body: 'One roll of film per shop, so nobody poses for long and the tea is still hot. If the frame is soft, it runs soft.',
    note: '36 frames, 1 keeper', Art: FilmCamera,
  },
  {
    title: 'Layout', short: 'I set every page. Twelve columns, broken on purpose.',
    body: 'I lay out every spread myself, on a 12-column grid, then break it wherever the story needs room: a photo bleeding off, a pull quote in the gutter, a fold-out for the pour.',
    note: 'the grid is a suggestion', Art: GridPage,
  },
  {
    title: 'Press', short: 'Riso and offset. Folded by hand.',
    body: <>Covers on the riso, insides offset at a print shop in Ipoh. Folded by hand on the shop floor, then I drive them in a <GlossaryTerm word="Myvi" /> to every stockist I can reach.</>,
    note: 'the boot fits 400 copies', Art: Myvi,
  },
]

export function Process() {
  const [open, setOpen] = useState(0)
  const [listRef, seen] = useInView<HTMLOListElement>()
  const [scatterRef, scatterSeen] = useInView<HTMLDivElement>()
  const section = useRef<HTMLElement>(null)

  // the dashed path draws as the list scrolls past (CSS reads --p)
  useEffect(() => {
    const el = section.current!
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '1')
      return
    }
    let raf = 0
    const update = () => {
      raf = 0
      const list = el.querySelector('ol')!.getBoundingClientRect()
      const p = (innerHeight * 0.7 - list.top) / list.height
      el.style.setProperty('--p', Math.min(1, Math.max(0, p)).toFixed(3))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    onScroll() // first measure on the next frame, not inside React's commit (avoids a forced reflow)
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => {
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="process" data-folio="16" ref={section} className={s.process} aria-labelledby="process-title">

      <div className={s.head}>
        <h2 id="process-title" className={s.title}>
          <span><span className="swash">H</span>ow I make</span>
          <span className={s.title2}>an issue</span>
        </h2>
        <p className={s.intro}>
          Every issue starts the same way: someone orders a drink and won’t stop talking about it. Usually me. Then it takes six steps and about four months.
        </p>
        <Kettle className={s.kettle} />
      </div>

      <div className={s.listWrap}>
        <svg className={s.path} viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden="true">
          <path d="M20 0 C34 120 6 200 20 330 S34 520 18 660 S8 860 20 1000" />
        </svg>
        <ol ref={listRef} className={`${s.list} ${seen ? s.seen : ''}`}>
          {steps.map((st, i) => {
            const isOpen = open === i
            const id = `step-${i}`
            return (
              <li key={st.title} className={`${s.row} ${isOpen ? s.open : ''}`}>
                <h3 className={s.rowHead}>
                  <button
                    type="button"
                    className={s.toggle}
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className={s.num} aria-hidden="true">
                      <svg viewBox="0 0 100 100">
                        <path d={handCircle(i + 3)} pathLength={1} style={{ transitionDelay: `${0.15 * i}s` }} />
                      </svg>
                      {i + 1}
                    </span>
                    <span className={s.stepTitle}>{st.title}</span>
                    <span className={s.short}>{st.short}</span>
                    <span className={s.plus} aria-hidden="true" />
                  </button>
                </h3>
                <div id={id} className={s.panel} role="region" aria-label={st.title} inert={!isOpen}>
                  <div className={s.panelInner}>
                    <div className={s.disc} aria-hidden="true">
                      <st.Art className={s.art} />
                    </div>
                    <p className={s.body}>{st.body}</p>
                    <p className={`hand ${s.note}`} aria-hidden="true">{st.note}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      <div ref={scatterRef} className={`${s.scatter} ${scatterSeen ? s.seen : ''}`} aria-hidden="true">
        <Stools className={s.stools} />
        <Stools className={s.stools} />
        <Cat className={s.cat} />
      </div>

      <span className={`label ${s.folio}`} aria-hidden="true">16</span>
    </section>
  )
}
