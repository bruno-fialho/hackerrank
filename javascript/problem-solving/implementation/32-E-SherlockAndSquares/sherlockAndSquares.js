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

// Complete the squares function below.
function squares(a, b) {
    // Set variables
    let count = 0;
    let square;
    
    // Get the bigger integer that the square is <= a
    let x = Math.floor(Math.sqrt(a));

    // Loop all squares until x ** 2 > b
    while (true) {
        // Calculate the square of x
        square = Math.pow(x, 2);
        
        // If square is between a and b, inclusive
        if (square >= a && square <=b) {
            count++;
        
        // If the square of x is bigger than x, finish
        } else if (square > b) {
            break;
        }
        
        // Increase x by 1
        x++;
    }
    
    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const ab = readLine().split(' ');

        const a = parseInt(ab[0], 10);

        const b = parseInt(ab[1], 10);

        let result = squares(a, b);

        ws.write(result + "\n");
    }

    ws.end();
}
