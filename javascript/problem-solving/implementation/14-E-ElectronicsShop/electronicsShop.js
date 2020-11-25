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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function getMoneySpent(keyboards, drives, b) {
    // Get keyboards and drives lengths
    const keyboadsLength = keyboards.length;
    const drivesLength = drives.length;
    
    // Declare a variable to store most expensive
    let mostExpensive = 0;
    
    // Loop all keyboard + drive combinations
    for (let i = 0; i < keyboadsLength; i++) {
        for (let j = 0; j < drivesLength; j++) {
            // Check if the price is on budget
            if (keyboards[i] + drives[j] <= b) {
                // Update mostExpensive if sum is more than mostExpensive
                if (keyboards[i] + drives[j] > mostExpensive) {
                    mostExpensive = keyboards[i] + drives[j];
                }
            }
        }
    }
    
    // Check if there is at least one combination on budget
    if (mostExpensive == 0) {
        return -1;
    } else {
        return mostExpensive;        
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const bnm = readLine().split(' ');

    const b = parseInt(bnm[0], 10);

    const n = parseInt(bnm[1], 10);

    const m = parseInt(bnm[2], 10);

    const keyboards = readLine().split(' ').map(keyboardsTemp => parseInt(keyboardsTemp, 10));

    const drives = readLine().split(' ').map(drivesTemp => parseInt(drivesTemp, 10));

    /*
     * The maximum amount of money she can spend on a keyboard and USB drive, or -1 if she can't purchase both items
     */

    let moneySpent = getMoneySpent(keyboards, drives, b);

    ws.write(moneySpent + "\n");

    ws.end();
}
