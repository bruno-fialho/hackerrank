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

function appendAndDelete(s, t, k) {
    // Get length of s, t and the difference between them
    const lengthS = s.length;
    const lengthT = t.length;
    const difference = lengthS - lengthT;
    
    // Set a variable to count the total of equal initial letters
    let equalInitialLetters = 0;
    
    // Loop through both words and count equal letters
    for (let i = 0; i < lengthT; i++) {
        if (t[i] == s[i]) {
            equalInitialLetters++;
        } else {
            break;
        }
    }
    
    // Calculate minimal letters to delete
    const minimalLettersToDelete = (lengthS - equalInitialLetters) > 0 ? (
        lengthS - equalInitialLetters
        ) : 0;
    
    // Calculate minimal letters to insert
    const minimalLettersToInsert = (lengthT - equalInitialLetters) > 0 ? (
        lengthT - equalInitialLetters
        ) : 0;
    
    // If k is exactly equal to letters to delete plus letters to insert
    if (minimalLettersToDelete + minimalLettersToInsert == k) {
        return "Yes";

    // If you can delete all letters of s and insert all letters of t
    } else if (
        minimalLettersToDelete + minimalLettersToInsert < k && 
        lengthS + lengthT <= k
    ) {
        return "Yes";
    
    // If you can delete the difference, and delete/insert the last letter until k
    } else if (
        minimalLettersToDelete + minimalLettersToInsert < k && 
        ((k - difference) % 2) === 0
    ) {
        return "Yes";

    } else {
        return "No";
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const t = readLine();

    const k = parseInt(readLine(), 10);

    let result = appendAndDelete(s, t, k);

    ws.write(result + "\n");

    ws.end();
}
