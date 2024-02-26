const gameArea = document.getElementById('gameArea');
let snake = [{ x: 200, y: 200 }];
let food = { x: 0, y: 0 };
let dx = 10;
let dy = 0;

function drawSnake() {
  gameArea.innerHTML = '';
  snake.forEach(segment => {
    const snakeElement = document.createElement('div');
    snakeElement.classList.add('snake');
    snakeElement.style.left = segment.x + 'px';
    snakeElement.style.top = segment.y + 'px';
    gameArea.appendChild(snakeElement);
  });
}

function drawFood() {
  const foodElement = document.createElement('div');
  foodElement.classList.add('food');
  foodElement.style.left = food.x + 'px';
  foodElement.style.top = food.y + 'px';
  gameArea.appendChild(foodElement);
}

function generateFood() {
  food.x = Math.floor(Math.random() * 40) * 10;
  food.y = Math.floor(Math.random() * 40) * 10;
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    generateFood();
  } else {
    snake.pop();
  }
}

function changeDirection(event) {
  const keyPressed = event.key;
  if (keyPressed === 'ArrowUp' && dy !== 10) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === 'ArrowDown' && dy !== -10) {
    dx = 0;
    dy = 10;
  }
  if (keyPressed === 'ArrowLeft' && dx !== 10) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === 'ArrowRight' && dx !== -10) {
    dx = 10;
    dy = 0;
  }
}

function checkCollision() {
  const head = snake[0];
  if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function gameLoop() {
  moveSnake();
  if (checkCollision()) {
    clearInterval(gameInterval);
    alert('Game Over!');
  }
  if (snake[0].x === food.x && snake[0].y === food.y) {
    generateFood();
  }
  drawSnake();
  drawFood();
}

generateFood();
document.addEventListener('keydown', changeDirection);
const gameInterval = setInterval(gameLoop, 100);
