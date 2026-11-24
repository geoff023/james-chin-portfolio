import { useEffect, useRef, useState } from 'react'
import { currentIssue, sections } from '../data/issues'
import s from './Header.module.css'

// Running folio (page number follows the section in view) + Contents page menu.
export function Header() {
  const [page, setPage] = useState<string>(sections[0].page)
  const [open, setOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const hit = sections.find((x) => x.id === e.target.id)
          if (hit) setPage(hit.page)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

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
        <a href="#cover" className={s.name}>James Chin</a>
        <span className={s.issue}>
          <span className={s.sep}>—</span> Kurang Manis, Issue {currentIssue.no}
        </span>
        <span className={s.sep}>—</span>
        <span aria-live="polite">p. <span key={page} className={s.page}>{page}</span></span>
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
                <a href={`#${x.id}`} onClick={() => setOpen(false)} className={s.row}>
                  <span className={s.rowTitle}>{x.title}</span>
                  <span className={s.leader} aria-hidden="true" />
                  <span className={s.rowPage}>{x.page}</span>
                </a>
              </li>
            ))}
          </ol>
          <p className={`hand ${s.note}`}>no ads, no sugar.</p>
        </div>
      </dialog>
    </header>
  )
}
