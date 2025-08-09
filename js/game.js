// Snake Game - Enhanced Wireframe with Tooltip System
// Mobile-first design with comprehensive tooltips and action guidelines

/* =======================================
   1. Global Configuration & Variables
======================================== */
const CONFIG = {
    GRID_SIZE: 20,
    CANVAS_WIDTH: 400,
    CANVAS_HEIGHT: 400,
    FRAME_RATE: 150 // milliseconds
};

// Responsive logical canvas size (used for collision and food)
let logicalCanvasWidth = CONFIG.CANVAS_WIDTH;
let logicalCanvasHeight = CONFIG.CANVAS_HEIGHT;
// Responsive logical canvas size (used for collision and food)
let logicalCanvasWidth = CONFIG.CANVAS_WIDTH;
let logicalCanvasHeight = CONFIG.CANVAS_HEIGHT;
    canvas.width = logicalCanvasWidth;
    canvas.height = logicalCanvasHeight;
    ctx.fillStyle = CONFIG.COLORS.BACKGROUND;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw grid
    drawGrid();
    // Draw game objects if they exist
    if (food) food.draw();
    if (snake) snake.draw();
    
    // Colors (matching CSS variables)
    COLORS: {
        BACKGROUND: '#000000',
        SNAKE_BODY: '#00FF00',
        // Use logical canvas size for collision
        const gridW = logicalCanvasWidth / CONFIG.GRID_SIZE;
        const gridH = logicalCanvasHeight / CONFIG.GRID_SIZE;
        if (head.x < 0 || head.x >= gridW || head.y < 0 || head.y >= gridH) {
            return true;
        }
    
    // Directions
    DIRECTIONS: {
        UP: { x: 0, y: -1 },
        DOWN: { x: 0, y: 1 },
        LEFT: { x: -1, y: 0 },
        RIGHT: { x: 1, y: 0 }
    }
};

// Game State
let gameState = CONFIG.STATES.MENU;
        const gridWidth = logicalCanvasWidth / CONFIG.GRID_SIZE;
        const gridHeight = logicalCanvasHeight / CONFIG.GRID_SIZE;
let gameLoop = null;
let snake, food;
let currentDirection = CONFIG.DIRECTIONS.RIGHT;
let nextDirection = CONFIG.DIRECTIONS.RIGHT;
let particles = [];
let gameSpeed = CONFIG.FRAME_RATE;

// DOM Elements
let canvas, ctx, tooltip;
let scoreElement, highScoreElement, finalScoreElement;
let startBtn, pauseBtn, restartBtn, playAgainBtn, shareScoreBtn;
let gameOverScreen, gameStatusOverlay;

// Tooltip Manager Instance
let tooltipManager;

    window.addEventListener('resize', handleResize);
/* =======================================
   2. Game Classes
======================================== */
class Snake {
    constructor() {
        this.body = [
            { x: 10, y: 10 },
            { x: 9, y: 10 },
            { x: 8, y: 10 }
        ];
        this.direction = CONFIG.DIRECTIONS.RIGHT;
    }
    
