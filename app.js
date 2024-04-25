// Select all cells
const cells = document.querySelectorAll('.cell');
const player1ScoreElement = document.querySelector('.player-1-score');
const player2ScoreElement = document.querySelector('.player-2-score');

// Get the modal and buttons
let modalContent = document.querySelector('.modal-content');
let playAgainButton = document.getElementById('play-again');
let resetButton = document.getElementById('reset');
let result = document.getElementById('result');

// Sounds for the game
let player1WinSound = new Audio('music/Player 1.mp3');
let player2WinSound = new Audio('music/Player 2.mp3');
let drawSound = new Audio('music/draw.mp3');

//Scoreboard
let scoreboard = {
  player1: 0,
  player2: 0
};

// Players
let player1 = '<img class="player-icon" src="images/battle droid (2).png">';
let player2 = '<img class="player-icon" src="images/battle droid (2).png">';

// Current player
let currentPlayer = player1;

//Winning combination
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Game over flag
let gameOver = false;

function playSound(player) {
  if (!isMuted) {
    if (player === player1) {
      player1WinSound.play();
    } else if (player === player2) {
      player2WinSound.play();
    } else {
      drawSound.play();
    }
  }
}

// Function to check for a win
function checkWin(player) {
  return winningCombinations.some(combination => {
    if (combination.every(index => cells[index].innerHTML === player)) {
      // Update the scoreboard and end the game
      updateScoreboard(player);
      gameOver = true;

      // Play the appropriate win sound
      playSound(player);

      // Display the modal
      modalContent.style.display = 'block';

      return true;
    }
    return false;
  });
}
// Function to update the scoreboard
function updateScoreboard(player) {
  // Update the score of the winning player
  if (player === player1) {
    scoreboard.player1++;
    player1ScoreElement.textContent = scoreboard.player1;
  } else {
    scoreboard.player2++;
    player2ScoreElement.textContent = scoreboard.player2;
  }

  // Display the result in the modal
  result.textContent = 'Player ' + (player === player1 ? '1' : '2') + ' wins!';
  modalContent.style.display = 'block';
}

// Add click event listener to each cell
cells.forEach(cell => {
  cell.addEventListener('click', function() {
    // Check if the game is over or the cell has a player
    if (gameOver || this.innerHTML) {
      return;
    }

    // Place the current player's mark
    this.innerHTML = currentPlayer;

    // Check for a win
    if (checkWin(currentPlayer)) {
      return;
    }

    // Check for a draw
    if (Array.from(cells).every(cell => cell.innerHTML)) {
      result.textContent = 'It\'s a draw!';
      modalContent.style.display = 'block';
      drawSound.play();
      gameOver = true;
      return;
    }

    // Switch the current player
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  });
});

// Sound toggle button
let soundToggleButton = document.getElementById('sound-toggle-button');
let isMuted = false;

soundToggleButton.addEventListener('click', function() {
  isMuted = !isMuted;
  soundToggleButton.textContent = isMuted ? 'Sound: OFF' : 'Sound: ON';
});

// Play Again button
playAgainButton.addEventListener('click', function() {
  cells.forEach(cell => {
    cell.innerHTML = '';
  });
  currentPlayer = player1;
  modalContent.style.display = 'none';
  gameOver = false; // Reset the game
});

// Reset button
resetButton.addEventListener('click', function() {
  // Clear the game board
  cells.forEach(cell => {
    cell.innerHTML = '';
  });

  // Reset the game state
  currentPlayer = player1;
  gameOver = false;

  // Reset the scoreboard
  scoreboard.player1 = 0;
  scoreboard.player2 = 0;
  player1ScoreElement.textContent = '0';
  player2ScoreElement.textContent = '0';

  // Hide the modal
  modalContent.style.display = 'none';
});

// Array of background images
var backgrounds = [
  "url('images/(11).jpeg')",
  "url('images/(12).jpeg')",
  "url('images/(13).jpeg')",
  "url('images/(14).jpeg')",
  "url('images/(15).jpeg')",
];

// Set initial background image
document.body.style.backgroundImage = backgrounds[3];

// Index of the current background
var currentBackground = 0;

// Function to change the background image
function changeBackground() {
  currentBackground = (currentBackground + 1) % backgrounds.length;
  document.body.style.backgroundImage = backgrounds[currentBackground];
}

// Add event listener to the button
document.getElementById('change-background').addEventListener('click', changeBackground);


















