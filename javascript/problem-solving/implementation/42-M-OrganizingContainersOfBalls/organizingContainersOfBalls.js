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

// Complete the organizingContainers function below.
function organizingContainers(container) {
    // Get length of container
    const length = container.length;
    
    // Get total for each container and each type
    let totalPerContainer = Array(length).fill(0);
    let totalPerType = Array(length).fill(0);        

    // Loop all containers and count items
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            totalPerContainer[i] += container[i][j];
            totalPerType[j] += container[i][j];
        }
    }
    
    // Sort both arrays
    const sortedTotalPerContainer = totalPerContainer.sort();
    const sortedTotalPerType = totalPerType.sort();
    
    // Check if is possible or impossible to organize
    if (sortedTotalPerType === sortedTotalPerContainer) {
        return 'Impossible';
    } else {
        return 'Possible';
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const n = parseInt(readLine(), 10);

        let container = Array(n);

        for (let i = 0; i < n; i++) {
            container[i] = readLine().split(' ').map(containerTemp => parseInt(containerTemp, 10));
        }

        let result = organizingContainers(container);

        ws.write(result + "\n");
    }

    ws.end();
}
