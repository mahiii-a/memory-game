let cards = document.querySelectorAll(".card");
let flippedCard = false;
let lockCard = false;
let firstCard, secondCard;
const flipSound = document.getElementById('flip-sound');
const matchSound = document.getElementById('match-sound');
let score = 0;
let matchedCards = [];
let scoreDisplay = document.getElementById('score');
let timeElapsed = 0;
let timerInterval;

function flipCard() {
    if (lockCard || this.classList.contains('flipped')) return;

    flipSound.play(); 
    this.classList.add("flipped");

    if (!flippedCard) {
        flippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    matchSound.play(); 
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    matchedCards.push(firstCard, secondCard);
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
    resetBoard();

    if (matchedCards.length === cards.length) {
        clearInterval(timerInterval);
        alert('You win! Time: ' + timeElapsed + 's');
    }
}

function unflipCards() {
    lockCard = true;
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [flippedCard, lockCard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach((card) => {
        let randomIndex = Math.floor(Math.random() * cards.length);
        card.style.order = randomIndex;
    });
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeElapsed++;
        document.getElementById('timer').innerText = `Time: ${timeElapsed}s`;
    }, 1000);
}

function startGame() {
    shuffle();
    cards.forEach((card) => card.addEventListener("click", flipCard));
    startTimer(); // Start the timer
}

startGame();




