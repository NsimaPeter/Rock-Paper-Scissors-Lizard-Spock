const choices = ["rock", "paper", "scissors", "lizard", "spock"];
let userScore = 0;
let computerScore = 0;
let tries = 0;
let maxTries = 7;
let computerDelay = 1000;
let gameInProgress = false;

function computerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return "It's a tie!";
  } else if (
    (userChoice === "rock" &&
      (computerChoice === "scissors" || computerChoice === "lizard")) ||
    (userChoice === "paper" &&
      (computerChoice === "rock" || computerChoice === "spock")) ||
    (userChoice === "scissors" &&
      (computerChoice === "paper" || computerChoice === "lizard")) ||
    (userChoice === "lizard" &&
      (computerChoice === "spock" || computerChoice === "paper")) ||
    (userChoice === "spock" &&
      (computerChoice === "rock" || computerChoice === "scissors"))
  ) {
    userScore++;
    return "You win!";
  } else {
    computerScore++;
    return "Computer wins!";
  }
}

function updateScore() {
    const userScoreElement = document.getElementById("user-score");
    const computerScoreElement = document.getElementById("computer-score");
    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
  }
  
  function updateRemainingTries() {
    const remainingTriesElement = document.getElementById("remaining-tries");
    remainingTriesElement.textContent = maxTries - tries;
  }
  
  function displayUserChoice(userChoice) {
    const userChoiceElement = document.getElementById("user-choice");
    userChoiceElement.textContent = "You chose: " + userChoice;
  }
  
  function displayComputerChoice(computerChoice) {
    const computerChoiceElement = document.getElementById("computer-choice");
    computerChoiceElement.textContent = "Computer chose: " + computerChoice;
  }
  
  function setDifficulty(difficulty) {
    if (gameInProgress) return;
    if (difficulty === "easy") {
      maxTries = 7; //
    } else if (difficulty === "normal") {
      maxTries = 5;
      computerDelay = 1000;
    } else if (difficulty === "hard") {
      maxTries = 3;
      computerDelay = 500;
    }
    updateRemainingTries();
  }
  
  function congratulateWinner() {
    let message = "";
    if (userScore > computerScore) {
      message = "Congratulations! You have the highest score.";
    } else if (userScore < computerScore) {
      message = "Well played! Keep trying to beat the computer.";
    } else {
      message = "It's a tie! Try to win the next round.";
    }
    const winnerMessageElement = document.getElementById("winner-message");
    winnerMessageElement.textContent = message;
  }
  
  function playGame(userChoice) {
    if (tries < maxTries) {
      const computer = computerChoice();
      displayComputerChoice(computer);
      const message = determineWinner(userChoice, computer);
      const messageElement = document.getElementById("message");
      messageElement.textContent = message;
      updateScore();
      tries++;
      updateRemainingTries();
      if (tries === maxTries) {
        congratulateWinner();
        setTimeout(() => {
          alert("Game over! You've reached the maximum number of tries.");
          resetGame();
        }, 100);
      }
    }
  }
  
  function resetGame() {
    userScore = 0;
    computerScore = 0;
    tries = 0;
    gameInProgress = false;
    updateScore();
    updateRemainingTries();
    document.getElementById("message").textContent = "Make your choice!";
    document.getElementById("computer-choice").textContent = "";
    document.getElementById("winner-message").textContent = "";
  
    document.querySelectorAll('input[name="difficulty"]').forEach((radio) => {
      radio.disabled = false;
    });
  }
  
  function startGame() {
    gameInProgress = true;
    document.querySelectorAll('input[name="difficulty"]').forEach((radio) => {
      radio.disabled = true;
    });
  }
  
  document.querySelectorAll(".choices button").forEach((button) => {
    button.addEventListener("click", function () {
      const userChoice = this.id;
      const difficulty = document.querySelector(
        'input[name="difficulty"]:checked'
      ).value;
      setDifficulty(difficulty);
      startGame();
      playGame(userChoice);
    });
  });
  
  window.addEventListener("load", resetGame);