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

function biggerIsGreater(w) {
    // Get length of w
    const length = w.length;
    // console.log("length = " + length);
    
    // Special cases
    if (length === 0 || length === 1) {
        return "no answer";
    }
    
    // Set variables
    let findIndex = -1;
    let start = [];
    let sortedEnd = [];
    let result = [];
    
    // Loop from (n - 2) to 0
    for (let i = length - 2; i >= 0; i--) {
        sortedEnd.push(w[i + 1]);
        
        if (w[i] < w[i + 1]) {
            findIndex = i;
            
            break;
        }
    }
    
    // Check if findIndex is valid
    if (findIndex === -1) {
        return "no answer";
    }
    
    // Save w[findIndex]
    let target = w[findIndex];
    
    // Create start array
    for (let i = 0; i < findIndex; i++) {
        start[i] = w[i];
    }
            
    // Get sortedEnd length
    let sortedEndLength = sortedEnd.length;
    
    // Loop sortedEnd array, find first greater than target
    for (let i = 0; i < sortedEndLength; i++) {         
        if (target < sortedEnd[i]) {
            // Push sortedEnd[i] to start
            start.push(sortedEnd[i]);

            // Splice sortedEnd to substitute sortedEnd[i] by target
            sortedEnd.splice(i, 1, target)
            
            break;
        }
    }
    
    // Merge start and sortedEnd arrays
    result = [...start, ...sortedEnd];
    
    // Return string
    return result.join('');
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const T = parseInt(readLine(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const w = readLine();

        let result = biggerIsGreater(w);

        ws.write(result + "\n");
    }

    ws.end();
}
