// Constants for grid size and tile size
const SIZE = 4; // 4x4 grid
const board = document.getElementById('game-board');

// Initializing the game state
let grid = [];

// Function to initialize the grid
function initGrid() {
    grid = [];
    for (let row = 0; row < SIZE; row++) {
        const rowArray = [];
        for (let col = 0; col < SIZE; col++) {
            rowArray.push(0); // Initialize with zero
        }
        grid.push(rowArray);
    }
}

// Function to create and display the grid
function displayGrid() {
    board.innerHTML = ''; // Clear the grid first
    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.width = `${100 / SIZE}%`;
            cell.style.height = `${100 / SIZE}%`;

            // If the cell contains a value, display it
            if (grid[row][col] !== 0) {
                cell.textContent = grid[row][col];
                cell.classList.add('tile');
                cell.style.backgroundColor = getTileColor(grid[row][col]);
            }

            board.appendChild(cell);
        }
    }
}

// Function to get the tile color based on its value
function getTileColor(value) {
    const colors = {
        2: '#eee4da',
        4: '#ede0c8',
        8: '#f2b179',
        16: '#f59563',
        32: '#f67c5f',
        64: '#f65e3b',
        128: '#edcf72',
        256: '#edcc61',
        512: '#edc850',
        1024: '#edc53f',
        2048: '#edc22e',
    };
    return colors[value] || '#ccc0b3';
}

// Function to add a random tile (2 or 4) on the grid
function addRandomTile() {
    const emptyCells = [];
    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            if (grid[row][col] === 0) {
                emptyCells.push({ row, col });
            }
        }
    }

    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
    }
}

// Function to slide the tiles in one direction (left, right, up, down)
function slideTiles(direction) {
    switch (direction) {
        case 'left':
            for (let row = 0; row < SIZE; row++) {
                slideRowLeft(row);
            }
            break;
        case 'right':
            for (let row = 0; row < SIZE; row++) {
                slideRowRight(row);
            }
            break;
        case 'up':
            for (let col = 0; col < SIZE; col++) {
                slideColUp(col);
            }
            break;
        case 'down':
            for (let col = 0; col < SIZE; col++) {
                slideColDown(col);
            }
            break;
    }
}

// Helper functions for sliding rows and columns
function slideRowLeft(row) {
    const newRow = grid[row].filter(val => val !== 0); // Remove all zeros
    const zeros = Array(SIZE - newRow.length).fill(0); // Add zeros to the right
    grid[row] = [...newRow, ...zeros];
}

function slideRowRight(row) {
    grid[row].reverse();
    slideRowLeft(row);
    grid[row].reverse();
}

function slideColUp(col) {
    const colValues = [];
    for (let row = 0; row < SIZE; row++) {
        colValues.push(grid[row][col]);
    }

    const newCol = colValues.filter(val => val !== 0);
    const zeros = Array(SIZE - newCol.length).fill(0);
    const finalCol = [...newCol, ...zeros];

    for (let row = 0; row < SIZE; row++) {
        grid[row][col] = finalCol[row];
    }
}

function slideColDown(col) {
    const colValues = [];
    for (let row = 0; row < SIZE; row++) {
        colValues.push(grid[row][col]);
    }

    colValues.reverse();
    slideColUp(col);
    const newCol = [];
    for (let row = 0; row < SIZE; row++) {
        newCol.push(grid[row][col]);
    }

    newCol.reverse();
    for (let row = 0; row < SIZE; row++) {
        grid[row][col] = newCol[row];
    }
}

// Keydown event listener to move tiles
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            slideTiles('left');
            break;
        case 'ArrowRight':
            slideTiles('right');
            break;
        case 'ArrowUp':
            slideTiles('up');
            break;
        case 'ArrowDown':
            slideTiles('down');
            break;
    }

    addRandomTile();
    displayGrid();
});

// Start the game
function startGame() {
    initGrid();
    addRandomTile();
    addRandomTile();
    displayGrid();
}

startGame();
