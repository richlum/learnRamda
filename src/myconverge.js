const R = require('ramda')

R.map( ([k,v])=>global[k]=v, R.toPairs(R))
const log = R.curry( (tag,val) => console.log(tag, val))
/* converge ( convergefunc, [ f1, f2,...]) (list)
 *
 * applies f1 to all elements of list, then f2 to all, then ...
 * then the covergefunc is invoked on the results of all the fn calls
 *
 * */

const average = converge(divide,[sum,length])
console.log(average([10,11,12,13,100]))

const mymax = compose(
  last,
  sort((a,b)=>{a-b})
)
const mymin = compose(
  head,
  sort((a,b)=>{a-b})
)
const   range = converge( subtract , [mymax,mymin])
console.log(range([10,11,12,13,100]))




const grades = [
  { 
    name:"john",
    age: 1,
    math: 80,
    english: 77,
    art:66,
    history:78,
    auto:99
  },{
    name:"mary",
    age:2,
    math:77,
    english:80,
    art:86,
    history:55,
    music:77
  },{
    name:"archie",
    age:3,
    math:47,
    english:81,
    art:81,
    history:75,
    philosophy:89
  }
]

const names = R.map(R.prop('name'))(grades)
console.log('names',names)

const allkeys = R.compose(
  R.sort((a,b)=>a.localeCompare(b)),
  R.reject(R.equals('name')),
  R.uniq,
  R.flatten)

const gradekeys = R.map( R.keys)(grades)
console.log('gradekeys',gradekeys) 

const rowkeys = allkeys(gradekeys)
console.log('rowkeys',rowkeys)



const row1 = R.map(R.prop('name'))
console.log('row1tst' , row1(grades))
const rowx = R.compose(
  R.map(R.prop),
  R.tap(log('rowx--'))
)(rowkeys)

const dynmprop = R.curry( (x) => {
  return R.prop(x)
})
const newrowx = R.map(dynmprop('math'))(grades)

const rowxfunc = (rowkeys) => {
  return rowkeys.map ( rowkey => {
     return R.compose(
        R.tap(log('rowfunc---')),
        R.insert(0,rowkey),
        R.map(R.prop(rowkey))   // array of functions to apply to 
     )
  })
  

}
const rowxfuncs = rowxfunc(rowkeys)


console.log('rowxfuncs', rowxfuncs.length)
console.log('rowxfuncs type', R.type(rowxfuncs))
console.log('rowxfuncs', R.type(rowxfuncs[1]))
console.log( rowxfuncs[1](grades))


console.log('newrowx', newrowx)

console.log('rowxtst' , rowx[0](grades))
console.log('rowxtst[1]' , rowx[1](grades[1]))
console.log('rowxtst-type' , R.type(rowx[1]))

console.log('row1', row1(grades))
console.log('rowx', rowx)

//const allrows = [row1,...rowx]
const allrows = [row1,...rowxfuncs]
console.log('allrows', allrows)

function imatrix() {
  console.log('imatrix ', arguments.length)
  let theargs = Array.from (arguments)
  let thelist = []
  let cnt = 0
  theargs.forEach( el => {
    console.log(cnt++, " : ", R.type(el))
    if (R.type(el)!=='function') console.log("======", el)
    thelist.push(el)
  })

  return thelist;
}


const finalmatrix = R.converge(imatrix,allrows)
console.log('allrows', finalmatrix(grades))


console.log('peek',
  R.converge( R.multiply, [R.length,R.length, R.length, R.length])(grades)
)

const peek = ( t,u,v,w,x, y, z ) => {
  console.log("peekint",t,u,v,w)
  console.log('peeking',x,y,z)
}

const strangeconcat = R.converge(peek, [R.toUpper, R.toLower, R.toUpper, R.length])
console.log('strangeconcat',
  strangeconcat("yodel")
)

