/*JavaScript file*/
//Variable Setup
let gameboard = [];
let boardDimension = 20;
const cellSize = 25;

//Element variables
const gameboardElement = document.getElementById('gameBoard');
const openMessageElement = document.getElementById('openMessage')

gameboardElement.style.width = `${boardDimension*cellSize}px`;

//Fill in the gameboard
for (let i = 0; i < (boardDimension*boardDimension); i++){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    console.log(cell);
    gameboard.push(cell);
    gameboardElement.append(cell);
    openMessageElement.style.display = 'none';

}