
// Variables- 

const rockButtonElement = document.querySelector('.rock-button');
const paperButtonElement = document.querySelector('.paper-button');
const scissorButtonElement = document.querySelector('.scissor-button');
const resetButtonElement = document.querySelector('.score-reset-button');
const autoplayButtonElement = document.querySelector('.auto-play-button');

const playersMoveElement = document.querySelector('.players-move');
const computersMoveElement = document.querySelector('.computers-move');
const resultElement = document.querySelector('.result');
const scoreElement = document.querySelector('.score');
let result = '';

// Score-

const scoreObject = JSON.parse(localStorage.getItem("score")) || {wins: 0, loses: 0, draws: 0, result: '', playersMove:'', computersMove: ''};

// Display score-
displayScore();
console.log(scoreObject);

// Function to decide Computer's move-

function computersMove() {

    let computerPicked = '';
    let randomNumber = Math.random();

    if(randomNumber < 1/3) {
      computerPicked = 'rock';
    
    } else if(randomNumber > 1/3 && randomNumber < 2/3) {
      computerPicked = 'paper';
    
    } else if(randomNumber > 2/3 && randomNumber < 1) {
      computerPicked = 'scissor'

    }
    
    return computerPicked; 
}

// Function to Autoplay-

let isAutoPlaying = false;
let intervalId;

function autoPlay() {

  if(!isAutoPlaying) {
    
    intervalId =  setInterval(() => {

      let playerPicked = computersMove();
      playGame(playerPicked);
    
    }, 2000);

    autoplayButtonElement.innerText = 'Stop Auto Play';
    isAutoPlaying = true;
  
  } else {

    clearInterval(intervalId);
    intervalId = undefined;
    autoplayButtonElement.innerText = 'Auto Play';
    isAutoPlaying = false;
  }

}

//-- Main Function- 

function playGame(playerPicked) {

    let computerPicked = computersMove();

    // compare both moves-
    
    if(playerPicked === computerPicked) {
      result = 'DRAW';

    } else if(playerPicked === 'rock' && computerPicked === 'scissor') {
      result = 'YOU WIN'

    } else if(playerPicked === 'rock' && computerPicked === 'paper') {
      result = 'YOU LOSE'

    } else if(playerPicked === 'paper' && computerPicked === 'rock') {
      result = 'YOU WIN'

    } else if(playerPicked === 'paper' && computerPicked === 'scissor') {
      result = 'YOU LOSE'

    } else if(playerPicked === 'scissor' && computerPicked === 'rock') {
      result = 'YOU LOSE'

    } else if(playerPicked === 'scissor' && computerPicked === 'paper') {
      result = 'YOU WIN'

    } 

    // Update score-

    function updateScore() {

      if(result === 'DRAW') {
        scoreObject.draws++;

      } else if(result === 'YOU WIN') {
        scoreObject.wins++;

      } else if(result === 'YOU LOSE') {
        scoreObject.loses++;

      }

    }
    updateScore();

    // Update result-
    
    function updateResult() {

      scoreObject.result = `${result}`;
      scoreObject.playersMove = `${playerPicked}`;
      scoreObject.computersMove =`${computerPicked}`;
    }
    updateResult();
    
    // display Result-

    displayResult(playerPicked, computerPicked);

    // display Score-

    displayScore();

    // store score in localStorage-
    localStorage.setItem("score", JSON.stringify(scoreObject));


    console.log(result);
    console.log(scoreObject);

  return result;
}


// Function to Display result-

function displayResult(playerPicked, computerPicked) {

  resultElement.innerText = `${result}`;
  playersMoveElement.innerText = `${playerPicked}`;
  computersMoveElement.innerText = `${computerPicked}`;
}

// Fucntion to Display score-

function displayScore() {
  
  scoreElement. innerText = `Wins: ${scoreObject.wins} | Loses: ${scoreObject.loses} | Draws:  ${scoreObject.draws}`;
}

// Function to reset score-

function resetScore() {
  
  scoreObject.draws = 0;
  scoreObject.wins = 0;
  scoreObject.loses = 0;

  resultElement.innerText = '';
  playersMoveElement.innerText = 'player\'s move';
  computersMoveElement.innerText = 'computer\'s move';

  // store score in local storage-
  localStorage.setItem("score", JSON.stringify(scoreObject));

  displayScore();
}


// EventListeners to move-buttons

rockButtonElement.addEventListener("click", () => playGame('rock'));
paperButtonElement.addEventListener("click", () => playGame('paper'));
scissorButtonElement.addEventListener("click", () => playGame('scissor'));
resetButtonElement.addEventListener("click", () => resetScore());
autoplayButtonElement.addEventListener("click", () => autoPlay());