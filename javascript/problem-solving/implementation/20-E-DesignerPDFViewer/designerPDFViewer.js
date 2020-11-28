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

function designerPdfViewer(h, word) {
    // Get word length
    const wordLength = word.length;
    
    // Set variables to index and maxHeigth
    let index;
    let maxHeigth = 0;
    
    // Loop through word
    for (let i = 0; i < wordLength; i++) {
        // Get index of each letter
        index = word.charCodeAt(i) - 97;
        
        // Compare heigth of letter in h with maxHeigth
        if (h[index] > maxHeigth) {
            maxHeigth = h[index];
        }
    }
    
    return maxHeigth * wordLength;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const h = readLine().split(' ').map(hTemp => parseInt(hTemp, 10));

    const word = readLine();

    let result = designerPdfViewer(h, word);

    ws.write(result + "\n");

    ws.end();
}
