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

function howManyGames(p, d, m, s) {
    // Set variables
    let count = 0;
    let money = s;
    let actualPrice = p;
    
    while (money >= 0) {
        // Check if there is enough money
        if (money >= actualPrice) {
            money -= actualPrice;
            count++;
            
        // If not return count
        } else {
            return count;
        }
        
        // Check if actual price is greater than 'm'
        if (actualPrice > m) {
            // Set new actualPrice
            actualPrice -= d;
            
            // Check if need to set actualPrice to 'm'
            if (actualPrice < m) {
                actualPrice = m;
            }
        }
    }

    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const pdms = readLine().split(' ');

    const p = parseInt(pdms[0], 10);

    const d = parseInt(pdms[1], 10);

    const m = parseInt(pdms[2], 10);

    const s = parseInt(pdms[3], 10);

    let answer = howManyGames(p, d, m, s);

    ws.write(answer + "\n");

    ws.end();
}