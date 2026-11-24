import type { ComponentType, CSSProperties } from 'react'
import { Misregistered } from '../components/Misregistered'
import { CupSleeve, MenuBoard, Programme, Tote } from '../components/Sketches'
import { commissions } from '../data/commissions'
import s from './Commissions.module.css'

// sketch pair standing in for each project's photo until plan §9 F lands
const plates: Record<string, [ComponentType<{ className?: string }>, ComponentType<{ className?: string }>, string]> = {
  'hawker-futures': [Programme, Tote, 'Fig. 1: programme and tote, two inks, Penang'],
  'toast-and-kettle': [CupSleeve, MenuBoard, 'Fig. 2: cup sleeve and the one-page menu'],
}

// Client work, each laid out as a magazine spread: plate on one page, story on the other.
export function Commissions() {
  return (
    <section id="commissions" className={s.commissions} aria-labelledby="commissions-title">
      <div className={`label ${s.rule}`}>
        <span>04 — Commissions</span>
        <span>For people who sell drinks</span>
      </div>

      <div className={s.head}>
        <h2 id="commissions-title" className={s.title}>
          <Misregistered>Commissions</Misregistered>
        </h2>
        <p className={s.intro}>
          Between issues, James art-directs for cafés, drink brands and festivals. Same rule as the
          magazine: less sweet.
        </p>
      </div>

      <div className={s.list}>
        {commissions.map((c, i) => {
          const [A, B, caption] = plates[c.slug]
          return (
            <article
              key={c.slug}
              className={`${s.spread} ${i % 2 ? s.flip : ''}`}
              style={{ '--tint': c.tint } as CSSProperties}
              aria-labelledby={`${c.slug}-title`}
            >
              <figure className={s.plate}>
                {c.image ? (
                  <img src={c.image} alt="" loading="lazy" width={1600} height={1200} />
                ) : (
                  <div className={s.sketches} aria-hidden="true">
                    <A className={s.sketchA} />
                    <B className={s.sketchB} />
                  </div>
                )}
                <figcaption className={`label ${s.caption}`}>{caption}</figcaption>
                <span className={`label ${s.pageNo}`} aria-hidden="true">{c.page}</span>
              </figure>

              <div className={s.story}>
                <p className={`label ${s.kicker}`}>
                  Commission · {c.year} · {c.scope.join(' / ')}
                </p>
                <h3 id={`${c.slug}-title`} className={s.client}>{c.client}</h3>
                <p className={s.storyTitle}>{c.title}</p>
                <p className={s.brief}>{c.brief}</p>
                <ol className={s.did}>
                  {c.did.map((d) => <li key={d}>{d}</li>)}
                </ol>
                <dl className={s.facts}>
                  {c.facts.map(([k, v]) => (
                    <div key={k}>
                      <dt className="label">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <span className={`label ${s.pageNo}`} aria-hidden="true">{String(Number(c.page) + 1)}</span>
              </div>
            </article>
          )
        })}
      </div>

      <span className={`label ${s.folio}`} aria-hidden="true">24</span>
    </section>
  )
}
