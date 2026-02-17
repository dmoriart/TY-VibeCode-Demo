/* ===========================
   SNAKE GAME
   =========================== */

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// --- Config ---
const GRID_SIZE = 20;
const TILE_COUNT = canvas.width / GRID_SIZE;
const INITIAL_SPEED = 120; // ms per tick
const MIN_SPEED = 50;
const SPEED_INCREMENT = 5;

// --- State ---
let snake = [];
let food = { x: 0, y: 0 };
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let score = 0;
let highScore = parseInt(localStorage.getItem('snakeHighScore') || '0');
let gameLoop = null;
let gameRunning = false;
let speed = INITIAL_SPEED;

// --- DOM ---
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const speedEl = document.getElementById('speed-display');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');

highScoreEl.textContent = highScore;

// --- Init ---
function initGame() {
    snake = [
        { x: Math.floor(TILE_COUNT / 2), y: Math.floor(TILE_COUNT / 2) }
    ];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    speed = INITIAL_SPEED;
    scoreEl.textContent = '0';
    speedEl.textContent = '1x';
    placeFood();
    drawGame();
}

function placeFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * TILE_COUNT),
            y: Math.floor(Math.random() * TILE_COUNT)
        };
    } while (snake.some(seg => seg.x === newFood.x && seg.y === newFood.y));
    food = newFood;
}

// --- Drawing ---
function drawGame() {
    // Background
    ctx.fillStyle = '#12121a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid lines (subtle)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= TILE_COUNT; i++) {
        ctx.beginPath();
        ctx.moveTo(i * GRID_SIZE, 0);
        ctx.lineTo(i * GRID_SIZE, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * GRID_SIZE);
        ctx.lineTo(canvas.width, i * GRID_SIZE);
        ctx.stroke();
    }

    // Food
    const foodPixelX = food.x * GRID_SIZE;
    const foodPixelY = food.y * GRID_SIZE;

    // Food glow
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff00e5';
    ctx.fillStyle = '#ff00e5';
    ctx.beginPath();
    ctx.arc(
        foodPixelX + GRID_SIZE / 2,
        foodPixelY + GRID_SIZE / 2,
        GRID_SIZE / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    // Snake
    snake.forEach((segment, index) => {
        const x = segment.x * GRID_SIZE;
        const y = segment.y * GRID_SIZE;
        const isHead = index === 0;

        // Gradient from head to tail
        const progress = index / snake.length;
        const r = Math.round(0 + progress * 124);
        const g = Math.round(240 - progress * 182);
        const b = Math.round(255 - progress * 18);

        if (isHead) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#00f0ff';
        }

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.beginPath();
        ctx.roundRect(x + 1, y + 1, GRID_SIZE - 2, GRID_SIZE - 2, isHead ? 5 : 3);
        ctx.fill();

        ctx.shadowBlur = 0;
    });
}

// --- Game Loop ---
function tick() {
    direction = { ...nextDirection };

    // Move snake
    const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };

    // Wall collision (wrap around)
    if (head.x < 0) head.x = TILE_COUNT - 1;
    if (head.x >= TILE_COUNT) head.x = 0;
    if (head.y < 0) head.y = TILE_COUNT - 1;
    if (head.y >= TILE_COUNT) head.y = 0;

    // Self collision
    if (snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        gameOver();
        return;
    }

    snake.unshift(head);

    // Eat food?
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreEl.textContent = score;

        // Speed up
        speed = Math.max(MIN_SPEED, INITIAL_SPEED - score * SPEED_INCREMENT);
        const speedMultiplier = (INITIAL_SPEED / speed).toFixed(1);
        speedEl.textContent = speedMultiplier + 'x';

        // Update high score
        if (score > highScore) {
            highScore = score;
            highScoreEl.textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore.toString());
        }

        placeFood();

        // Restart loop with new speed
        clearInterval(gameLoop);
        gameLoop = setInterval(tick, speed);
    } else {
        snake.pop();
    }

    drawGame();
}

function startGame() {
    if (gameRunning) return;
    gameRunning = true;
    startBtn.textContent = '⏸ Pause';
    gameLoop = setInterval(tick, speed);
}

function pauseGame() {
    gameRunning = false;
    startBtn.textContent = '▶ Resume';
    clearInterval(gameLoop);
}

function gameOver() {
    gameRunning = false;
    clearInterval(gameLoop);
    startBtn.textContent = '▶ Start Game';

    // Flash effect
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Game Over text
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#ff0000';
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 32px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 10);
    ctx.font = '16px "Inter", sans-serif';
    ctx.fillStyle = '#aaa';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
    ctx.shadowBlur = 0;
}

// --- Controls ---
startBtn.addEventListener('click', () => {
    if (gameRunning) {
        pauseGame();
    } else {
        if (snake.length <= 1 && score === 0) {
            initGame();
        }
        startGame();
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(gameLoop);
    gameRunning = false;
    startBtn.textContent = '▶ Start Game';
    initGame();
});

// Keyboard
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp': case 'w': case 'W':
            if (direction.y !== 1) nextDirection = { x: 0, y: -1 };
            e.preventDefault();
            break;
        case 'ArrowDown': case 's': case 'S':
            if (direction.y !== -1) nextDirection = { x: 0, y: 1 };
            e.preventDefault();
            break;
        case 'ArrowLeft': case 'a': case 'A':
            if (direction.x !== 1) nextDirection = { x: -1, y: 0 };
            e.preventDefault();
            break;
        case 'ArrowRight': case 'd': case 'D':
            if (direction.x !== -1) nextDirection = { x: 1, y: 0 };
            e.preventDefault();
            break;
        case ' ':
            e.preventDefault();
            if (gameRunning) pauseGame();
            else startGame();
            break;
    }
});

// Mobile D-Pad
document.querySelectorAll('.dpad-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const dir = btn.dataset.dir;
        switch (dir) {
            case 'up': if (direction.y !== 1) nextDirection = { x: 0, y: -1 }; break;
            case 'down': if (direction.y !== -1) nextDirection = { x: 0, y: 1 }; break;
            case 'left': if (direction.x !== 1) nextDirection = { x: -1, y: 0 }; break;
            case 'right': if (direction.x !== -1) nextDirection = { x: 1, y: 0 }; break;
        }
        if (!gameRunning) startGame();
    });
});

// Touch/Swipe
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    e.preventDefault();
}, { passive: false });

canvas.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) < 20) return; // Too small

    if (absDx > absDy) {
        // Horizontal swipe
        if (dx > 0 && direction.x !== -1) nextDirection = { x: 1, y: 0 };
        else if (dx < 0 && direction.x !== 1) nextDirection = { x: -1, y: 0 };
    } else {
        // Vertical swipe
        if (dy > 0 && direction.y !== -1) nextDirection = { x: 0, y: 1 };
        else if (dy < 0 && direction.y !== 1) nextDirection = { x: 0, y: -1 };
    }

    if (!gameRunning) startGame();
    e.preventDefault();
}, { passive: false });

// --- Nav Toggle ---
document.getElementById('nav-toggle').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('open');
});

// --- Init ---
initGame();
