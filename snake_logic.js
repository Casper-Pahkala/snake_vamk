
var head = null;
var currentPosition;
var headPositions = [
    [0, 0]
];
var scoreText = document.getElementById('scoreText');
var score = 0;
var snakeBodies = [];
var playAgainButton = document.getElementById('playAgainButton');
var currentX = 0;
var currentY = 0;
var currentFruitPosition = [90, 90];
var fruit = document.createElement("div");
var moveDirection = "right";
var GameOver = false;
var gameStarted = false;

var xhr = new XMLHttpRequest();
xhr.open('POST', 'file:///Users/casperpahkala/Desktop/workspace/snake_vamk/test.txt', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log(xhr.responseText);
    }
  };
xhr.send('test');

const playButton = document.getElementById('playButton');
playButton.onclick = function() {
    const playButtonContainer = document.getElementById('playButtonContainer');
    playButtonContainer.remove();
    const boardContainer = document.getElementById('boardContainer');
    boardContainer.style.display = 'block';
    startGame();

}



function startGame() {
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

function spawnHead(){
    const parentElement = document.getElementById("board");
    head = document.createElement("div");
    head.classList.add("snake-head");
    parentElement.appendChild(head);
    currentPosition = head.getBoundingClientRect();
}
document.addEventListener("keydown", function (event) {
    if (event.key === "w" || event.keyCode == '38') {
        // Do something when "w" key is pressed
        if (moveDirection != "down") {
            moveDirection = "up";
        }
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "s" || event.keyCode == '40') {
        // Do something when "w" key is pressed
        if (moveDirection != "up") {
            moveDirection = "down";
        }
    }
});
document.addEventListener("keydown", function (event) {
    if (event.key === "a" || event.keyCode == '37') {
        // Do something when "w" key is pressed
        if (moveDirection != "right") {
            moveDirection = "left";
        }
    }
});
document.addEventListener("keydown", function (event) {
    if (event.key === "d" || event.keyCode == '39') {
        // Do something when "w" key is pressed
        if (moveDirection != "left") {
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
    for (var i = 1; i <= snakeBodies.length; i++){
        if (headPositions[i][0] == currentX && headPositions[i][1] == currentY) {
            gameOver();
        }
    }
    if (currentX == currentFruitPosition[0] && currentY == currentFruitPosition[1]) {
        //Fruit eaten
        score += 1;
        scoreText.innerHTML = 'Score: ' + score;
        spawnBody();
        spawnFruit();
    }
    if (currentX < 0 || currentX>570 || currentY < 0 || currentY > 570) {
        gameOver()
    }

    

    head.style.transform = `translateY(${currentY}px) translateX(${currentX}px)`;
    for (var i = 0; i < headPositions.length; i++){
        if (i >= snakeBodies.length) {
            if (i > snakeBodies.length + 1) {
                headPositions.splice(i, 1);

            }
        } else {
            

            
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
    for (var i = 0; i < headPositions.length; i++){
        if(headPositions[i][0] == randomX && headPositions[i][1] == randomY){
            spawnFruit();
            return;
        }
    }
    currentFruitPosition = [randomX, randomY];
    fruit.style.transform = `translateY(${currentFruitPosition[1]}px) translateX(${currentFruitPosition[0]}px)`;

}

function gameOver() {
    GameOver = true;
    playAgainButton.style.display = 'block';
}
playAgainButton.onclick = function() {
    score = 0;
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
        currentX += 30;
        headPositions.unshift([currentX, currentY]);
        moveObjects();
    }
    if (moveDirection == "left") {
        currentX -= 30;
        headPositions.unshift([currentX, currentY]);
        moveObjects();
    }
    if (moveDirection == "up") {
        currentY -= 30;
        headPositions.unshift([currentX, currentY]);
        moveObjects();
    }
    if (moveDirection == "down") {
        currentY += 30;
        headPositions.unshift([currentX, currentY]);
        moveObjects();
    }
}

setInterval(moveHead, 120);

