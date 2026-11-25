import { GlossaryTerm } from '../components/GlossaryTerm'
import { Misregistered } from '../components/Misregistered'
import { currentIssue } from '../data/issues'
import s from './EditorLetter.module.css'

// The founder's page: what every magazine opens with, and the plainest statement of who James is.
export function EditorLetter() {
  return (
    <section id="editor" data-folio="03" className={s.letter} aria-labelledby="editor-title">
      <div className={`label ${s.rule}`}>
        <span>01 — From the editor</span>
        <span>Issue {currentIssue.no}, {currentIssue.title}</span>
      </div>

      <div className={s.page}>
        <figure className={s.side}>
          <img
            src="/illustrations/james.webp"
            alt="Line drawing of James Chin reading a proof, a pen behind his ear."
            width={900}
            height={834}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="label">James Chin, founder &amp; editor. Ipoh, 1991.</figcaption>
        </figure>

        <div className={s.body}>
          <h2 id="editor-title" className={s.title}>
            <Misregistered>Dear reader,</Misregistered>
          </h2>
          <div className={s.columns}>
            <p className={s.lede}>
              In 2019 I printed sixteen pages about my father’s <GlossaryTerm word="kopitiam" /> and left
              them on tables around Ipoh. I wanted someone to write down what my family never did: how
              long the coffee sits on the charcoal, which uncle gets his cup first, why nobody ever
              orders it sweet enough to complain.
            </p>
            <p>
              Seven years and fourteen issues later, I still pick the drink, edit every word, set every
              page and drive the boxes to the bookshops myself. It is less sweet than running a design
              studio. It is also the only job I would get up at five for.
            </p>
            <p>
              This issue went somewhere new. We drove up to the highland tea estates, above the cloud
              line, to find out what teh O tastes like where it starts. It tastes like a cold morning.
              Turn the page.
            </p>
          </div>
          <p className={s.sign}>
            <span className={`hand ${s.signHand}`}>Kurang manis,</span>
            <span className={`hand ${s.signName}`}>James</span>
            <span className="label">Founder &amp; editor, <i>Kurang Manis</i></span>
          </p>
        </div>
      </div>

      <span className={`label ${s.folio}`} aria-hidden="true">03</span>
    </section>
  )
}
