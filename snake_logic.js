
var head = null;
var currentPosition;
var headPositions = [
    [0, 0]
];

const scoreText = document.getElementById('scoreText');
const highScoreText = document.getElementById('highScoreText');
var score = 0;
var snakeBodies = [];
var playAgainButton = document.getElementById('playAgainButton');
var currentX = 0;
var currentY = 0;
var currentFruitPosition = [90, 90];
var fruit = document.createElement("div");
var moveDirection = "right";
var actualMoveDirection = 'right';
var GameOver = false;
var gameStarted = false;
var snakeSpeed = 120;
const deathSound = new Audio('death_sound.mp3');
const pointSound = new Audio('point_sound.mp3');
var backgroundMusic = new Audio('background_music.mp3');
backgroundMusic.volume = 0.4;
let machineId = localStorage.getItem('MachineId');
var enemyCount = 3;
var enemyPositions = [];

if (!machineId) {
    machineId = crypto.randomUUID();
    localStorage.setItem('MachineId', machineId);
}
//Get highscore from cache
var highScore = localStorage.getItem('highScore');
//If highscore is null, set it to 0
if (!highScore) {
    highScore = 0;
}
highScoreText.innerHTML = 'High score: ' + highScore;
const easyButton = document.getElementById('easyButton');
const mediumButton = document.getElementById('mediumButton');
const hardButton = document.getElementById('hardButton');
easyButton.onclick = easyMode;
mediumButton.onclick = mediumMode;
hardButton.onclick = hardMode;

function easyMode() {
    enemyCount = 10;
    play(120);
}
function mediumMode() {
    enemyCount = 12;
    play(100);
}
function hardMode() {
    enemyCount = 14;
    play(80);
}
function play(speed) {
    snakeSpeed = speed;
    const playButtonContainer = document.getElementById('playButtonContainer');
    playButtonContainer.remove();
    const boardContainer = document.getElementById('boardContainer');
    boardContainer.style.display = 'block';
    startGame();
}



function startGame() {
    backgroundMusic.play();
    headPositions = [
        [0, 0]
    ];
    snakeBodies = [];
    currentX = 0;
    currentY = 0;
    moveDirection = "right";
    GameOver = false;
    
    spawnHead();
    spawnBody();
    spawnBody();
    spawnFruit();
    enemyPositions = [];
    var enemies = document.querySelectorAll(".enemy");

    for (var i = 0; i < enemies.length; i++) {
    enemies[i].remove();
    }
    for (let i = 0; i < enemyCount; i++) {
        spawnEnemy();
    }
    //Snake movement
    if (!gameStarted) {
        setInterval(moveHead, snakeSpeed);        
    }
    gameStarted = true;
}

function spawnHead() {
    const parentElement = document.getElementById("board");
    head = document.createElement("div");
    head.classList.add("snake-head");
    parentElement.appendChild(head);
    currentPosition = head.getBoundingClientRect();
}
document.addEventListener("keydown", function (event) {
    if (event.key === "w" || event.keyCode == '38') {
        if (actualMoveDirection != "down") {
            moveDirection = "up";
        }
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "s" || event.keyCode == '40') {
        if (actualMoveDirection != "up") {
            moveDirection = "down";
        }
    }
});
document.addEventListener("keydown", function (event) {
    if (event.key === "a" || event.keyCode == '37') {
        if (actualMoveDirection != "right") {
            moveDirection = "left";
        }
    }
});
document.addEventListener("keydown", function (event) {
    if (event.key === "d" || event.keyCode == '39') {
        if (actualMoveDirection != "left") {
            moveDirection = "right";
            
        }
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "k") {
        spawnFruit();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === " ") {
        
    }
});

function moveObjects() {
    //Move body objects

    //Check if head is inside snake bodies
    for (var i = 1; i <= snakeBodies.length; i++){
        if (headPositions[i] != undefined) {
            if (headPositions[i][0] == currentX && headPositions[i][1] == currentY) {
                gameOver();
            }
        }
    }
    //Check if head hits an enemy
    for (let i=0; i < enemyPositions.length; i++) {
        if (currentX == enemyPositions[i][0] && currentY == enemyPositions[i][1]) {
            gameOver();
        }
    }
    //Check if head eats a fruit
    if (currentX == currentFruitPosition[0] && currentY == currentFruitPosition[1]) {
        eatFruit();
    }
    //Check if head is outside bounds
    if (currentX < 0 || currentX>570 || currentY < 0 || currentY > 570) {
        gameOver()
    }

    //Move head to wanted position
    head.style.transform = `translateY(${currentY}px) translateX(${currentX}px)`;
    for (var i = 0; i < headPositions.length; i++){
        //If index is larger than snakebodies length, then remove that index from headpositions, because it is unnecessary
        if (i >= snakeBodies.length) {
            if (i > snakeBodies.length + 1) {
                headPositions.splice(i, 1);
            }
        }
        //Else move the right body part to the corresponding latest head position
        else {
            if (headPositions[i + 1] != undefined) {
                snakeBodies[i].style.transform = `translateY(${headPositions[i + 1][1]}px) translateX(${headPositions[i + 1][0]}px)`;
            }
        }
    }
}

