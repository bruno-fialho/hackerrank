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

function serviceLane(n, cases) {
    // Get cases langth
    const casesLength = cases.length;
    
    // Set variables
    let start, end, minimum;
    let result = [];
    
    // Loop cases
    for (let i = 0; i < casesLength; i++) {
        // Set minimum to max width
        minimum = 3;

        // Get start and end indexes of case
        start = cases[i][0];
        end = cases[i][1];
        
        // Loop case
        for (let j = start; j <= end; j++) {

            // Check if width is less than minimum
            if (n[j] < minimum) {
                minimum = n[j];
            }
        }
        
        // Push minimum to result array
        result.push(minimum);
    }
    
    return result;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nt = readLine().split(' ');

    const n = parseInt(nt[0], 10);

    const t = parseInt(nt[1], 10);

    const width = readLine().split(' ').map(widthTemp => parseInt(widthTemp, 10));

    let cases = Array(t);

    for (let i = 0; i < t; i++) {
        cases[i] = readLine().split(' ').map(casesTemp => parseInt(casesTemp, 10));
    }

    let result = serviceLane(width, cases);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
