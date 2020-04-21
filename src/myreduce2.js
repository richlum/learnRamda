const R = require('ramda')
const { Maybe } = require('ramda-fantasy')

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

const toGrade2 = ( obj ) => {

  if (!obj.avg) return Maybe.Nothing();
  const grade =  obj.avg < 65 ? 'F' :
  obj.avg < 70 ? 'D' :
  obj.avg < 80 ? 'C' :
  obj.avg < 90 ? 'B' : 'A'

  return Maybe.of(grade)
}

const students = [
  {name: 'Abby', grades: { math: 83, english: 38 } },
  {name: 'Bart', grades: { math: 62, french : 26 } },
  {name: 'Curt', grades: { math: 88, philosopyh: 88 } },
  {name: 'Dora', grades: { math: 92, greek: 29 } },
]
const getGrades = R.prop('grades')
const calcStudentAverage = R.compose(
  R.tap(log('avge')),
  avge,
  R.tap(log('last')),
  R.map(R.last),
  R.toPairs,
  getGrades,
  R.tap(log('enter insertAverage'))
)
//const insertAverage = 


const addAverageToStudent = (student) => {
  console.log('addAverageToStudent',student)
  return R.assoc(
      'avg',
      calcStudentAverage(student)
    )(student)
}
const addAverages = R.map(addAverageToStudent)

//const result = R.reduceBy (groupNames, [], toGrade, insertAverage(students))


//console.log(JSON.stringify(result, null, 2))

console.log('inserted',addAverages(students))


result = R.reduceBy (groupNames, [], toGrade, addAverages(students))
console.log('result',JSON.stringify(result,null,2))


