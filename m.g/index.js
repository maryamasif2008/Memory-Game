const gameBoard = document.getElementById('gameBoard');
const resetButton = document.querySelector('.reset');

// Emoji pairs (8 pairs of emojis)
const emojiPairs = ['🍎', '🍌', '🍒', '🍇', '🍍', '🍓', '🍊', '🍑'];
const cards = [...emojiPairs, ...emojiPairs]; // Duplicate the emoji pairs to create 16 cards

let flippedCards = [];
let matchedCards = [];
let isGameLocked = false;

// Shuffle the cards randomly
function shuffleCards() {
    return cards.sort(() => Math.random() - 0.5);
}

// Create the card elements and add to the board
function createCards() {
    gameBoard.innerHTML = ''; // Clear the board before adding new cards
    shuffleCards().forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('item');
        card.dataset.value = emoji;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip the card when clicked
function flipCard() {
    if (isGameLocked || this.classList.contains('open') || this.classList.contains('matched')) {
        return;
    }

    this.classList.add('open');
    this.textContent = this.dataset.value;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Check if the two flipped cards match
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards.push(firstCard, secondCard);
    } else {
        isGameLocked = true;
        setTimeout(() => {
            firstCard.classList.remove('open');
            secondCard.classList.remove('open');
            firstCard.textContent = '';
            secondCard.textContent = '';
            isGameLocked = false;
        }, 1000);
    }

    flippedCards = [];

    if (matchedCards.length === cards.length) {
        setTimeout(() => {
            alert('You Win!');
        }, 500);
    }
}

// Reset the game
resetButton.addEventListener('click', () => {
    matchedCards = [];
    flippedCards = [];
    createCards();
});

createCards(); // Initialize the game when the page loads
