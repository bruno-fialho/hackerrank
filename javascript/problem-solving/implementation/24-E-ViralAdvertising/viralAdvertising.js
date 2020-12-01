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

function viralAdvertising(n) {
    // Set variables
    let i = 0, cumulative = 0;
    let recipients = 5;
    let liked;
    
    while (i < n) {
        // Calculate how many of recipients will like the advertisement
        liked = Math.floor(recipients/2);
        
        // Calculate the cumulative sum of likes
        cumulative += liked;
        
        // Calculate how many recipients for next day
        recipients = liked * 3;
        
        i++;
    }
    
    return cumulative;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let result = viralAdvertising(n);

    ws.write(result + "\n");

    ws.end();
}
