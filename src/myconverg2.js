const R = require('ramda')
const log = R.curry( (tag,val) => console.log(tag, val))
/* converge ( convergefunc, [ f1, f2,...]) (list)
 *
 * applies f1 to all elements of list, then f2 to all, then ...
 * then the covergefunc is invoked on the results of all the fn calls
 *
 * */


const rowxfunc = (rowkeys) => {   // array of branching functions 
  return rowkeys.map ( rowkey => { // make row functions, 1 per field
     return R.compose(          // make a row
        R.insert(0,rowkey),  
        R.map(R.prop(rowkey)),   // array of functions to apply to 
       // R.tap(log('rowfunc'))
     )
  })
}


function imatrix() {    //  function in order to get arguments
 
  let theargs = Array.from (arguments) 
    // lambda returns program arguments - 1/course (field row)
  //console.log('theargs',theargs)
  let thelist = []
  theargs.forEach( el => {
    thelist.push(el)   
    // converging func captures all branching functions results
  })

  return thelist;
}


const finalmatrix = R.curry((columnKeyField,rowLabelField,data) => {
  let columnkeyfield = columnKeyField || 'name'
  let rowlabelfield = rowLabelField || 'Courses'
  const row1 = R.compose(
    R.insert(0,rowlabelfield),                  // first column label
    R.map(R.prop(columnkeyfield))                   // column headers
    )
  const alluniqkeys = R.compose(
    R.sort((a,b)=>a.localeCompare(b)),
    R.reject(R.equals(columnkeyfield)),   // rm name fld to be column header
    R.uniq,
    R.flatten)
  const gradekeys = R.map( R.keys)(data)  // allfieldlabels from all entries
  const rowkeys = alluniqkeys(gradekeys)
  const rowxfuncs = rowxfunc(rowkeys)
  const allrows = [row1,...rowxfuncs]
  return R.converge(imatrix,allrows)(data)
})

//console.log('allrows\n', finalmatrix(grades))
//console.log('finalmatrix type', R.type(finalmatrix))
//console.log('finalmatrix ', finalmatrix)
exports.finalmatrix = finalmatrix;

