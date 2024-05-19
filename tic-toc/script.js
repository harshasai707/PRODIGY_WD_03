// script.js

const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

let currentPlayer;
let gameActive;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  currentPlayer = currentPlayer === O_CLASS ? X_CLASS : O_CLASS; // Switch the starting player
  gameActive = true;
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

  cells.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.textContent = '';
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
}

function handleClick(event) {
  const cell = event.target;
  const cellIndex = parseInt(cell.getAttribute('data-cell-index'));

  if (!gameActive || cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)) {
    return;
  }

  placeMark(cell, cellIndex);
  if (checkWin()) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function placeMark(cell, cellIndex) {
  cell.classList.add(currentPlayer);
  cell.textContent = currentPlayer.toUpperCase();
  cell.style.fontWeight = 'bold';
}

function swapTurns() {
  currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
}

function checkWin() {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentPlayer);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function endGame(draw) {
  if (draw) {
    statusDisplay.textContent = 'Draw!';
  } else {
    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
  }
  gameActive = false;
}
