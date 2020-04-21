const R = require('ramda')
const { Maybe } = require('ramda-fantasy')

const users = [
  { id: 1 , name : 'Bob' },
  { id: 2 , name : 'Carol' }
]

const p = Maybe.Just('the two of us')
const q = Maybe('the two of us')
const r = Maybe.of('the two of us')
console.log(q, q.toString())
console.log(p, p.toString())
console.log(r, r.toString())

console.log (p === q)
console.log (p == q)
console.log (p == r)
console.log (p.toString() === q.toString())
console.log (p.toString() == q.toString())
console.log (r.toString() == p.toString())


console.log (Maybe.maybe(R.toUpper,p))
