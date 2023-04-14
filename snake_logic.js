//Spawn head
const parentElement = document.getElementById("board");
const head = document.createElement("div");
head.classList.add("snake-head");
parentElement.appendChild(head);

const currentPosition = head.getBoundingClientRect();
var headPositions = [
    [0, 0]
];

var snakeBodies = [];


var currentX = 0;
var currentY = 0;
var currentFruitPosition = [90, 90];
var fruit = document.createElement("div");
var moveDirection = "right";
var GameOver = false;
spawnFruit();
spawnBody();
document.addEventListener("keydown", function (event) {
    if (event.key === "w" || event.keyCode === 87) {
        // Do something when "w" key is pressed
        if (moveDirection != "down") {
            moveDirection = "up";
        }
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "s") {
        // Do something when "w" key is pressed
        if (moveDirection != "up") {
            moveDirection = "down";
        }
    }
});
document.addEventListener("keydown", function (event) {
    if (event.key === "a") {
        // Do something when "w" key is pressed
        if (moveDirection != "right") {
            moveDirection = "left";
        }
    }
});
document.addEventListener("keydown", function (event) {
    if (event.key === "d") {
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
    console.log(headPositions);

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
    const randomX = Math.floor(Math.random() * 20) * 30;
    const randomY = Math.floor(Math.random() * 20) * 30;
    currentFruitPosition = [randomX, randomY];
    fruit.style.transform = `translateY(${currentFruitPosition[1]}px) translateX(${currentFruitPosition[0]}px)`;

}

function gameOver() {
    console.log("Game over");
    GameOver = true;
}


function moveHead() {
    if (GameOver) {
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

setInterval(moveHead, 150);