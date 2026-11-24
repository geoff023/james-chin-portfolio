import { GlossaryTerm } from '../components/GlossaryTerm'
import { KopiCup, MagStack } from '../components/Sketches'
import s from './Statement.module.css'

// Manifesto (staggered serif lines) + the wide statement band with sketch "pills" in the line.
export function Statement() {
  return (
    <section id="statement" data-folio="12" className={s.statement} aria-label="What Kurang Manis is about">
      <div className={`label ${s.rule}`}>
        <span>— On sugar</span>
        <span>The magazine’s one rule</span>
      </div>

      <div className={s.manifesto}>
        <p className={s.lines}>
          <span className={s.l1}>Ordering a drink is a small act</span>
          <span className={s.l2}>of telling someone who you are.</span>
          <span className={s.l3}>Kurang manis. Less sweet.</span>
          <span className={s.l4}>More honest.</span>
        </p>
        <p className={s.aside}>
          It’s how Malaysians order: <GlossaryTerm word="kurang manis" />, less sugar, please. It
          became the magazine’s one editorial rule. Warm, a bit dry, never sugary.
        </p>
      </div>

      <p className={s.band}>
        <span className={s.cap}>E</span>very issue starts with
        <span className={s.pill} style={{ background: 'color-mix(in srgb, var(--issue-accent) 45%, var(--paper))' }}>
          <KopiCup />
        </span>
        one drink and ends with
        <span className={s.pill} style={{ background: 'color-mix(in srgb, var(--riso-blue) 45%, var(--paper))' }}>
          <MagStack />
        </span>
        3,000 copies, folded by hand.
      </p>

      <span className={`label ${s.folio}`} aria-hidden="true">12</span>
    </section>
  )
}
