import { useRef, useState, type FormEvent } from 'react'
import { Misregistered } from '../components/Misregistered'
import { KopiCup } from '../components/Sketches'
import { useMagnet } from '../components/useMagnet'
import s from './Letters.module.css'

export const EMAIL = 'james@kurangmanis.example'
// Set VITE_FORM_ENDPOINT (e.g. a Formspree URL) to post letters; without it, the mail app opens.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

const topics = ['A commission', 'Stocking the magazine', 'A drink we should cover', 'Just saying hi']
type Field = 'message' | 'name' | 'email'
type Status = 'idle' | 'sending' | 'sent' | 'error'

function check(d: FormData): Partial<Record<Field, string>> {
  const e: Partial<Record<Field, string>> = {}
  if (!String(d.get('message')).trim()) e.message = 'The letter is empty. Even one line is fine.'
  if (!String(d.get('name')).trim()) e.name = 'Sign it, so James knows who to thank.'
  if (!/^\S+@\S+\.\S+$/.test(String(d.get('email')).trim())) e.email = 'That email doesn’t look right.'
  return e
}

export function Letters() {
  const form = useRef<HTMLFormElement>(null)
  const postRef = useMagnet<HTMLButtonElement>()
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  async function submit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const d = new FormData(ev.currentTarget)
    const e = check(d)
    setErrors(e)
    const first = (Object.keys(e) as Field[])[0]
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    const topic = String(d.get('topic'))
    if (!ENDPOINT) {
      const body = `Dear James,\n\n${d.get('message')}\n\nYours,\n${d.get('name')}\n${d.get('email')}`
      location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(body)}`
      setStatus('sent')
      return
    }
    setStatus('sending')
    try {
      const r = await fetch(ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: d })
      setStatus(r.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const fieldProps = (name: Field) => ({
    name,
    'aria-invalid': !!errors[name],
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })
  const err = (name: Field) =>
    errors[name] && <span id={`${name}-error`} className={s.error}>{errors[name]}</span>

  return (
    <section id="letters" data-folio="34" className={s.letters} aria-labelledby="letters-title">

      <h2 id="letters-title" className={s.title}>
        <Misregistered>
          <span className="swash">L</span>etters
        </Misregistered>
        <span className={s.title2}>to the Editor</span>
      </h2>

      <div className={s.layout}>
        <div className={s.sheetWrap}>
          {status === 'sent' ? (
            <div className={s.sheet} role="status">
              <Stamp />
              <p className={s.thanks}>Received. Kettle’s on.</p>
              <p className={s.small}>
                {ENDPOINT
                  ? 'James reads every letter, usually with a kopi. Expect a reply within the week.'
                  : 'Your mail app should have opened with the letter in it. Press send there and it’s on its way.'}
              </p>
              <button type="button" className={`label ${s.again}`} onClick={() => setStatus('idle')}>
                Write another
              </button>
            </div>
          ) : (
            <form ref={form} className={s.sheet} onSubmit={submit} noValidate>
              <p className={`label ${s.date}`}>Kuala Lumpur, {today}</p>

              <label className={s.topicRow}>
                <span className="label">What’s it about?</span>
                <select name="topic" className={s.select} defaultValue={topics[0]}>
                  {topics.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>

              <label className={s.messageRow}>
                <span className={s.dear}>Dear James,</span>
                <span className="visually-hidden">Your letter</span>
                <textarea {...fieldProps('message')} rows={6} className={s.message} placeholder="I had a teh tarik yesterday and…" />
                {err('message')}
              </label>

              <div className={s.signRow}>
                <label className={s.field}>
                  <span className={s.yours}>Yours,</span>
                  <input {...fieldProps('name')} autoComplete="name" className={s.input} placeholder="your name" />
                  {err('name')}
                </label>
                <label className={s.field}>
                  <span className="label">Where James writes back</span>
                  <input {...fieldProps('email')} type="email" autoComplete="email" className={s.input} placeholder="you@somewhere.com" />
                  {err('email')}
                </label>
              </div>

              <button ref={postRef} type="submit" className={s.post} disabled={status === 'sending'}>
                {status === 'sending' ? 'Posting…' : 'Post it'}
              </button>
              {status === 'error' && (
                <p className={s.error} role="alert">
                  That didn’t send. Try again, or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                </p>
              )}
            </form>
          )}
        </div>

        <aside className={s.aside}>
          <p className="label">Or just email</p>
          <a href={`mailto:${EMAIL}`} className={s.mail}>{EMAIL}</a>
          <p className={s.small}>
            Commissions, stockists, a drink we haven’t covered yet, or a correction about how your
            grandmother made it. All welcome, and I reply within a week.
          </p>
          <KopiCup className={s.cup} />
        </aside>
      </div>

      <span className={`label ${s.folio}`} aria-hidden="true">34</span>
    </section>
  )
}

// postage stamp that thumps down on success
function Stamp() {
  return (
    <svg viewBox="0 0 160 190" className={s.stamp} aria-hidden="true">
      <defs>
        <mask id="perf">
          <rect width="160" height="190" fill="#fff" />
          {Array.from({ length: 9 }, (_, i) => (
            <g key={i}>
              <circle cx={10 + i * 17.5} cy="0" r="5" />
              <circle cx={10 + i * 17.5} cy="190" r="5" />
            </g>
          ))}
          {Array.from({ length: 11 }, (_, i) => (
            <g key={i}>
              <circle cx="0" cy={10 + i * 17} r="5" />
              <circle cx="160" cy={10 + i * 17} r="5" />
            </g>
          ))}
        </mask>
      </defs>
      <rect width="160" height="190" fill="var(--issue-accent)" mask="url(#perf)" />
      <rect x="12" y="12" width="136" height="166" fill="none" stroke="var(--riso-red)" strokeWidth="2" />
      <g transform="translate(30 30) scale(0.85)" fill="none" stroke="var(--riso-red)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 48c2 22 8 34 30 34s28-12 30-34z" />
        <path d="M28 47c10 3 52 3 64 0" />
        <path d="M90 56c12-2 14 14 1 16" />
        <path d="M18 86c10 8 74 8 84 0" />
      </g>
      <text x="80" y="150" textAnchor="middle" fontFamily="var(--sans)" fontSize="13" fontWeight="700" letterSpacing="2" fill="var(--riso-red-ink)">RECEIVED</text>
      <text x="80" y="166" textAnchor="middle" fontFamily="var(--sans)" fontSize="9" letterSpacing="1.5" fill="var(--ink-soft)">KURANG MANIS  RM 0</text>
    </svg>
  )
}
