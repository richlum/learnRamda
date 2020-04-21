const R = require('ramda')
const { getFile } = require('./getObjFrFile')

const log = R.curry((tag,val) => {
	console.log(tag,val)
	return val
})


const maxObj = (acc,val) => {
	return R.maxBy(R.prop('version'),acc,val)	
}
const arrayToMaxObj = R.reduce(maxObj,{version:0})


//const arrayToMaxObj = R.reduce(R.maxBy((R.prop('version'))),{version:0})


const byFile = R.compose(
//	log('exit byFile'),
	R.map(arrayToMaxObj),
//	log(' grouped'),
	R.groupBy(R.prop('filename')),
	)

const showtype = (x) =>{
	console.log(R.type(x))
	return x
}


getFile('../../data/rawresult.json')
	.then( x => {
		return JSON.parse(x,null,2)
	})
	.then(byFile)
	.then(R.values)
	.then(console.log)
	.catch(console.error)



