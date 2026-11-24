import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Misregistered } from '../components/Misregistered'
import { issues, type Issue } from '../data/issues'
import { GlassPoster } from './GlassPoster'
import s from './Shelf.module.css'

// Every issue as a frosted cover. Picking one pours it into the glass on the cover.
export function Shelf({ active, onPick }: { active: Issue | null; onPick: (i: Issue) => void }) {
  const inPrint = issues.filter((i) => i.featured).length

  return (
    <section id="shelf" data-folio="08" className={s.shelf} aria-labelledby="shelf-title">
      <div className={`label ${s.rule}`}>
        <span>02 — The Shelf</span>
        <span>{issues.length} issues · {inPrint} in print</span>
      </div>

      <div className={s.head}>
        <h2 id="shelf-title" className={s.title}>
          <Misregistered>The Shelf</Misregistered>
        </h2>
        <p className={s.intro}>
          One drink per issue since 2019. Pick a cover and it gets poured into the glass up top.
        </p>
        {active && active.no !== issues[0].no && (
          <a href="#cover" className={`hand ${s.poured}`}>
            {active.drink}, poured. scroll up ↑
          </a>
        )}
      </div>

      <ol className={s.grid}>
        {issues.map((it, i) => {
          const pressed = active?.no === it.no
          return (
            <li key={it.no} className={i === 0 ? s.big : undefined}>
              <button
                type="button"
                className={s.card}
                style={{ '--tint': it.accent } as CSSProperties}
                aria-pressed={pressed}
                onClick={() => onPick(it)}
              >
                <span className={s.art} aria-hidden="true">
                  <GlassPoster liquid={it.glass.liquid} ice={it.glass.ice} />
                </span>
                <span className={s.frost} aria-hidden="true" />
                {/* the visible text is the button's name (WCAG 2.5.3), plus a hidden hint */}
                <span className={s.meta}>
                  <span className="label">No. {it.no} · {it.drink}</span>
                  <span className={s.cardTitle}>{it.title}</span>
                  <span className={s.cardLine}>{it.line}</span>
                  {!it.featured && <span className={s.soldNote}>Sold out. Ask your kopitiam uncle.</span>}
                  <span className="visually-hidden">{it.featured ? 'In print. ' : ''}Pour it into the glass.</span>
                </span>
                {!it.featured && <span className={s.stamp} aria-hidden="true">Sold out</span>}
                {pressed && <span className={`hand ${s.counter}`} aria-hidden="true">on the counter</span>}
              </button>
              <p className={`label ${s.caption}`}>
                <span aria-hidden="true">{it.no}</span>
                {it.featured ? (
                  <Link to={`/issues/${it.slug}`} viewTransition className={s.read}>
                    Read issue {it.no} <span aria-hidden="true">→</span>
                  </Link>
                ) : (
                  <span aria-hidden="true">{it.drink}</span>
                )}
              </p>
            </li>
          )
        })}
      </ol>

      <span className={`label ${s.folio}`} aria-hidden="true">08</span>
    </section>
  )
}
