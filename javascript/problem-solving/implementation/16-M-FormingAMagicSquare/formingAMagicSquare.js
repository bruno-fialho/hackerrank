'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function formingMagicSquare(s) {
    /* 
     * Set the eigth variations of magic square 'saturn'
     * Four variations are a +90 degrees rotation from original
     * Four variations are reflections from the first four
     */
    const saturnA = [[4, 9, 2], [3, 5, 7], [8, 1, 6]];
    const saturnB = [[8, 3, 4], [1, 5, 9], [6, 7, 2]];
    const saturnC = [[6, 1, 8], [7, 5, 3], [2, 9, 4]];
    const saturnD = [[2, 7, 6], [9, 5, 1], [4, 3, 8]];
    const saturnE = [[2, 9, 4], [7, 5, 3], [6, 1, 8]];
    const saturnF = [[4, 3, 8], [9, 5, 1], [2, 7, 6]];
    const saturnG = [[8, 1, 6], [3, 5, 7], [4, 9, 2]];
    const saturnH = [[6, 7, 2], [1, 5, 9], [8, 3, 4]];
    
    // Set variables to count difference from given array for each variation
    let saturnACount = 0, saturnBCount = 0, saturnCCount = 0, saturnDCount = 0,
        saturnECount = 0, saturnFCount = 0, saturnGCount = 0, saturnHCount = 0;
    
    // Loop through the square and add difference of each digit for each variation
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            saturnACount += Math.abs(s[i][j] - saturnA[i][j]);
            saturnBCount += Math.abs(s[i][j] - saturnB[i][j]);
            saturnCCount += Math.abs(s[i][j] - saturnC[i][j]);
            saturnDCount += Math.abs(s[i][j] - saturnD[i][j]);
            saturnECount += Math.abs(s[i][j] - saturnE[i][j]);
            saturnFCount += Math.abs(s[i][j] - saturnF[i][j]);
            saturnGCount += Math.abs(s[i][j] - saturnG[i][j]);
            saturnHCount += Math.abs(s[i][j] - saturnH[i][j]);
        }
    }
    
    // Just return the minimum total difference from a magic square variation
    return Math.min(saturnACount, saturnBCount, saturnCCount, saturnDCount,
                    saturnECount, saturnFCount, saturnGCount, saturnHCount);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let s = Array(3);

    for (let i = 0; i < 3; i++) {
        s[i] = readLine().split(' ').map(sTemp => parseInt(sTemp, 10));
    }

    const result = formingMagicSquare(s);

    ws.write(result + '\n');

    ws.end();
}
