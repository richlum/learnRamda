const R = require('ramda')
R.map(([k,v]) => global[k]=v, R.toPairs(R))

const list1 = [{
  name: 'allan',
  age: 10,
},{
  name: 'bob',
  age: 11,
},{
  name: 'carol',
  age: 13
},{
  name: 'doug',
  age: 14
}]

const list2 = [{
  name: 'bob',
  city: 'zambir'
},{
  name: 'carol',
  age: 22,
  city: 'yonker',
},{
  name: 'doug',
  city: 'xanadu',
  age: 33,
  prov: 'bc'
}]

console.log('xprod',xprod(list1,list2))
console.log('tst', (eqProps('name')(list1[1],list2[0])))
const apred = converge(eqProps('name'),[head,last])  // input (array(size2))  
console.log('aprd',apred([list1[0],list2[0]]))
console.log('aprd',apred([list1[0],list2[1]]))
console.log('aprd',apred([list1[1],list2[0]]))
const flter = filter(apred)  // filterable (array or object) in and out m apred operates on an el of array (ararysize2)
console.log('filtered',flter(xprod(list1,list2)))
const fltrlist = flter((xprod(list1,list2)))
console.log( fltrlist[0])
console.log(merge(head(fltrlist[0]),last(fltrlist[0])))
const merger = converge(merge,[head,last]);
console.log('map merger',map(merger)(fltrlist))

const innerjoin = compose(map(merger),filter(apred),xprod);
console.log('innterjon' , innerjoin(list1,list2))
// in point free style 
//
const mapmerger = map(merger)
const ptfreeinnerjoin = compose(mapmerger,flter,xprod)
console.log ('ptgreeinnerjoin' , ptfreeinnerjoin(list1,list2))



//console.log('apred',compose(map(apred),xprod(list1,list2)))
/*
console.log('converge',compose(converge(length,[head,last]),xprod(list1,list2)))
console.log('tst2', converge(eqProps('name'),[head,last])(xprod(list1,list2)))
const filterPred = converge(filter(eqProps('name')), ['head','last'])
console.log('filterPred', filterPred(xprod(list1,list2)));
const filterPred2 = (converge(eqProps('name'), ['head','last'])(xprod(list1,list2)))
console.log('filterPred', filterPred2);

 */
