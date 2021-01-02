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

function chocolateFeast(n, c, m) {
    // Check if enough money to buy one chocolate
    if (n < c) {
        return 0;
    }
    
    // Calculate number of chocolates to buy
    let count = Math.floor(n / c);
    
    // Set variables
    let wrappers = count;
    let chocolate;
    
    // While can turn in wrappers
    while (wrappers >= m) {
        // Calculate how many chocolates to receive after turn in wrappers
        chocolate = Math.floor(wrappers / m);
        
        // Subtract turn in wrappers
        wrappers -= (chocolate * m);
        
        // Add new chocolates to count
        count += chocolate;
        
        // Add new wrappers
        wrappers += chocolate;
    }
    
    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const ncm = readLine().split(' ');

        const n = parseInt(ncm[0], 10);

        const c = parseInt(ncm[1], 10);

        const m = parseInt(ncm[2], 10);

        let result = chocolateFeast(n, c, m);

        ws.write(result + "\n");
    }

    ws.end();
}
