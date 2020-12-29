'use strict';

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

function kaprekarNumbers(p, q) {
    // Set variables
    let result = [];
    let firstString;
    let secondString;
    
    // Loop from p to q
    for (let i = p; i <= q; i++) {
        // Calculate square of i
        let squared = Math.pow(i, 2);
        
        // Transform to string
        let squaredString = squared.toString();
        
        // Get length of string
        let length = squaredString.length;
        
        // Get the half of length
        let half = Math.floor(length / 2);
        
        // Check if length = 1 (Special case)
        if (length === 1) {
            firstString = squaredString;
            secondString = '0';
        
        } else {
            // Get first half of string
            firstString = squaredString.slice(0, half);

            // Get second half of string
            secondString = squaredString.slice(half, length);
        }
        
        // Check if number is a modified Kaprekar number 
        if (parseInt(firstString) + parseInt(secondString) === i) {
            result.push(i);
        }
    }
    
    console.log(result.length ? result.join(' ') : "INVALID RANGE");
}

function main() {
    const p = parseInt(readLine(), 10);

    const q = parseInt(readLine(), 10);

    kaprekarNumbers(p, q);
}
