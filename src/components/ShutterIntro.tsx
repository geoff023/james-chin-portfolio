import { useEffect, useState } from 'react'
import s from './ShutterIntro.module.css'

const KEY = 'km-shutter-seen'
const seen = () => {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return true // storage blocked: don't risk showing it every page
  }
}
const markSeen = () => {
  try {
    sessionStorage.setItem(KEY, '1')
  } catch { /* fine */ }
}

// First visit only: the shop's roller shutter rattles up to reveal the cover. 1.1s, click to skip.
export function ShutterIntro() {
  const [show, setShow] = useState(
    () => !seen() && !matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const done = () => {
    markSeen()
    setShow(false)
  }
  // safety net: animations pause in background tabs, so never leave the shutter down
  useEffect(() => {
    if (!show) return
    const t = setTimeout(done, 2000)
    return () => clearTimeout(t)
  }, [show])

  if (!show) return null

  return (
    <div className={s.shutter} aria-hidden="true" onAnimationEnd={done} onClick={done}>
      <div className={s.sign}>
        <span className={s.signName}>Kurang Manis</span>
        <span className={`label ${s.signSub}`}>Buka. Open from 6am</span>
      </div>
      <span className={`label ${s.skip}`}>Click to skip</span>
    </div>
  )
}
