// global variables
var interval = 16;
var running = false;
var score = 2;
var pipes = [];
var pipeNum = 0;
var pipeSepVal = 120;
var scoreElement = document.getElementById("current-score");
const defaultBird = {
    top: 150,
    speed: 3.5,
    width: 40,
    height: 25,
    jumpSpeed: -3.5,
    gravity: 0.3
};
var bird;

function resetBird(){
    bird = {
        top: defaultBird.top,
        speed: defaultBird.speed,
        width: defaultBird.width,
        height: defaultBird.height,
        jumpSpeed: defaultBird.jumpSpeed,
        gravity: defaultBird.gravity
    };
}

function resetPipes() {
    pipes = [];
    var pipeElements = document.getElementsByClassName("pipe-container");
    while (pipeElements.length != 0)
        pipeElements[0].remove();
}

function renderStart(){
    // reset bird
    resetBird();

    // reset score
    score = 0;

    // remove all pipes
    resetPipes();
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
        // hide all game prompts
        hideGamePrompts();

        // generate logic
        renderStart();

        // start game
        running = true;
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
    
    var birdImg= document.getElementById("bird-img");
    birdImg.style.rotate = (bird.speed * 5) + 'deg';
}

// add new pipe
function createPipe(){
    var newPipe = {
        left: 800,
        topPipeBottom: Math.floor(Math.random() * 230) + 150,
        scored: false
    };
    newPipe.bottomPipeTop = 400 - newPipe.topPipeBottom + 110;

    pipes.push(newPipe);
    createPipeElement(pipes.length - 1);
}

// create new pipe element, add to DOM
function createPipeElement(index){
    // pipe container
    var newPipeContainer = document.createElement('div');
    newPipeContainer.classList.add("pipe-container");
    newPipeContainer.id = "pipe-" + pipeNum;
    pipeNum++;
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

function removePipe(index){
    pipes.splice(index, 1);
    var pipeElements = document.getElementsByClassName("pipe-container");
    pipeElements[index].remove();
}


// update all pipe positions
function updatePipes(){
    // get all pipes
    var pipeElements = document.getElementsByClassName("pipe-container");

    // add new pipe
    if (pipes.length == 0 || (800 - pipes[pipes.length - 1].left) > (75 + pipeSepVal))
        createPipe();

    // remove pipe
    if (pipes[0].left < -75)
        removePipe(0);

    // move pipes
    for (var i = 0; i < pipes.length; i++)
        pipes[i].left -= 2;

    // update DOM
    for (var i = 0; i < pipeElements.length; i++){
        pipeElements[i].style.left = pipes[i].left + "px";
    }
}

function checkCollision(){
    for (var i = 0; i < pipes.length; i++){
        // check if in pipe area
        if ((100 + bird.width) > pipes[i].left && 
                100 < (pipes[i].left + 75)){
            // if touching upper pipe
            if (bird.top < (400 - pipes[i].topPipeBottom))
                endGame();
            // if touching bottom pipe
            else if ((bird.top + bird.height) > pipes[i].bottomPipeTop)
                endGame();

            // render last bird frame
            if (!running)
                updateBird();

            // bird can only be in 1 pipe area
            break;
        }
    }
}

function checkIfScored(){
    for (var i = 0; i < pipes.length; i++){
        if (!pipes[i].scored && (pipes[i].left + 75) < 100){
            // scored
            score++;
            pipes[i].scored = true;
        }
    }
}

// update game
function update(){
    // stop if not running
    if (!running) return;

    // update bird & score
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

    // update pipes
    updatePipes();
    
    // check if scored
    checkIfScored();

    // check bird collision
    checkCollision();
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