function eatFruit() {
    score += 1;
    if(score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreText.innerHTML = 'High score: ' + highScore;
    }
        const pointSound = new Audio('point_sound.mp3');
    pointSound.play();
    scoreText.innerHTML = 'Score: ' + score;
    spawnBody();
    spawnFruit();
}

function spawnBody() {
    const parentElement = document.getElementById("board");
    const body = document.createElement("div");
    body.classList.add("snake-body");
    parentElement.appendChild(body);
    snakeBodies.push(body);
}

function spawnFruit() {
    fruit.remove()
    const parentElement = document.getElementById("board");
    fruit = document.createElement("div");
    fruitImage = document.createElement("img");
    fruitImage.setAttribute('src', 'apple.png');
    fruitImage.classList.add("snake-fruit");
    parentElement.appendChild(fruit);
    fruit.appendChild(fruitImage);
    fruit.classList.add("snake-fruit");
    let randomX = Math.floor(Math.random() * 20) * 30;
    let randomY = Math.floor(Math.random() * 20) * 30;
    //Check if fruit position is inside the snake
    for (let i = 0; i < headPositions.length; i++) {
        if(headPositions[i][0] == randomX && headPositions[i][1] == randomY) {
            spawnFruit();
            return;
        }
    }
    //Check if fruit position is inside an enemy
    for (let i=0; i < enemyPositions.length; i++) {
        if (randomX == enemyPositions[i][0] && randomY == enemyPositions[i][1]) {
            spawnFruit();
            return;
        }
    }
    currentFruitPosition = [randomX, randomY];
    fruit.style.transform = `translateY(${currentFruitPosition[1]}px) translateX(${currentFruitPosition[0]}px)`;
}

function gameOver() {
    score = 0;
    backgroundMusic.pause();
    backgroundMusic = new Audio('background_music.mp3');
    deathSound.play();
    GameOver = true;
    playAgainButton.style.display = 'block';
}
playAgainButton.onclick = function() {
    scoreText.innerHTML = 'Score: ' + score;
    playAgainButton.style.display = 'none';

    head.remove();
    for(var i=0; i<snakeBodies.length; i++) {
        snakeBodies[i].remove();
    }
    startGame();
}


function moveHead() {
    if (GameOver || !gameStarted) {
        return;
    }
    if (moveDirection == "right") {
        actualMoveDirection = 'right';
        currentX += 30;
        //Insert new head position at the start and latest head positions move one index up
        headPositions.unshift([currentX, currentY]);
        moveObjects();
    }
    if (moveDirection == "left") {
        actualMoveDirection = 'left';
        currentX -= 30;
        //Insert new head position at the start and latest head positions move one index up
        headPositions.unshift([currentX, currentY]);
        moveObjects();
    }
    if (moveDirection == "up") {
        actualMoveDirection = 'up';
        currentY -= 30;
        //Insert new head position at the start and latest head positions move one index up
        headPositions.unshift([currentX, currentY]);
        moveObjects();
    }
    if (moveDirection == "down") {
        actualMoveDirection = 'down';
        currentY += 30;
        //Insert new head position at the start and latest head positions move one index up
        headPositions.unshift([currentX, currentY]);
        moveObjects();
    }
}

function spawnEnemy() {
    const parentElement = document.getElementById("board");
    const enemy = document.createElement("div");
    enemy.classList.add("enemy");
    parentElement.appendChild(enemy);
    let randomX = Math.floor(Math.random() * 20) * 30;
    let randomY = Math.floor(Math.random() * 20) * 30;
    if (randomX == currentFruitPosition[0] && randomY == currentFruitPosition[1]) {
        spawnEnemy();
        return;
    }
    let position = [randomX, randomY];
    enemyPositions.push(position);
    enemy.style.transform = `translateY(${randomY}px) translateX(${randomX}px)`;
}