    update() {
        // Move snake
        const head = { ...this.body[0] };
        head.x += this.direction.x;
        head.y += this.direction.y;
        
        this.body.unshift(head);
        
        // Check if food was eaten
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            updateScore(score);
            
            // Create particle effect
            createFoodParticles(food.x * CONFIG.GRID_SIZE + CONFIG.GRID_SIZE/2, 
                              food.y * CONFIG.GRID_SIZE + CONFIG.GRID_SIZE/2);
            
            food.generateNew();
            
            // Increase game speed slightly
            if (gameSpeed > 80) {
                gameSpeed -= 2;
                if (gameLoop) {
                    clearInterval(gameLoop);
                    startGameLoop();
                }
            }
            
            // Play eat sound effect
            playSound('eat');
        } else {
            // Remove tail if no food eaten
            this.body.pop();
        }
    }
    
    draw() {
        this.body.forEach((segment, index) => {
            if (index === 0) {
                // Snake head
                ctx.fillStyle = CONFIG.COLORS.SNAKE_HEAD;
            } else {
                // Snake body
                ctx.fillStyle = CONFIG.COLORS.SNAKE_BODY;
            }
            
            const x = segment.x * CONFIG.GRID_SIZE;
            const y = segment.y * CONFIG.GRID_SIZE;
            
            ctx.fillRect(x, y, CONFIG.GRID_SIZE - 2, CONFIG.GRID_SIZE - 2);
            
            // Add border for better visibility
            ctx.strokeStyle = CONFIG.COLORS.BACKGROUND;
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, CONFIG.GRID_SIZE - 2, CONFIG.GRID_SIZE - 2);
        });
    }
    
    checkCollision() {
        const head = this.body[0];
        
        // Check wall collision
        if (head.x < 0 || head.x >= CONFIG.CANVAS_WIDTH / CONFIG.GRID_SIZE ||
            head.y < 0 || head.y >= CONFIG.CANVAS_HEIGHT / CONFIG.GRID_SIZE) {
            return true;
        }
        
        // Check self collision
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }
        
        return false;
    }
    
    changeDirection(newDirection) {
        // Prevent reverse direction: ignore input if it's a direct reverse
        if (newDirection.x === -this.direction.x && newDirection.y === -this.direction.y) {
            // Do nothing, keep current direction
            return;
        }
        this.direction = newDirection;
    }
}

class Food {
    constructor() {
        this.generateNew();
    }
    
    generateNew() {
        const gridWidth = CONFIG.CANVAS_WIDTH / CONFIG.GRID_SIZE;
        const gridHeight = CONFIG.CANVAS_HEIGHT / CONFIG.GRID_SIZE;
        
        do {
            this.x = Math.floor(Math.random() * gridWidth);
            this.y = Math.floor(Math.random() * gridHeight);
        } while (this.isOnSnake());
    }
    
    isOnSnake() {
        return snake.body.some(segment => segment.x === this.x && segment.y === this.y);
    }
    
    draw() {
        const x = this.x * CONFIG.GRID_SIZE;
        const y = this.y * CONFIG.GRID_SIZE;
        
        ctx.fillStyle = CONFIG.COLORS.FOOD;
        ctx.fillRect(x, y, CONFIG.GRID_SIZE - 2, CONFIG.GRID_SIZE - 2);
        
        // Add border
        ctx.strokeStyle = CONFIG.COLORS.BACKGROUND;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, CONFIG.GRID_SIZE - 2, CONFIG.GRID_SIZE - 2);
        
        // Add glow effect
        const centerX = x + CONFIG.GRID_SIZE / 2;
        const centerY = y + CONFIG.GRID_SIZE / 2;
        
        ctx.save();
        ctx.shadowColor = CONFIG.COLORS.FOOD;
        ctx.shadowBlur = 10;
        ctx.fillStyle = CONFIG.COLORS.FOOD;
        ctx.fillRect(x + 2, y + 2, CONFIG.GRID_SIZE - 6, CONFIG.GRID_SIZE - 6);
        ctx.restore();
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.life = 1.0;
        this.decay = 0.02;
        this.color = color;
        this.size = Math.random() * 4 + 2;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        this.vx *= 0.98;
        this.vy *= 0.98;
    }
    
    draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        ctx.restore();
    }
    
    isDead() {
        return this.life <= 0;
    }
}

/* =======================================
   3. Tooltip System Class
======================================== */
class TooltipManager {
    constructor() {
        this.tooltip = document.getElementById('tooltip');
        this.activeElement = null;
        this.showTimeout = null;
        this.hideTimeout = null;
        this.isTouch = 'ontouchstart' in window;
        this.longPressTimer = null;
        this.longPressDelay = 600; // ms for long press
        
        this.setupTooltipEvents();
        this.createTooltipStructure();
    }
    
