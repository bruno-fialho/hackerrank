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

function beautifulTriplets(d, arr) {
    // Set a varible to count
    let count = 0;
    
    // Get array length
    const length = arr.length;
    
    // Loop from 0 to length - 2
    for (let i = 0; i < length - 2; i++) {

        // Loop from (i + 1) to length - 1
        for (let j = i + 1; j < length - 1; j++) {

            // Check if arr[i] and arr[j] qualify to beautiful triplet
            if (arr[j] - arr[i] === d) {

                // Loop from (j + 1) to length
                for (let k = j + 1; k < length; k++) {

                    // Check if arr[j] and arr[k] qualify to beautiful triplet
                    if (arr[k] - arr[j] === d) {
                        count++;
                    }
                }
            }
        }
    }
    
    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nd = readLine().split(' ');

    const n = parseInt(nd[0], 10);

    const d = parseInt(nd[1], 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = beautifulTriplets(d, arr);

    ws.write(result + "\n");

    ws.end();
}
