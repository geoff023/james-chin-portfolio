import { lazy, Suspense, useEffect, type ComponentType, type CSSProperties } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useShared } from '../App'
import { Misregistered } from '../components/Misregistered'
import {
  Bubbles, Cat, FilmCamera, GridPage, Kettle, KopiCup, MagStack, MapPin, Stools, TwoCups,
} from '../components/Sketches'
import { caseStudies, type Sketch } from '../data/caseStudies'
import { issues, type Issue } from '../data/issues'
import { NotFound } from './NotFound'
import s from './Issue.module.css'

const TeaPull = lazy(() => import('../components/TeaPull'))

const art: Record<Sketch, ComponentType<{ className?: string }>> = {
  cup: KopiCup, stack: MagStack, grid: GridPage, camera: FilmCamera, kettle: Kettle,
  cat: Cat, stools: Stools, pin: MapPin, bubbles: Bubbles, cups: TwoCups,
}

// the four in-print issues in print order; "continued on page" walks through them
const inPrint = issues.filter((i) => i.featured).sort((a, b) => a.no.localeCompare(b.no))
const pg = (start: string, add: number) => String(Number(start) + add)

// a small magazine cover in the issue's colour
function CoverMock({ issue, coverLine }: { issue: Issue; coverLine: boolean }) {
  return (
    <div className={s.cover} aria-hidden="true">
      <span className={s.coverMast}>Kurang Manis</span>
      <span className={`label ${s.coverNo}`}>No. {issue.no}</span>
      <img className={s.coverPhoto} src={`/images/drinks/${issue.no}.webp`} alt="" width={900} height={1125} />
      {coverLine && <span className={s.coverLine}>{issue.title}</span>}
    </div>
  )
}

export default function IssuePage() {
  const { slug = '' } = useParams()
  const { setIssue, setOrder } = useShared()
  const issue = inPrint.find((i) => i.slug === slug)
  const cs = caseStudies[slug]

  // visiting an issue pours it into the glass and tints the page
  useEffect(() => {
    if (!issue) return
    setIssue(issue)
    setOrder(null)
    document.title = `${issue.title}: Kurang Manis, Issue ${issue.no} — James Chin`
    return () => { document.title = 'James Chin — Founder & Editor, Kurang Manis' }
  }, [issue, setIssue, setOrder])

  if (!issue || !cs) return <NotFound />

  const next = inPrint[(inPrint.indexOf(issue) + 1) % inPrint.length]
  const nextCs = caseStudies[next.slug]

  return (
    <article className={s.issue} style={{ '--tint': issue.accent } as CSSProperties} aria-labelledby="issue-title">
      <section className={s.hero} data-folio={cs.page}>
        <div className={s.heroText}>
          <Link to="/#shelf" className={`label ${s.back}`}>Back to the Shelf</Link>
          <p className={`label ${s.kicker}`}>Kurang Manis, issue {issue.no}</p>
          <h1 id="issue-title" className={s.title}>
            <Misregistered>{issue.title}</Misregistered>
          </h1>
          <p className={s.drink}>
            {issue.drink} <span>/ {issue.drinkEn}</span>
          </p>
        </div>
        <CoverMock issue={issue} coverLine={slug !== 'the-6am-shift'} />
      </section>

      <section className={s.block} data-folio={pg(cs.page, 2)} aria-labelledby="brief">
        <h2 id="brief" className={s.rule}>The brief</h2>
        <div className={s.briefRow}>
          {/* a real span for the drop cap: Chrome drops ::first-letter floats into column two of a multicol box */}
          <p className={s.brief}>
            <span className={s.cap} aria-hidden="true">{cs.brief[0]}</span>
            <span className="visually-hidden">{cs.brief[0]}</span>
            {cs.brief.slice(1)}
          </p>
          <p className={`hand ${s.note}`}>
            <svg viewBox="0 0 60 40" className={s.noteArrow} aria-hidden="true">
              <path d="M56 6c-16 2-36 10-48 26" />
              <path d="M6 20l2 13 12-3" />
            </svg>
            {cs.note}
            <span className={s.noteSign}>— J.</span>
          </p>
        </div>
        <dl className={s.roleRow}>
          <div>
            <dt className="label">My role</dt>
            <dd>
              <ul className={s.roles}>
                {cs.role.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="label">What happened</dt>
            <dd className={s.outcome}>{cs.outcome}</dd>
          </div>
        </dl>
      </section>

      <section className={s.block} data-folio={pg(cs.page, 4)} aria-labelledby="decisions">
        <h2 id="decisions" className={s.rule}>Three things we argued about</h2>
        <ol className={s.decisions}>
          {cs.decisions.map((d) => {
            const Art = art[d.art]
            return (
              <li key={d.label} className={s.decision}>
                <span className={s.disc} aria-hidden="true"><Art /></span>
                <h2 className={s.decisionLabel}>{d.label}</h2>
                <p>{d.text}</p>
              </li>
            )
          })}
        </ol>
      </section>

      {slug === 'the-long-pull' && (
        <section className={s.block} data-folio={pg(cs.page, 6)} aria-labelledby="pull">
          <h2 id="pull" className={s.rule}>Pull the tea <span className={s.ruleNote}>Drag the top mug up, or hold the up arrow key.</span></h2>
          <Suspense fallback={<p className="hand">Warming the mugs…</p>}>
            <TeaPull />
          </Suspense>
        </section>
      )}

      <section className={s.block} data-folio={pg(cs.page, 8)} aria-labelledby="spreads">
        <h2 id="spreads" className={s.rule}>Spreads</h2>
        <div className={s.spreads}>
          {cs.spreads.map((sp, i) => {
            const Art = art[sp.art]
            return (
              <figure key={sp.caption} className={`${s.plate} ${s[`p${i}`]}`}>
                <div className={s.plateArt}>
                  {sp.photo ? (
                    <img src={sp.photo} alt={sp.caption.replace(/^Fig\. \d+: /, '')} loading="lazy" />
                  ) : (
                    <Art className={s.plateSketch} />
                  )}
                </div>
                <figcaption className={`label ${s.caption}`}>{sp.caption}</figcaption>
              </figure>
            )
          })}
        </div>
      </section>

      <section className={s.block} data-folio={pg(cs.page, 10)} aria-labelledby="facts">
        <div className={s.factBox}>
          <h2 id="facts" className={s.factHead}>Fact box</h2>
          <dl className={s.facts}>
            {cs.facts.map(([k, v]) => (
              <div key={k}>
                <dt className="label">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <nav className={s.next} aria-label="Next issue">
        <Link to={`/issues/${next.slug}`} viewTransition className={s.nextLink}>
          <span className="label">Continued on page {nextCs.page}</span>
          <span className={s.nextTitle}>{next.title}</span>
          <span className={s.nextDrink}>Issue {next.no}, {next.drink}</span>
        </Link>
        <Link to="/#shelf" className={`label ${s.back}`}>Back to the Shelf</Link>
      </nav>
    </article>
  )
}
