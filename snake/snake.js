
/*
function make_board(){
    var game_board = document.getElementById("game_grid");
    for(var i =0; i < 336; i++){
        var square = document.createElement('div');
        square.classList.add('grid_square');
        game_board.appendChild(square);
    }
}

make_board();
*/

Snake = [];
Apples = [];
var intervalId;
var direction = 0;
const size = 40;
var apple_x = 15;
var apple_y = 6;
var score = 3;
const height = 800;
const width = 400;
var currentScoreSubmit = false;
var score_display = document.getElementById("current-score");


function make_snake(x,y){
    var game_board = document.getElementById("game-container");
    var snake_piece = document.createElement('div');
    snake_piece.classList.add('snake');
    snake_piece.style.top = (y*size) + "px";
    snake_piece.style.left = (x*size) + "px";
    snake_piece.setAttribute('data-x',x);
    snake_piece.setAttribute('data-y',y);
    game_board.appendChild(snake_piece);
    Snake.push(snake_piece);
}

function make_apple(x,y){
    var game_board = document.getElementById("game-container");
    var apple = document.createElement('div');
    apple.classList.add('apple');
    apple.style.top = (y*size) + "px";
    apple.style.left = (x*size) + "px";
    apple.setAttribute('data-x',x);
    apple.setAttribute('data-y',y);
    game_board.appendChild(apple);
    Apples.push(apple);
}

function snake_right(add = false){
    var x_val = Snake[Snake.length - 1].dataset.x
    var y_val = Snake[Snake.length - 1].dataset.y
    make_snake(parseInt(x_val) + 1,parseInt(y_val));
    Snake[0].remove();
    if(!add){
        Snake.shift();
    }
}

function snake_left(add = false){
    var x_val = Snake[Snake.length - 1].dataset.x
    var y_val = Snake[Snake.length - 1].dataset.y
    make_snake(parseInt(x_val) - 1,parseInt(y_val));
    Snake[0].remove();
    if(!add){
        Snake.shift();
    }
}

function snake_down(add = false){
    var x_val = Snake[Snake.length - 1].dataset.x
    var y_val = Snake[Snake.length - 1].dataset.y
    make_snake(parseInt(x_val),parseInt(y_val) + 1);
    Snake[0].remove();
    if(!add){
        Snake.shift();
    }
}

function snake_up(add = false){
    var x_val = Snake[Snake.length - 1].dataset.x
    var y_val = Snake[Snake.length - 1].dataset.y
    make_snake(parseInt(x_val),parseInt(y_val) - 1);
    Snake[0].remove();
    if(!add){
        Snake.shift();
    }
}

function move_snake(add = false){
    switch(direction){
        case 0:
            if(!check_collision(1,0)){
                snake_right(add);
            }
            break;
        case 1:
            if(!check_collision(0,-1)){
                snake_up(add);
            }
            break;
        case 2:
            if(!check_collision(-1,0)){
                snake_left(add);
            }
            break;
        case 3:
            if(!check_collision(0,1)){
                snake_down(add);
            }
            break;
        default:
            snake_right(add);
    }
}


function start_game(){
    if(intervalId == null){
        initialize();
        intervalId = setInterval(move_snake,200);
        score_display.textContent = score;
    }
}

function button_input(e) {
    if(intervalId != null){
        if (e.key == 'd' || e.key == "ArrowRight") {
            if(direction != 2){
                direction = 0;
            }
        } else if (e.key == 'w' || e.key == "ArrowUp") {
            if(direction != 3){
                direction = 1;
            }
        } else if (e.key == 'a' || e.key == "ArrowLeft") {
            if(direction != 0){
                direction = 2;
            }
        } else if (e.key == 's' || e.key == "ArrowDown") {
            if(direction != 1){
                direction = 3;
            }
        }
    }
}

function stop_game(){
    clearInterval(intervalId);
    intervalId = null;
}

