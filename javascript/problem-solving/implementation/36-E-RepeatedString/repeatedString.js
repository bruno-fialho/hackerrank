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

function repeatedString(s, n) {
    // Get length of string
    const lengthString = s.length;
    
    // Get reminder of n to lengthString
    let reminder = n % lengthString;
    
    // Set variables
    let count = 0;
    let lettersABeforeRemider = 0;
    
    // Loop string and count 'a's
    for (let i = 0; i < lengthString; i++) {
        // Count 'a's on s
        if (s[i] === 'a') {
            count++;
        }
        
        // Count 'a's on reminder
        if (i === reminder - 1) {
            lettersABeforeRemider = count;
        }
    }
    
    // Result = 'a's * how many s on n + 'a's on reminder
    const result = (count * (Math.floor(n / lengthString))) + lettersABeforeRemider;
                    
    return result;
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const n = parseInt(readLine(), 10);

    let result = repeatedString(s, n);

    ws.write(result + "\n");

    ws.end();
}
