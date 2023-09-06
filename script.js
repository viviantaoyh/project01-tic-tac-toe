console.log('tic-tac-toe')

// Global Variables

const buttons = document.querySelectorAll('.grid-wrapper .btn')
const message = document.querySelector('.message');
const resetBtn = document.querySelector('.reset');
let currentPlayer = 'O'; // Start with player 'O'.
let picks = 0; //Track number of picks to detect a tie
const counterO = document.querySelector('.count-O');
const counterTie = document.querySelector('.count-tie');
const counterX = document.querySelector('.count-X');
let winCountO = 0;
let tieCount = 0;
let winCountX = 0;


// Event Listeners

buttons.forEach(function(button){
    button.addEventListener('click', handleClick);
})

resetBtn.addEventListener('click', handleReset);


// Event Handlers

// Execute when a box is clicked
function handleClick(event){
    let clickedBtn = event.target;

    //if empty, mark the box with current player's symbol.
   if (clickedBtn.innerText === ''){
        clickedBtn.innerText = currentPlayer;
        picks++;
        
        //check if the current player has won.
        hasPlayerWon(currentPlayer);

        // if no one has won and 9 picks has been made, it's a tie.
        if (picks === 9){
            message.innerText = `It's a tie!`;
            tieCount++;
            counterTie.innerHTML = tieCount;
        }

        // then switch player
        if (currentPlayer === 'O'){
            currentPlayer = 'X';
        } else {
            currentPlayer = 'O';
        }
    }
}


// Execute when the reset button is clicked
function handleReset(){
    buttons.forEach(function(button){
        button.disabled = false;
        button.innerText = '';
    })

    message.innerText = '';
    picks = 0;
    currentPlayer = 'O';
}



// To visualise the grid:
// let grid (/buttons) = [
//     [0, 1, 2],  
//     [3, 4, 5],  
//     [6, 7, 8]
// ]

let winCombinations = [
    [0, 1, 2],  //Horizontal win: top row
    [3, 4, 5],  //Horizontal win: middle row
    [6, 7, 8],  //Horizontal win: bottom row
    [0, 3, 6],  //Vertical win: Left column
    [1, 4, 7],  //Vertical win: Middle column
    [2, 5, 8],  //Vertical win: Right column
    [0, 4, 8],  //Diagonal win: top-left to bottom-right
    [2, 4, 6]   //Diagonal win: top-right to bottom-left
];

// Check if the player has won.
function hasPlayerWon(player) {
    for (let i = 0; i < winCombinations.length; i++){
        let winMatch = winCombinations[i];

        if (buttons[winMatch[0]].innerText === player &&
            buttons[winMatch[1]].innerText === player &&
            buttons[winMatch[2]].innerText === player) {

            // Display win message when a player wins
            message.innerText = `Congrats, Player ${player} wins!`;

            // Update win counter
            if (player === 'O'){
                winCountO++;
                counterO.innerHTML = winCountO;
            } else if (player === 'X'){
                winCountX++;
                counterX.innerHTML = winCountX;
            }

            // Stop further clicks after win
            buttons.forEach(function(button){
                button.disabled = true;
            })

        }
    }
}

