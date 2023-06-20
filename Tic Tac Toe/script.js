const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn= document.querySelector(".new-game");

let currentPlayer;
let gameGrid;

const winningPosn = [ // Array
    [0,1,2] ,
    [3,4,5] ,
    [6,7,8] ,
    [0,3,6] ,
    [1,4,7] ,
    [2,5,8] ,
    [0,4,8] ,
    [2,4,6] ,
];

// Game ko is function se initialise krenge
function initGame(){
    currentPlayer = "X";
    gameGrid = ["" , "" , "" , "" , "" , "" , "" , "" , ""];

    // UI pe bhi game ko initialise krna padega
    boxes.forEach((box , index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // box.classList.remove("win");
        box.classList = `box box${index + 1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn()
{
    if(currentPlayer === "X")
        currentPlayer = "O";
    else
        currentPlayer = "X";
    
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let ans = "";
    winningPosn.forEach((position) => {
        
        // 3 boxes should be non-empty & all boxes should contain X or O
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" 
        || gameGrid[position[2]] !== "" ) && (gameGrid[position[0]] === gameGrid[position[1]]) 
        && (gameGrid[position[1]] === gameGrid[position[2]])){

            // Check if winner is X
            if(gameGrid[[position[0]]] === "X")
                ans = "X";
            else    
                ans = "O";

            // Now , yaha tk aane ke baad hame pta chal chuka hai ki X ya O me se 
            // koi ek winner hai , so hum usko green se mark kr denge

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    
    // New Game aur winner ko show karne ke liye
    if(ans !== "")
    {
        gameInfo.innerText = `Winner Player - ${ans}`; 
        newGameBtn.classList.add("active");
        return;
    }

    // Ab yaha tab pahuchenge jab koi nahi jeeta ho  
    let fillcount = 0;

    gameGrid.forEach((box) => {
        if(box !== "")
            fillcount++;
    });

    if(fillcount === 9)
    {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}


function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn(); // to swap turns of 2 players
        checkGameOver(); // check karo ki koi jeet to nahi gya 
    }
}

boxes.forEach((box , index) => {
    box.addEventListener("click" , () => {
        handleClick(index);
    })
}); 

newGameBtn.addEventListener("click" , initGame);
