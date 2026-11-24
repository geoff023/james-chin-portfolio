import { useId, type ReactNode } from 'react'
import { glossary } from '../data/glossary'
import { KopiCup } from './Sketches'
import s from './GlossaryTerm.module.css'

// Dotted-underline drink word; hover or focus shows a small card. Esc hides it (blurs).
export function GlossaryTerm({ word, children }: { word: string; children?: ReactNode }) {
  const id = useId()
  const g = glossary[word]
  if (!g) return <>{children ?? word}</>

  return (
    <span
      className={s.term}
      tabIndex={0}
      aria-describedby={id}
      onKeyDown={(e) => e.key === 'Escape' && e.currentTarget.blur()}
    >
      <i>{children ?? word}</i>
      <span id={id} role="tooltip" className={s.card}>
        <KopiCup className={s.sketch} />
        <span className={s.word}>{word}</span>
        {g.say && <span className={s.say}>{g.say}</span>}
        <span className={s.meaning}>{g.meaning}</span>
      </span>
    </span>
  )
}
