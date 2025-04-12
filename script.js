// script.js

const player = document.getElementById('player');
const game = document.getElementById('game');
const scoreEl = document.getElementById('score');
const gameOverEl = document.getElementById('game-over');

let playerX = window.innerWidth / 2 - 22.5;
let speed = 4;
let glitches = [];
let score = 0;
let isGameOver = false;

// Player control
document.addEventListener('keydown', (e) => {
  if (isGameOver) return;

  if (e.key === 'ArrowLeft' || e.key === 'a') {
    playerX -= 30;
  } else if (e.key === 'ArrowRight' || e.key === 'd') {
    playerX += 30;
  }

  if (playerX < 0) playerX = 0;
  if (playerX > window.innerWidth - 45) playerX = window.innerWidth - 45;

  player.style.left = playerX + 'px';
});

function createGlitch() {
  const glitch = document.createElement('div');
  glitch.classList.add('glitch');
  glitch.style.left = Math.random() * (window.innerWidth - 30) + 'px';
  glitch.style.top = '-30px';
  game.appendChild(glitch);
  glitches.push(glitch);
}

function updateGlitches() {
  for (let i = glitches.length - 1; i >= 0; i--) {
    const glitch = glitches[i];
    let top = parseFloat(glitch.style.top);
    top += speed;
    glitch.style.top = top + 'px';

    if (top > window.innerHeight) {
      glitches.splice(i, 1);
      glitch.remove();
      score++;
      scoreEl.innerText = 'Score: ' + score;
      if (score % 5 === 0) speed += 0.5;
    }

    const glitchRect = glitch.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();
    if (
      glitchRect.bottom >= playerRect.top &&
      glitchRect.left < playerRect.right &&
      glitchRect.right > playerRect.left
    ) {
      endGame();
    }
  }
}

function endGame() {
  isGameOver = true;
  gameOverEl.style.display = 'block';
  clearInterval(glitchSpawner);
  cancelAnimationFrame(animFrame);
}

function gameLoop() {
  if (!isGameOver) {
    updateGlitches();
    animFrame = requestAnimationFrame(gameLoop);
  }
}

let animFrame = requestAnimationFrame(gameLoop);
const glitchSpawner = setInterval(createGlitch, 800);
