const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = "RIGHT";
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box,
};

// Listen for key presses
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== "RIGHT") direction = "LEFT";
    else if (key === 38 && direction !== "DOWN") direction = "UP";
    else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
    else if (key === 40 && direction !== "UP") direction = "DOWN";
}

function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "lime" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Move snake
    let newX = snake[0].x + (direction === "LEFT" ? -box : direction === "RIGHT" ? box : 0);
    let newY = snake[0].y + (direction === "UP" ? -box : direction === "DOWN" ? box : 0);
    let newHead = { x: newX, y: newY };

    // Check if snake's position is inside the canvas
    if (newX < 0 || newX >= canvas.width || newY < 0 || newY >= canvas.height) {
        alert("Game Over! You hit the wall.");
        location.reload();
    }

    // Check collision with itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === newX && snake[i].y === newY) {
            alert("Game Over! You hit yourself.");
            location.reload();
        }
    }

    // Check collision with food
    if (newX === food.x && newY === food.y) {
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box,
        };
    } else {
        snake.pop(); // Remove tail
    }

    snake.unshift(newHead); // Add new head
}

setInterval(drawGame, 100);
