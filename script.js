window.onload = function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const box = 20;
    let snake = [{ x: 10 * box, y: 10 * box }];
    let direction = "RIGHT";
    let food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box,
    };

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
        let newHead = {
            x: snake[0].x + (direction === "LEFT" ? -box : direction === "RIGHT" ? box : 0),
            y: snake[0].y + (direction === "UP" ? -box : direction === "DOWN" ? box : 0),
        };

        // Check collision with food
        if (newHead.x === food.x && newHead.y === food.y) {
            food = {
                x: Math.floor(Math.random() * 20) * box,
                y: Math.floor(Math.random() * 20) * box,
            };
        } else {
            snake.pop();
        }

        // Check collision with walls or itself
        if (
            newHead.x < 0 || newHead.x >= canvas.width ||
            newHead.y < 0 || newHead.y >= canvas.height ||
            snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
        ) {
            alert("Game Over!");
            location.reload();
            return;
        }

        snake.unshift(newHead);
    }

    setInterval(drawGame, 100);
};