    createTooltipStructure() {
        if (!this.tooltip) return;
        
        this.tooltip.innerHTML = `
            <div class="tooltip-content"></div>
            <div class="tooltip-arrow"></div>
        `;
    }
    
    setupTooltipEvents() {
        // Handle all elements with data-tooltip
        document.addEventListener('mouseenter', this.handleMouseEnter.bind(this), true);
        document.addEventListener('mouseleave', this.handleMouseLeave.bind(this), true);
        document.addEventListener('mousemove', this.handleMouseMove.bind(this), true);
        
        // Touch events for mobile
        document.addEventListener('touchstart', this.handleTouchStart.bind(this), true);
        document.addEventListener('touchend', this.handleTouchEnd.bind(this), true);
        document.addEventListener('touchcancel', this.handleTouchEnd.bind(this), true);
        
        // Hide tooltip when scrolling or resizing
        window.addEventListener('scroll', this.hideTooltip.bind(this));
        window.addEventListener('resize', this.hideTooltip.bind(this));
    }
    
    handleMouseEnter(event) {
        const element = event.target.closest('[data-tooltip]');
        if (!element || this.isTouch) return;
        
        this.clearTimeouts();
        this.activeElement = element;
        
        this.showTimeout = setTimeout(() => {
            this.showTooltip(element, event);
        }, 300);
    }
    
    handleMouseLeave(event) {
        const element = event.target.closest('[data-tooltip]');
        if (!element || this.isTouch) return;
        
        this.clearTimeouts();
        this.hideTooltip();
    }
    
    handleMouseMove(event) {
        if (!this.activeElement || this.isTouch) return;
        this.updateTooltipPosition(event);
    }
    
    handleTouchStart(event) {
        const element = event.target.closest('[data-tooltip]');
        if (!element) return;
        
        this.clearTimeouts();
        this.activeElement = element;
        
        // Start long press timer
        this.longPressTimer = setTimeout(() => {
            this.showTooltip(element, event.touches[0]);
            // Add haptic feedback if available
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        }, this.longPressDelay);
    }
    
    handleTouchEnd(event) {
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = null;
        }
        
        // Hide tooltip after delay on touch end
        this.hideTimeout = setTimeout(() => {
            this.hideTooltip();
        }, 2500);
    }
    
    showTooltip(element, pointerEvent) {
        const tooltipText = element.getAttribute('data-tooltip');
        if (!tooltipText || !this.tooltip) return;
        
        // Set tooltip content (handle line breaks)
        const content = this.tooltip.querySelector('.tooltip-content');
        if (content) {
            content.innerHTML = tooltipText.replace(/\\n/g, '<br>').replace(/&#10;/g, '<br>');
        }
        
        // Show tooltip
        this.tooltip.classList.remove('hidden');
        this.tooltip.classList.add('show');
        
        // Position tooltip
        this.positionTooltip(element, pointerEvent);
    }
    
    positionTooltip(element, pointerEvent) {
        const rect = element.getBoundingClientRect();
        const tooltipRect = this.tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        let x, y;
        let arrowClass = 'arrow-bottom'; // default
        
        if (pointerEvent) {
            // Use pointer position for more accurate placement
            x = pointerEvent.clientX || pointerEvent.pageX;
            y = pointerEvent.clientY || pointerEvent.pageY;
        } else {
            // Use element center
            x = rect.left + rect.width / 2;
            y = rect.top + rect.height / 2;
        }
        
        // Calculate tooltip position
        const tooltipX = Math.max(10, Math.min(x - tooltipRect.width / 2, 
                                               viewportWidth - tooltipRect.width - 10));
        
        let tooltipY;
        if (y - tooltipRect.height - 15 > 0) {
            // Show above element
            tooltipY = y - tooltipRect.height - 15;
            arrowClass = 'arrow-bottom';
        } else {
            // Show below element
            tooltipY = y + 15;
            arrowClass = 'arrow-top';
        }
        
        // Apply position
        this.tooltip.style.left = `${tooltipX}px`;
        this.tooltip.style.top = `${tooltipY}px`;
        
        // Update arrow class
        this.tooltip.className = `tooltip show ${arrowClass}`;
    }
    
    updateTooltipPosition(event) {
        if (!this.tooltip.classList.contains('show')) return;
        
        const rect = this.tooltip.getBoundingClientRect();
        const x = event.clientX - rect.width / 2;
        const y = event.clientY - rect.height - 15;
        
        this.tooltip.style.left = `${Math.max(10, Math.min(x, window.innerWidth - rect.width - 10))}px`;
        this.tooltip.style.top = `${Math.max(10, y)}px`;
    }
    
    hideTooltip() {
        if (!this.tooltip) return;
        
        this.tooltip.classList.remove('show');
        this.hideTimeout = setTimeout(() => {
            this.tooltip.classList.add('hidden');
        }, 200);
        
        this.activeElement = null;
    }
    
    clearTimeouts() {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = null;
        }
    }
}

