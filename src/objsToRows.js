const R = require('ramda')

const log = R.curry((tag,val) => console.log(tag,val))

const alluniqkeys = R.curry((columnkeyfield,objs) => {
  return R.compose(
    R.sort((a,b)=>a.localeCompare(b)),
    R.reject(R.equals(columnkeyfield)),// rm name field to be column header
    R.uniq,
    R.flatten
  )(objs)
})


const rowxfunc = 
  (rowkeys) => {   // array of branching functions 
    return rowkeys.map ( rowkey => { // make row functions, 1 per field
       return R.compose(          // make a row
          R.insert(0,rowkey),  
          R.map(R.prop(rowkey)),   // array of functions to apply to 
       )
    })
  }

function imatrix() {    // must be a func to get arguments 
  let theargs = Array.from (arguments) // lambda func yeilds program args
  let thelist = []
  theargs.forEach( el => {
    thelist.push(el)   
    // converging func captures result rows of all branching functions
  })
  return thelist;
}

const row1 = R.curry((rowlabelfield,columnkeyfield) => { 
  return R.compose(
    R.insert(0,rowlabelfield),            // first column label
    R.map(R.prop(columnkeyfield))         // column headers
  )
})

const makematrix = R.curry(
  (columnkeyfield,rowlabelfield,objs) => {
    const objkeys = R.map( R.keys)(objs) // allfieldlabels fr all entries
    const rowkeys = alluniqkeys(columnkeyfield)(objkeys)
    const rowxfuncs = rowxfunc(rowkeys)
    const allrows = [row1(rowlabelfield,columnkeyfield),...rowxfuncs]
  
    return R.converge(imatrix,allrows)(objs)

})

exports.makematrix = makematrix

