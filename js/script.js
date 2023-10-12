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
