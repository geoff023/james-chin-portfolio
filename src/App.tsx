import { useEffect, useState } from 'react'
import { Backdrop } from './components/Backdrop'
import { Header } from './components/Header'
import { currentIssue, type Issue } from './data/issues'
import type { Order } from './data/order'
import { Cover } from './sections/Cover'
import { Numbers } from './sections/Numbers'
import { Process } from './sections/Process'
import { Shelf } from './sections/Shelf'
import { Statement } from './sections/Statement'

// ponytail: single page for now; React Router arrives with the issue pages (phase 7)
export function App() {
  // shared between the glass (Cover) and the Shelf; a context can wait until a third reader shows up
  const [issue, setIssue] = useState<Issue>(currentIssue)
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    document.documentElement.style.setProperty('--issue-accent', issue.accent)
  }, [issue])

  return (
    <>
      <Backdrop />
      <Header />
      <main id="main">
        <Cover issue={issue} order={order} onOrder={setOrder} />
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
      </main>
    </>
  )
}
