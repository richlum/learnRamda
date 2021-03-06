const R = require('ramda')
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

const columnkeyfield = 'name'
const rowlabelfield = 'Courses'

const alluniqkeys = R.compose(
  R.sort((a,b)=>a.localeCompare(b)),
  R.reject(R.equals(columnkeyfield)),              // remove the name field to be column header
  R.uniq,
  R.flatten)

const gradekeys = R.map( R.keys)(grades)      // allfieldlabels from all entries
const rowkeys = alluniqkeys(gradekeys)

const row1 = R.compose(
  R.insert(0,rowlabelfield),                  // first column label
  R.map(R.prop(columnkeyfield))                   // column headers
  )

const rowxfunc = (rowkeys) => {   // array of branching functions 
  return rowkeys.map ( rowkey => { // make row functions, 1 per field
     return R.compose(          // make a row
        R.insert(0,rowkey),  
        R.map(R.prop(rowkey)),   // array of functions to apply to 
        R.tap(log('rowfunc'))
     )
  })
}

const rowxfuncs = rowxfunc(rowkeys)
const allrows = [row1,...rowxfuncs]

function imatrix() {                     // has to be a function in order to get arguments to function
  let theargs = Array.from (arguments)   // lambda function returns program arguments - 1/course (field row)
  console.log('theargs',theargs)
  let thelist = []
  theargs.forEach( el => {
    console.log('el',el)
    thelist.push(el)        // converging function that captures result rows of all branching functions
  })

  return thelist;
}


const finalmatrix = R.converge(imatrix,allrows)
console.log('allrows\n', finalmatrix(grades))



