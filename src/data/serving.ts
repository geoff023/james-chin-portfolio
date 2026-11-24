// What a kopitiam is pouring at this hour (visitor's local time). Tint feeds the page wash.
export type Serving = { drink: string; tint: string }

const menu: [fromHour: number, Serving][] = [
  [5, { drink: 'Kopi O', tint: '#C9A27E' }],
  [10, { drink: 'Teh O ais limau', tint: '#E8C25A' }],
  [14, { drink: 'Barley ais', tint: '#E3CF8F' }],
  [18, { drink: 'Air tebu', tint: '#B9CF79' }],
  [21, { drink: 'Teh tarik at the mamak', tint: '#C98A4B' }],
]

export function servingAt(hour: number): Serving {
  // before 5am the mamak is still going
  let now = menu[menu.length - 1][1]
  for (const [from, s] of menu) if (hour >= from) now = s
  return now
}
