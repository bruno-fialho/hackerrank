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

// Create a function to check is an array item is odd
function isOdd(n) {
    if (n % 2 != 0) {
        return true;
    } else {
        return false;
    }
}

function fairRations(B) {
    // Create a variable to count odds
    let countOdds = 0;
    
    // Create an array to store odds indexes
    let oddsIndexes = [];
    
    // Get B array length
    const length = B.length;
    
    // Count total of odd numbers
    for (let i = 0; i < length; i++) {
        if (isOdd(B[i])) {
            // Add index to array od indexes
            oddsIndexes.push(i);
            
            // Add to countOdds
            countOdds++;
        }
    }
    
    // If number of odds is odd return NO    
    if (countOdds % 2 != 0) {
        return "NO";
    }
    
    // Get length of oddsIndexes
    const oddsIndexesLength = oddsIndexes.length;
    
    // Set a variable to count loaves
    let loaves = 0;
    
    /*
     * Get loaves increase by consecutive odds numbers distance
     * loaves = distance * 2
     */
    for (let i = 0; i < oddsIndexesLength - 1; i += 2) {
        loaves += ((oddsIndexes[i + 1] - oddsIndexes[i]) * 2);
    }
    
    return loaves;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const N = parseInt(readLine(), 10);

    const B = readLine().split(' ').map(BTemp => parseInt(BTemp, 10));

    let result = fairRations(B);

    ws.write(result + "\n");

    ws.end();
}
