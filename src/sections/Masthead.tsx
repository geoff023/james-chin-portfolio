import { useEffect, useState } from 'react'
import { GlossaryTerm } from '../components/GlossaryTerm'
import { Misregistered } from '../components/Misregistered'
import s from './Masthead.module.css'

// The masthead page: reference, not story (the story is in the editor's letter).
// Credits set like a real masthead: role, dotted leader, name. All names and awards are fictional.

const drinking = ['Kopi C kosong', 'Teh O ais limau', 'Barley ais, no sugar', 'Kopi O gau', 'Bandung, for research']

const team: [string, string][] = [
  ['Founder & editor', 'James Chin'],
  ['Managing editor', 'Nur Aisyah Rahim'],
  ['Photography', 'Lim Wei Han'],
  ['Production & distribution', 'Raj Kumar'],
  ['Contributors', 'A rotating cast, mostly people who disagreed with us'],
  ['Printed by', 'A riso shop and an offset press, Ipoh'],
  ['Delivered by', 'One Myvi'],
  ['Shop cat', 'Ah Boy'],
]

const timeline: [string, React.ReactNode][] = [
  ['1991', <>Born in Ipoh, above his parents’ <GlossaryTerm word="kopitiam" /></>],
  ['2009–13', 'Graphic communication, Kuala Lumpur'],
  ['2013–19', 'Hotel menus and bank annual reports, a branding agency in Singapore'],
  ['2019', 'Issue 00: sixteen riso pages about his father’s shop, 200 copies left on tables'],
  ['2020', <><i>Kurang Manis</i> goes quarterly. One drink per issue.</>],
  ['2024', 'Best Debut Series, Asia Indie Print Fair'],
  ['2026', <>Issue 13, <i>Above the Clouds</i>. Largest run yet.</>],
]

const lists: { heading: string; rows: [string, string][] }[] = [
  {
    heading: 'Recognition',
    rows: [
      ['Asia Indie Print Fair 2024', 'Best Debut Series'],
      ['Paper City Review', '“One of 10 magazines worth carrying home”'],
    ],
  },
  {
    heading: 'Stocked in',
    rows: [
      ['Malaysia', 'Kuala Lumpur, Penang, Ipoh'],
      ['Singapore', 'Tiong Bahru, Joo Chiat'],
      ['Taiwan', 'Taipei'],
      ['Japan', 'Tokyo'],
    ],
  },
]

function Credit({ role, children }: { role: string; children: React.ReactNode }) {
  return (
    <div className={s.row}>
      <dt className={s.role}>{role}</dt>
      <span className={s.leader} aria-hidden="true" />
      <dd className={s.name}>{children}</dd>
    </div>
  )
}

export function Masthead() {
  const [n, setN] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setN((x) => (x + 1) % drinking.length), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="masthead" data-folio="30" className={s.masthead} aria-labelledby="masthead-title">

      <h2 id="masthead-title" className={s.title}>
        <Misregistered>
          <span className={s.swash}>M</span>asthead
        </Misregistered>
      </h2>

      <div className={s.page}>
        <div className={s.team}>
          <h3 className={`label ${s.groupHead}`}>This issue, the people</h3>
          <dl className={s.list}>
            {team.map(([role, name], i) => (
              <Credit key={role} role={role}>
                {name}
                {i === 0 && (
                  <span className={s.drinking}>
                    <span className="label">currently drinking</span>{' '}
                    <span key={n} className={`hand ${s.drink}`}>{drinking[n]}</span>
                  </span>
                )}
              </Credit>
            ))}
          </dl>
        </div>

        <div className={s.brief}>
          <h3 className={`label ${s.groupHead}`}>James, in brief</h3>
          <ol className={s.timeline}>
            {timeline.map(([year, what]) => (
              <li key={year}>
                <span className={s.year}>{year}</span>
                <span className={s.what}>{what}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className={s.lists}>
        {lists.map((g) => (
          <div key={g.heading}>
            <h3 className={`label ${s.groupHead}`}>{g.heading}</h3>
            <dl className={s.list}>
              {g.rows.map(([role, name]) => <Credit key={role} role={role}>{name}</Credit>)}
            </dl>
          </div>
        ))}
      </div>

      <span className={`label ${s.folio}`} aria-hidden="true">30</span>
    </section>
  )
}
