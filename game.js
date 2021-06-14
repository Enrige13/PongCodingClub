// Auskommentieren - STRG + K + C
// Variables
// 

// Informations about the game status
const game = { // Variable eigentlich
    status: "playing",
    speed: 20,
}

// game board
const gameboard = {
    height: 400,
    width: 750,
    color: "grey",
}

// player1
const player1 = {
    pos: {
        xpos: 25,
        ypos: 150,
    },
    width: 20,
    height: 100,
    color: "white",
    score: 0,
    upMovement: false,
    downMovement: false,
}

// player2
const player2 = {
    pos: {
        xpos: 705,
        ypos: 150,
    },
    width: 20,
    height: 100,
    color: "green",
    score: 0,
    upMovement: false,
    downMovement: false,
}

// ball
const ball = {
    radius: 20,
    color: "blue",
    pos: {
        xpos: 35,
        ypos: 35,
    },
    movement: {
        movx: getRandomNumber(-7, 7),
        movy: getRandomNumber(-5, 5),
    }
}

//
// Functions
//
function ballPlayerCollision(player) {
    if (ball.pos.ypos + ball.radius > player.pos.ypos &&
        ball.pos.ypos - ball.radius < player.pos.ypos + player.height &&
        ball.pos.xpos + ball.radius > player.pos.xpos &&
        ball.pos.xpos - ball.radius < player.pos.xpos + player.width) {
            ball.movement.movx *= -1.1
        }
        
}

function moveBall() {
    if (ball.pos.ypos <= 0) {
        ball.movement.movy *= -1
    }
    if (ball.pos.ypos >= gameboard.height) {
        ball.movement.movy *= -1
    }
    if (ball.pos.xpos <= 0) {
        ball.pos.xpos = gameboard.width / 2
        ball.pos.ypos = gameboard.height / 2
        ball.movement.movx = getRandomNumber(-7, 7)
        ball.movement.movy = getRandomNumber(-5, 5)
        player2.score += 1;
    }
    if (ball.pos.xpos >= gameboard.width) {
        ball.pos.xpos = gameboard.width / 2
        ball.pos.ypos = gameboard.height / 2
        ball.movement.movx = getRandomNumber(-7, 7)
        ball.movement.movy = getRandomNumber(-5, 5)
        player1.score += 1;
    }
    ball.pos.xpos += ball.movement.movx
    ball.pos.ypos += ball.movement.movy
}

function movePlayer(player) {
    if (player.downMovement === true && player.pos.ypos + player.height < gameboard.height){
        player.pos.ypos += 10
    }
    if (player.upMovement === true && player.pos.ypos > 0){
        player.pos.ypos -= 10
    }
}

function ai() {
    if (ball.pos.ypos < player2.pos.ypos) {
        player2.upMovement = true
        player2.downMovement = false
    }
    if (ball.pos.ypos > player2.pos.ypos + player2.height) {
        player2.upMovement = false
        player2.downMovement = true
    }
}

function loop() {
    if (game.status === "playing") {
        ai()
        movePlayer(player1)
        movePlayer(player2)
        moveBall()
        ballPlayerCollision(player1)
        ballPlayerCollision(player2)

        if (player1.score === 10) {
            game.status = "end"
            showEnd("Player 1")
        }
        if (player2.score === 10) {
            game.status = "end"
            showEnd("Player 2")
        }
    } 
}

function draw() {
    drawBoard(gameboard.width, gameboard.height, gameboard.color);
    drawCircle(ball.pos.xpos, ball.pos.ypos, ball.radius, ball.color);
    drawRect(player1.pos.xpos, player1.pos.ypos, player1.width, player1.height, player1.color);
    drawRect(player2.pos.xpos, player2.pos.ypos, player2.width, player2.height, player2.color);
    drawScore1(player1.score);
    drawScore2(player2.score);
}

function onKeyDown(keyCode) {
    if (keyCode === "KeyW") {
        player1.upMovement = true;
    } 
    if (keyCode === "KeyS") {
        player1.downMovement = true;
    }
    // if (keyCode === "ArrowUp") {
    //     player2.upMovement = true;
    // }
    // if (keyCode === "ArrowDown") {
    //     player2.downMovement = true;
    // }
}

function onKeyUp(keyCode) {
    if (keyCode === "KeyW") {
        player1.upMovement = false;
    } 
    if (keyCode === "KeyS") {
        player1.downMovement = false;
    }
    // if (keyCode === "ArrowUp") {
    //     player2.upMovement = false;
    // }
    // if (keyCode === "ArrowDown") {
    //     player2.downMovement = false;
    // }
}
