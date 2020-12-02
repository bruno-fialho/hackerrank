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
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function permutationEquation(p) {
    // Get length of p
    const length = p.length;

    // Declare y
    let y;

    // Set an empty array for y values
    let array = [];
    
    // Loop through p
    for (let x = 1; i <= length; i++) {
      // Calculate y
      y = p.indexOf(p.indexOf(x) + 1) + 1;

      // Push y to array
      array.push(y);
    }
    
    return array;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const p = readLine().split(' ').map(pTemp => parseInt(pTemp, 10));

    let result = permutationEquation(p);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
