import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { issues, type Issue } from '../data/issues'
import s from './Shelf.module.css'

// Every issue as a frosted cover. In-print covers open the issue; a "Pour it" stamp (or any
// sold-out cover) pours that drink into the glass on the cover.
export function Shelf({ active, onPick }: { active: Issue | null; onPick: (i: Issue) => void }) {
  const inPrint = issues.filter((i) => i.featured).length

  return (
    <section id="shelf" data-folio="08" className={s.shelf} aria-labelledby="shelf-title">

      <div className={s.head}>
        <h2 id="shelf-title" className={s.title}>
          <span className="swash">T</span>he Shelf
        </h2>
        <p className={s.intro}>
          Everything I’ve published since 2019: {issues.length} issues, one drink each, {inPrint} still in
          print. Open a cover to read the issue, or hit <i>Pour it</i> and I’ll pour that drink into the
          glass up top.
        </p>
        {active && active.no !== issues[0].no && (
          <a href="#cover" className={`hand ${s.poured}`}>
            {active.drink} is in the glass up top
          </a>
        )}
      </div>

      <ol className={s.grid}>
        {issues.map((it, i) => {
          const pressed = active?.no === it.no
          return (
            <li key={it.no} className={i < 2 ? s.big : undefined}>{/* this issue + last issue lead */}
              <div className={`${s.coverWrap} ${pressed ? s.picked : ''}`} style={{ '--tint': it.accent } as CSSProperties}>
              <Cover issue={it} onPick={onPick} pressed={pressed}>
                <span className={s.art} aria-hidden="true">
                  <img
                    src={`/images/drinks/${it.no}.webp`}
                    srcSet={`/images/drinks/${it.no}-560.webp 560w, /images/drinks/${it.no}.webp 900w`}
                    sizes="(max-width: 767px) 72vw, (max-width: 1279px) 46vw, 25vw"
                    alt="" width={900} height={1125} loading="lazy" decoding="async"
                  />
                </span>
                <span className={s.frost} aria-hidden="true" />
                {/* the visible text is the button's name (WCAG 2.5.3), plus a hidden hint */}
                <span className={s.meta}>
                  <span className="label">No. {it.no}, {it.drink}</span>
                  <span className={s.cardTitle}>{it.title}</span>
                  <span className={s.cardLine}>{it.line}</span>
                  {!it.featured && <span className={s.soldNote}>Sold out. Ask your kopitiam uncle.</span>}
                  <span className="visually-hidden">{it.featured ? 'Read the issue.' : 'Sold out. Pour it into the glass.'}</span>
                </span>
                {!it.featured && <span className={s.stamp} aria-hidden="true">Sold out</span>}
                {pressed && <span className={`hand ${s.counter}`} aria-hidden="true">on the counter</span>}
              </Cover>
              {it.featured && (
                <button
                  type="button"
                  className={`label ${s.pour}`}
                  aria-pressed={pressed}
                  aria-label={`Pour ${it.drink} into the glass`}
                  onClick={() => onPick(it)}
                >
                  Pour it
                </button>
              )}
              </div>
              <p className={`label ${s.caption}`} aria-hidden="true">
                <span>{it.no}</span>
                <span className={it.featured ? s.inPrint : undefined}>{it.featured ? 'Read the issue' : it.drink}</span>
              </p>
            </li>
          )
        })}
      </ol>
      {/* phones get a sideways row; say there is more of it */}
      <p className={`label ${s.swipe}`} aria-hidden="true">Swipe for all {issues.length} issues</p>

      <span className={`label ${s.folio}`} aria-hidden="true">08</span>
    </section>
  )
}

// In-print issues: the cover is a link to the case study. Sold out: the cover pours the drink.
function Cover({ issue, pressed, onPick, children }: { issue: Issue; pressed: boolean; onPick: (i: Issue) => void; children: ReactNode }) {
  if (issue.featured) {
    return (
      <Link to={`/issues/${issue.slug}`} viewTransition className={s.card}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className={s.card} aria-pressed={pressed} onClick={() => onPick(issue)}>
      {children}
    </button>
  )
}
