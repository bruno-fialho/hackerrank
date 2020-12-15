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

// Complete the acmTeam function below.
function acmTeam(topic) {
    const totalAtendees = topic.length;
    const topicsLength = topic[0].length;
    
    let countTopics, countTeams = 0, maxCountTopics = 0;
    
    for (let i = 0; i < totalAtendees - 1; i++) {
        for (let j = i + 1; j < totalAtendees; j++) {
            countTopics = 0;
            
            for (let k = 0; k < topicsLength; k++) {
                if (topic[i][k] === '1' || topic[j][k] === '1') {
                    countTopics++;
                }
            }
            
            if (countTopics > maxCountTopics) {
                countTeams = 1;
                maxCountTopics = countTopics;
            }
            else if (countTopics === maxCountTopics) {
                countTeams++;
            }
        }
    }
    
    const result = [maxCountTopics, countTeams];
    
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nm = readLine().split(' ');

    const n = parseInt(nm[0], 10);

    const m = parseInt(nm[1], 10);

    let topic = [];

    for (let i = 0; i < n; i++) {
        const topicItem = readLine();
        topic.push(topicItem);
    }

    let result = acmTeam(topic);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
