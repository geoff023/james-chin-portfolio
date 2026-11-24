// Run: node src/data/serving.check.ts
import assert from 'node:assert/strict'
import { servingAt } from './serving.ts'

assert.equal(servingAt(6).drink, 'Kopi O')
assert.equal(servingAt(9).drink, 'Kopi O')
assert.equal(servingAt(10).drink, 'Teh O ais limau')
assert.equal(servingAt(15).drink, 'Barley ais')
assert.equal(servingAt(19).drink, 'Air tebu')
assert.equal(servingAt(22).drink, 'Teh tarik at the mamak')
assert.equal(servingAt(2).drink, 'Teh tarik at the mamak', 'small hours stay at the mamak')
console.log('serving ok')
