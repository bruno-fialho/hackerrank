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

function timeInWords(h, m) {
    // Set string array for hours
    const hourString = ['one', 'two', 'three', 'four', 'five', 'six', 
             'seven', 'eigth', 'nine', 'ten', 'eleven', 'twelve'];
    
    // Set string array for minutes to nineteen
    const minuteString = ['one', 'two', 'three', 'four', 'five', 'six', 
                     'seven', 'eigth', 'nine', 'ten', 'eleven', 
                     'twelve', 'thirteen', 'fourteen', 'fifteen',
                     'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    
    // Set variables
    let hour;
    let minutes;
    
    // If minutes = 0
    if (m === 0) {
        hour = hourString[h - 1];
        
        return `${hour} o' clock`;
    
    // If minutes = 1
    } else if (m === 1) {
        hour = hourString[h - 1];
        minutes = minuteString[m - 1];
        
        return `${minutes} minute past ${hour}`;

    // If minutes = 15
    } else if (m === 15) {
        hour = hourString[h - 1];
        
        return `quarter past ${hour}`;

    // If minutes < 20
    } else if (m < 20) {
        hour = hourString[h - 1];
        minutes = minuteString[m - 1];
        
        return `${minutes} minutes past ${hour}`;

    // If minutes = 20
    } else if (m === 20) {
        hour = hourString[h - 1];
        
        return `twenty minutes past ${hour}`;

    // If minutes between 21 and 30
     } else if (m < 30) {
        hour = hourString[h - 1];
        minutes = minuteString[m - 21];
        
        return `twenty ${minutes} minutes past ${hour}`;

    // If minutes = 30
    } else if (m === 30) {
        hour = hourString[h - 1];
        
        return `half past ${hour}`;

    // If minutes = 45
    } else if (m === 45) {
        hour = hourString[h];
        
        return `quarter to ${hour}`;

    // If minutes between 31 and 59
    } else if (m > 30) {

        // If minutes = 40
        if (m === 40) {
            hour = hourString[h];
            
            return `twenty minutes to ${hour}`;

        // If minutes between 31 and 39
        } else if (m < 40) {
            hour = hourString[h];
            minutes = minuteString[60 - m - 21];
            
            return `twenty ${minutes} minutes to ${hour}`;

        // If minutes between 41 and 59
        } else if (m > 40) {
            hour = hourString[h];
            minutes = minuteString[60 - m - 1];
            
            return `${minutes} minutes to ${hour}`;
        }
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const h = parseInt(readLine(), 10);

    const m = parseInt(readLine(), 10);

    let result = timeInWords(h, m);

    ws.write(result + "\n");

    ws.end();
}
