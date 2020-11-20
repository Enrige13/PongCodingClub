//
// Variables
//

// Informations about the game status
const game = {
    status: "playing",
    speed: 20,
}

// game board
const board = {
    width:800,
    height: 600,
    colour: "darkgrey"
}


// player1

const player1 = {
    position: {x: 20, y: (board.height-120)/2},
    size: {height: 120, width: 20},
    upMovement: false,
    downMovement: false,
    score: 0,
    speed: 10
}

// player2
const player2 = {
    position: {x: board.width - 40, y: (board.height-120)/2},
    size: {height: 120, width: 20},
    upMovement: false,
    downMovement: false,
    score: 0,
    speed: 10
}

// ball

const ball = {
    position: {x: (board.width - 15)/2, y: (board.height-15)/2},
    radius: 15,
    colour: "white",
    movement: {x: getRandomNumber(4, 7), y: getRandomNumber(-5, 5)}
}



//
// Functions
//


function ai() {
    if (ball.position.y > player2.position.y + player2.size.height) {
        player2.downMovement = true;
        player2.upMovement = false;
    } else if (ball.position.y < player2.position.y) {
        player2.downMovement = false;
        player2.upMovement = true;
    }
}


function ballPlayerCollision(player) {
    if (ball.position.y + ball.radius > player.position.y &&
        ball.position.y - ball.radius < player.position.y + player.size.height &&
        ball.position.x + ball.radius > player.position.x &&
        ball.position.x - ball.radius < player.position.x + player.size.width) {
            if (ball.movement.y > 0 && ball.position.y < player.position.y + player.size.height/2 ||
                ball.movement.y < 0 && ball.position.y > player.position.y + player.size.height/2) {
                ball.movement.y *= -1.1;
            } else {
                ball.movement.y *= 1.1;
            }
        ball.movement.x *= -1.1;
    }
}

function moveBall() {
    if (ball.position.x - ball.radius < 0) {
        player2.score += 1;
        ball.position = {x: (board.width - 15)/2, y: (board.height-15)/2};
        ball.movement = {x: getRandomNumber(-4, -7), y: getRandomNumber(-5, 5)}
    } else if (ball.position.x + ball.radius > board.width) {
        player1.score += 1;
        ball.position = {x: (board.width - 15)/2, y: (board.height-15)/2};
        ball.movement = {x: getRandomNumber(4, 7), y: getRandomNumber(-5, 5)}

    }
    if ((ball.position.y - ball.radius < 0 && ball.movement.y < 0) ||
        (ball.position.y + ball.radius > board.height && ball.movement.y > 0)) {
        ball.movement.y *= -1;
    }
    ball.position.x += ball.movement.x;
    ball.position.y += ball.movement.y;
}

function movePlayer(player) {
    if (player.upMovement === true && player.position.y > 0) {
        player.position.y -= player.speed;
    }
    if (player.downMovement === true && player.position.y + player.size.height < board.height) {
        player.position.y += player.speed;
    }
}

function endgGame() {
    if (player1.score === 10) {
        game.status = "ënd"
        showEnd("Player 1")
    } else if (player2.score === 10) {
        game.status = "ënd"
        showEnd("Player 2")
    }

}

function loop() {
    if (game.status === "playing") {
        movePlayer(player1);
        ai();
        movePlayer(player2);
        moveBall();
        ballPlayerCollision(player1);
        ballPlayerCollision(player2);
        endgGame();
    }
}

function draw() {
    drawBoard(board.width, board.height, board.colour);
    drawRect(player1.position.x, player1.position.y, player1.size.width, player1.size.height, "white");
    drawRect(player2.position.x, player2.position.y, player2.size.width, player2.size.height, "white");
    drawCircle(ball.position.x, ball.position.y, ball.radius, ball.colour);
    drawScore1(player1.score);
    drawScore2(player2.score);
}

function onKeyDown(keyCode) {
    if (keyCode === "KeyW") {
        player1.upMovement = true;
    } else if (keyCode === "KeyS") {
        player1.downMovement = true;
    }
    // } else if (keyCode === "ArrowUp") {
    //     player2.upMovement = true;
    // } else if (keyCode === "ArrowDown") {
    //     player2.downMovement = true;
    // }
}

function onKeyUp(keyCode) {
    if (keyCode === "KeyW") {
        player1.upMovement = false;
    } else if (keyCode === "KeyS") {
        player1.downMovement = false;
    }
    // } else if (keyCode === "ArrowUp") {
    //     player2.upMovement = false;
    // } else if (keyCode === "ArrowDown") {
    //     player2.downMovement = false;
    // }
}