/* =======================================
   3. Initialization
======================================== */
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    setupEventListeners();
    setupMobileOptimizations();
    
    console.log('🎮 Snake Game Enhanced Wireframe loaded successfully!');
    console.log('💡 Tooltips: Hover on desktop, Long-press on mobile');
});

function initializeGame() {
    // Get DOM elements
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    tooltip = document.getElementById('tooltip');
    
    // Score elements
    scoreElement = document.getElementById('score');
    highScoreElement = document.getElementById('high-score');
    finalScoreElement = document.getElementById('finalScore');
    
    // Button elements
    startBtn = document.getElementById('startBtn');
    pauseBtn = document.getElementById('pauseBtn');
    restartBtn = document.getElementById('restartBtn');
    playAgainBtn = document.getElementById('playAgainBtn');
    shareScoreBtn = document.getElementById('shareScoreBtn');
    
    // Modal elements
    gameOverScreen = document.getElementById('gameOverScreen');
    gameStatusOverlay = document.getElementById('gameStatusOverlay');
    
    // Initialize tooltip manager
    tooltipManager = new TooltipManager();
    
    // Initialize game objects
    snake = new Snake();
    food = new Food();
    
    // Set initial values
    updateScore(0);
    updateHighScore(highScore);
    
    // Setup canvas
    setupCanvas();
    
    // Show initial overlay
    showGameOverlay('🐍 Ready to Play!', 'Use virtual controls or arrow keys to start');
    
    console.log('✅ Game initialization complete');
}

function setupCanvas() {
    // Set canvas size
    canvas.width = CONFIG.CANVAS_WIDTH;
    canvas.height = CONFIG.CANVAS_HEIGHT;
    
    // Draw initial screen
    drawWelcomeScreen();
}

function drawWelcomeScreen() {
    // Clear canvas
    ctx.fillStyle = CONFIG.COLORS.BACKGROUND;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    drawGrid();
    
    // Welcome message
    ctx.fillStyle = CONFIG.COLORS.TEXT;
    ctx.font = 'bold 28px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText('🐍 Snake Game', canvas.width / 2, canvas.height / 2 - 40);
    
    ctx.font = '16px Courier New';
    ctx.fillStyle = CONFIG.COLORS.SNAKE_BODY;
    ctx.fillText('Mobile-First Design', canvas.width / 2, canvas.height / 2 - 10);
    
    ctx.fillStyle = CONFIG.COLORS.TEXT;
    ctx.font = '14px Courier New';
    ctx.fillText('Tap Start Game to begin', canvas.width / 2, canvas.height / 2 + 20);
    ctx.fillText('Long-press elements for tips', canvas.width / 2, canvas.height / 2 + 40);
    
    // Reset text align
    ctx.textAlign = 'left';
}

