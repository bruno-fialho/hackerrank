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

function workbook(n, k, arr) {
    // Set variables
    let count = 0, page = 0;
    
    // Loop through chapters
    for (let i = 0; i < n; i++) {
        
        // Loop through problems
        for (let j = 1; j <= arr[i]; j++) {
            
            // Check if new page
            if (k == 1 || j % k == 1) {
                page++;
            }
            
            // Check if special problem
            if (page == j) {
                count++;
            }
        }
    }
    
    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = workbook(n, k, arr);

    ws.write(result + "\n");

    ws.end();
}
