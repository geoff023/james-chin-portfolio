import { Link, useLocation, useNavigate } from 'react-router-dom'
import { EMAIL } from '../sections/Letters'
import { Cat, Kettle, KopiCup, Stools, useInView } from './Sketches'
import s from './Footer.module.css'

const focusChips = () =>
  document.querySelector<HTMLButtonElement>('[aria-label="Drink"] button')?.focus({ preventScroll: true })

export function Footer() {
  const [ref, seen] = useInView<HTMLDivElement>('0px')
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // The glass is empty by now (it drains as you read). Offer a refill: back to the cover, chips focused.
  function orderAnother() {
    if (pathname !== '/') {
      navigate('/')
      setTimeout(focusChips, 300)
      return
    }
    scrollTo({ top: 0 })
    setTimeout(focusChips, 900)
  }

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
            <li><Link to="/#letters">Write a letter</Link></li>
            <li><Link to="/#shelf">All issues</Link></li>
            <li><Link to="/" viewTransition onClick={() => scrollTo({ top: 0 })}>Back to cover ↑</Link></li>
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
