const R = require('ramda')

R.map( ([k,v])=>global[k]=v, R.toPairs(R))
const log = R.curry( (tag,val) => console.log(tag, val))
/* converge ( convergefunc, [ f1, f2,...]) (list)
 *
 * applies f1 to all elements of list, then f2 to all, then ...
 * then the covergefunc is invoked on the results of all the fn calls
 *
 * */

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
const allkeys = R.compose(
  R.sort((a,b)=>a.localeCompare(b)),
  R.reject(R.equals('name')),
  R.uniq,
  R.flatten)

const gradekeys = R.map( R.keys)(grades)
const rowkeys = allkeys(gradekeys)

const row1 = R.compose(
  R.insert(0,'Courses'),
  R.map(R.prop('name'))
  )

const rowxfunc = (rowkeys) => {
  return rowkeys.map ( rowkey => {
     return R.compose(
        R.insert(0,rowkey),
        R.map(R.prop(rowkey))   // array of functions to apply to 
     )
  })
}

const rowxfuncs = rowxfunc(rowkeys)
const allrows = [row1,...rowxfuncs]

function imatrix() {                     // has to be a function in order to get arguments to function
  let theargs = Array.from (arguments)   // lambda function returns program arguments
  let thelist = []
  theargs.forEach( el => {
    thelist.push(el)
  })

  return thelist;
}


const finalmatrix = R.converge(imatrix,allrows)
console.log('allrows\n', finalmatrix(grades))



