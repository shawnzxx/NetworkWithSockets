'use strict';
const fs = require('fs');
const spawn = require('child_process').spawn;

const filename = process.argv[2];
if(!filename){
    throw Error(`no file name`);
}
fs.watch(filename, () => {
    const ls = spawn('dir', [filename], {shell: true});
    let output = '';
    ls.stdout.on('data', chunk => {
        output += chunk;
    })
    ls.on('close', () => {
        console.log(output);
    })
})
console.log(`Now watching target.txt change`);
