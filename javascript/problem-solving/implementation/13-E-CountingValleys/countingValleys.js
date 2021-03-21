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


function countingValleys(steps, path) {
    let actualLevel = 0, valleys = 0;

    for (let i = 0; i < steps; i++) {
        if (path[i] === 'U') {
            actualLevel++;
            
            if (actualLevel === 0) {
                valleys++;
            }
        } else {
            actualLevel--;
        }
    }

    return valleys;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const steps = parseInt(readLine().trim(), 10);

    const path = readLine();

    const result = countingValleys(steps, path);

    ws.write(result + '\n');

    ws.end();
}
