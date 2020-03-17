const R = require('ramda')

const log = R.curry((tag,val) => console.log(tag,val))

const alluniqkeys = (columnkeyfield) => {
  return R.compose(
    R.sort((a,b)=>a.localeCompare(b)),
    R.reject(R.equals(columnkeyfield)),              // remove the name field to be column header
    R.uniq,
    R.flatten
  )
}

const row1 = //R.curry(
  (rowlabelfield,columnkeyfield) => {
  return R.compose(
    R.insert(0,rowlabelfield),                  // first column label
    R.map(R.prop(columnkeyfield))                   // column headers
  )
}
//)

const rowxfunc = R.curry((rowkeys) => {   // array of branching functions 
  return rowkeys.map ( rowkey => { // make row functions, 1 per field
     return R.compose(          // make a row
        R.insert(0,rowkey),  
        R.map(R.prop(rowkey)),   // array of functions to apply to 
        R.tap(log('rowfunc'))
     )
  })
})

function imatrix() {                     // has to be a function in order to get arguments to function
  let theargs = Array.from (arguments)   // lambda function returns program arguments - 1/course (field row)
  console.log('theargs',theargs)
  let thelist = []
  theargs.forEach( el => {
    thelist.push(el)        // converging function that captures result rows of all branching functions
    console.log('el',el)
  })
  return thelist;
}

const makematrix = R.curry((columnkeyfield,rowlabelfield,objs) => {
  console.log('columnkeyfield',columnkeyfield)
  console.log('rowlabelfield',rowlabelfield)
  console.log('objs',objs)
  const objkeys = R.map( R.keys)(objs)      // allfieldlabels from all entries
  console.log('objkeys' , objkeys)
  const rowkeys = alluniqkeys(columnkeyfield)(objkeys)
  console.log('rowkeys',rowkeys)
  const rowxfuncs = rowxfunc(rowkeys)
  const rowone = row1(rowlabelfield,columnkeyfield)(objs)
  console.log('rowone',rowone)
  const allrows = [rowone,...rowxfuncs]
  console.log('allrows', allrows)
  
  const finalmatrix = R.converge(imatrix,allrows)

  return  finalmatrix(objs)
})

exports.makematrix = makematrix

