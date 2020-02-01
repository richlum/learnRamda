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

const joinByX = R.compose(mergeAllPairs,
  R.tap(mylog('filtered')),
    R.filter(R.converge(R.eqProps("name"),[R.head,R.last])),
  R.tap(mylog('allpairs')),allPairs)
console.log('joinByX', joinByX(list1,list2))



// this exposes R.__ cant know if its a string or array of char?
const myeqProps =  R.curry((val) => {
  console.log('myeqprops',val);
  return R.eqProps(val);
})
const joinByX2 = R.curry((fn) => 
  R.compose(mergeAllPairs,
    R.tap(mylog('filtered')),
      R.filter(R.converge(myeqProps(fn),[R.head,R.last])),
    R.tap(mylog('allpairs')),
      allPairs))
const joinByX2Name = R.curry(joinByX2('name',R.__,R.__))
//const joinByX2Name = R.curry(joinByX2(R.__,"name",R.__))
//const joinByX2Name = R.curry(joinByX2(R.__,R.__,"name"))
console.log('joinByX2', joinByX2Name(list1,list2))








