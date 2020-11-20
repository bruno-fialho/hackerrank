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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the timeConversion function below.
 */
function timeConversion(s) {
    let converted_time = []
    
    // Check if AM or PM
    if (s[8] == 'A') {
        // Check if it is 12am, and convert to 00
        if (s[0] == '1' && s[1] == '2') {
            converted_time[0] = '0';
            converted_time[1] = '0';
             
            for (let i = 2; i < 8; i++) {
                converted_time[i] = s[i];
            }
        }
        // If not 12am, just print all without changes
        else {
            for (let i = 0; i < 8; i++) {
                converted_time[i] = s[i];
            }
        }
    }
    
    else if (s[8] == 'P') {
        // Check if it is 12pm
        if (s[0] == '1' && s[1] == '2') {
            for (let i = 0; i < 8; i++) {
                converted_time[i] = s[i];
            }
        }
        else {
            // Convert string to number
            const hour_number = Number(10 * s[0]) + Number(s[1]);
        
            // Add 12 hours
            const converted_hour = hour_number + 12;
            
            // Check if hour < 20, and print 1x
            if (converted_hour < 20) {
                converted_time[0] = '1';
                converted_time[1] = (converted_hour % 10).toString();
            }
            // If hour >= 20m, and print 2x
            else {
                converted_time[0] = '2';
                converted_time[1] = (converted_hour % 20).toString();               
            }
            
            // Print the rest
            for (let i = 2; i < 8; i++) {
                converted_time[i] = s[i];
            }
        }
    }
    
    return converted_time.join('');
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = timeConversion(s);

    ws.write(result + "\n");

    ws.end();
}
