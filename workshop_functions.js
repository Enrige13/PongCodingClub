
//
// Draw Functions
//

function drawCircle(x, y, radius, colour) {
    const gameBoard = document.getElementById("gameBoard").getContext("2d");
    gameBoard.fillStyle = colour;
    gameBoard.arc(x, y, radius, 0, 2 * Math.PI)
    gameBoard.fill();
}

function drawRect(x, y, width, height, colour) {
    const gameBoard = document.getElementById("gameBoard").getContext("2d");
    gameBoard.fillStyle = colour;
    gameBoard.fillRect(x, y, width, height);
}

function drawBoard(width, height, colour) {
    const gameBoard = document.getElementById("gameBoard").getContext("2d");

    gameBoard.canvas.width = width;
    gameBoard.canvas.height = height;
    gameBoard.fillStyle = colour;
    gameBoard.fillRect(0, 0, width, height);
}

function drawScore1(score) {
    const scoreDiv = document.getElementById("score_1");

    scoreDiv.innerHTML = score;
}

function drawScore2(score) {
    const scoreDiv = document.getElementById("score_2");

    scoreDiv.innerHTML = score;
}

function showEnd(winningPlayer) {
    const gameOver = document.getElementById("gameOver");
    gameOver.style.visibility = "visible";

    gameOver.innerHTML = winningPlayer + " has won";
}


//
// helper functions
//

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

//
// game logic
//

var canvas;
var context;
var oldTimeStamp = 0;
var accumulator = 0;

window.onload = init;

function init(){
    canvas = document.getElementById('gameBoard');
    context = canvas.getContext('2d');

    // Start the first frame request
    window.requestAnimationFrame(game_loop);
    document.addEventListener("keydown", (event) => {
        event.preventDefault();
            onKeyDown(event.code);
    });
    document.addEventListener("keyup", (event) => {
        event.preventDefault();
            onKeyUp(event.code);
    });
}

function game_loop(timeStamp) {
    //Calculate the number of seconds passed
    //since the last frame
    var secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    if (secondsPassed) {
        accumulator = accumulator + (secondsPassed * 1000)
    }
    const speed = game && game.speed ? game.speed : 100;
    if (accumulator >  speed) {
        accumulator = 0;
        loop();
    }

    draw();

    // Keep requesting new frames
    window.requestAnimationFrame(game_loop);
}