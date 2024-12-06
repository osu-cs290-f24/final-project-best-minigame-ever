// global variables
var interval = 16;
var running = false;
var score = 2;
var pipes = [];
var pipeCount = 0;
var scoreElement = document.getElementById("current-score");
const defaultBird = {
    top: 150,
    speed: 3.5,
    width: 55,
    height: 35,
    jumpSpeed: -10,
    gravity: 0.5
};
var bird;

var pipeTest = true;

function clearPipes () {
    var pipeElements = document.getElementsByClassName("pipe-container");
    for (var i = 0; i < pipeElements.length; i++)
        pipeElements[i].remove();
}

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

    // reset score
    score = 0;

    // remove all pipes
    clearPipes();
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

// end game
function endGame(){
    running = false;

    // reset prompt screens
    hideGamePrompts();

    // show pause screen
    var losePrompt = document.getElementById("lose-screen-container");
    losePrompt.classList.remove("hidden");

    // change score element
    document.getElementById("lose-screen-score").textContent = "Score: " + score;
}

// update position of the bird
function updateBird(){
    var gameBird = document.getElementById("bird-container");
    gameBird.style.top = bird.top + 'px';
    /*
        * add bird rotation
    */
}

// add new pipe
function createPipe(){
    var newPipe = {
        left: 800,
        topPipeBottom: Math.floor(Math.random() * 360) + 40
    };
    newPipe.bottomPipeTop = 400 - newPipe.topPipeBottom + 60;

    pipes.push(newPipe);
}

// create new pipe element, add to DOM
function createPipeElement(index){
    // pipe container
    var newPipeContainer = document.createElement('div');
    newPipeContainer.classList.add("pipe-container");
    newPipeContainer.id = "pipe-" + pipeCount;
    newPipeContainer.style.left = pipes[index].left + "px";

    // upper pipe
    var upperPipe = document.createElement('div');
    upperPipe.classList.add("upper-pipe");
    upperPipe.style.bottom = pipes[index].topPipeBottom + "px";
    var upperPipeImage = document.createElement('img');
    upperPipeImage.classList.add("upper-pipe-img");
    upperPipeImage.src = "pipe.png";
    upperPipeImage.alt = "upper-pipe";
    upperPipe.appendChild(upperPipeImage);
    newPipeContainer.appendChild(upperPipe);

    // lower pipe
    var lowerPipe = document.createElement('div');
    lowerPipe.classList.add("lower-pipe");
    lowerPipe.style.top = pipes[index].bottomPipeTop + "px";
    var lowerPipeImage = document.createElement('img');
    lowerPipeImage.classList.add("lower-pipe-img");
    lowerPipeImage.src = "pipe.png";
    lowerPipeImage.alt = "upper-pipe";
    lowerPipe.appendChild(lowerPipeImage);
    newPipeContainer.appendChild(lowerPipe);

    // add to DOM
    var gameContainer = document.getElementById("game-container");
    gameContainer.appendChild(newPipeContainer);
}


// update all pipe positions
function updatePipes(){
    // get all pipes
    var pipeElements = document.getElementsByClassName("pipe-container");

    // add new pipe
    if (pipeElements.length > pipes.length){
        createPipeElement();
    }

    // move pipes
    for (var i = 0; i < pipes.length - 1; i++)
        pipes[i].left -= 2;

    // update DOM
    for (var i = 0; i < pipeElements.length; i++){
        pipeElements[i].style.left -= 2;
    }
}

// update game
function update(){
    // stop if not running
    if (!running) return;

    // update game
    updateBird();
    document.getElementById("current-score").textContent = score;

    // move bird
    bird.top += bird.speed;

    // update bird speed
    bird.speed += bird.gravity;

    // check bird at top
    if (bird.top < 0)
        bird.top = 0;

    // check bird at bottom
    if (bird.top > (400 - (bird.height - 5)))
        endGame();

    // add new pipe if needed
    if (pipeTest){
        createPipe();
        createPipeElement(pipes.length - 1);
        pipeTest = false;
    }

    // update pipe position
    updatePipes();

    // check bird collision
    /*
        * TO DO
    */
    
    // check if scored
    /*
        * TO DO
    */
}

// on key down
document.addEventListener("keydown", (key) => {
    // jump
    if (key.code === "ArrowUp" || key.key == 'w' || key.code === "Space"){
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
