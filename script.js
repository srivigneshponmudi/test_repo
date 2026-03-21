// Game state
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// DOM elements
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const resetButton = document.getElementById('resetBtn');

// Event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    // Check if cell is already filled or game is over
    if (gameBoard[index] !== '' || gameOver) {
        return;
    }

    // Update game board
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.disabled = true;

    // Check for winner
    if (checkWinner()) {
        statusDisplay.textContent = `🎉 Player ${currentPlayer} wins!`;
        gameOver = true;
        return;
    }

    // Check for draw
    if (gameBoard.every(cell => cell !== '')) {
        statusDisplay.textContent = "🤝 It's a draw!";
        gameOver = true;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerDisplay.textContent = currentPlayer;
}

// Check if current player wins
function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameBoard[index] === currentPlayer);
    });
}

// Reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    statusDisplay.textContent = '';
    currentPlayerDisplay.textContent = currentPlayer;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.disabled = false;
        cell.classList.remove('x', 'o');
    });
}
