console.log('tic-tac-toe')

// Global Variables =========================================

const buttons = document.querySelectorAll('.grid-wrapper .btn')
const congratsMessage = document.querySelector('.congrats');
const resetBtn = document.querySelector('.reset');
const counterO = document.querySelector('.count-O');
const counterTie = document.querySelector('.count-tie');
const counterX = document.querySelector('.count-X');
const roundCounter = document.querySelector('.rounds span')
const playersTurn = document.querySelector('.turn');
const turnMessage = document.querySelector('h3')

let currentPlayer = 'O'; // Start with player 'O'.
let picks = 0; //Track number of picks to detect a tie
let winCountO = 0;
let tieCount = 0;
let winCountX = 0;
let rounds = 1; 
let gameWon = false; //keep track of game status


// Event Listeners ============================================

buttons.forEach(function(button){
    button.addEventListener('click', handleClick);
})

resetBtn.addEventListener('click', handleReset);


// Event Handlers =============================================

// Execute when a box is clicked
function handleClick(event){
    let clickedBtn = event.target;

    // If empty, mark the box with current player's symbol.
   if (clickedBtn.innerHTML === ''){
        clickedBtn.innerHTML = currentPlayer;
        picks++;

        // Add class to trigger the animation
        clickedBtn.classList.add('animate__animated', 'animate__flipInY');

        // Display restart option
        resetBtn.classList.remove('hide');
        
        // Check if the current player has won.
        hasPlayerWon(currentPlayer);

        // If no one has won and 9 picks has been made, it's a tie.
        if (!gameWon && picks === 9){
            congratsMessage.innerHTML = `It's a tie!`;
            congratsMessage.classList.remove('hide');
            turnMessage.classList.add('hide');
            tieCount++;
            counterTie.innerHTML = tieCount;
            resetBtn.classList.add('animate__animated', 'animate__heartBeat');
        }

        // Then switch player
        if (currentPlayer === 'O'){
            currentPlayer = 'X';
            playersTurn.innerHTML = 'X';
        
        } else {
            currentPlayer = 'O';
            playersTurn.innerHTML = 'O';
        }
    }
}


// Execute when the reset button is clicked
function handleReset(){

    // Enable buttons
    // Remove the animation and color on the buttons
    buttons.forEach(function(button){
        button.disabled = false;
        button.innerHTML = '';
        button.classList.remove('animate__animated', 'animate__flipInY');
        button.classList.remove('win');
    })

    // Reset messages and counters to their initial state
    picks = 0;
    currentPlayer = 'O';
    gameWon = false;
    playersTurn.innerHTML = 'O';
    turnMessage.classList.remove('hide');
    congratsMessage.classList.add('hide');

    // Update round counts
    rounds++;
    roundCounter.innerHTML = rounds;

    // Disable the reset button
    resetBtn.classList.remove('animate__animated', 'animate__heartBeat');
    resetBtn.classList.add('hide');

}


// To visualise the grid:
// let grid (/buttons) = [
//     [0, 1, 2],  
//     [3, 4, 5],  
//     [6, 7, 8]
// ]

let winCombinations = [
    [0, 1, 2],  // Horizontal win: top row
    [3, 4, 5],  // Horizontal win: middle row
    [6, 7, 8],  // Horizontal win: bottom row
    [0, 3, 6],  // Vertical win: Left column
    [1, 4, 7],  // Vertical win: Middle column
    [2, 5, 8],  // Vertical win: Right column
    [0, 4, 8],  // Diagonal win: top-left to bottom-right
    [2, 4, 6]   // Diagonal win: top-right to bottom-left
];

// Check if the player has won.
function hasPlayerWon(player) {
    for (let i = 0; i < winCombinations.length; i++){
        let winMatch = winCombinations[i];
        
        if (buttons[winMatch[0]].innerHTML === player &&
            buttons[winMatch[1]].innerHTML === player &&
            buttons[winMatch[2]].innerHTML === player) {

            // Change background color to highlight win combo
            winMatch.forEach(function(i){
                buttons[i].classList.add('win');
            })
        
            // Display win message when a player wins
            congratsMessage.innerHTML = `Congrats, Player ${player} wins!`;
            congratsMessage.classList.remove('hide');

            // Hide turn message
            turnMessage.classList.add('hide');

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

            // Prompt the players to play again
            resetBtn.classList.add('animate__animated', 'animate__heartBeat');

            // Update game status to avoid tie message when player won on the last move.
            gameWon = true;
        }
    }
}

