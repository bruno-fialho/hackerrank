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

function cutTheSticks(arr) {
    // Check if length of initial array is equal 1 and escape this case
    let length = arr.length;
    
    if (length === 1) {
        return [1];
    }
    
    // Set a variable to the result
    let result = [];
    
    // Push the initial array length to result
    result.push(length);
    
    // Create a function to return the shorter integer of array, if all elements of array are equal return 0
    function findShorterAndCheckEqualitty(arr, length) {
        // Set variables to shorter and count
        let shorter = 1000, count = 0;
        
        // Loop array to find shorter integer and count how many of the same value
        for (let i = 0; i < length; i++) {
            if (arr[i] < shorter) {
                shorter = arr[i]
            } else if (arr[i] === shorter) {
                count++;
            }
        }
        
        // If count is equal length - 1, it means that all elements are equal to the first one
        if (count === length - 1) {
            return 0;
        }
        
        // Return shorter value
        return shorter;
    }
    
    // Create a recursive function to cut the shorter value from all elements, and append new length to result
    function cut(arr) {
        // Create an empty array
        let newArray = [];
        let newValue;
        
        // Get length of given array
        length = arr.length;

        // If length == 1, no need to continue, just return result
        if (length === 1) {
            return result;
        }
        
        // Get the shorter value
        let shorter = findShorterAndCheckEqualitty(arr, length);
        
        // If shorter equal to zero, all values are the same, can't cut more
        if (shorter === 0) {
            return result
        }
        
        // Loop array to calculate new values
        for (let i = 0; i < length; i++) {
            // Subtract shorter from all values
            newValue = arr[i] - shorter;
            
            // Push all values that are not zero to new array
            if (newValue !== 0) {
                newArray.push(newValue)
            }
        }
        
        // Get new array length
        let newlength = arr.newArray;
        
        // Push new array length to result
        result.push(newArray.length);
        
        // Call the function again with new array
        cut(newArray);
    }
    
    // Call cut function
    cut(arr);
    
    // Return result
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = cutTheSticks(arr);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
