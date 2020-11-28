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

function pickingNumbers(a) {
    // Get length of array
    const length = a.length;
    
    // Set variables to count
    let countPlusOne = 0, countMinusOne = 0, maxCount = 0;
    
    // Loop through array
    for (let i = 0; i < length; i++) {
        // For each array index, loop again and compare values
        for (let j = 0; j < length; j++) {
            
            if (a[j] == a[i]) {
                countPlusOne++;
                countMinusOne++;
            
            } else if (a[j] == a[i] + 1) {
                countPlusOne++;
                
            
            } else if (a[j] == a[i] - 1) {
                countMinusOne++;
            }
        }
        
        // Check if any count is greater than maxCount
        if (countPlusOne > maxCount && countPlusOne >= countMinusOne) {
            maxCount = countPlusOne;
        } else if (countMinusOne > maxCount && countMinusOne > countPlusOne) {
            maxCount = countMinusOne;
        }
        
        // Restart counts
        countPlusOne = 0;
        countMinusOne = 0;
    }
    
    return maxCount;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const a = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

    const result = pickingNumbers(a);

    ws.write(result + '\n');

    ws.end();
}
