const {finalmatrix} = require('./myconverg2.js')

const grades = [
  { 
    name:"john",
    gender: "male",
    age: 1,
    math: 80,
    english: 77,
    art:66,
    history:78,
    auto:99
  },{
    name:"mary",
    gender: "female",
    age:2,
    math:77,
    english:80,
    art:86,
    history:55,
    music:77
  },{
    name:"archie",
    gender: "notspecified",
    age:3,
    math:47,
    english:81,
    art:81,
    history:75,
    philosophy:89
  }
]

/**
 * @param1 field to make columns from
 * @param2 text string label for first column
 * @param2 list of objects 
 *    must have param1 as a key field
 *    it is expected that param1 is has common value across
 *    multiple diffent objects that we want to compare 
 *    eg student names for columns, courses for rows, grades for entries
 *    */

const matrix = finalmatrix('gender','Courses')
console.log(matrix(grades))
