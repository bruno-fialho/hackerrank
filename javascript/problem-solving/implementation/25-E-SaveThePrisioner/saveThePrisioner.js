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

function saveThePrisoner(n, m, s) {
    // Calculate just the last turn if circle    
    const lastTurn = m % n;
    
    // Set a variable to last chair
    let lastChair;
    
    // If last turn is equal to number of chairs - the modulus is equal 1, but we need n
    if (lastTurn == 0) {
        lastChair = (s + n - 1) % n;
    
    // If last turn is not equal to number of chairs
    } else {
        lastChair = (s + lastTurn - 1) % n;
    }

    // If the result is zero, the real result is the last chair
    if (lastChair == 0) {
        lastChair = n;
    }
    
    return lastChair;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const nms = readLine().split(' ');

        const n = parseInt(nms[0], 10);

        const m = parseInt(nms[1], 10);

        const s = parseInt(nms[2], 10);

        let result = saveThePrisoner(n, m, s);

        ws.write(result + "\n");
    }

    ws.end();
}
