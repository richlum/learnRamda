const R = require('ramda')


const list1 = [{
  name: 'allan',
  age: 10,
  id: 1
},{
  name: 'bob',
  age: 11,
  id: 2
},{
  name: 'carol',
  age: 13,
  id: 3
},{
  name: 'doug',
  age: 14,
  id: 4
}]

const list2 = [{
  name: 'bob',
  city: 'zambir',
  id: 4
},{
  name: 'carol',
  age: 22,
  city: 'yonker',
  id: 3
},{
  name: 'doug',
  city: 'xanadu',
  age: 33,
  prov: 'bc',
  id: 1
}]


console.log(R.xprod(list1,list2))

const pred = R.converge(R.eqProps('name'),[R.head,R.last])
console.log (pred([list1[0],list2[0]]))
const matchesarray = R.map(pred,R.xprod(list1,list2))
console.log('matchesarray',matchesarray)
const matched = R.filter(pred,R.xprod(list1,list2))
console.log('matched', matched)
const mergePairs = R.converge(R.merge,[R.head,R.last])
console.log('mergePairs', mergePairs([list1[1],list2[0]]))

console.log('compose', R.compose(R.map(mergePairs),R.filter(pred),R.xprod)(list1,list2))

// can we delay the naming of the field to match on?
//
const allPairs = R.xprod
const matchedByFieldName = R.converge(R.eqProps('name'),[R.head,R.last])
const onlyMatchedPairs = R.filter(matchedByFieldName)
const mergePairsInArray = R.converge(R.merge,[R.head,R.last])
const mergeAllPairs = R.map(mergePairsInArray)
const joinByFieldName = R.compose(mergeAllPairs,onlyMatchedPairs,allPairs)
console.log('joinByFieldName', joinByFieldName(list1,list2));




/*
 *
 * tips
 * pay attention to signature, especially things like array of functions
 * converge seems really specific, apply an array of functions to each
 *  entry and then a function to array of results.
 *
 * The goal seems to be to arrange the sequence of functions into a 
 * nameable pipeline(function composition) that makes sense from the
 * application perspective without applying it to the data.
 *
 * The data input should be the last step... this seems to give flexibility
 * to re-engineering the pipeline without dealing with the specifics
 * of the input data.
 */

