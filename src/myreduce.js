const R = require('ramda')

const log = R.curry((tag,val) => console.log(tag,val))
//const groupNames = (acc , obj) => acc.concat (obj['name'])
const groupNames = (acc , obj) => acc.concat (obj)
const avge = R.converge(R.divide,[R.sum,R.length])
const average = R.compose(
  avge,
  R.map(R.last),
  R.toPairs,
)

const toGrade = ( obj ) => {
  const avg = R.compose(
    average,
    R.prop('grades')
  )(obj)
  //console.log('avg',R.prop('name')(obj),avg)
  const grade = avg < 65 ? 'F' :
  avg < 70 ? 'D' :
  avg < 80 ? 'C' :
  avg < 90 ? 'B' : 'A'

  return grade
}
const students = [
  {name: 'Abby', grades: { math: 83, english: 38 } },
  {name: 'Bart', grades: { math: 62, french : 26 } },
  {name: 'Curt', grades: { math: 88, philosopyh: 88 } },
  {name: 'Dora', grades: { math: 92, greek: 29 } },
]

const result = R.reduceBy (groupNames, [], toGrade, students)

console.log(JSON.stringify(result, null, 2))



