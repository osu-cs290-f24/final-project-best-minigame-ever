// global variables
var interval = 16;
var running = false;
var scoreElement = document.getElementById("current-score");
const defaultBird = {
    top: 150,
    speed: 3.5,
    width: 75,
    height: 55,
    jumpSpeed: -10,
    gravity: 0.5
};
var bird;

function renderStart(){
    // reset bird position
    bird = {
        top: defaultBird.top,
        speed: defaultBird.speed,
        width: defaultBird.width,
        height: defaultBird.height,
        jumpSpeed: defaultBird.jumpSpeed,
        gravity: defaultBird.gravity
    };
    console.log(defaultBird.top + ' ' + bird.top);

    // wipe clean
    
    // render background, bird, starting pipes
}

// submit game score to leaderboard
function submitScore(){
    /*
        * TO DO
    */
}

function birdJump(){
    bird.speed = bird.jumpSpeed;
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
        running = true;

        // hide all game prompts
        hideGamePrompts();

        // generate logic
        renderStart();
    }
}

// pause game
function stopGame(){
    if (running){
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

function endGame(){
    running = false;

    // reset prompt screens
    hideGamePrompts();

    // show pause screen
    var losePrompt = document.getElementById("lose-screen-container");
    losePrompt.classList.remove("hidden");

    // change score element
}

// update position of the bird
function updateBird(){
    var gameBird = document.getElementById("bird-container");
    gameBird.style.top = bird.top + 'px';
    // add future rotation
}

// update game
function update(){
    // stop if not running
    if (!running) return;

    console.log("yeeee");

    // update game
    updateBird();
        // update score element

    // move bird
    bird.top += bird.speed;

    // update bird speed
    bird.speed += bird.gravity;

    // check bird at top
    if (bird.top < 0)
        bird.top = 0;

    // check bird at bottom
    if (bird.top > (400 - bird.height))
        endGame();
}

// on key down
document.addEventListener("keydown", (key) => {
    // jump
    if (key.code === "ArrowUp" || key.key == 'w' || key.code === "Space"){
        console.log("Jump");
        birdJump();
    }

    // stop game
    if (key.code === "Escape") stopGame();
});

// button listeners
var startButton = document.getElementById("start-game-button");
var stopButton = document.getElementById("stop-game-button");
var resumeButton = document.getElementById("resume-game-button");
var restartButtons = document.getElementsByClassName("restart-game-button");
var submitScoreButton = document.getElementById("submit-score-button");

startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);
resumeButton.addEventListener("click", resumeGame);
for (var i = 0; i < restartButtons.length; i++)
    restartButtons[i].addEventListener("click", startGame);
submitScoreButton.addEventListener("click", submitScore);

// update every interval ms
setInterval(update, interval);
