'use strict'

const fs = require('fs-extra');
const path = require('path');

module.exports = {
	createFs: createFs,
	removeFs: removeFs
}


function removeFs(tree, dir){
	for(let node in tree){
		fs.removeSync(path.join(dir, node))
	}
}

function createFs(node, dir){
	for(let prop in node){
		if(typeof(node[prop]) === 'string'){
			fs.writeFileSync(path.join(dir, prop), node[prop])
		} else 
		if(typeof(node[prop] === 'object' && node[prop] !== null && !Array.isArray(node[prop]))){
			if(!fs.existsSync(path.join(dir, prop))){
				fs.mkdirSync(path.join(dir, prop))
			}
			createFs(node[prop], path.join(dir, prop))
		} else {
			throw new Error('prop in tree must be an object or a string')
 		}
	}
}