function drawGrid() {
    ctx.strokeStyle = CONFIG.COLORS.GRID;
    ctx.lineWidth = 0.5;
    
    // Vertical lines
    for (let x = 0; x <= canvas.width; x += CONFIG.GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= canvas.height; y += CONFIG.GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

/* =======================================
   4. Event Listeners
======================================== */
function setupEventListeners() {
    // Button click events
    if (startBtn) startBtn.addEventListener('click', startGame);
    if (pauseBtn) pauseBtn.addEventListener('click', togglePause);
    if (restartBtn) restartBtn.addEventListener('click', restartGame);
    if (playAgainBtn) playAgainBtn.addEventListener('click', startGame);
    if (shareScoreBtn) shareScoreBtn.addEventListener('click', shareScore);
    
    // Mobile control buttons
    setupMobileControls();
    
    // Keyboard events
    document.addEventListener('keydown', handleKeyPress);
    
    // Prevent context menu on long press (mobile)
    document.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.mobile-controls') || e.target.closest('.game-canvas')) {
            e.preventDefault();
        }
    });
    
    // Window events
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', () => {
        setTimeout(handleResize, 100);
    });
    
    console.log('📱 Event listeners setup complete');
}

function setupMobileControls() {
    const controlButtons = document.querySelectorAll('.control-btn[data-direction]');
    
    controlButtons.forEach(button => {
        const direction = button.getAttribute('data-direction');
        
        // Touch events for mobile
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            button.classList.add('active');
            handleDirectionInput(direction);
            
            // Haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
        });
        
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            button.classList.remove('active');
        });
        
        button.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            button.classList.remove('active');
        });
        
        // Mouse events for desktop testing
        button.addEventListener('mousedown', (e) => {
            e.preventDefault();
            button.classList.add('active');
            handleDirectionInput(direction);
        });
        
        button.addEventListener('mouseup', (e) => {
            e.preventDefault();
            button.classList.remove('active');
        });
        
        button.addEventListener('mouseleave', (e) => {
            button.classList.remove('active');
        });
    });
}

function handleDirectionInput(direction) {
    if (gameState === CONFIG.STATES.MENU) {
        // Auto-start game on first input
        startGame();
        // Set initial direction
        setSnakeDirection(direction);
        return;
    }
    
    if (gameState !== CONFIG.STATES.PLAYING) {
        return;
    }
    
    // Set snake direction
    setSnakeDirection(direction);
    
    console.log(`🎮 Direction input: ${direction}`);
}

function setSnakeDirection(direction) {
    if (!snake) return;
    
    // Prevent reverse direction: only update nextDirection if not direct reverse
    let candidate = null;
    switch(direction) {
        case 'ArrowUp':
        case 'up':
            candidate = CONFIG.DIRECTIONS.UP;
            break;
        case 'ArrowDown':
        case 'down':
            candidate = CONFIG.DIRECTIONS.DOWN;
            break;
        case 'ArrowLeft':
        case 'left':
            candidate = CONFIG.DIRECTIONS.LEFT;
            break;
        case 'ArrowRight':
        case 'right':
            candidate = CONFIG.DIRECTIONS.RIGHT;
            break;
    }
    if (candidate && !(candidate.x === -snake.direction.x && candidate.y === -snake.direction.y)) {
        nextDirection = candidate;
    }
}

function handleKeyPress(event) {
    switch(event.code) {
        case 'Space':
            event.preventDefault();
            if (gameState === CONFIG.STATES.PLAYING || gameState === CONFIG.STATES.PAUSED) {
                togglePause();
            }
            break;
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
            event.preventDefault();
            handleDirectionInput(event.code);
            break;
        case 'KeyR':
            event.preventDefault();
            if (gameState === CONFIG.STATES.PLAYING || gameState === CONFIG.STATES.PAUSED) {
                restartGame();
            }
            break;
        case 'Enter':
            if (gameState === CONFIG.STATES.MENU || gameState === CONFIG.STATES.GAME_OVER) {
                startGame();
            }
            break;
    }
}

