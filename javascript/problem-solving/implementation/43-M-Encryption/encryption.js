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

function encryption(s) {
    // Get length of string
    const length = s.length;
    
    // Get square root of length
    const squareRootOfLength = Math.sqrt(length);
    
    // Calculate rows and columns
    let rows;
    let columns;
    
    // If square root is a integer
    if (Math.pow(Math.floor(squareRootOfLength), 2) === length) {
        rows = squareRootOfLength;
        columns = rows;
    }
    // If not a integer
    else {
        rows = Math.floor(squareRootOfLength);
        columns = rows + 1;
    }
    
    // If rows * columns < length
    if (rows * columns < length) {
        rows += 1;
    }
    
    // Create a 2D array to store divided string
    let dividedString = Array(rows)
        .fill()
        .map(() => Array(columns).fill());
    
    // Insert letters to 2D array
    for (let i = 0; i < length; i++) {
        let row = Math.floor(i / columns);
        let column = i % columns;

        dividedString[row][column] = s[i];        
    }
    
    // Create encrypted string
    let encrypted = '';
    
    // Loop dividedString and add letters to encrypted
    for (let column = 0; column < columns; column++) {
        for (let row = 0; row < rows; row++) {
            if (dividedString[row][column] !== undefined) {
                encrypted += dividedString[row][column];
            }
        }
        encrypted += ' ';
    }
    
    return encrypted;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = encryption(s);

    ws.write(result + "\n");

    ws.end();
}
