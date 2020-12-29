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

function minimumDistances(a) {
    // Get length of array
    const length = a.length;
    
    // Set minimum variable
    let minimum = Infinity;
    
    // Loop array from 0 to n -1
    for (let i = 0; i < length -1; i++) {

        // Loop array from i + 1 to n
        for (let j = i + 1; j < length; j++) {
            
            // Check if numbers are equal
            if (a[j] === a[i]) {

                // Check if distance is less than actual minimum
                if (j - i < minimum) {
                    minimum = j - i;
                }
            }
        }
    }
    
    // Return -1 if no equal numbers were found
    if (minimum === Infinity) {
        return -1;
    
    // Return minimum distance
    } else {
        return minimum;
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

    let result = minimumDistances(a);

    ws.write(result + "\n");

    ws.end();
}
