'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function circularArrayRotation(a, k, queries) {
    // Get a and queries length
    const aLength = a.length;
    const queriesLength = queries.length;
    
    // Get the last turn of rotation in case k > aLength
    const lastTurn = k % aLength;
    
    // Set variables
    let newInteger, fromTheEnd, newIndex;
    let rotated = [];

    // Loop queries array to get values
    for (let i = 0; i < queriesLength; i++) {
        // If we need to get a value from index i to (aLength - 1)
        if (queries[i] - lastTurn < 0) {
            // Calculate how many indexes from end
            fromTheEnd = queries[i] - lastTurn;
            
            // Calculate new index
            newIndex = aLength + fromTheEnd;
            
            // Push the value from a[newIndex] to result
            rotated.push(a[newIndex]);
        
        // If we just need to get a value from index 0 to i
        } else {
            rotated.push(a[queries[i] - lastTurn]);
        }  
    }
    
    return rotated;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nkq = readLine().split(' ');

    const n = parseInt(nkq[0], 10);

    const k = parseInt(nkq[1], 10);

    const q = parseInt(nkq[2], 10);

    const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

    let queries = [];

    for (let i = 0; i < q; i++) {
        const queriesItem = parseInt(readLine(), 10);
        queries.push(queriesItem);
    }

    const result = circularArrayRotation(a, k, queries);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
