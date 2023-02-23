//your code here
// Constants
const GRID_SIZE = 40;
const INITIAL_SNAKE_LENGTH = 3;
const PIXEL_CLASS = 'pixel';
const FOOD_CLASS = 'food';
const SNAKE_BODY_PIXEL_CLASS = 'snakeBodyPixel';

// Variables
let score = 0;
let snake = [];
let direction = 'right';
let intervalId;

// Get game container element
const gameContainer = document.getElementById('gameContainer');

// Create pixels and add them to game container
for (let i = 1; i <= GRID_SIZE * GRID_SIZE; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add(PIXEL_CLASS);
    pixel.setAttribute('id', `pixel${i}`);
    gameContainer.appendChild(pixel);
}

// Create initial snake
for (let i = 1; i <= INITIAL_SNAKE_LENGTH; i++) {
    const pixelId = i;
    const pixel = document.getElementById(`pixel${pixelId}`);
    pixel.classList.add(SNAKE_BODY_PIXEL_CLASS);
    snake.push(pixelId);
}

// Generate random food
generateFood();

// Start moving snake
intervalId = setInterval(moveSnake, 100);

// Handle keyboard input
document.addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 37:
            direction = 'left';
            break;
        case 38:
            direction = 'up';
            break;
        case 39:
            direction = 'right';
            break;
        case 40:
            direction = 'down';
            break;
    }
});

// Move snake
function moveSnake() {
    // Get head and tail of snake
    const head = snake[snake.length - 1];
    const tail = snake.shift();
    const newHead = getNewHead(head);

    // Check if new head collides with food
    if (isFood(newHead)) {
        // Remove food and generate new one
        const food = document.querySelector(`.${FOOD_CLASS}`);
        food.classList.remove(FOOD_CLASS);
        generateFood();

        // Increase score and update score board
        score += 10;
        document.getElementById('score').innerHTML = score;
    } else {
        // Remove tail of snake
        const tailPixel = document.getElementById(`pixel${
tail}`);
    tailPixel.classList.remove(SNAKE_BODY_PIXEL_CLASS);
}

// Check if new head collides with snake body
if (isCollide(newHead)) {
    // Stop moving snake and show game over message
    clearInterval(intervalId);
    alert('Game Over!');
}

// Add new head to snake
const newHeadPixel = document.getElementById(`pixel${newHead}`);
newHeadPixel.classList.add(SNAKE_BODY_PIXEL_CLASS);
snake.push(newHead);
}

// Get new head position based on current direction
function getNewHead(currentHead) {
let newHead;
switch(direction) {
case 'left':
newHead = currentHead - 1;
break;
case 'up':
newHead = currentHead - GRID_SIZE;
break;
case 'right':
newHead = currentHead + 1;
break;
case 'down':
newHead = currentHead + GRID_SIZE;
break;
}
// Check if new head is out of grid
if (newHead < 1 || newHead > GRID_SIZE * GRID_SIZE) {
clearInterval(intervalId);
alert('Game Over!');
}
// Check if new head crosses grid boundaries
const currentHeadRow = Math.floor((currentHead - 1) / GRID_SIZE) + 1;
const currentHeadCol = (currentHead - 1) % GRID_SIZE + 1;
const newHeadRow = Math.floor((newHead - 1) / GRID_SIZE) + 1;
const newHeadCol = (newHead - 1) % GRID_SIZE + 1;
if (newHeadRow !== currentHeadRow && newHeadCol !== currentHeadCol) {
clearInterval(intervalId);
alert('Game Over!');
}
return newHead;
}

// Check if pixel is food
function isFood(pixelId) {
const pixel = document.getElementById(pixel${pixelId});
return pixel.classList.contains(FOOD_CLASS);
}

// Check if pixel collides with snake body
function isCollide(pixelId) {
const pixel = document.getElementById(pixel${pixelId});
return pixel.classList.contains(SNAKE_BODY_PIXEL_CLASS);
}

// Generate random food
function generateFood() {
let foodPixelId;
do {
foodPixelId = Math.floor(Math.random() * GRID_SIZE * GRID_SIZE) + 1;
} while (isCollide(foodPixelId));
const foodPixel = document.getElementById(pixel${foodPixelId});
foodPixel.classList.add(FOOD_CLASS);
}