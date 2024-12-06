var gameContainer = document.getElementById("game-container");

// global game variables
var running = false;

function renderStart(){
    // wipe clean
    
    // render background, bird, starting pipes
}

// start game
function startGame(){
    if (!running){
        console.log("START");
        running = true;

        // hide all game prompts
        var gamePrompts = document.getElementsByClassName("game-prompt");
        for (var i = 0; i < gamePrompts.length; i++){
            gamePrompts[i].classList.add("hidden");
        }
    }
}

// pause game
function stopGame(){
    if (running){
        console.log("STOP");
        running = false;

        // show pause screen
    }
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
