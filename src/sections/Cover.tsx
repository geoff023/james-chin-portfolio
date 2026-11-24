import { Link } from 'react-router-dom'
import { Misregistered } from '../components/Misregistered'
import { GlossaryTerm } from '../components/GlossaryTerm'
import { OrderBuilder } from '../components/OrderBuilder'
import { currentIssue, type Issue } from '../data/issues'
import { drinkFor, orderName, type Order } from '../data/order'
import { GlassStage } from './GlassStage'
import s from './Cover.module.css'

// The glass pours whatever was ordered last, else the issue picked on the Shelf.
export function Cover({ issue, order, onOrder }: { issue: Issue; order: Order | null; onOrder: (o: Order) => void }) {
  const drink = order ? drinkFor(order) : issue.glass
  const label = order
    ? `A glass of ${orderName(order)}`
    : `A glass of ${issue.drink.toLowerCase()}, ${issue.drinkEn}`

  return (
    <section id="cover" data-folio="01" className={s.cover} aria-labelledby="cover-title">
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
          Southeast Asia drinks. One drink per issue, three thousand copies, read on <GlossaryTerm word="kopitiam" /> tables.
        </p>
        <p>Also makes menus, identities and festival programmes for people who sell drinks.</p>
        <a href="#letters" className={`label ${s.cta}`}>Taking commissions for 2027 ↘</a>
      </div>

      <GlassStage className={s.glass} drink={drink} label={label} />

      <div className={s.order}>
        <OrderBuilder order={order} onChange={onOrder} />
      </div>

      <p className={`hand ${s.hint}`} aria-hidden="true">
        go on, tilt it
        <svg viewBox="0 0 80 60" className={s.arrow}>
          <path pathLength="1" d="M4 50c20 0 42-10 56-40" />
          <path pathLength="1" d="M47 14l13-4 3 13" />
        </svg>
      </p>

      <p className={s.coverline}>
        <span className="label">Latest work · Kurang Manis, Issue {currentIssue.no}</span>
        <Link to={`/issues/${currentIssue.slug}`} viewTransition className={s.issueLink}>
          <Misregistered as="span" className={s.issueTitle}>{currentIssue.title}</Misregistered>
        </Link>
        <span className={s.issueDrink}>
          {currentIssue.drink}, <i>{currentIssue.drinkEn}</i>
        </span>
      </p>

      <span className={`label ${s.folio}`} aria-hidden="true">01</span>
    </section>
  )
}
