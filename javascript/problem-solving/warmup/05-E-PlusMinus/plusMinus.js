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

function plusMinus(array) {
    let positive = 0, negative = 0, zero = 0;

    let length = array.length;

    array.map(item => {
        item > 0 ? positive++ : item < 0 ? negative++ : zero++;
    })

    console.log(
        (positive / length).toFixed(6) + '\n' +
        (negative / length).toFixed(6) + '\n' +
        (zero / length).toFixed(6)
    )
}

function main() {
    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    plusMinus(arr);
}
