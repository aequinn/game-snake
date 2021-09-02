/*JavaScript file*/

//Variable Setup
let gameboard = [];
let boardDimension = 20;
const cellSize = 25;
let myScore = 0;

let snake = [0,1,2];

let direction = 1;
let snakeSpeed = .4;
let movement = setInterval(renderSnake, 1000);

/*Set and get highscore if it exists */
let highScore = 0;
if(localStorage.getItem('highScore')){
    highScore = localStorage.getItem('highScore');
}else{
    console.log('No high score');
}

//Element variables
const gameboardElement = document.getElementById('gameBoard');
const openMessageElement = document.getElementById('openMessage');
const myScoreElement = document.getElementById('myScore');
const highScoreElement = document.getElementById('highScore');


setScoreboard();
buildBoard();
renderSnake();

addEventListener('keyup', keyPress);

/*FUNCTIONS*/
//listen for direction change

function keyPress(e){
    //get the right way
    switch (e.code) {
        case 'ArrowDown' :
            direction = boardDimension;
            break;
        case 'ArrowUp' :
            direction = boardDimension*-1;
            break;
        case 'ArrowLeft' :
            direction = -1;
            break;
        case 'ArrowRight' :
            direction = 1;
            break;
    }

}

//Render snake
function renderSnake(){
    let snakeHead = snake[(snake.length-1)]
    let snakeTail = snake[0];// snake.push(snake[snake.length]+1);
    console.log(snakeHead+direction)
    snake.push(snakeHead+direction);
    snake.shift();
    gameboard[snakeTail].classList.remove('snake');
    console.log(snake);
    snake.forEach(element => {
        gameboard[element].classList.add('snake');
    });
}

//Function that generates the gameboard
function buildBoard() {
    gameboardElement.style.width = `${boardDimension*cellSize}px`;
    openMessageElement.style.display = 'none'; //remove initial message

    //Fill in the gameboard with all the cells
    const cells = document.createElement('div');
    cells.classList.add('cells');
    for (let i = 0; i < (boardDimension * boardDimension); i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gameboard.push(cell); //add cells to gameboard array
        cells.append(cell);
    }
    gameboardElement.append(cells);
}

//Function that resets the scoreboard
function setScoreboard() {
    myScoreElement.textContent = myScore;
    highScoreElement.textContent = highScore;
}