/* =======================================
   5. Game State Management
======================================== */
function startGame() {
    console.log('🚀 Starting new game...');
    
    gameState = CONFIG.STATES.PLAYING;
    score = 0;
    updateScore(score);
    
    // Reset game objects
    snake = new Snake();
    food = new Food();
    currentDirection = CONFIG.DIRECTIONS.RIGHT;
    nextDirection = CONFIG.DIRECTIONS.RIGHT;
    particles = [];
    gameSpeed = CONFIG.FRAME_RATE;
    
    // Update UI
    updateButtonStates();
    hideGameOverlay();
    hideGameOverScreen();
    
    // Start game loop
    startGameLoop();
    
    showToastMessage('🎮 Game Started! Use arrow controls to move', 'success');
    console.log('✅ Game started successfully');
}

function togglePause() {
    if (gameState === CONFIG.STATES.PLAYING) {
        gameState = CONFIG.STATES.PAUSED;
        pauseBtn.innerHTML = '▶️ Resume';
        pauseBtn.setAttribute('data-tooltip', 
            'Resume Game ▶️\\nContinue from current position\\nKeyboard: Press SPACE key\\nMobile: Tap this button\\nStatus: PAUSED → PLAYING');
        showGameOverlay('⏸️ Game Paused', 'Press Resume or SPACE to continue');
        
        if (gameLoop) {
            clearInterval(gameLoop);
            gameLoop = null;
        }
        
        showToastMessage('⏸️ Game Paused', 'warning');
        console.log('⏸️ Game paused');
    } else if (gameState === CONFIG.STATES.PAUSED) {
        gameState = CONFIG.STATES.PLAYING;
        pauseBtn.innerHTML = '⏸️ Pause';
        pauseBtn.setAttribute('data-tooltip', 
            'Pause Game ⏸️\\nTemporarily stop game movement\\nKeyboard: Press SPACE key\\nMobile: Tap this button\\nStatus: PLAYING → PAUSED');
        hideGameOverlay();
        
        startGameLoop(); // Resume game loop
        
        showToastMessage('▶️ Game Resumed', 'success');
        console.log('▶️ Game resumed');
    }
    
    updateButtonStates();
}

function restartGame() {
    console.log('🔄 Restarting game...');
    
    if (gameLoop) {
        clearInterval(gameLoop);
        gameLoop = null;
    }
    
    gameState = CONFIG.STATES.MENU;
    score = 0;
    updateScore(score);
    
    // Reset UI
    pauseBtn.innerHTML = '⏸️ Pause';
    pauseBtn.setAttribute('data-tooltip', 
        'Pause Game ⏸️\\nTemporarily stop game movement\\nKeyboard: Press SPACE key\\nMobile: Tap this button\\nStatus: PLAYING → PAUSED');
    updateButtonStates();
    hideGameOverScreen();
    
    // Restart immediately
    startGame();
    
    showToastMessage('🔄 Game Restarted!', 'info');
}

function gameOver() {
    console.log('💀 Game Over!');
    
    gameState = CONFIG.STATES.GAME_OVER;
    
    if (gameLoop) {
        clearInterval(gameLoop);
        gameLoop = null;
    }
    
    // Play game over sound
    playSound('gameOver');
    
    // Check for high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore.toString());
        updateHighScore(highScore);
        showNewHighScore();
        showToastMessage('🏆 New High Score!', 'success');
    }
    
    // Update UI
    updateButtonStates();
    showGameOverScreen();
    
    console.log(`Final Score: ${score}, High Score: ${highScore}`);
}

