
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
    initialize();
    intervalId = setInterval(move_snake,200);
    score_display.textContent = score
}

function button_input(e) {
    if (e.key == 'd' || e.key == "ArrowRight") {
        direction = 0; // right
    } else if (e.key == 'w' || e.key == "ArrowUp") {
        direction = 1; //Up
    } else if (e.key == 'a' || e.key == "ArrowLeft") {
        direction = 2; // Left
    } else if (e.key == 's' || e.key == "ArrowDown") {
        direction = 3; // Down
    }
}

function end_game(){
    clearInterval(intervalId);
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

document.addEventListener("keyup", button_input);

var start_button = document.getElementById("start-game-button");
start_button.addEventListener("click", start_game);


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
    make_snake(3,4);
    make_snake(4,4);
    make_snake(5,4);
    make_apple(apple_x,apple_y);
}

initialize();

