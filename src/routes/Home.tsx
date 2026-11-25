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

// the long editorial scroll
export function Home() {
  const { issue, setIssue, order, setOrder } = useShared()
  return (
    <>
      <Cover issue={issue} order={order} onOrder={setOrder} />
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
  )
}