function shareScore() {
    const text = `🐍 I just scored ${score} points in Snake Game! Can you beat my score?`;
    
    if (navigator.share) {
        // Use native sharing if available
        navigator.share({
            title: 'Snake Game Score',
            text: text,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(text).then(() => {
            showToastMessage('📋 Score copied to clipboard!', 'success');
        }).catch(() => {
            showToastMessage('🚫 Unable to copy score', 'error');
        });
    }
}

/* =======================================
   6. UI Update Functions
======================================== */
function updateButtonStates() {
    switch(gameState) {
        case CONFIG.STATES.MENU:
            if (startBtn) startBtn.disabled = false;
            if (pauseBtn) pauseBtn.disabled = true;
            if (restartBtn) restartBtn.disabled = true;
            break;
        case CONFIG.STATES.PLAYING:
            if (startBtn) startBtn.disabled = true;
            if (pauseBtn) pauseBtn.disabled = false;
            if (restartBtn) restartBtn.disabled = false;
            break;
        case CONFIG.STATES.PAUSED:
            if (startBtn) startBtn.disabled = true;
            if (pauseBtn) pauseBtn.disabled = false;
            if (restartBtn) restartBtn.disabled = false;
            break;
        case CONFIG.STATES.GAME_OVER:
            if (startBtn) startBtn.disabled = false;
            if (pauseBtn) pauseBtn.disabled = true;
            if (restartBtn) restartBtn.disabled = true;
            break;
    }
}

function updateScore(newScore) {
    score = newScore;
    if (scoreElement) {
        scoreElement.textContent = score;
    }
}

function updateHighScore(newHighScore) {
    highScore = newHighScore;
    if (highScoreElement) {
        highScoreElement.textContent = highScore;
    }
}

function showGameOverlay(title, message) {
    const titleElement = document.getElementById('overlayTitle');
    const messageElement = document.getElementById('overlayMessage');
    
    if (titleElement) titleElement.textContent = title;
    if (messageElement) messageElement.textContent = message;
    
    if (gameStatusOverlay) {
        gameStatusOverlay.classList.remove('hidden');
    }
}

function hideGameOverlay() {
    if (gameStatusOverlay) {
        gameStatusOverlay.classList.add('hidden');
    }
}

function showGameOverScreen() {
    if (finalScoreElement) {
        finalScoreElement.textContent = score;
    }
    if (gameOverScreen) {
        gameOverScreen.classList.remove('hidden');
    }
}

function hideGameOverScreen() {
    if (gameOverScreen) {
        gameOverScreen.classList.add('hidden');
    }
    const newHighScoreElement = document.getElementById('newHighScore');
    if (newHighScoreElement) {
        newHighScoreElement.classList.add('hidden');
    }
}

function showNewHighScore() {
    const newHighScoreElement = document.getElementById('newHighScore');
    if (newHighScoreElement) {
        newHighScoreElement.classList.remove('hidden');
    }
}

/* =======================================
   7. Game Loop & Core Mechanics
======================================== */
function startGameLoop() {
    if (gameLoop) {
        clearInterval(gameLoop);
    }
    
    gameLoop = setInterval(() => {
        if (gameState !== CONFIG.STATES.PLAYING) {
            clearInterval(gameLoop);
            gameLoop = null;
            return;
        }
        
        // Update snake direction
        snake.changeDirection(nextDirection);
        
        // Update game objects
        snake.update();
        
        // Update particles
        updateParticles();
        
        // Check for collisions
        if (snake.checkCollision()) {
            gameOver();
            return;
        }
        
        // Draw everything
        drawGame();
        
    }, gameSpeed);
}

function createFoodParticles(x, y) {
    for (let i = 0; i < 8; i++) {
        particles.push(new Particle(x, y, CONFIG.COLORS.FOOD));
    }
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        if (particles[i].isDead()) {
            particles.splice(i, 1);
        }
    }
}

function drawParticles() {
    particles.forEach(particle => particle.draw());
}

function drawGame() {
    // Clear canvas
    ctx.fillStyle = CONFIG.COLORS.BACKGROUND;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    drawGrid();
    
    // Draw game objects
    if (food) food.draw();
    if (snake) snake.draw();
    
    // Draw particle effects
    drawParticles();
}

function setupGameCanvas() {
    ctx.fillStyle = CONFIG.COLORS.BACKGROUND;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    drawGrid();
    
    // Draw game objects if they exist
    if (food) food.draw();
    if (snake) snake.draw();
}

/* =======================================
   8. Sound Effects
======================================== */
function playSound(soundType) {
    // Create simple audio feedback using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    switch(soundType) {
        case 'eat':
            playTone(audioContext, 440, 0.1, 'sine'); // A4 note
            break;
        case 'gameOver':
            playTone(audioContext, 220, 0.5, 'square'); // A3 note
            break;
        case 'move':
            playTone(audioContext, 330, 0.05, 'triangle'); // E4 note
            break;
    }
}

