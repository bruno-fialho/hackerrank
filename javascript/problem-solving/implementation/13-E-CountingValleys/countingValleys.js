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
    // Declare variables
    let level = 0, valleys = 0;
    
    // Loop through path
    for (let i = 0; i < steps; i++) {
      
        // if step down
        if (path[i] == 'D') {
            level--;
        
        // if step up
        } else if (path[i] == 'U') {
            level++;

            // if step up and sea level == 0 => end of a valley
            if (level == 0) {
                valleys++;
            }
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
