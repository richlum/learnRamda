const R = require('ramda')
R.map( ([k,v]) => global[k]=v, R.toPairs(R))

const pick = curry((i,arr) => {
  console.log('pick ' , i )
  return parseInt(arr[i])
 
})


const logme = curry ( (id,data) => console.log(id,data) )
let accum = '';
const accumulate = val => {
  accum = accum + val;
}

const show5 = curry((a,b,c,d)=>{
  return a + b + c + d ;
})

const c1 = converge(
  show5,
  //compose(concat ,toUpper),
//  R.compose(R.concat,R.tap(logme('convergearg'))), 
  [pick(0), pick(1),pick(2),pick(3)])(['1','2','3','4','5']);

console.log('c1',c1)
console.log('accum',accum);
