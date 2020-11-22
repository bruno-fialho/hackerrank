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

function gradingStudents(grades) {
    // Get length and set a new list
    const length = grades.length;
    let newGrades = [];
    
    // Loop through grades
    for (let i = 0; i < length; i++) {
        // Get next multiple of five
        const nextMultipleOfFive = Math.ceil(grades[i] / 5) * 5;
        
        // Check if it should be rounded
        if (nextMultipleOfFive - grades[i] < 3 && grades[i] > 37) {
            newGrades[i] = nextMultipleOfFive;
        }
        // In case of not rounded
        else {
            newGrades[i] = grades[i];
        }
    }
            
    return newGrades;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const gradesCount = parseInt(readLine().trim(), 10);

    let grades = [];

    for (let i = 0; i < gradesCount; i++) {
        const gradesItem = parseInt(readLine().trim(), 10);
        grades.push(gradesItem);
    }

    const result = gradingStudents(grades);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
