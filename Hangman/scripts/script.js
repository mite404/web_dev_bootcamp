// selecting elements from the page
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");

// Init game variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

// function to reset game
const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    // create empty letter slots
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    // enable keyboard buttons
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    // hide the game modal
    gameModal.classList.remove("show");
}


// function to get random word
const getRandomWord = () => {
    // picking a random word and hint from wordList array
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    // set current word and update hint
    currentWord = word;
    document.querySelector(".hint-text b").innerHTML = hint;
    // reset game
    resetGame();
}

// function to handle end of game win/loose
const gameOver = (isVictory) => {
    // show the game over modal with win/loose
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
}

// create a for loop to display keyboard
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    // add click event listener for each button
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

// function to handle the game logic
const initGame = (button, clickedLetter) => {
    // checking if clicked letter is in currentWord
    if (currentWord.includes(clickedLetter)) {
        // update the displayed letters if clicked is correct
        [...currentWord].forEach((letter, index) => {
           if (letter === clickedLetter) {
               correctLetters.push(letter);
               wordDisplay.querySelectorAll("li")[index].innerText = letter;
               wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
           }
        });
    } else {
        // update wrong guess count and hangman image if letter is incorrect
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    // disable the clicked button letter
    button.disabled = true;
    // update the displayed guess count
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // check if game should end based on win/loose conditions
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}

// starting the game with a random word
getRandomWord();

// add event listener for playAgain button
playAgainBtn.addEventListener("click", getRandomWord)
