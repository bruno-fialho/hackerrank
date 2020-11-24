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

// Complete the sockMerchant function below.
function sockMerchant(n, ar) {
    // Create an array for all possible colors
    let colorsCount = new Array(100).fill(0);

    // Add total of each color to colorsCount
    for (let i = 0; i < n; i++) {
        colorsCount[ar[i] - 1] += 1;
    }
    
    // Create a variable count pairs
    let pairsCount = 0;
    
    // Loop colorsCount
    for (let i = 0; i < 100; i++) {
        // If number of this color socks is less than 2 => do nothing
        if (colorsCount[i] < 2) {
            continue;
        }
        // If divisible by 2, add division to pairsCount
        else if (colorsCount[i] % 2 == 0) {
            pairsCount += (colorsCount[i] / 2);
        // If not divisible by 2, subtract 1 before division
        } else {
            pairsCount += ((colorsCount[i] - 1) / 2);
        }
    }
    
    return pairsCount;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const ar = readLine().split(' ').map(arTemp => parseInt(arTemp, 10));

    let result = sockMerchant(n, ar);

    ws.write(result + "\n");

    ws.end();
}
