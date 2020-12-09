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

function nonDivisibleSubset(k, s) {
    // Special cases for k
    if (k === 0 || k === 1) {
        return 1;
    }
    
    // Get the length of s
    let length = s.length;
    
    // Calculate reminders and half reminders array length
    let remindersLength = k;
    
    // Why ceil? We need to go until i = 2 if k = 5, to compare 2 and 3, so i < 3
    let halfRemindersLength = Math.ceil(remindersLength/2)
    
    // Set new array to count all reminders, including 0
    let remindersArray = new Array(remindersLength).fill(0);
    
    // Populate reminders array with all occurrences
    for (let i = 0; i < length; i++) {
        remindersArray[(s[i]%k)]++;
    }
    
    let count = 0;
    
    // If there is at least one element with 0 reminder, add just one to count
    if (remindersArray[0] !== 0) {
        count++;
    }
        
    // If k is pair, and there is at least one element with reminder k / 2, add just one to count
    if (k % 2 === 0 && remindersArray[halfRemindersLength] !== 0) {
        count++;
    }
    
    // Loop reminders array to the half
    for (let i = 1; i < halfRemindersLength; i++) {
        // Compare reminders with inverse case and add the greater to count
        if (remindersArray[i] > remindersArray[remindersLength - i]) {
            count += remindersArray[i];
        } else {
            count += remindersArray[remindersLength - i];
        }
    }
    
    return count;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const s = readLine().replace(/\s+$/g, '').split(' ').map(sTemp => parseInt(sTemp, 10));

    const result = nonDivisibleSubset(k, s);

    ws.write(result + '\n');

    ws.end();
}
