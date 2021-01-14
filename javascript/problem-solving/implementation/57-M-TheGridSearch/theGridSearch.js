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

// Create a compare function
function compare(G, P, r, c) {
    
    // Loop all pattern rows
    for (const [rIndex, row] of P.entries()) {
        
        // Loop all columns
        for (const [cIndex, col] of [...row].entries()) {
            
            // Check if the value from col is equal to G[row][col]
            if (col != G[r + rIndex][c + cIndex]) return false;
        }
    }
    return true;
}
    
function gridSearch(G, P) {
    // Get rows and rows index
    for (const [rIndex, row] of G.entries()) {

        // Check not too close from end of lines
        if (G.length - rIndex < P.length) break;

        for (const [cIndex, col] of [...row].entries()) {
            // console.log("cIndex = " + cIndex);
            // console.log("col = " + col);
            
            // Check not too close from end of columns
            if (G[0].length - cIndex < P[0].length) break;
            
            // Check if the vale is equal to the first pattern value
            if (col != P[0][0]) continue;
            
            // Call compare function
            if (compare(G, P, rIndex, cIndex)) return 'YES';
        }
    }
    return 'NO';
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const RC = readLine().split(' ');

        const R = parseInt(RC[0], 10);

        const C = parseInt(RC[1], 10);

        let G = [];

        for (let i = 0; i < R; i++) {
            const GItem = readLine();
            G.push(GItem);
        }

        const rc = readLine().split(' ');

        const r = parseInt(rc[0], 10);

        const c = parseInt(rc[1], 10);

        let P = [];

        for (let i = 0; i < r; i++) {
            const PItem = readLine();
            P.push(PItem);
        }

        let result = gridSearch(G, P);

        ws.write(result + "\n");
    }

    ws.end();
}
