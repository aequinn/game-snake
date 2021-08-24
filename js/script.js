/*JavaScript file*/

//Variable Setup
let gameboard = [];
let boardDimension = 20;
const cellSize = 25;
let myScore = 0;

//Element variables
const gameboardElement = document.getElementById('gameBoard');
const openMessageElement = document.getElementById('openMessage');
const myScoreElement = document.getElementById('myScore');
const highScoreElement = document.getElementById('highScore');

setScoreboard();
buildBoard();

/*FUNCTIONS*/

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
}