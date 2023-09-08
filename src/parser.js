
const fs = require('fs');
const {jsExecutor,preLib} = require('./jsParser.js')


module.exports = {
    jsParser: function (inputFile){
        const rawdata = fs.readFileSync(inputFile);
        const data = JSON.parse(rawdata);
        return preLib() + jsExecutor(data['expression'],false)
    },
    cppParser: function(){

    }
}
