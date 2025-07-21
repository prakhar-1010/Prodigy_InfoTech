let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let xWins = 0;
let oWins = 0;

const cells = document.querySelectorAll(".cell");
const overlay = document.getElementById("overlay");
const resultText = document.getElementById("resultText");
const xScore = document.getElementById("xScore");
const oScore = document.getElementById("oScore");

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

function makeMove(index) {
  if (!isGameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  if (checkWin()) {
    endGame(`${currentPlayer} wins!`);
    updateScore(currentPlayer);
  } else if (board.every(cell => cell !== "")) {
    endGame("It's a draw!");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWin() {
  return winningCombos.some(combo => 
    combo.every(i => board[i] === currentPlayer)
  );
}

function endGame(message) {
  isGameActive = false;
  resultText.textContent = message;
  overlay.style.display = "flex";
}

function nextMatch() {
  overlay.style.display = "none";
  restartGame();
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";
  cells.forEach(cell => cell.textContent = "");
}

function updateScore(player) {
  if (player === "X") {
    xWins++;
    xScore.textContent = xWins;
  } else {
    oWins++;
    oScore.textContent = oWins;
  }
}

function resetScores() {
  xWins = 0;
  oWins = 0;
  xScore.textContent = xWins;
  oScore.textContent = oWins;
}
