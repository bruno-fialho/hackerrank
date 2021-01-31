'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function timeConversion(s) {
    const arr = s.slice(0, 8).split(':');

    arr[0] = (s.indexOf('PM') > -1) ?
        (arr[0] == 12) ? arr[0] = '12' : Number(arr[0]) + 12 :
        (arr[0] == 12) ? '00' : arr[0];

   return(arr.join(':'));
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = timeConversion(s);

    ws.write(result + "\n");

    ws.end();
}
