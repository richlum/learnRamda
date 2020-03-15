const fs = require('fs')
const R = require('ramda')

const getData = (filename) => {
  return new Promise( (resolve,reject) => {
    fs.readFile(filename,(err,data) => {
      if (err) return reject(err)
      let str = data.toString()
      return resolve(JSON.parse(str))
    })
  })
}

const log = R.curry((tag,val) => console.log(tag,val))

const maxVersions = 
  R.compose(
    R.values,
    R.tap(log('reduced')),
    R.map(R.reduce(R.maxBy(R.prop('version')),{version:0})),
    R.tap(log('grouped')),
    R.groupBy(R.prop('filename')),
    R.tap(log('entry'))
  )
/*
const appendToField = (obj,field,val) -> {
  R.compose(

    R.propOr(field,[])


const toSubArrays = ( acc, val) => {
  R.append(R.prop('task')(val)
  R.propOr('task',[])(acc)

}

const allVersions =
  R.compose(
    R.tap(log('reduced')),
    R.map(R.reduce(toSubArrays,R.pick(['filename','module'))
    R.tap(log('grouped')),
    R.groupBy(R.prop('filename')),
    R.tap(log('entry'))
  )
*/

getData(process.argv[2])  // 0=node,1=thisprogram,2=firstarg
  .then(maxVersions)
  .then( res => {
    console.log(JSON.stringify(res,null,2))
    return res
  })
  .then( res => {
    console.log(R.type(res))
    console.log(R.type(res[0]))
    console.log(R.keys(res[0]))

    console.log('------------')
    let filenames = res.map(re => (re.module + ":" + re.filename + ":" + re.version)).sort()
    filenames.forEach( x => { 
      console.log("==" , x )
    })
    console.log('++------------')
    return res
  })
  .then(console.log)
  .catch(console.error)


