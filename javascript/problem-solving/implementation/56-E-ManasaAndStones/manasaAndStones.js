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

function stones(n, a, b) {
    // Create empty array for last stone values
    let lastStones = [];
    
    
    // Special case a == b
    if (a == b) {
        lastStones.push(a * (n - 1));
        return lastStones;
    }
    
    // Loop all possible 'n' values
    for (let i = 0; i < n; i++) {
        
        // Calculate last stone
        let lastStone = a * (n - 1 - i) + b * (i);
        
        // Add last stone to array
        lastStones.push(lastStone);
    }
    
    // Return sorted array
    return lastStones.sort((a, b) => a - b);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const T = parseInt(readLine(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const n = parseInt(readLine(), 10);

        const a = parseInt(readLine(), 10);

        const b = parseInt(readLine(), 10);

        let result = stones(n, a, b);

        ws.write(result.join(" ") + "\n");
    }

    ws.end();
}
