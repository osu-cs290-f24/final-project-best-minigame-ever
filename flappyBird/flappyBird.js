var gameContainer = document.getElementById("game-container");

function renderStart(){
    // wipe clean
    
    // render background, bird, starting pipes
}

// start game
function startGame(){
    console.log("START");
}

// pause game
function stopGame(){
    console.log("STOP");
}

// on key down
document.addEventListener("keydown", (key) => {
    // jump
    if (key.code === "ArrowUp" || key.key == 'w' || key.code === "Space"){
        console.log("Jump");
    }

    // stop game
    if (key.code === "Escape") stopGame();
});

// button listeners
var startButton = document.getElementById("start-game-button");
var stopButton = document.getElementById("stop-game-button");
startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);
