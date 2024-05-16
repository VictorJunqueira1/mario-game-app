const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const scoreDisplay = document.getElementById('score');
const totalScoreDisplay = document.getElementById('total-score');
const loginButton = document.getElementById('login-button');
const playerNameInput = document.getElementById('auth-name');
const gameArea = document.getElementById('game-area');
const loginArea = document.querySelector('.auth-viewbox');
const playerScoresDisplay = document.getElementById('player-scores');
const playerNameDisplay = document.getElementById('player-name-display');

let gameInterval = null;
let score = 0;
let playerName = '';

let playerScores = JSON.parse(localStorage.getItem('playerScores')) || {};

const updatePlayerNameDisplay = () => {
    playerNameDisplay.innerText = `Jogador atual: ${playerName}`;
};

loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    playerName = playerNameInput.value.trim();
    if (playerName) {
        loginArea.style.display = 'none';
        gameArea.style.display = 'block';
        totalScoreDisplay.innerText = `Maior pontuação: ${playerScores[playerName] || 0}`;
        updatePlayerNameDisplay();
        displayPlayerScores();
    }
});

const resetGame = () => {
    mario.style.width = '150px';
    mario.style.marginLeft = '0px';
    mario.src = 'images/mario.gif';
    mario.style.bottom = '0px';
    mario.style.animation = '';

    pipe.style.display = 'block';
    pipe.style.left = '';
    pipe.style.animation = 'pipe-animation 1.5s infinite linear';

    score = 0;
    scoreDisplay.innerText = 'Pontuação: 0';
    updatePlayerNameDisplay();
};

const startGame = () => {
    resetGame();
    startButton.style.display = 'none';
    restartButton.style.display = 'none';
    gameInterval = setInterval(gameLoop, 10);
};

const restartGame = () => {
    clearInterval(gameInterval);
    resetGame();
    restartButton.style.display = 'none';
    gameInterval = setInterval(gameLoop, 10);
};

const jump = () => {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
};

const displayPlayerScores = () => {
    // Converte o objeto de pontuações em um array e ordena decrescentemente pela pontuação
    const sortedScores = Object.entries(playerScores).sort((a, b) => b[1] - a[1]);

    playerScoresDisplay.innerHTML = '<strong>Ranking dos Jogadores:</strong>';
    sortedScores.forEach(([name, score], index) => {
        // Adiciona a posição do jogador ao lado do nome para clareza
        playerScoresDisplay.innerHTML += `<br>${index + 1}. ${name}: ${score}`;
    });
};

const gameLoop = () => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    score++;
    scoreDisplay.innerText = `Pontuação: ${score}`;

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        mario.src = 'images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clearInterval(gameInterval);
        restartButton.style.display = 'block';

        playerScores[playerName] = Math.max(score, playerScores[playerName] || 0);
        localStorage.setItem('playerScores', JSON.stringify(playerScores));
        totalScoreDisplay.innerText = `Maior pontuação: ${playerScores[playerName]}`;
        displayPlayerScores();
    }
};

document.addEventListener('touchstart', jump, false);

document.addEventListener('keydown', jump);
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);