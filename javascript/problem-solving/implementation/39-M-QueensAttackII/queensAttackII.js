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

function queensAttack(n, k, r_q, c_q, obstacles) {
    if (n === 1) {
        return 0;
    }
    
    const findDirection = (row, column) => {
        // East
        if (row === r_q && column > c_q) {
            return 0;
        }
        
        // West
        else if (row === r_q && column < c_q) {
            return 1;
        }
        
        // North
        else if (column === c_q  && row > r_q) {
            return 2;
        }
        
        // South
        else if (column === c_q  && row < r_q) {
            return 3;
        }
        
        // NorthEast
        else if (
            row > r_q && 
            column > c_q && 
            row - column === r_q - c_q
            ) {
            return 4;
        }
        
        // NorthWest
        else if (
            row > r_q && 
            column < c_q && 
            row + column === r_q + c_q
            ) {
            return 5;
        }
        
        // SouthEast
        else if (
            row < r_q && 
            column > c_q && 
            row + column === r_q + c_q
            ) {
            return 6;
        }
        
        // SouthWest
        else if (
            row < r_q && 
            column < c_q && 
            Math.abs(r_q - row) === Math.abs(c_q - column)
            ) {
            return 7;
        }
        
        // If not a valid direction
        else {
            return null;
        }
    }
    
    const setLimits = (n, r_q, c_q) => {
        let limits = Array(8)
        .fill()
        .map(() => Array(2).fill());
        
        // East
        limits[0] = [r_q, n + 1];
        
        // West
        limits[1] = [r_q, 0];
        
        // North
        limits[2] = [n + 1, c_q];
        
        // South
        limits[3] = [0, c_q];
        
        // NorthEast
        if (r_q > c_q) {
            limits[4] = [n + 1, c_q + (n + 1 - r_q)];
        } 
        else {
            limits[4] = [r_q + (n + 1 - c_q), n + 1 ];
        }
        
        // NorthWest
        if ((n + 1 - r_q) < c_q) {
            limits[5] = [n + 1, c_q - (n + 1 - r_q)];
        } 
        else {
            limits[5] = [r_q + (c_q), 0];
        }
        
        // SouthEast
        if ((n + 1 - c_q) < r_q) {
            limits[6] = [r_q - (n + 1 - c_q), n + 1];
        }
        else {
            limits[6] = [0, c_q + r_q];
        }
        
        // SouthWest
        if (r_q > c_q) {
            limits[7] = [r_q - c_q, 0];
        }
        else {
            limits[7] = [0, c_q - r_q];
        }
        
        return limits;
    }
    
    // Create an array with limits for each direction, without obstacles
    let closest = setLimits(n, r_q, c_q);
    
    let count = 0;

    // For each obstacle, check if it is the closest on that direction
    for (let i = 0; i < k; i++) {
        // Get direction from findDirection function
        // Returns an Integer from 0 to 7
        const direction = findDirection(obstacles[i][0], obstacles[i][1]);
        
        // If obstacle is not in any valid direction, go to next
        if (direction === null) {
            continue;
        }

        // Check if obstacle is the new closest in your direction
        if (
            Math.abs(obstacles[i][0] - r_q) + 
            Math.abs(obstacles[i][1] - c_q) <
            Math.abs(closest[direction][0] - r_q) + 
            Math.abs(closest[direction][1] - c_q)
        ) {
            closest[direction][0] = obstacles[i][0];
            closest[direction][1] = obstacles[i][1];
        }
    }
    
    // Calculate spaces for each direction
    
    // East Direction [0]
    count += (closest[0][1] - c_q - 1);
    
    // West Direction [1]
    count += (c_q - closest[1][1] - 1);
    
    // North Direction [2]
    count += (closest[2][0] - r_q - 1);
    
    // South Direction [3]
    count += (r_q - closest[3][0] - 1);

    // NorthEast Direction [4]
    count += (closest[4][0] - r_q - 1);
    
    // NorthWest Direction [5]
    if ((n - r_q) < (c_q - 1)) {
        count += (closest[5][0] - r_q - 1);
    } 
    else {
        count += (c_q - closest[5][1] - 1);
    }
    
    // SouthEast Direction [6]
    if ((n - c_q) < (r_q - 1)) {
        count += (closest[6][1] - c_q - 1);
    } 
    else {
        count += (r_q - closest[6][0] - 1);   
    }

    // SouthWest Direction [7]
    if (r_q < c_q) {
        count += (r_q - closest[7][0] - 1);
    } 
    else {
        count += (c_q - closest[7][1] - 1);
    }
    
    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const r_qC_q = readLine().split(' ');

    const r_q = parseInt(r_qC_q[0], 10);

    const c_q = parseInt(r_qC_q[1], 10);

    let obstacles = Array(k);

    for (let i = 0; i < k; i++) {
        obstacles[i] = readLine().split(' ').map(obstaclesTemp => parseInt(obstaclesTemp, 10));
    }

    let result = queensAttack(n, k, r_q, c_q, obstacles);

    ws.write(result + "\n");

    ws.end();
}
