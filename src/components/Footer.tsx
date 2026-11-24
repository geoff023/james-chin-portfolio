import { EMAIL } from '../sections/Letters'
import { Cat, Kettle, KopiCup, Stools, useInView } from './Sketches'
import s from './Footer.module.css'

// The glass is empty by now (it drains as you read). Offer a refill: back to the cover, chips focused.
function orderAnother() {
  scrollTo({ top: 0 })
  setTimeout(() => document.querySelector<HTMLButtonElement>('[aria-label="Drink"] button')?.focus({ preventScroll: true }), 900)
}

export function Footer() {
  const [ref, seen] = useInView<HTMLDivElement>('0px')

  return (
    <footer className={s.footer}>
      <div className={s.top}>
        <p className={s.finished}>
          Finished already?
          <span className={`hand ${s.empty}`} aria-hidden="true">(the glass up top ran dry)</span>
        </p>
        <button type="button" className={s.another} onClick={orderAnother}>
          Order another ↑
        </button>
      </div>

      <div className={s.colophon}>
        <div>
          <h2 className={`label ${s.head}`}>Colophon</h2>
          <p>
            Set in Instrument Serif &amp; Archivo, with Pinyon Script for the capitals that show off.
            Printed on pixels in Kuala Lumpur.
          </p>
        </div>
        <div>
          <h2 className={`label ${s.head}`}>Elsewhere</h2>
          <ul className={s.links}>
            <li><a href={`mailto:${EMAIL}`}>Email</a></li>
            <li><a href="#letters">Write a letter</a></li>
            <li><a href="#cover">Back to cover ↑</a></li>
          </ul>
        </div>
        <div>
          <h2 className={`label ${s.head}`}>Small print</h2>
          <p>
            James Chin and <i>Kurang Manis</i> are fictional, and so is every client, award and
            stockist on this page. The drinks are real.
          </p>
        </div>
      </div>

      <div ref={ref} className={`${s.objects} ${seen ? s.seen : ''}`} aria-hidden="true">
        <Stools className={s.o1} />
        <KopiCup className={s.o2} />
        <Kettle className={s.o3} />
        <Stools className={s.o4} />
        <Cat className={s.o5} />
      </div>
    </footer>
  )
}
