const fs = require('fs')
const path = require('path')
/*
if (process.argv.length <= 2){
	console.log(`usage: ${path.basename(process.argv[0])} ${path.basename(process.argv[1])} <filename>`)
	return
} 

const fn = process.argv[2]
*/

const getFile = (fn) => {
	return new Promise((resolve,reject) => {
		fs.readFile(fn, 'utf8', (err,data) => {
			if (err) return reject(err)
			return resolve(data)
		})
	})
}

/*
getFile('../../data/rawresult.json')
	.then (console.log)
	.catch (console.error)



*/
//console.log(typeof getFile)
exports.getFile = getFile