function pause_game(){
    var backdrop = document.getElementById('modal-backdrop');
    var pause_modal = document.getElementById('pause-modal');
    backdrop.classList.toggle('hidden');
    pause_modal.classList.toggle('hidden');
    if(intervalId != null){
        stop_game();
    }
    else{
        intervalId = setInterval(move_snake,200);
    }
}

function end_game(){
    stop_game();
    var final_score_container = document.getElementById('score-showcase'); 
    final_score_container.textContent = score;
    toggle_end();

}

function check_collision(x_shift, y_shift){
    var x = Snake[Snake.length - 1].dataset.x
    var y = Snake[Snake.length - 1].dataset.y
    x = parseInt(x) + parseInt(x_shift);
    y = parseInt(y) + parseInt(y_shift);
    if(x >= Math.floor((height / size)) || x < 0){
        end_game();
        return true;
    }
    else if(y >= Math.floor(width / size) || y < 0){
        end_game();
        return true;
    }
    else if(x == apple_x && y == apple_y){
        console.log("apple");
        apple_x = -2;
        apple_y = -2;
        score++;
        score_display.textContent = score;
        move_snake(true);
        spawn_apple();
        return true;
    }
    else{
        if(check_snake(x,y)){
            end_game();
            return true;
        }
    }
    return false;
}

function check_snake(x,y){
    for(var i = 0; i < Snake.length; i++){
        if(x == Snake[i].dataset.x && y == Snake[i].dataset.y){
            return true;
        }
    }
}

function spawn_apple(){
    Apples[0].remove();
    Apples.shift();
    do{
        apple_x = Math.floor(Math.random()* ((height/size) - 1));
        apple_y = Math.floor(Math.random()* ((width/size) - 1));
    } while(check_snake(apple_x,apple_y));
    make_apple(apple_x,apple_y);
}

function submit_score(){
    if(currentScoreSubmit){
        alert("Score already submitted.");
        return;
    }
    var score_container = document.getElementById('score-submit-container');
    var score_submit_score = document.getElementById('score-submit-score');
    toggle_end();
    score_container.classList.toggle('hidden');
    score_submit_score.textContent = score;
}

function sendScore(){
    // error check
    var inputField = document.getElementById("score-submit-input");
    if (inputField.value.length != 3){
        alert("Display name must be 3 characters.");
        return;
    }

    // package data
    var data = {
        name: inputField.value.toUpperCase(),
        score: score
    };

    // mark this game as a submitted score
    currentScoreSubmit = true;
    document.getElementById("submit-score-button").style.backgroundColor = "#CCC";

    // hide container
    var scoreSubmitContainer = document.getElementById("score-submit-container");
    scoreSubmitContainer.classList.add("hidden");
    toggle_end();
    // send to server
    console.log(data);
    /*
        * TO DO
    */
}

function toggle_end(){
    var backdrop = document.getElementById('modal-backdrop');
    var end_modal = document.getElementById('end-modal');
    backdrop.classList.toggle('hidden');
    end_modal.classList.toggle('hidden');
}

document.addEventListener("keyup", button_input);

var start_button = document.getElementById("start-game-button");
start_button.addEventListener("click", start_game);

var pause_button = document.getElementById("stop-game-button");
pause_button.addEventListener("click",pause_game);

var reset_button = document.getElementById('reset-game-button');
reset_button.addEventListener("click",function(){
    toggle_end();
    initialize();
})

var resume_button = document.getElementById('resume-game-button');
resume_button.addEventListener("click", pause_game);

var submit_score_button = document.getElementById('submit-score-button');
submit_score_button.addEventListener("click",submit_score);

var score_submit_button = document.getElementById('score-submit-button');
score_submit_button.addEventListener("click",sendScore);

function initialize(){
    score = 3;
    direction = 0;
    while(Snake[0] != null){
        Snake[0].remove();
        Snake.shift();
    }
    while(Apples[0] != null){
        Apples[0].remove();
        Apples.shift();
    }
    currentScoreSubmit = false;
    make_snake(3,4);
    make_snake(4,4);
    make_snake(5,4);
    make_apple(apple_x,apple_y);
}

initialize();


