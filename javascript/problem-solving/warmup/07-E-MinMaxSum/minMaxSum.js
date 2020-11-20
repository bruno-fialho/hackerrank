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

// Complete the miniMaxSum function below.
function miniMaxSum(arr) {
    // Declare variables
    let maxSum = 0, minSum = 5000000000, actualSum = 0;
    
    // Get array length
    const length = arr.length;
    
    // outIndex means the index of integer that is out of sum
    for (let outIndex = 0; outIndex < length; outIndex++)
    {
        // Loop array and calculate sum without outIndex
        for (let x = 0; x < length; x++)
        {
            if (x != outIndex)
            {
                actualSum += arr[x];
            }
        }
        
        // Initialize maxSum and minSum
        if (outIndex == 0) {
            maxSum = actualSum;
            minSum = actualSum;
        }
        // Check if sum is greater than max or smaller than min
        else {
            if (actualSum > maxSum) {
                maxSum = actualSum;
            }
            if (actualSum < minSum) {
                minSum = actualSum;
            }
        }
        
        actualSum = 0;
    }
    
    process.stdout.write(minSum + " " + maxSum);
}


function main() {
    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    miniMaxSum(arr);
}
