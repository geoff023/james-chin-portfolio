import { useState, type CSSProperties } from 'react'
import { defaultOrder, glossary, orderName, type Order } from '../data/order'
import s from './OrderBuilder.module.css'

type Chip = { label: string; on: (o: Order) => boolean; set: (o: Order) => Order }

const rows: { name: string; chips: Chip[] }[] = [
  {
    name: 'Drink',
    chips: (['Kopi', 'Teh'] as const).map((b) => ({ label: b, on: (o) => o.base === b, set: (o) => ({ ...o, base: b }) })),
  },
  {
    name: 'Milk',
    chips: (['', 'O', 'C'] as const).map((m) => ({
      label: m || 'Susu', on: (o) => o.milk === m, set: (o) => ({ ...o, milk: m }),
    })),
  },
  {
    name: 'Sugar',
    chips: (['', 'Siew Dai', 'Kosong'] as const).map((x) => ({
      label: x || 'Biasa', on: (o) => o.sugar === x, set: (o) => ({ ...o, sugar: x }),
    })),
  },
  {
    name: 'Extra',
    chips: [
      { label: 'Gau', on: (o) => o.gau, set: (o) => ({ ...o, gau: !o.gau }) },
      { label: 'Peng', on: (o) => o.peng, set: (o) => ({ ...o, peng: !o.peng }) },
    ],
  },
]

// "Your order, boss?" Tap the code, the glass rebuilds, a chit prints.
export function OrderBuilder({ order, onChange }: { order: Order | null; onChange: (o: Order) => void }) {
  const [hint, setHint] = useState<string | null>(null)
  const current = order ?? defaultOrder
  const name = order && orderName(order)

  return (
    <div className={s.builder}>
      <p className={s.ask}>
        <span className="label">Your order, boss?</span>
      </p>
      <div className={s.rows} onMouseLeave={() => setHint(null)}>
        {rows.map((row) => (
          <div key={row.name} role="group" aria-label={row.name} className={s.row}>
            {row.chips.map((c, i) => {
              const pressed = !!order && c.on(current)
              return (
                <button
                  key={c.label}
                  type="button"
                  aria-pressed={pressed}
                  aria-describedby="order-gloss"
                  className={s.chip}
                  style={{ '--tilt': `${((i * 7 + row.name.length) % 5) - 2}deg` } as CSSProperties}
                  onClick={() => onChange(c.set(current))}
                  onMouseEnter={() => setHint(c.label)}
                  onFocus={() => setHint(c.label)}
                >
                  {c.label}
                </button>
              )
            })}
          </div>
        ))}
      </div>
      <p id="order-gloss" className={s.gloss} aria-live="polite">
        {hint ? <><b>{hint}</b>: {glossary[hint]}</> : 'Tap the code. Kopitiam uncles speak it fluently.'}
      </p>

      {name && (
        <div key={name} className={s.chit} role="status">
          <span className="label">Table 4 · {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span className={s.chitOrder}>{name} ×1</span>
        </div>
      )}
    </div>
  )
}
