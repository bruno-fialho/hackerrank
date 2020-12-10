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

// Complete the jumpingOnClouds function below.
function jumpingOnClouds(c) {
    // Get length of c
    const lengthC = c.length;
    
    // Set variables
    let i = 0, count = 0;
    
    // Jump clouds
    while (i < lengthC) {
        // Check if you can jump size 2
        if (c[i + 2] === 0) {
            // Start counting jumps after i = 0
            if (i !== 0) {
                count++;
            }
            
            // Jump
            i += 2;
        
        // Else, jump size 1
        } else {
            // Start counting jumps after i = 0
            if (i !== 0) {
                count++;
            }
            
            // Jump
            i += 1;
        }
    }
    
    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const c = readLine().split(' ').map(cTemp => parseInt(cTemp, 10));

    let result = jumpingOnClouds(c);

    ws.write(result + "\n");

    ws.end();
}
