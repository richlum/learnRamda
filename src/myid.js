const R = require('ramda')
const { Maybe }  = require('ramda-fantasy')
const { Just, Nothing } = Maybe

const arr1 = [1,2,3]
const arr2 = [1,2,3]
const arr0 = [1,2,3]
let another = arr0

const safeDiv = R.curry((n,d) => (!d || d == 0) ? Nothing() : Just(n/d));

let result = safeDiv(42,2).map(R.identity)
console.log('result' , result)
console.log(result.isJust)
console.log(result.isNothing)
if (result.isJust) console.log( result.value)
result = safeDiv(42,0).map(R.identity)
console.log('result' , result)
console.log(result.isJust)
console.log(result.isNothing)
console.log(result.value)
