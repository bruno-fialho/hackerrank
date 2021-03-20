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

function breakingRecords(scores) {
    let [bestScore, worstScore] = [scores[0], scores[0]];
    let [countBreakingMax, countBreakingMin] = [0, 0];

    const totalGames = scores.length;
    
    for (let i = 1; i < totalGames; i++) {
        if (scores[i] > bestScore) {
            bestScore = scores[i];
            countBreakingMax++;
        } else if (scores[i] < worstScore) {
            worstScore = scores[i];
            countBreakingMin++;
        }
    }
    
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
