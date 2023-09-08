const {resolve} = require('path');
const fs = require('fs');
const parser = require('./src/parser.js')
const args = require('minimist')(process.argv.slice(2));


const inputFiles = args['_']

if(!inputFiles){
    throw new Error("Não passado nenhum arquivo de input")
}

const outputFiles = args['o'] ?? 'out.js'
const outputFile = Array.isArray(outputFiles)?outputFiles[0]:outputFiles

const result = inputFiles.map((inputFile)=>parser(resolve(inputFile)))
    .reduce((acc, cur)=>acc+cur)


fs.writeFileSync(outputFile,result)


