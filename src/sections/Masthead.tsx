import { useEffect, useState } from 'react'
import { GlossaryTerm } from '../components/GlossaryTerm'
import { Misregistered } from '../components/Misregistered'
import { Portrait } from '../components/Sketches'
import s from './Masthead.module.css'

const drinking = ['Kopi C kosong', 'Teh O ais limau', 'Barley ais, no sugar', 'Kopi O gau', 'Bandung, for research']

// credits set like a real masthead: role, dotted leader, name. All names and awards are fictional.
const credits: { heading: string; rows: [string, string][] }[] = [
  {
    heading: 'Masthead',
    rows: [
      ['Founder & creative director', 'James Chin'],
      ['Managing editor', 'Nur Aisyah Rahim'],
      ['Photography', 'Lim Wei Han'],
      ['Production & distribution', 'Raj Kumar'],
      ['Contributors', 'A rotating cast'],
      ['Shop cat', 'Ah Boy'],
    ],
  },
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

export function Masthead() {
  const [n, setN] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setN((x) => (x + 1) % drinking.length), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="masthead" className={s.masthead} aria-labelledby="masthead-title">
      <div className={`label ${s.rule}`}>
        <span>05 — Masthead</span>
        <span>Four people and a cat</span>
      </div>

      <h2 id="masthead-title" className={s.title}>
        <Misregistered>
          <span className={s.swash}>M</span>asthead
        </Misregistered>
      </h2>

      <div className={s.spread}>
        <div className={s.colA}>
          <p className={s.dropcap}>
            I grew up above my parents’ <GlossaryTerm word="kopitiam" /> in Ipoh, drawing on the backs
            of order chits while the uncles argued about football.
          </p>
          <p>
            I studied graphic communication in KL, then spent six years in Singapore designing hotel
            menus and bank annual reports. I was good at it. I was also bored.
          </p>
        </div>

        <figure className={s.portrait}>
          <Portrait className={s.portraitArt} />
          <figcaption className={s.drinking}>
            <span className="label">Currently drinking</span>
            <span key={n} className={`hand ${s.drink}`}>{drinking[n]}</span>
          </figcaption>
        </figure>

        <div className={s.colB}>
          <p>
            In 2019 I riso-printed sixteen pages about my father’s shop and left 200 copies on tables
            around Ipoh. People kept them.
          </p>
          <p>
            A year later it was a quarterly: one drink per issue, three thousand copies, stocked from
            Penang to Tokyo. We are four people, a rotating cast of contributors, and a cat.
            I still order it <GlossaryTerm word="kurang manis" />.
          </p>
          <p className={`hand ${s.sign}`} aria-hidden="true">— James</p>
        </div>
      </div>

      <div className={s.credits}>
        {credits.map((g) => (
          <div key={g.heading} className={s.group}>
            <h3 className={`label ${s.groupHead}`}>{g.heading}</h3>
            <dl>
              {g.rows.map(([role, name]) => (
                <div key={role} className={s.row}>
                  <dt className={s.role}>{role}</dt>
                  <span className={s.leader} aria-hidden="true" />
                  <dd className={s.name}>{name}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <span className={`label ${s.folio}`} aria-hidden="true">30</span>
    </section>
  )
}
