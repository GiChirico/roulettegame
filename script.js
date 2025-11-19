// 1. get all DOM elements to variables
//2. create lives variables for both players
//3. switch players function
//4. function load will activate the CSS animation, including the class .bullet-loaded to one of the chamber (random) and the .spin-barrel to the barrel element and choose a random number from 1 to 6 (Math.random)
//5. function shoot will choose another random number from 1 to 6 and if it is the same as the load, player will get shot and loose a live, -1 in lives variable and change content of element (switch statement to see how many heart emojis) inside this if, check if lives === 0, then end game and other player wins. if if the shoot number and the load number are not the same, call swith player function

'use strict';

// DOM Elements Variables
const player0 = document.querySelector('#player-0');
const player1 = document.querySelector('#player-1');
const player0shot = document.querySelector(`#player-0-shot`);
const player1shot = document.querySelector(`#player-1-shot`);

const gunBarrel = document.querySelector('.barrel');
const gunImage = document.querySelector('img');

const loadBtn = document.querySelector('.btn-load');
const shootBtn = document.querySelector('.btn-shoot');
const restartBtn = document.querySelector('.btn-restart');

// Starting conditions

let lives, activePlayer;
let initialChamberNumber;
let barrelAngle = 0;

// Enable and Disable function

const setButtonState = function (button, state) {
  button.disabled = state;
  state === true
    ? button.classList.add('disabled-btn')
    : button.classList.remove('disabled-btn');
};

// Remove player shot text

const removePlayerShot = function () {
  player0shot.textContent = '';
  player1shot.textContent = '';
};

// Starting and restarting
const initiate = function () {
  lives = [5, 5];
  activePlayer = 0;

  player0.classList.remove('player-winner');
  player1.classList.remove('player-winner');
  player0.classList.add('player-active');
  player1.classList.remove('player-active');

  gunImage.classList.remove('img-invert');

  document.querySelector(`#lives-0`).textContent = '❤️❤️❤️❤️❤️';
  document.querySelector(`#lives-1`).textContent = '❤️❤️❤️❤️❤️';

  setButtonState(shootBtn, true);
};

initiate();

// Switch Players function

const switchPlayers = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player-active');
  player1.classList.toggle('player-active');
  gunImage.classList.toggle('img-invert');
};

// Load gun function

const loadGun = function () {
  //remove player shot
  removePlayerShot();
  // remove barrel animation
  gunBarrel.classList.remove('spin-barrel');
  void gunBarrel.offsetWidth;
  // Set random chamber nuber
  initialChamberNumber = Math.trunc(Math.random() * 6) + 1;
  // Activate animation
  gunBarrel.classList.add('spin-barrel');
  // enable shoot button
  setButtonState(shootBtn, false);
};

loadBtn.addEventListener('click', loadGun);

// Shoot gun function

const shootGun = function () {
  // disable load button
  setButtonState(loadBtn, true);
  // When a player gets shot
  if (initialChamberNumber === 1) {
    // enable load and disable shoot
    setButtonState(loadBtn, false);
    setButtonState(shootBtn, true);
    // Removing lives and displaying text
    lives[activePlayer] = lives[activePlayer] - 1;
    switch (lives[activePlayer]) {
      case 1:
        document.querySelector(`#lives-${activePlayer}`).textContent = '❤️';
        break;
      case 2:
        document.querySelector(`#lives-${activePlayer}`).textContent = '❤️❤️';
        break;
      case 3:
        document.querySelector(`#lives-${activePlayer}`).textContent = '❤️❤️❤️';
        break;
      case 4:
        document.querySelector(`#lives-${activePlayer}`).textContent =
          '❤️❤️❤️❤️';
        break;
    }
    document.querySelector(
      `#player-${activePlayer}-shot`
    ).textContent = `Player ${activePlayer + 1} got shot 💥`;
    // When player has no lives and other player wins
    if (lives[activePlayer] === 0) {
      document.querySelector(`#lives-${activePlayer}`).textContent = '';
      let winner = activePlayer === 0 ? 1 : 0;
      document
        .querySelector(`#player-${winner}`)
        .classList.add('player-winner');
      document.querySelector(`#lives-${winner}`).textContent = 'Wins 🎉';
      setButtonState(loadBtn, true);
      setButtonState(shootBtn, true);
      removePlayerShot();
      // Still has lives, then switch
    } else {
      switchPlayers();
    }
    // When the player does not get shot
  } else {
    //move the chamber to next position
    initialChamberNumber =
      initialChamberNumber === 6 ? 1 : initialChamberNumber + 1;
    // Rotate barrel 60 degrees
    barrelAngle += 60;
    gunBarrel.style.transform = `rotate(${barrelAngle}deg)`;
    //Switch players
    switchPlayers();
  }
};

shootBtn.addEventListener('click', shootGun);

//Restart button

restartBtn.addEventListener('click', initiate);
