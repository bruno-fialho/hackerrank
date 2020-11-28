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

function climbingLeaderboard(scores, alice) {
    // Get scores and alice length
    const scoresLength = scores.length;
    const aliceLength = alice.length;

    // Create an empty array for ranking and aliceRanking
    let ranking = []
    let aliceRanking = [];

    // Set ranking array based on scores
    for (let i = 0; i < scoresLength; i++) {
        if (i == 0) {
            ranking.push(1);
            
        } else if (scores[i] == scores[i - 1]) {
            ranking.push(ranking[i - 1]);
            
        } else if (scores[i] < scores[i - 1]) {
            ranking.push(ranking[i - 1] + 1);
        }
    }
    
    // Set a variable to the store the previous iteration in the score array
    let lastScoreIndex = scoresLength - 1;
    
    // Loop through alice array, and compare with scores array starting on previous iteration
    for (let i = 0; i < aliceLength; i++) {
        
        for (let j = lastScoreIndex; j >= 0; j--) {
            
            // If alice[i] < scores[j]
            if (alice[i] < scores[j]) {
                aliceRanking[i] = ranking[j] + 1;
                lastScoreIndex = j;
                break;
            }
                
            // If alice[i] > scores[j]
            else if (alice[i] > scores[j]) {
                if (ranking[j] == 1) {
                    aliceRanking[i] = 1;
                    lastScoreIndex = j;
                    break;
                }
                continue;
            }
                
            // If alice[i] == scores[j]
            else {
                aliceRanking[i] = ranking[j];
                lastScoreIndex = j;
                break;
            }
        }
    }        

    return aliceRanking;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const rankedCount = parseInt(readLine().trim(), 10);

    const ranked = readLine().replace(/\s+$/g, '').split(' ').map(rankedTemp => parseInt(rankedTemp, 10));

    const playerCount = parseInt(readLine().trim(), 10);

    const player = readLine().replace(/\s+$/g, '').split(' ').map(playerTemp => parseInt(playerTemp, 10));

    const result = climbingLeaderboard(ranked, player);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