function playTone(audioContext, frequency, duration, waveType = 'sine') {
    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = waveType;
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
        console.log('Audio not supported:', error);
    }
}

/* =======================================
   9. Mobile Optimizations
======================================== */
/* =======================================
   9. Mobile Optimizations & Swipe Gestures
======================================== */
function setupMobileOptimizations() {
    // Detect mobile device
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        // Prevent pull-to-refresh
        document.body.style.overscrollBehavior = 'none';
        
        // Add mobile class to body
        document.body.classList.add('mobile-device');
        
        console.log('📱 Mobile optimizations applied');
    }
    
    // Setup swipe gestures
    setupSwipeGestures();
    
    // Handle resize for responsive canvas
    handleResize();
}

function setupSwipeGestures() {
    let startX, startY, endX, endY;
    const minSwipeDistance = 50;
    
    canvas.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
    });
    
    canvas.addEventListener('touchend', (e) => {
        if (!startX || !startY) return;
        
        const touch = e.changedTouches[0];
        endX = touch.clientX;
        endY = touch.clientY;
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
            return; // Not a swipe
        }
        
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (deltaX > 0) {
                handleDirectionInput('right');
            } else {
                handleDirectionInput('left');
            }
        } else {
            // Vertical swipe
            if (deltaY > 0) {
                handleDirectionInput('down');
            } else {
                handleDirectionInput('up');
            }
        }
        
        // Reset
        startX = startY = endX = endY = null;
    });
}

function handleResize() {
    // Adjust canvas size for smaller screens
    const container = document.querySelector('.canvas-container');
    if (container && canvas) {
        const containerRect = container.getBoundingClientRect();
        const maxSize = Math.min(containerRect.width - 20, 400);
        
        if (maxSize < CONFIG.CANVAS_WIDTH) {
            const scale = maxSize / CONFIG.CANVAS_WIDTH;
            canvas.style.transform = `scale(${scale})`;
            canvas.style.transformOrigin = 'top left';
        } else {
            canvas.style.transform = '';
        }
    }
}

/* =======================================
   10. Utility Functions
======================================== */
function showToastMessage(message, type = 'info') {
    // Create toast message element
    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;
    toast.textContent = message;
    
    // Style the toast
    Object.assign(toast.style, {
        position: 'fixed',
        top: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: getToastColor(type),
        color: type === 'warning' ? '#000' : '#fff',
        padding: '12px 20px',
        borderRadius: '8px',
        fontSize: '14px',
        fontFamily: 'Courier New, monospace',
        fontWeight: 'bold',
        zIndex: '1001',
        opacity: '0',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        maxWidth: '90vw',
        textAlign: 'center'
    });
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(-5px)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(-15px)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

function getToastColor(type) {
    const colors = {
        'success': '#28a745',
        'warning': '#ffc107',
        'error': '#dc3545',
        'info': '#007bff'
    };
    return colors[type] || colors.info;
}

function debugLog(message, data = null) {
    if (data) {
        console.log(`🐍 [DEBUG] ${message}:`, data);
    } else {
        console.log(`🐍 [DEBUG] ${message}`);
    }
}

/* =======================================
   11. Service Worker Registration
======================================== */
// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

/* =======================================
   12. Export for Testing (if needed)
======================================== */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONFIG,
        TooltipManager,
        updateScore,
        updateHighScore
    };
}
