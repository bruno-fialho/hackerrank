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

// Complete the plusMinus function below.
function plusMinus(arr) {
    // Get array length
    const length = arr.length;
    
    // Declare count variables
    let positiveCount = 0;
    let negativeCount = 0;
    let zeroCount = 0;
    
    // Count integers
    for (let i = 0; i < length; i++) {
        if (arr[i] > 0) {
            positiveCount++;
        }
        else if (arr[i] < 0) {
            negativeCount++;
        }
        else {
            zeroCount++;
        }
    }
    
    // Calculate ratios
    const positiveRatio = positiveCount / length;

    const negativeRatio = negativeCount / length;
    
    const zeroRatio = zeroCount / length;

    // Print all ratios
    console.log(positiveRatio.toPrecision(6));
    console.log(negativeRatio.toPrecision(6));
    console.log(zeroRatio.toPrecision(6));

}

function main() {
    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    plusMinus(arr);
}
