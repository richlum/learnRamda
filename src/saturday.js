const R = require('ramda')


const list1 = [{
  name: 'allan',
  lname: 'ardvark',
  age: 10,
  id: 1
},{
  name: 'bob',
  lname: 'bongo',
  age: 11,
  id: 2
},{
  name: 'carol',
  lname: 'carrot',
  age: 13,
  id: 3
},{
  name: 'doug',
  lname: 'dangerous',
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

const mylog =  R.curry((prefix,data) => console.log(prefix,data))

const joinByX = R.compose(mergeAllPairs,R.filter(R.converge(R.eqProps("name"),[R.head,R.last])),
  R.tap(mylog('allpairs')),allPairs)
console.log('joinByX', joinByX(list1,list2))


// delay the definition of the fieldname by parameterizing and currying the whole function
const joinByX3 = R.curry((fn,l1,l2) => 
  R.compose(mergeAllPairs,R.filter(R.converge(R.eqProps(fn),[R.head,R.last])),
    R.tap(mylog('allpairs')),allPairs)(l1,l2))
console.log('joinByX3',joinByX3('id')(list1,list2))

const matchByX =  R.curry((fn,data) => R.converge(R.eqProps(fn),[R.head,R.last])(data))
const filterByX = R.curry((fn,data) => R.filter(matchByX(fn))(data))
const joinByX4 =  R.curry((fn,l1,l2) => R.compose(mergeAllPairs,filterByX(fn),allPairs)(l1,l2))
console.log('joinByX4',joinByX4('name')(list1,list2))





//const joinByX1 = R.compose(mergeAllPairs,R.filter(R.converge(R._,[R.head,R.last])),allPairs)
//console.log('joinByX', joinByX(R.eqProps('name'))(list1,list2))

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

