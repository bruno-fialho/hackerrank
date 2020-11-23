'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function getTotalX(a, b) {
    // Get length of both arrays
    const lengthOfA = a.length;
    const lengthOfB = b.length;
    
    // Get the max and min integer of each array
    let minA, maxA, minB, maxB;
    
    for (let i = 0; i < lengthOfA; i++) {
        if (i == 0) {
            minA = a[i];
            maxA = a[i];
        } else {
            if (a[i] < minA) {
                minA = a[i];
            } else if (a[i] > maxA) {
                maxA = a[i];
            }
        }
    }
    
    for (let i = 0; i < lengthOfB; i++) {
        if (i == 0) {
            minB = b[i];
            maxB = b[i];
        } else {
            if (b[i] < minB) {
                minB = b[i];
            } else if (b[i] > maxB) {
                maxB = b[i];
            }
        }
    }
    
    // Set a min and max between
    let minBetween, maxBetween;
    if (maxA < minB) {
        minBetween = maxA;
        maxBetween = minB;
    } else {
        minBetween = maxB;
        maxBetween = minA;
    }
        
    // Create an array with all integers between
    let integersBetween = [...Array(maxBetween - minBetween + 1).keys()]
                          .map(i => i + minBetween);

    const countIntegersBetween = integersBetween.length;
    
    // Declare an empty array for integers between that divide evenly with A integers
    let divideEvenlyA = [];

    for (let i = 0; i < countIntegersBetween; i++) {
        let check = 0;
        for (let j = 0; j < lengthOfA; j++) {
            if (integersBetween[i] >= a[j]) {
                if (integersBetween[i] % a[j] != 0) {
                check++;
                }
            } else {
                if (a[j] % integersBetween[i] != 0) {
                    check++;
                }
            }
        }
        // If an integer between divide evenly with all A integers, add to new array
        if (check == 0) {
            divideEvenlyA.push(integersBetween[i]);
        }
    }
    
    const countDivideEvenlyA = divideEvenlyA.length;
    
    // Set a variable to count integers that divide evenly with A and B
    let count = 0;

    for (let i = 0; i < countDivideEvenlyA; i++) {
        let check = 0;
        for (let j = 0; j < lengthOfB; j++) {
            if (b[j] >= divideEvenlyA[i]) {
                if (b[j] % divideEvenlyA[i] != 0) {
                    check++;
                }
            } else {
                if (divideEvenlyA[i] % b[j] != 0) {
                    check++;
                }
            }
        }
        // If an integer that divide evenly with all A and B integers, add to count
        if (check == 0) {
            count++;
        }
    }
    
    // Return count of valid integers
    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const brr = readLine().replace(/\s+$/g, '').split(' ').map(brrTemp => parseInt(brrTemp, 10));

    const total = getTotalX(arr, brr);

    ws.write(total + '\n');

    ws.end();
}
