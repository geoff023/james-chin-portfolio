import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useMatch } from 'react-router-dom'
import { currentIssue, issues, sections } from '../data/issues'
import { servingAt } from '../data/serving'
import s from './Header.module.css'

// Running folio (page number follows the section in view) + Contents page menu.
export function Header() {
  const [page, setPage] = useState<string>(sections[0].page)
  const [open, setOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const { pathname } = useLocation()
  const [serving, setServing] = useState(() => servingAt(new Date().getHours()))
  // on an issue page the running head names that issue
  const slug = useMatch('/issues/:slug')?.params.slug
  const shown = issues.find((i) => i.slug === slug) ?? currentIssue

  // any element with data-folio="NN" on the current page sets the running page number
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setPage((e.target as HTMLElement).dataset.folio!)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    // routes load lazily, so rescan whenever the page content changes (re-observing is a no-op)
    const scan = () => document.querySelectorAll('[data-folio]').forEach((el) => io.observe(el))
    const mo = new MutationObserver(scan)
    mo.observe(document.getElementById('main')!, { childList: true, subtree: true })
    scan()
    return () => {
      mo.disconnect()
      io.disconnect()
    }
  }, [pathname])

  // now serving: re-check every minute; the drink also tints one of the page washes
  useEffect(() => {
    const t = setInterval(() => setServing(servingAt(new Date().getHours())), 60_000)
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    document.documentElement.style.setProperty('--serving', serving.tint)
  }, [serving])

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <header className={s.header}>
      <a className="skip-link" href="#main">Skip to content</a>
      <p className={`label ${s.folio}`}>
        <Link to="/" viewTransition className={s.name}>James Chin</Link>
        <span className={s.issue}>
          <span className={s.sep}>—</span> {slug ? `Kurang Manis, Issue ${shown.no}` : 'Founder, Kurang Manis'}
        </span>
        <span className={s.sep}>—</span>
        <span>p. <span key={page} className={s.page}>{page}</span></span>
      </p>
      <p className={`label ${s.serving}`}>
        Now serving: <span key={serving.drink} className={s.servingDrink}>{serving.drink}</span>
      </p>
      <button className={`label ${s.toggle}`} onClick={() => setOpen(true)} aria-haspopup="dialog">
        Contents
      </button>

      <dialog ref={dialog} className={s.contents} onClose={() => setOpen(false)} aria-labelledby="contents-title">
        <div className={s.sheet}>
          <div className={s.sheetHead}>
            <h2 id="contents-title" className={s.contentsTitle}>Contents</h2>
            <button className={`label ${s.toggle}`} onClick={() => setOpen(false)}>Close</button>
          </div>
          <ol className={s.list}>
            {sections.filter((x) => x.contents).map((x) => (
              <li key={x.id}>
                <Link to={`/#${x.id}`} onClick={() => setOpen(false)} className={s.row}>
                  <span className={s.rowTitle}>{x.title}</span>
                  <span className={s.leader} aria-hidden="true" />
                  <span className={s.rowPage}>{x.page}</span>
                </Link>
              </li>
            ))}
          </ol>
          <p className={`hand ${s.note}`}>no ads, no sugar.</p>
        </div>
      </dialog>
    </header>
  )
}
