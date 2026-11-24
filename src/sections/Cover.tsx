import { Misregistered } from '../components/Misregistered'
import { currentIssue } from '../data/issues'
import { GlassPoster } from './GlassPoster'
import s from './Cover.module.css'

export function Cover() {
  return (
    <section id="cover" className={s.cover} aria-labelledby="cover-title">
      <div className={`label ${s.dateline}`}>
        <span>Portfolio</span>
        <span>Creative direction · Editorial design · Print</span>
        <span>Ipoh / Kuala Lumpur</span>
      </div>

      <h1 id="cover-title" className={s.wordmark}>
        <Misregistered className={s.line1}>
          <span className={s.swash}>J</span>ames
        </Misregistered>
        <Misregistered className={s.line2}>Chin.</Misregistered>
      </h1>

      <div className={s.intro}>
        <p>
          Founder and creative director of <em>Kurang Manis</em>, a print quarterly about what
          Southeast Asia drinks. One drink per issue, three thousand copies, read on kopitiam tables.
        </p>
        <p>Also makes menus, identities and festival programmes for people who sell drinks.</p>
        <a href="#letters" className={`label ${s.cta}`}>Taking commissions for 2027 ↘</a>
      </div>

      <figure className={s.glass}>
        <GlassPoster />
        <figcaption className="visually-hidden">
          A tall glass of bandung, pink rose-syrup milk with ice and a red straw.
        </figcaption>
      </figure>

      <p className={`hand ${s.hint}`} aria-hidden="true">
        go on, tilt it
        <svg viewBox="0 0 80 60" className={s.arrow}>
          <path pathLength="1" d="M4 50c20 0 42-10 56-40" />
          <path pathLength="1" d="M47 14l13-4 3 13" />
        </svg>
      </p>

      <p className={s.coverline}>
        <span className="label">Latest work · Kurang Manis, Issue {currentIssue.no}</span>
        <Misregistered as="span" className={s.issueTitle}>{currentIssue.title}</Misregistered>
        <span className={s.issueDrink}>
          {currentIssue.drink}, <i>{currentIssue.drinkEn}</i>
        </span>
      </p>

      <span className={`label ${s.folio}`} aria-hidden="true">01</span>
    </section>
  )
}
