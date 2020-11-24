'use strict';

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

// Complete the bonAppetit function below.
function bonAppetit(bill, k, b) {
    // Get length of bill
    const length = bill.length;

    // Set a variable to store partial bill
    let partialBill = 0;
    
    // Add values (except bill[k]) to partial bill
    for (let i = 0; i < length; i++) {
        if (i != k) {
            partialBill += bill[i];
        }
    }
    
    // Divide bill in 2 parts to get Anna amount
    const annaAmount = partialBill / 2;
    
    // If the value is OK (print Bon Appettit) 
    if (annaAmount >= b) {
        console.log("Bon Appetit");
    // If Anna paid more(print difference)
    } else {
        console.log(b - annaAmount);
    }
}

function main() {
    const nk = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const bill = readLine().replace(/\s+$/g, '').split(' ').map(billTemp => parseInt(billTemp, 10));

    const b = parseInt(readLine().trim(), 10);

    bonAppetit(bill, k, b);
}
