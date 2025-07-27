
// Variables- 

const rockButtonElement = document.querySelector('.rock-button');
const paperButtonElement = document.querySelector('.paper-button');
const scissorButtonElement = document.querySelector('.scissor-button');
const resetButtonElement = document.querySelector('.score-reset-button');
const autoplayButtonElement = document.querySelector('.auto-play-button');

const displayContainerElement = document.querySelector('.js-display-container');
const defaultPlayerText =document.querySelector('.js-player-default-text');
const defaultComputerText =document.querySelector('.js-computer-default-text');
const playerMoveImage = document.querySelector('.js-player-move-image');
const computerMoveImage = document.querySelector('.js-computer-move-image');

//const playersMoveElement = document.querySelector('.js-players-move');
//const computersMoveElement = document.querySelector('.js-computers-move');
const resultElement = document.querySelector('.js-result');
const scoreElement = document.querySelector('.js-score');

let result = '';

// Score Object-

const scoreObject = JSON.parse(localStorage.getItem("score")) || {wins: 0, loses: 0, draws: 0};

// Map images to Moves, Object-

const moveImagePaths = {
  "rock": '/img-0/rock.png',
  "paper": '/img-0/paper.png',
  "scissor": '/img-0/scissor.png'
}

// set display to default-
resetDisplayToDefault();

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
    
    // display Result-

    displayResult(playerPicked, computerPicked, result);

    // display Score-

    displayScore();

    // store score in localStorage-
    localStorage.setItem("score", JSON.stringify(scoreObject));


    console.log(result);
    console.log(scoreObject);

  return result;
}


// Function to Display result-

function displayResult(playerPicked, computerPicked, gameResult) {

  resultElement.innerText = gameResult;

  playerMoveImage.src = moveImagePaths[playerPicked];
  playerMoveImage.alt = playerPicked;

  computerMoveImage.src = moveImagePaths[computerPicked];
  computerMoveImage.alt = computerPicked;

  displayContainerElement.classList.add('has-move');

  resultElement.classList.add('flash-update');

  setTimeout(() => {
    resultElement.classList.remove('flash-update');

  },300);
}

// Fucntion to Display score-

function displayScore() {
  
  scoreElement.innerText = `Wins: ${scoreObject.wins} | Loses: ${scoreObject.loses} | Draws:  ${scoreObject.draws}`;
}

// Function to reset score-

function resetScore() {
  
  scoreObject.draws = 0;
  scoreObject.wins = 0;
  scoreObject.loses = 0;

  resetDisplayToDefault();

  // store score in local storage-
  localStorage.setItem("score", JSON.stringify(scoreObject));

  displayScore();
}


// Function to reset display to default-

function resetDisplayToDefault() {
  displayContainerElement.classList.remove('has-move');

  playerMoveImage.src = '';
  playerMoveImage.alt = '';
  computerMoveImage.src = '';
  computerMoveImage.alt = '';

  resultElement.innerText = '';
  
  defaultPlayerText.innerText = 'Your Move';
  defaultComputerText.innerText = 'Computer\'s Move';
}


// EventListeners to move-buttons

rockButtonElement.addEventListener("click", () => playGame('rock'));
paperButtonElement.addEventListener("click", () => playGame('paper'));
scissorButtonElement.addEventListener("click", () => playGame('scissor'));
resetButtonElement.addEventListener("click", () => resetScore());
autoplayButtonElement.addEventListener("click", () => autoPlay());
document.body.addEventListener("keydown", (e) => {
  if(e.key === 'r' || e.key === 'R') {
    playGame('rock');
  
  } else if(e.key === 'p' || e.key === 'P') {
    playGame('paper');
  
  } else if(e.key === 's' || e.key === 'S') {
    playGame('scissor');
  
  }
  console.log(e.key);
});