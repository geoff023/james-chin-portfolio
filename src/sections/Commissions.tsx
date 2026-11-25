import type { CSSProperties } from 'react'
import { commissions } from '../data/commissions'
import s from './Commissions.module.css'

const captions: Record<string, string> = {
  'hawker-futures': 'Fig. 1: programme and tote, two inks, Penang',
  'toast-and-kettle': 'Fig. 2: cup sleeve and the one-page menu',
}

// Client work, each laid out as a magazine spread: plate on one page, story on the other.
export function Commissions() {
  return (
    <section id="commissions" data-folio="24" className={s.commissions} aria-labelledby="commissions-title">

      <div className={s.head}>
        {/* opener: a standfirst sentence instead of a title */}
        <h2 id="commissions-title" className={s.title}>
          Between issues I art-direct for cafés, drink brands and festivals.
        </h2>
        <p className={s.intro}>
          The studio side pays for the printing. The rule is the same as the magazine’s: less sweet.
        </p>
      </div>

      <div className={s.list}>
        {commissions.map((c, i) => {
          const caption = captions[c.slug]
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
                ) : c.cutouts && (
                  // the real pieces, laid on the plate like a flat-lay: programme behind, tote in front
                  <div className={`${s.sketches} ${c.cutoutsTall ? s.tall : ''}`} aria-hidden="true">
                    <img className={`${s.cutout} ${s.cutBack}`} src={c.cutouts[0]} alt="" loading="lazy" decoding="async" />
                    <img className={`${s.cutout} ${s.cutFront}`} src={c.cutouts[1]} alt="" loading="lazy" decoding="async" />
                  </div>
                )}
                <figcaption className={`label ${s.caption}`}>{caption}</figcaption>
                <span className={`label ${s.pageNo}`} aria-hidden="true">{c.page}</span>
              </figure>

              <div className={s.story}>
                <p className={`label ${s.kicker}`}>
                  {c.year}: {c.scope.join(', ').toLowerCase()}
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
