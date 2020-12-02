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

function jumpingOnClouds(c, k) {
    // Get length of c
    const n = c.length;
    
    // Set variables
    let energy = 100;
    let index = k;
    
    // If k is equal n, just compute c[0]
    if (k == n) {
        index = 0;
    }
    
    // While index is not equal 0
    while(index != 0) {
        // Calculate new energy
        energy -= (1 + (c[index] * 2));
        
        // Set next index
        index = (index + k) % n;
    }
    
    // When it arrives c[0]
    energy -= (1 + (c[0] * 2));
    
    // Return energy
    return energy;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const c = readLine().split(' ').map(cTemp => parseInt(cTemp, 10));

    let result = jumpingOnClouds(c, k);

    ws.write(result + "\n");

    ws.end();
}
