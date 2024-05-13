const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// List of flower names
const flowers = ["rose", "lily", "tulip", "daisy", "sunflower", "orchid", "daffodil", "hydrangea", "jasmine", "carnation"];

// Select a random flower name
const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];

// Initialize the guessed flower name with underscores
let guessedFlower = "_".repeat(randomFlower.length);

// Maximum number of incorrect guesses allowed
const maxAttempts = 6;
let attemptsLeft = maxAttempts;

// Array to store guessed letters
const guessedLetters = [];

// Function to check if the guess is correct
function checkGuess(letter) {
    if (randomFlower.includes(letter)) {
        // Replace underscores with the correct guessed letter
        for (let i = 0; i < randomFlower.length; i++) {
            if (randomFlower[i] === letter) {
                guessedFlower = guessedFlower.substring(0, i) + letter + guessedFlower.substring(i + 1);
            }
        }
        console.log("Correct guess! Guessed flower so far: " + guessedFlower);
    } else {
        attemptsLeft--;
        console.log("Incorrect guess! Attempts left: " + attemptsLeft);
    }
    guessedLetters.push(letter);
    console.log("Guessed letters: " + guessedLetters.join(", "));
}

// Function to check if the game is won
function checkWin() {
    if (guessedFlower === randomFlower) {
        console.log("Congratulations! You've guessed the flower: " + randomFlower);
        rl.close();
    } else if (attemptsLeft === 0) {
        console.log("Sorry, you've run out of attempts. The flower was: " + randomFlower);
        rl.close();
    }
}

// Main game loop
function playGame() {
    console.log("Welcome to Hangman - Flower Edition!");
    console.log("Try to guess the flower name. You have " + maxAttempts + " attempts.");
    console.log("Guessed flower so far: " + guessedFlower);

    rl.on('line', (input) => {
        if (attemptsLeft > 0) {
            const guess = input.trim().toLowerCase();

            if (guess.length !== 1 || !/[a-z]/.test(guess)) {
                console.log("Please enter a single letter.");
                return;
            }

            if (guessedLetters.includes(guess)) {
                console.log("You've already guessed that letter.");
                return;
            }

            checkGuess(guess);
            checkWin();
        }
    });
}

// Start the game
playGame();