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

// Complete the equalizeArray function below.
function equalizeArray(arr) {
    // Get array length
    const length = arr.length;
    
    // Set a temporary array with length of max n
    let tempArray = new Array(100).fill(0);
    
    // Set variables to count
    let maxCount = 0, count = 0;
    
    // Loop array
    for (let i = 0; i < length; i++) {
        // Add 1 to tempArray for each value
        tempArray[arr[i] - 1]++;
        
        // Get actual count
        count = tempArray[arr[i] - 1];
        
        // Check if is greater than maxCount
        if (count > maxCount) {
            maxCount = count;
        }
    }

    // Return length minus maxCount
    return length - maxCount;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = equalizeArray(arr);

    ws.write(result + "\n");

    ws.end();
}
