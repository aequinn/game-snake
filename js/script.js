/*JavaScript file*/

//Variable Setup
let gameboard = [];
let boardDimension = 20;
const cellSize = 25;
let myScore = 0;
let isPaused = false;

let snake = [0,1,2];

//fruit point setup
const redFruitValue = 5;
const yellowFruitValue = 10;
const blueFruitValue = 20;

let redFruits = {
    "allowed" : 1,
    "locations" : []
};

let yellowFruits = {
    "allowed" : 1,
    "locations" : []
};


let blueFruits = {
    "allowed" : 1,
    "locations" : []
};
let totalFruit = redFruits.count + yellowFruits.count + blueFruits.count;
let fruitAllowed = 3;

let direction = 1; //1 is right and down. -1 is left and up
let snakeSpeed = 1000; //miliseconds
let speedFactor = .4; //multiplier to modulate speed.
let movement = setInterval(renderSnake, snakeSpeed);

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
fruitFarm(); 

addEventListener('keyup', keyPress);

/*FUNCTIONS*/
//listen for direction change
function keyPress(e){
    //get the right way
    console.log(e.code);
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
        case 'Space' :
            pauseGame();
            break;
    }
}

//Pause the game
function pauseGame(){
    console.log(isPaused)
    if(isPaused){
        isPaused = false;
        movement = setInterval(renderSnake, snakeSpeed)
        console.log('unpaused')
    }else{
        isPaused = true;
        clearInterval(movement);
        console.log('paused')
    }
    
}

//Fruit 
function seedFruit(fruit){
    //Generate fruites up to the allowed limit
     do{
        console.log('Generating fruit')
        //generate new fruit 
        let newFruit = Math.floor(Math.random()*(boardDimension*boardDimension)) 
        console.log(`red Fruit overlap ${redFruits.locations.indexOf(newFruit)}`)

        console.log(`yellow Fruit overlap ${yellowFruits.locations.indexOf(newFruit)}`)
        console.log(`blue Fruit overlap ${blueFruits.locations.indexOf(newFruit)}`)
        console.log(`snake overlap ${snake.indexOf(newFruit)}`)

        //check it doesn't overlapping with an existing object
        //TODO
        //Move to it's own function to be a general collision checker?
        if((redFruits.locations).indexOf(newFruit) === -1 && (yellowFruits.locations).indexOf(newFruit) === -1 && (blueFruits.locations).indexOf(newFruit) === -1 && snake.indexOf(newFruit) === -1){
            fruit.locations.push(newFruit);
        } else{
            console.log(`OVERLAP`)
        }  
         
     }
     while(fruit.locations.length < fruit.allowed);
    
}
//generate fruit
function fruitFarm(){
  //TODO
  //Add a way of tracking when new fruits start to show up...new time interval or based on score or other factor
    
    seedFruit(redFruits);
    seedFruit(yellowFruits);
    seedFruit(blueFruits);
    fruitProcessor();
}

//render fruit
function fruitProcessor(){
        if(redFruits.locations.length > 0){
            redFruits.locations.forEach(fruit => {
                gameboard[fruit].classList.add('fruit');
                gameboard[fruit].classList.add('fruit--red');
            })
        }
        if(yellowFruits.locations.length > 0){
            yellowFruits.locations.forEach(fruit => {
                gameboard[fruit].classList.add('fruit');
                gameboard[fruit].classList.add('fruit--yellow');
            })
        }
        if(blueFruits.locations.length > 0){
            blueFruits.locations.forEach(fruit => {
                gameboard[fruit].classList.add('fruit');
                gameboard[fruit].classList.add('fruit--blue');
            })
        }
}

//Render snake
function renderSnake(){
    let snakeHead = snake[(snake.length-1)]
    let snakeTail = snake[0];// snake.push(snake[snake.length]+1);
    
    //TODO
    //Collision with walls and/or fruit
    if(Number.isInteger((snakeHead)/(boardDimension))){
        console.log(`Snake Head ${snakeHead}`)
        console.log(`Snake position ${(snakeHead+direction)/(boardDimension-1)}`);
        isPaused = false;
        pauseGame();
    }
    snake.push(snakeHead+direction);

    snake.shift();
    gameboard[snakeTail].classList.remove('snake');
    // console.log(snake);
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
