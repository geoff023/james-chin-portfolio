import { lazy, Suspense, useEffect, useState } from 'react'
import { createBrowserRouter, Outlet, ScrollRestoration, useOutletContext } from 'react-router-dom'
import { Backdrop } from './components/Backdrop'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { currentIssue, type Issue } from './data/issues'
import type { Order } from './data/order'
import { Home } from './routes/Home'
import { NotFound } from './routes/NotFound'

const IssuePage = lazy(() => import('./routes/Issue'))

// shared between the cover glass, the Shelf and the issue pages
export type Shared = {
  issue: Issue
  setIssue: (i: Issue) => void
  order: Order | null
  setOrder: (o: Order | null) => void
}
export const useShared = () => useOutletContext<Shared>()

function Layout() {
  const [issue, setIssue] = useState<Issue>(currentIssue)
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    document.documentElement.style.setProperty('--issue-accent', issue.accent)
  }, [issue])

  return (
    <>
      <Backdrop />
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<p className="hand loading">Pulling the tea…</p>}>
          <Outlet context={{ issue, setIssue, order, setOrder } satisfies Shared} />
        </Suspense>
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  )
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/issues/:slug', element: <IssuePage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
