const R = require('ramda')
R.map(([k,v]) => global[k]=v, R.toPairs(R))

const branch =  curry(ifElse(
  R.gt(__,5),
  R.compose(R.concat(R.__," > 5"),R.toString),
  R.compose(R.concat(R.__," is false"),R.toString)
))

console.log(branch(5))
console.log(branch(6))
