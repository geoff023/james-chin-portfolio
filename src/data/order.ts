// The kopitiam order code: Kopi O Kosong Peng = black coffee, no sugar, iced.

export type Order = {
  base: 'Kopi' | 'Teh'
  milk: '' | 'O' | 'C' // '' = condensed milk (the default)
  sugar: '' | 'Siew Dai' | 'Kosong'
  gau: boolean
  peng: boolean
}

// What's in the glass besides the liquid. Each one is a small 3D prop (src/three/Extras.tsx).
export type Extra =
  | 'lime' // a lime slice floating at the surface
  | 'lychee' // peeled lychees, sunk
  | 'bubbles' // soda fizz rising
  | 'steam' // hot drink
  | 'flowers' // dried chrysanthemum heads floating
  | 'plum' // a salted sour plum at the bottom
  | 'grains' // barley settled at the bottom
  | 'powder' // a heap of Milo powder on top

export type Drink = {
  liquid: string // body colour
  milk: string | null // condensed milk settled at the bottom
  foam: string
  foamH: number // 0..1 of the glass height
  ice: boolean
  fill: number // 0..1
  clear?: number // 0 = cloudy/milky (default), 1 = see-through like soda or water
  extras?: Extra[]
}

export const defaultOrder: Order = { base: 'Kopi', milk: '', sugar: '', gau: false, peng: false }

export function orderName(o: Order): string {
  return [o.base, o.milk, o.gau && 'Gau', o.sugar, o.peng && 'Peng'].filter(Boolean).join(' ')
}

const mix = (a: string, b: string, t: number) => {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
  const [x, y] = [p(a), p(b)]
  return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('')
}

export function drinkFor(o: Order): Drink {
  let liquid = o.base === 'Kopi' ? '#3A2316' : '#8C4A1E'
  if (o.gau) liquid = mix(liquid, '#000000', 0.35)
  const milkAmount = o.milk === 'O' ? 0 : o.milk === 'C' ? 0.5 : 0.38
  liquid = mix(liquid, '#F1E4CF', milkAmount)
  return {
    liquid,
    // condensed milk sinks unless you skip the sugar (it *is* the sugar)
    milk: o.milk === '' && o.sugar !== 'Kosong' ? '#F3E6CC' : null,
    foam: mix(liquid, '#FFF6E6', 0.55),
    foamH: o.base === 'Teh' ? 0.09 : o.milk === 'O' ? 0.015 : 0.035,
    ice: o.peng,
    fill: o.peng ? 0.82 : 0.76,
    extras: o.peng ? [] : ['steam'], // hot unless you said peng
  }
}
