
var head = null;
var currentPosition;
var headPositions = [
    [0, 0]
];

var scoreText = document.getElementById('scoreText');
var highScoreText = document.getElementById('highScoreText');
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
const backgroundMusic = new Audio('background_music.mp3');

//Get highscore from cache
var highScore = localStorage.getItem('highScore');
//If highscore is null, set it to 0
if (!highScore) {
    highScore = 0;
}
highScoreText.innerHTML = 'High score: ' + highScore;
const playButton = document.getElementById('playButton');
playButton.onclick = function() {
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
    gameStarted = true;
    spawnHead();
    spawnBody();
    spawnFruit();
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
        // Do something when "w" key is pressed
        if (actualMoveDirection != "down") {
            moveDirection = "up";
        }
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "s" || event.keyCode == '40') {
        // Do something when "w" key is pressed
        if (actualMoveDirection != "up") {
            moveDirection = "down";
        }
    }
});
document.addEventListener("keydown", function (event) {
    if (event.key === "a" || event.keyCode == '37') {
        // Do something when "w" key is pressed
        if (actualMoveDirection != "right") {
            moveDirection = "left";
        }
    }
});
document.addEventListener("keydown", function (event) {
    if (event.key === "d" || event.keyCode == '39') {
        // Do something when "w" key is pressed
        if (actualMoveDirection != "left") {
            moveDirection = "right";
            
        }
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "k") {
        // Do something when "w" key is pressed

        spawnFruit();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === " ") {
        spawnBody();
    }
});

function moveObjects() {
    //Move body objects

    //Check if head is inside snake bodies
    for (var i = 1; i <= snakeBodies.length; i++){
        if (headPositions[i][0] == currentX && headPositions[i][1] == currentY) {
            gameOver();
        }
    }
    if (currentX == currentFruitPosition[0] && currentY == currentFruitPosition[1]) {
        //Fruit eaten
        score += 1;
        if(score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
            highScoreText.innerHTML = 'High score: ' + highScore;
        }
        snakeSpeed += 2;
        const pointSound = new Audio('point_sound.mp3');
        pointSound.play();
        scoreText.innerHTML = 'Score: ' + score;
        spawnBody();
        spawnFruit();
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
            snakeBodies[i].style.transform = `translateY(${headPositions[i + 1][1]}px) translateX(${headPositions[i + 1][0]}px)`;
        }
    }
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
    fruit.classList.add("snake-fruit");
    parentElement.appendChild(fruit);
    var randomX = Math.floor(Math.random() * 20) * 30;
    var randomY = Math.floor(Math.random() * 20) * 30;
    //Check if fruit position is inside the snake
    for (var i = 0; i < headPositions.length; i++) {
        if(headPositions[i][0] == randomX && headPositions[i][1] == randomY) {
            spawnFruit();
            return;
        }
    }
    currentFruitPosition = [randomX, randomY];
    fruit.style.transform = `translateY(${currentFruitPosition[1]}px) translateX(${currentFruitPosition[0]}px)`;

}

function gameOver() {
    score = 0;
    snakeSpeed = 120;
    backgroundMusic.pause();
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

//Snake movement
setInterval(moveHead, snakeSpeed);

