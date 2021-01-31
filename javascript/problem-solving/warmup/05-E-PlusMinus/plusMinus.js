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

function plusMinus(arr) {
    // Declare variables
    let pos = 0, neg = 0, zero = 0;
    
    // Get array length
    let length = arr.length;
    
    // Map all array items and count pos, neg and zero
    arr.map(item => {
        item > 0 ? pos++ : item < 0 ? neg++ : zero++;
    })

    // Print results
    console.log((pos/length).toFixed(6), '\n', (neg/length).toFixed(6), '\n', (zero/length).toFixed(6))
}

function main() {
    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    plusMinus(arr);
}
