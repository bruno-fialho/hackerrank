'use strict';

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

function countApplesAndOranges(s, t, a, b, apples, oranges) {
    // Get number of apples and oranges
    const falledApples = apples.length;
    const falledOranges = oranges.length;
    
    // Create variables to counter apples and oranges on house
    let countApplesOnHouse = 0;
    let countOrangesOnHouse = 0;
    
    // Loop through apples
    for (let i = 0; i < falledApples; i++) {
        if (a + apples[i] >= s & a + apples[i] <= t) {
            countApplesOnHouse++;
        }
    }
    
    console.log(countApplesOnHouse);
    
    // Loop through oranges
    for (let i = 0; i < falledOranges; i++) {
        if (b + oranges[i] >= s & b + oranges[i] <= t) {
            countOrangesOnHouse++;
        }
    }
    
    console.log(countOrangesOnHouse);   
}

function main() {
    const st = readLine().split(' ');

    const s = parseInt(st[0], 10);

    const t = parseInt(st[1], 10);

    const ab = readLine().split(' ');

    const a = parseInt(ab[0], 10);

    const b = parseInt(ab[1], 10);

    const mn = readLine().split(' ');

    const m = parseInt(mn[0], 10);

    const n = parseInt(mn[1], 10);

    const apples = readLine().split(' ').map(applesTemp => parseInt(applesTemp, 10));

    const oranges = readLine().split(' ').map(orangesTemp => parseInt(orangesTemp, 10));

    countApplesAndOranges(s, t, a, b, apples, oranges);
}
