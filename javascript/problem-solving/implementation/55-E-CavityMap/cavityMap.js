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

function cavityMap(grid) {
    // Get grid length
    const n = grid.length;

    // Loop all rows except edges
    for (let i = 1; i < n - 1; i++) {
        
        // Loop all columns except edges
        for (let j = 1; j < n - 1; j++) {
            
            // Check adjacents
            if (
                grid [i - 1][j] < grid[i][j] &&
                grid [i + 1][j] < grid[i][j] &&
                grid [i][j - 1] < grid[i][j] &&
                grid [i][j + 1] < grid[i][j]
            ) {
                // Substitute value in string by 'X'
                grid[i] = grid[i].substring(0, j) + 'X' + grid[i].substring(j + 1);
            }
        }
    }
    
    return grid;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let grid = [];

    for (let i = 0; i < n; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    let result = cavityMap(grid);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
