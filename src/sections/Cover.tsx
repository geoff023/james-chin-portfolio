import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Misregistered } from '../components/Misregistered'
import { OrderBuilder } from '../components/OrderBuilder'
import { currentIssue, type Issue } from '../data/issues'
import { drinkFor, orderName, type Order } from '../data/order'
import { GlassStage } from './GlassStage'
import s from './Cover.module.css'

// The home page opens on the current issue's cover, built in layers that scroll at different speeds:
// clouds (slowest), masthead, hills (rise over the masthead), then cover lines, glass, order strip.
// One scroll-driven CSS variable (--p, 0..1) moves them all.
export function Cover({ issue, order, onOrder }: { issue: Issue; order: Order | null; onOrder: (o: Order) => void }) {
  const ref = useRef<HTMLElement>(null)
  const drink = order ? drinkFor(order) : issue.glass
  const label = order
    ? `A glass of ${orderName(order)}`
    : `A glass of ${issue.drink.toLowerCase()}, ${issue.drinkEn}`

  // the order slip wraps to more rows on narrower screens; keep the cover card and glass above it
  useEffect(() => {
    const el = ref.current!
    const slip = el.querySelector<HTMLElement>(`.${s.strip}`)!
    const ro = new ResizeObserver(() => el.style.setProperty('--strip-h', `${slip.offsetHeight}px`))
    ro.observe(slip)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = ref.current!
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '0.3') // a still, layered cover
      return
    }
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const run = Math.max(1, r.height - innerHeight * 0.6)
      el.style.setProperty('--p', Math.min(1, Math.max(0, -r.top / run)).toFixed(4))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => {
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section ref={ref} id="cover" data-folio="01" className={s.cover} aria-labelledby="cover-title">
      <div className={s.stage}>
        <div className={s.scene}>
          <div className={s.sky} aria-hidden="true" />
          <img className={s.clouds} src="/images/cover/clouds.webp" alt="" width={1199} height={430} fetchPriority="high" />
          <div className={`label ${s.dateline}`}>
            <span>Vol. 07, No. {currentIssue.no}</span>
            <span>A quarterly about what Southeast Asia drinks</span>
            <span>November 2026, RM 28</span>
          </div>
          <h1 id="cover-title" className={s.masthead}>
            <Misregistered>Kurang Manis</Misregistered>
            <span className="visually-hidden">, the magazine James Chin started and still makes</span>
          </h1>
          <img className={s.hills} src="/images/cover/hills.webp" alt="" width={1199} height={281} />
          <div className={s.ground} aria-hidden="true" />
          <div className={s.halftone} aria-hidden="true" />

          <GlassStage className={s.glass} drink={drink} label={label} />
        </div>

        <div className={s.front}>
          {/* cover flash: the issue, then who makes it */}
          <div className={s.flash}>
            <p className={`label ${s.flashKicker}`}>Issue {currentIssue.no}, out now</p>
            <Link to={`/issues/${currentIssue.slug}`} viewTransition className={s.flashTitle}>
              <Misregistered>{currentIssue.title}</Misregistered>
            </Link>
            <p className={s.flashDrink}>{currentIssue.drink}, <i>{currentIssue.drinkEn}</i></p>
            <hr className={s.flashRule} />
            <p className={`label ${s.byline}`}>James Chin, founder &amp; editor</p>
            <p className={s.oneLiner}>
              I started <em>Kurang Manis</em> in 2019, a print quarterly about what Southeast Asia
              drinks. I still make every issue: I pick the drink, edit the words, design the pages
              and drive the boxes.
            </p>
            <p className={s.ctas}>
              <a href="#shelf" className={`label ${s.cta}`}>Read the issues</a>
              <a href="#letters" className={`label ${s.ctaGhost}`}>Write to the editor</a>
            </p>
          </div>

          <div className={s.strip}>
            <OrderBuilder order={order} onChange={onOrder} layout="strip" />
          </div>
        </div>
      </div>
    </section>
  )
}
