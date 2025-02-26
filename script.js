const quoteDisplay = document.getElementById('quote-display');
const quoteInput = document.getElementById('quote-input');
const startBtn = document.getElementById('start-btn');
const timeDisplay = document.getElementById('time');
const speedDisplay = document.getElementById('speed');
const accuracyDisplay = document.getElementById('accuracy');
const result = document.getElementById('result');
const progress = document.getElementById('progress');

let startTime, endTime, timerInterval;
let currentQuote = '';

const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "JavaScript is the programming language of the web.",
    "Practice makes perfect.",
    "Coding is fun and challenging.",
    "Keep calm and code on.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "The only limit to our realization of tomorrow is our doubts of today."
];

function startTest() {
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.innerHTML = currentQuote.split('').map(char => `<span>${char}</span>`).join('');
    quoteInput.value = '';
    quoteInput.disabled = false;
    quoteInput.focus();
    startTime = new Date();
    startBtn.innerText = 'Restart';
    result.innerText = '';
    progress.style.width = '0%';
    timerInterval = setInterval(updateTimer, 1000);
}

function endTest() {
    clearInterval(timerInterval);
    endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000; // in seconds
    const typedText = quoteInput.value;
    const wordsTyped = typedText.split(' ').length;
    const speed = Math.round((wordsTyped / timeTaken) * 60); // words per minute
    const accuracy = calculateAccuracy(currentQuote, typedText);

    speedDisplay.innerText = `${speed} WPM`;
    accuracyDisplay.innerText = `${accuracy}%`;
    result.innerHTML = `You typed at <span class="highlight">${speed} WPM</span> with <span class="highlight">${accuracy}%</span> accuracy!`;
    quoteInput.disabled = true;
}

function updateTimer() {
    const currentTime = Math.floor((new Date() - startTime) / 1000);
    timeDisplay.innerText = `${currentTime}s`;
}

function calculateAccuracy(original, typed) {
    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === original[i]) {
            correct++;
        }
    }
    return ((correct / original.length) * 100).toFixed(2);
}

function updateProgress() {
    const typedLength = quoteInput.value.length;
    const progressPercentage = (typedLength / currentQuote.length) * 100;
    progress.style.width = `${progressPercentage}%`;
}

function highlightLetters() {
    const typedText = quoteInput.value;
    const quoteSpans = quoteDisplay.querySelectorAll('span');
    quoteSpans.forEach((span, index) => {
        if (index < typedText.length) {
            span.classList.toggle('correct', typedText[index] === currentQuote[index]);
            span.classList.toggle('incorrect', typedText[index] !== currentQuote[index]);
        } else {
            span.classList.remove('correct', 'incorrect');
        }
    });
}

startBtn.addEventListener('click', startTest);
quoteInput.addEventListener('input', () => {
    highlightLetters();
    updateProgress();
    if (quoteInput.value === currentQuote) {
        endTest();
    }
});