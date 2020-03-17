const { makematrix } = require('./objsToRows.js')


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

const matrix = makematrix("name","courses")

console.log('matrix', matrix(grades))
