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

// Complete the breakingRecords function below.
function breakingRecords(scores) {
    // Set variables to count breaking records
    let countBreakingMax = 0;
    let countBreakingMin = 0;
    
    // Get length of scores
    const totalScores = scores.length;
    
    // Set best and worst scores to first game score
    let worstScore = scores[0];
    let bestScore = scores[0];
    
    // Start counting breaking records
    for (let i = 1; i < totalScores; i++) {
        if (scores[i] > bestScore) {
            bestScore = scores[i];
            countBreakingMax++;
        } else if (scores[i] < worstScore) {
            worstScore = scores[i];
            countBreakingMin++;
        }
    }
    
    // Return an array with breaking records
    return [countBreakingMax, countBreakingMin];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const scores = readLine().split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

    const result = breakingRecords(scores);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
