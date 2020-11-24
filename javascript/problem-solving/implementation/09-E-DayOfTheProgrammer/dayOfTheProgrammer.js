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

// Complete the dayOfProgrammer function below.
function dayOfProgrammer(year) {
    // If year == 1918 => special case (-15 days in february)
    if (year == 1918) {
        return "26.09.1918";
    
    // If year < 1918 => Julian calendar
    } else if (year >= 1700 && year < 1918) {
        // Check if leap year
        if (year % 4 == 0) {
            return "12.09." + year;
        // If not leap
        } else {
            return "13.09." + year;
        }
    
    // If year > 1918 => Gregorian calendar
    } else if (year > 1918 && year <= 2700) {
        // Check if leap year
        if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
            return "12.09." + year;
        // If not leap year
        } else {
            return "13.09." + year;
        }
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const year = parseInt(readLine().trim(), 10);

    const result = dayOfProgrammer(year);

    ws.write(result + '\n');

    ws.end();
}
