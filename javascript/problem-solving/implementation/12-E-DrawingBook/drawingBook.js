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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function pageCount(n, p) {
    // Declare variables
    let length, targetPage, newArray, index;
    
    // Create an array of right side pages if n is even
    if (n % 2 == 0) {
        length = (n / 2) + 1;

        newArray = Array.from({length}, (_, i) => ((i * 2) + 1));

    // Create an array of right side pages if n is odd
    } else {
        length = (n + 1) / 2;
        
        newArray = Array.from({length}, (_, i) => ((i * 2) + 1));
        for (let i = 0; i < length; i++) {
            console.log("newArray[" + i + "] = " + newArray[i]);
        }
    }
    
    // Get length of new array
    const newLength = newArray.length;
    
    // Set target page to odd number
    if (p % 2 == 0) {
        targetPage = p + 1;
    } else {
        targetPage = p;
    }
    
    // Find index of target page in new array
    for (let i = 0; i < newLength; i++) {
        if (newArray[i] == targetPage) {
            index = i;
        }
    }
    
    // Check if page is near beginnig or end
    if (index < (newLength - index)) {
        return index;
    } else {
        return (newLength - index -1);
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const p = parseInt(readLine(), 10);

    let result = pageCount(n, p);

    ws.write(result + "\n");

    ws.end();
}
