'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the migratoryBirds function below.
function migratoryBirds(arr) {
    // Get length of array
    const length = arr.length;
    
    // Create a new array
    let birdsFrequency = new Array(5).fill(0);
    
    // Count the frequency of each type of bird
    for (let i = 0; i < length; i++) {
        birdsFrequency[arr[i] - 1] += 1;
    }
    
    // Create variables to store maximum count and result
    let max = 0;
    let result;
    
    // Search the most commom type of bird
    for (let i = 0; i < 5; i++) {
        if (birdsFrequency[i] > max) {
            result = i + 1;
            max = birdsFrequency[i];
        }
    }
    
    // Return the result
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const arrCount = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = migratoryBirds(arr);

    ws.write(result + '\n');

    ws.end();
}
