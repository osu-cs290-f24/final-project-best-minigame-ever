// global variables
var running = false;

function renderStart(){
    // wipe clean
    
    // render background, bird, starting pipes
}

// hide all game prompts in the game container
function hideGamePrompts(){
    var gamePrompts = document.getElementsByClassName("game-prompt");
    for (var i = 0; i < gamePrompts.length; i++){
        gamePrompts[i].classList.add("hidden");
    }
}

// start game
function startGame(){
    if (!running){
        console.log("START");
        running = true;

        // hide all game prompts
        hideGamePrompts();

        // generate logic
    }
}

// pause game
function stopGame(){
    if (running){
        console.log("STOP");
        running = false;

        // reset prompt screens
        hideGamePrompts();

        // show pause screen
        var pausePrompt = document.getElementById("pause-screen-container");
        pausePrompt.classList.remove("hidden");
    }
}

// resume game from pause
function resumeGame(){
    running = true;

    // hide game prompts
    hideGamePrompts();
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
var resumeButton = document.getElementById("resume-game-button");
startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);
resumeButton.addEventListener("click", resumeGame);



// update game
while (running){
}
