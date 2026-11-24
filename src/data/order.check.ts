// Run: node src/data/order.check.ts
import assert from 'node:assert/strict'
import { defaultOrder, drinkFor, orderName } from './order.ts'

assert.equal(orderName(defaultOrder), 'Kopi')
assert.equal(orderName({ base: 'Kopi', milk: 'O', sugar: 'Kosong', gau: false, peng: true }), 'Kopi O Kosong Peng')
assert.equal(orderName({ base: 'Teh', milk: 'C', sugar: 'Siew Dai', gau: true, peng: false }), 'Teh C Gau Siew Dai')

assert.equal(drinkFor(defaultOrder).milk !== null, true, 'kopi has condensed milk at the bottom')
assert.equal(drinkFor({ ...defaultOrder, sugar: 'Kosong' }).milk, null, 'kosong means no condensed milk')
assert.equal(drinkFor({ ...defaultOrder, milk: 'O' }).milk, null)
assert.equal(drinkFor({ ...defaultOrder, peng: true }).ice, true)
assert.match(drinkFor({ ...defaultOrder, gau: true }).liquid, /^#[0-9a-f]{6}$/)

console.log('order ok')
