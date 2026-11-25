import { startTransition, useEffect, useState } from 'react'
import { useShared } from '../App'
import { Commissions } from '../sections/Commissions'
import { Cover } from '../sections/Cover'
import { EditorLetter } from '../sections/EditorLetter'
import { Letters } from '../sections/Letters'
import { Masthead } from '../sections/Masthead'
import { Numbers } from '../sections/Numbers'
import { Process } from '../sections/Process'
import { Shelf } from '../sections/Shelf'
import { Statement } from '../sections/Statement'

// On the very first load only the cover renders straight away; the rest of the page follows in a
// transition, which React renders in small slices so the phone stays responsive. Coming back to
// the home page (or arriving on a #section link) renders everything at once so the scroll position
// and anchors land.
let firstLoad = true

// the long editorial scroll
export function Home() {
  const { issue, setIssue, order, setOrder } = useShared()
  const [rest, setRest] = useState(() => !firstLoad || location.hash !== '')

  useEffect(() => {
    // a shared link like /#process opened fresh: the browser looked for the anchor before React
    // rendered it, so jump there once now (in-app links are handled by ScrollRestoration)
    if (firstLoad && location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView()
    firstLoad = false
    if (rest) return
    const t = setTimeout(() => startTransition(() => setRest(true)), 0)
    return () => clearTimeout(t)
  }, [rest])

  return (
    <>
      <Cover issue={issue} order={order} onOrder={setOrder} />
      {rest && (
        <>
          <EditorLetter />
          <Shelf
            active={order ? null : issue}
            onPick={(i) => {
              setIssue(i)
              setOrder(null)
            }}
          />
          <Statement />
          <Numbers />
          <Process />
          <Commissions />
          <Masthead />
          <Letters />
        </>
      )}
    </>
  )
}
