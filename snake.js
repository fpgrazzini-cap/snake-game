// Get the canvas element and its context
var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');

// Define the size of the box that makes up the snake and food
var box = 20;

// Initialize the score
var score = 0;

// Initialize the snake as an array of boxes
var snake = [];
snake[0] = { x: 10 * box, y: 10 * box };

// Initialize the obstacles
var obstacles = [{ x: 5 * box, y: 5 * box }, { x: 7 * box, y: 8 * box }];


// Set the initial direction of the snake
var direction = "RIGHT";

// Create the food at a random position
var food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Function to draw the game state
function draw() {
    // Clear the canvas and set the fill color to white
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    for (var i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw the food
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);

    // Draw the obstacles
    context.fillStyle = "grey";
    for (var i = 0; i < obstacles.length; i++) {
        context.fillRect(obstacles[i].x, obstacles[i].y, box, box);
    }

    // Move the snake in the current direction
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;
    if (direction == "RIGHT") snakeX += box;
    if (direction == "LEFT") snakeX -= box;
    if (direction == "UP") snakeY -= box;
    if (direction == "DOWN") snakeY += box;

    // Wrap the snake's position if it goes off the edge of the canvas
    if (snakeX < 0) snakeX = canvas.width - box;
    if (snakeX >= canvas.width) snakeX = 0;
    if (snakeY < 0) snakeY = canvas.height - box;
    if (snakeY >= canvas.height) snakeY = 0;

    // Check if the snake has eaten the food
    if (snakeX == food.x && snakeY == food.y) {
        // Increase the score
        score++;

        // Update the score display
        document.getElementById('score').innerText = "Score: " + score;

        // Create new food at a random position
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box
        }
    } else {
        // Remove the last part of the snake
        snake.pop();
    }

    // Create the new head of the snake
    var newHead = {
        x: snakeX,
        y: snakeY
    }


    // Check if the snake has hit the border or itself
    if (snakeX < 0 || snakeY < 0 || snakeX > 19 * box || snakeY > 19 * box || collision(newHead, snake) || collision(newHead, obstacles)) {
        // End the game
        clearInterval(game);
    }

    // Add the new head to the snake
    snake.unshift(newHead);
}

// Function to check if the head of the snake has hit another part of the snake
function collision(head, array) {
    for (var i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Event listener for the arrow keys to change the direction of the snake
document.addEventListener('keydown', directionControl);

function directionControl(event) {
    if (event.keyCode == 37 && direction != "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode == 38 && direction != "DOWN") {
        direction = "UP";
    } else if (event.keyCode == 39 && direction != "LEFT") {
        direction = "RIGHT";
    } else if (event.keyCode == 40 && direction != "UP") {
        direction = "DOWN";
    }
}

// Start the game loop
var game = setInterval(draw, 100);