// The kopitiam order code: Kopi O Kosong Peng = black coffee, no sugar, iced.

export type Order = {
  base: 'Kopi' | 'Teh'
  milk: '' | 'O' | 'C' // '' = condensed milk (the default)
  sugar: '' | 'Siew Dai' | 'Kosong'
  gau: boolean
  peng: boolean
}

export type Drink = {
  liquid: string // body colour
  milk: string | null // condensed milk settled at the bottom
  foam: string
  foamH: number // 0..1 of the glass height
  ice: boolean
  fill: number // 0..1
}

export const defaultOrder: Order = { base: 'Kopi', milk: '', sugar: '', gau: false, peng: false }

export function orderName(o: Order): string {
  return [o.base, o.milk, o.gau && 'Gau', o.sugar, o.peng && 'Peng'].filter(Boolean).join(' ')
}

// What the issue on the cover is drinking before anyone orders.
export const bandung: Drink = {
  liquid: '#EE9AAB',
  milk: null,
  foam: '#F8D3DA',
  foamH: 0.04,
  ice: true,
  fill: 0.8,
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
  }
}

export const glossary: Record<string, string> = {
  Kopi: 'coffee, with condensed milk unless you say otherwise',
  Teh: 'tea, with condensed milk unless you say otherwise',
  Susu: 'condensed milk. The default. Sits at the bottom until stirred',
  O: '“oh”: no milk at all',
  C: '“see”: evaporated milk, a little sugar',
  Biasa: 'normal sweet, which is very sweet',
  'Siew Dai': 'less sweet. Hokkien. Kurang manis, basically',
  Kosong: 'empty: no sugar',
  Gau: 'thick, strong. More powder, less water',
  Peng: 'iced',
}
