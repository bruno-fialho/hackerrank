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
    const array = s.slice(0, 8).split(':');

    array[0] = (s.indexOf('PM') > -1) ?
        (array[0] == 12) ? array[0] = '12' : Number(array[0]) + 12 :
        (array[0] == 12) ? '00' : array[0];

    return (array.join(':'));
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = timeConversion(s);

    ws.write(result + "\n");

    ws.end();
}
