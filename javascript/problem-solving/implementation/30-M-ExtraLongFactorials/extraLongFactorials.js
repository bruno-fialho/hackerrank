'use strict';

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

function extraLongFactorials(n) {
    // Create a recursive function to calculate factorial
    function generateNumberFactorial(n) {
        // Transform n in BigInt (ex: 5n)
        n = BigInt(n);
        
        // Continue multiplying n - 1 until n == 0
        return n === 0n ? 1n : n * generateNumberFactorial(n - 1n);
    }

    // Apply the generateNumberFactorial function
    const factorial = generateNumberFactorial(n).toString();
    
    // Print the result
    console.log(factorial);
}

function main() {
    const n = parseInt(readLine(), 10);

    extraLongFactorials(n);
}
