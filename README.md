# 🌟 Tic-Tac-Toe 🌟
Hey there! Welcome to my first ever project 'Tic-Tac-Toe'.

📢 Tools involved: HTML, CSS, and JavaScript

[Click here](https://viviantaoyh.github.io/tic-tac-toe/) to see my live project!

![](/Tic-Tac-Toe3.png)

## 🎮 Game Instructions 
1. The game board consists of a 3x3 grid.
2. Player 'O' starts the game.
3. Click on any empty cell in the grid to make your move.
4. After every turn, the player's marker (either 'O' or 'X') will be displayed in the selected cell.
5. The game will automatically switch turns between 'O' and 'X'. The display above the board will indicate whose turn is next.
6. Once a cell has been selected, it cannot be clicked again.
7. The objective is to get three of your markers (either 'O's or 'X's) in a row, column, or diagonal.
8. The game concludes when one player has three in a row or all cells are filled without a winner, resulting in a tie.
9. When a player wins or the game ties, a pop-up message will reveal the game's result.
10. Click on the "Next Round" button to enter the next round.
11. At any point during the game, if you wish to start over, simply press the "Reset Scores" button. This will clear the board and scores, allowing a fresh start.
12. Enjoy the game and may the best player win! 


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
10. Keep track of the game rounds and introduce a score counter.
11. Come up with a theme and style the page in line with it.
12. Incorporate animations for headline logo and buttons.
13. Add a “Reset Scores” button, allowing players to reset both the scores and the board without reloading the page.

## 🏆 Reflecting on My  Coding Journey 

### ✏️ Planning 

At the beginning, I sketched a simple game design using HTML. I drew an outline which included the main parts I thought the game needed: a title, a way to track rounds and scores, a message for who won or if there was a tie, the actual game board, and a restart button. 

![](/Wireframe2.png)

### 🚀 Problem Solving 

As a budding coder, the journey of creating a tic-tac-toe game using HTML, CSS, and JS was riddled with challenges. However, these roadblocks only made my learning experience richer. I'd like to share some of the challenges I faced and the insights I gained from it:


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

### Problem 3: Styling Puzzle ♨️

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

### Problem 4: The Domino Effect of a Simple Button 😭

You'd think adding a new button would be a piece of cake. Not quite, especially given the way my code was structured at the time. On sharing my preliminary game draft with my tutor, she suggested incorporating a 'reset score' button, which would reset the scores and the board without the need for a page reload. Sounds straightforward, right? But in reality, it became a considerable task due to the intertwined nature of the functions in my code.

#### Lesson Learnt:

In hindsight, I realized the value of writing adaptable code from the get-go. The potential for future modifications should always be considered, and the approach should be to encapsulate functionality in reusable chunks. This would make any future additions or changes significantly more manageable.

My descriptive comments turned out to be saviors. They guided me through the labyrinthine logic and helped pinpoint areas impacted by the new button. A significant takeaway was the value of abstraction. By moving shared logic to distinct functions, I could ensure consistent behavior while minimizing redundancy.

This entire process granted me a newfound appreciation for the tenacity and patience of software developers. They often endure iterative changes based on diverse requirements.


## 🖥 Tech Used

1. HTML, CSS, JavaScript
2. Animations: https://animate.style/


## ✨ Key Learnings

If I could start over, there are a few big things I've learned. First, planning ahead saves a lot of time and headache. I faced challenges like making buttons behave correctly and adjusting my code to add new features. These issues showed me the importance of building a game with future changes in mind. Clear notes and organized code make everything easier. For next time, I'd focus on making simple, clear code that's easy to adjust later on. In short, good prep work is just as important as the actual coding!


## ✅ Future features

1. Incorporate engaging button click sounds to enhance interactivity.
2. Optimize the game for various devices, such as tablets and phones.
3. Include a 'two-win combo' message that acknowledges consecutive victories.
4. Enhance backgrounds and texts to be more dynamic and visually appealling.
5. Create a single player mode
6. Allow players to customize their token (X, O, name, picture, avatar etc)