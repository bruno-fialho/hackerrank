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

function flatlandSpaceStations(n, c) {
    // Get length of C
    let lengthC = c.length;
    
    // Set variables
    let max = 0;
    let distance;
    
    // Special case n == lengthC
    if (n == lengthC) {
        return 0;
    }
    
    // Sort C array
    const sortedC = c.sort((a, b) => a - b);
    
    // Check distance from first city to first station
    if (sortedC[0] - 0 > max) {
        max = sortedC[0] - 0;
    }
    
    // Check distance from last station to last city
    if ((n - 1) - sortedC[lengthC - 1] > max) {
        max = (n - 1) - sortedC[lengthC - 1];
    }
    
    // Loop sorted C array
    for (let i = 0; i < n -1; i++) {
        // Get distance from middle point to station
        distance = Math.floor((sortedC[i + 1] - sortedC[i]) / 2);
        
        // Check if it is greater than max distance
        if (distance > max) {
            max = distance;
        }
    }
    
    return max;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nm = readLine().split(' ');

    const n = parseInt(nm[0], 10);

    const m = parseInt(nm[1], 10);

    const c = readLine().split(' ').map(cTemp => parseInt(cTemp, 10));

    let result = flatlandSpaceStations(n, c);

    ws.write(result + "\n");

    ws.end();
}
