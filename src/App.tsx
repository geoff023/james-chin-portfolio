import { Backdrop } from './components/Backdrop'
import { Header } from './components/Header'
import { Cover } from './sections/Cover'

// ponytail: single page for now; React Router arrives with the issue pages (phase 7)
export function App() {
  return (
    <>
      <Backdrop />
      <Header />
      <main id="main">
        <Cover />
      </main>
    </>
  )
}
