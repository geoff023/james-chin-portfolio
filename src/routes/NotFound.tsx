import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Misregistered } from '../components/Misregistered'
import { KopiCup } from '../components/Sketches'
import s from './NotFound.module.css'

export function NotFound() {
  useEffect(() => {
    document.title = 'Too sweet. Sent back. — James Chin'
    return () => { document.title = 'James Chin — Founder & Editor, Kurang Manis' }
  }, [])

  return (
    <section className={s.notFound} data-folio="404" aria-labelledby="nf-title">
      <KopiCup className={s.cup} />
      <p className="label">Error 404: page not found</p>
      <h1 id="nf-title" className={s.title}>
        <Misregistered>Too sweet.</Misregistered>
        <Misregistered className={s.l2}>Sent back.</Misregistered>
      </h1>
      <p className={s.copy}>This page was too sweet. We sent it back. Try the cover, or pick an issue off the shelf.</p>
      <p className={s.links}>
        <Link to="/" viewTransition>Back to cover</Link>
        <Link to="/#shelf">The Shelf</Link>
      </p>
    </section>
  )
}
