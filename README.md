# 🌟 Tic-Tac-Toe 🌟
Hey there! Welcome to my first ever project 'Tic-Tac-Toe'~

📢 Tools used: HTML, CSS, and JavaScript

💎 [Click here](https://viviantaoyh.github.io/tic-tac-toe/) to see my live project!

![](/Tic-Tac-Toe3.png)

## 🎮 Game Instructions 
1. There's a grid of 3x3 squares for the game.
2. Player 'O' starts the game.
3. Pick an empty square and click on it for your turn.
4. Once clicked, your mark ('O' or 'X') will show in that square.
5. The game takes turns between 'O' and 'X'. You'll see above the board who's up next.
6. After choosing a square, you can't change it.
7. Try to line up three of your marks (all 'O's or all 'X's) horizontally, vertically, or diagonally.
8. The game ends when either someone gets three in a row, or all squares are filled and it's a draw.
9. You'll see a message pop up telling you who won, or if it's a tie.
10. Want another round? Just hit the "Next Round" button.
11. The starting player switches with each new round.
12. If you ever want to reset everything and play from scratch, press the "Reset Scores" button.
13. Have fun and good luck to both players!

## 🎯 Milestones 
Here are the milestones I aimed for to achieve a smooth gameplay:

1. Design a basic 3x3 matrix, with each cell interactive upon a click.
2. Set the click action to alternate between X and O markers.
3. Once occupied with an X or O, the cell cannot be played again.
4. Display the current player's turn, updating after each move.
5. Implement conditions to determine a win/lose or a tie, concluding the game accordingly.
6. Disable further selections once the game ends.
7. Highlight the winning combination by changing their background color
8. At the conclusion of the game, display a notification message indicating the outcome.
9. Prompt the players to start a new round.
10. Switch starting player in each round.
11. Keep track of the game rounds and introduce a score counter.
12. Come up with a theme and style the page in line with it.
13. Incorporate animations for headline logo and buttons.
14. Add a “Reset Scores” button, allowing players to reset both the scores and the board without reloading the page.


## 🏆 Reflecting on My  Coding Journey 

### ✏️ Planning 

At the beginning, I sketched a simple game design using HTML. I drew an outline which included the main parts I thought the game needed: a title, a way to track rounds and scores, a message for who won or if there was a tie, the actual game board, and a restart button. 

![](/Wireframe2.png)

### 🚀 Problem Solving 

As a budding coder, the journey of creating a tic-tac-toe game using HTML, CSS, and JS was riddled with challenges. However, these roadblocks only made my learning experience richer. I'd like to share five of the challenges I faced and the insights I gained from it:


### Problem 1: Deciphering the Win Logic ♔

I started out by trying to determine if a player had won using a brute force approach. I attempted to access each cell by capturing all 9 buttons in the HTML. My idea was to check winning conditions using a slew of 'if' and 'else if' statements. To be comprehensive, I'd have to define 8 different conditions for player O and another 8 for player X, then dictate the appropriate actions after each win. I quickly realized the code would become burdensome. I found myself drowning in repetition when declaring buttons, accessing their values, and mapping win conditions.

#### Solution:

With valuable input from my instructor and peers, I learned a more efficient way. Instead of individually addressing every win condition, I could use arrays to represent potential win combinations. This was a pivotal moment; I had to change how I visualized the problem. Using a grid visualization in JS, I was able to comprehend the abstract idea. With this new found clarity, I set up arrays to hold the win combinations: My win-check function then looped through these combinations, greatly simplifying the code and making it more maintainable.
```
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
```

---

### Problem 2: Hard Coding Trap ⚠️

In my early iterations, I found myself falling into a coding trap. I was continuously hard coding the outcome and turn messages in JavaScript, manipulating the innerText on every possible event. Whether it was signifying whose turn it was, celebrating a win, or declaring a tie, I felt entangled in a web of repetitiveness. As a result, any slight modifications or updates to the game's logic were followed by a cascade of bugs.

Initially, to address the above, I shifted my approach, banking on CSS class styles and the DOM API. The classList method, especially, looked promising. I eagerly defined two classes, .show and .hide, with the hope of toggling between them to control message visibility. However, the redundancy quickly became evident - if I'm showing a message by adding .show, why am I also removing .hide? And vice versa. It was an over-complication that needed trimming.

#### Solution:

Instead of juggling between two classes, I realized I could make do with just one: .hide. By default, the messages would always be visible. Only when necessary, I'd toggle the .hide class to conceal them.

So my code went from this jumble:
```
congratsMessage.classList.add('show');
congratsMessage.classList.remove('hide');
turnMessage.classList.remove('show');
turnMessage.classList.add('hide');
```

To this sweet, short version:
```
congratsMessage.classList.remove('hide');
turnMessage.classList.add('hide');
```

---
### Problem 3: Tie-Check Bug 🚫

Upon further reflection on the game's logic, I recognized an oversight in how I approached the tie scenario. My assumption was that if all 9 buttons were clicked, it would automatically be a tie. But, this logic failed in cases where the last move results in a win. Instead of celebrating the victory, the game would erroneously announce a tie.

This error occurred due to the sequence of my code checks. Once a marker (X or O) was placed, my code would first verify a win via the hasPlayerWon function and then, immediately, check for a tie scenario. Without considering the possibility of a last-move win, my logic was flawed.

#### Solution:

To fix this, I introduced a gameOver variable to track the game's status:
1. I added the gameOver variable to the list of global variables.
2. I then updated the hasPlayerWon function such that if a win condition is met, the gameOver variable is set to true.
3. I then adjusted the tie-check to consider the gameOver flag before making a tie determination.
4. Finally, to ensure a fresh start for new rounds or game resets, the gameOver flag was reset in both handleReset and handleNextRound functions.
```
// Check if the current player has won.
    hasPlayerWon(currentPlayer);

// If no one has won and 9 picks has been made, it's a tie.
    if (!gameOver && picks === 9){
        congratsMessage.innerHTML = `It's a tie!`;
```

---

### Problem 4: Styling Puzzle ♨️

In this interactive game, players click buttons frequently. But a frustrating issue cropped up: every time a button is clicked within the .grid-wrapper container, it would weirdly grow or shrink. This inconsistency made the game play feel a bit off.

#### Solution:

After discussing with my instructor, it became evident that the solution was in the CSS. Specifically, I needed to set a fixed width and height for the buttons.

Breaking down the grid's size, which is 500px by 500px for a 3x3 button set-up, and taking into account a grid-gap of 5px, I figured out the exact button dimensions:

Width & Height: The calculation (500px - 2 x 5px) ÷ 3 yielded a consistent size of 163.33px for both the width and height.
```
.btn {
    border: 1px solid black;
    border-radius: 10px;
    text-align: center;
    background-color: var(--color-set);
    font-size: 3em;
    width: 163px;
    height: 163px;
    cursor: pointer;
    font-family: 'New Rocker', cursive;
}
```
By assigning these sizes to the .btn class in the CSS, I made sure each button remained the same size, regardless of how many times it was clicked.

---

### Problem 5: The Domino Effect of a Simple Button 😭

You'd think adding a new button would be a piece of cake. Not quite, especially given the way my code was structured at the time. On sharing my preliminary game draft with my tutor, she suggested incorporating a 'reset score' button, which would reset the scores and the board without the need for a page reload. Sounds straightforward, right? But in reality, it became a considerable task due to the intertwined nature of the functions in my code.

#### Lesson Learnt:

In hindsight, I realized the value of writing adaptable code from the get-go. The potential for future modifications should always be considered, and the approach should be to encapsulate functionality in reusable chunks. This would make any future additions or changes significantly more manageable.

My descriptive comments turned out to be saviors. They guided me through the labyrinthine logic and helped pinpoint areas impacted by the new button. A significant takeaway was the value of abstraction. By moving shared logic to distinct functions, I could ensure consistent behavior while minimizing redundancy.

This entire process granted me a newfound appreciation for the tenacity and patience of software developers. They often endure iterative changes based on diverse requirements.


## 🖥 Tech Used

1. HTML, CSS, JavaScript
2. Animations: https://animate.style/

## 🌈 Bugs To Fix

### The Initial Hiccup:

In the first version of the game, Player O always got the first turn. This repetitive start was a tad unfair, giving Player O a continuous upper hand in setting the game's pace.

### My Approach:

I tried to change things up by introducing a mechanism to alternate the starting player for each round. By implementing a new variable, startWithX, I was able to track and switch the starting player dynamically:
```
// Switch starting player each round
if (startWithX) {
    currentPlayer = 'O';
    playersTurn.innerHTML = 'O';
    startWithX = false;
} else {
    currentPlayer = 'X';
    playersTurn.innerHTML = 'X'; 
    startWithX = true;
}
```
But I noticed a problem. Every time the game was reseted, or if the webpage was refreshed, Player O was back to starting first.

### Future Fix:

Reflecting upon this, I believe adopting a 'token selection' method could offer a more elegant solution. This approach would allow the players to select their preferred token (X or O) at the outset. The chosen token would then make the first move. When resetting the game, players would be presented with the choice anew, allowing them to decide afresh who initiates the round. 


## ✨ Key Learnings

If I could start over, there are a few big things I've learned. First, planning ahead saves a lot of time and headache. I faced challenges like making buttons behave correctly and adjusting my code to add new features. These issues showed me the importance of building a game with future changes in mind. Clear notes and organized code make everything easier. For next time, I'd focus on making simple, clear code that's easy to adjust later on. In short, good prep work is just as important as the actual coding!


## ✅ Future Features

1. Incorporate engaging button click sounds to enhance interactivity.
2. Optimize the game for various devices, such as tablets and phones.
3. Include a 'two-win combo' message that acknowledges consecutive victories.
4. Enhance backgrounds and texts to be more dynamic and visually appealling.
5. Create a single player mode
6. Allow players to customize their token (X, O, name, picture, avatar etc)
7. Move the shared logic in both 'handleNextRound' and 'handleReset' functions to a separate function called 'resetBoard' and call it from both handlers to minimize redundancy and improve readbility.