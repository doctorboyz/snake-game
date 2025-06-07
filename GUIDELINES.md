# Snake Game Development Guidelines

## 📋 แนวทางการพัฒนา (Development Guidelines)

### 1. Code Structure & Organization

#### 1.1 File Naming Convention
```
- ใช้ kebab-case สำหรับไฟล์: game-logic.js, high-score.js
- ใช้ camelCase สำหรับตัวแปรและฟังก์ชัน: moveSnake(), gameScore
- ใช้ PascalCase สำหรับ Class: Snake, Food, GameUI
- ใช้ UPPER_CASE สำหรับ constants: GRID_SIZE, GAME_SPEED
```

#### 1.2 Code Organization
```javascript
// 1. Constants และ Configuration
const GRID_SIZE = 20;
const CANVAS_SIZE = 400;

// 2. Game State Variables
let gameState = 'start'; // 'start', 'playing', 'paused', 'gameOver'
let score = 0;

// 3. Game Objects
class Snake { ... }
class Food { ... }
class MobileControls { ... } // สำหรับ virtual buttons

// 4. Utility Functions
function getRandomPosition() { ... }
function checkCollision() { ... }
function detectMobileDevice() { ... }
function setupResponsiveCanvas() { ... }

// 5. Game Logic Functions
function updateGame() { ... }
function drawGame() { ... }

// 6. Event Handlers
function handleKeyPress() { ... }        // Desktop
function handleTouchInput() { ... }      // Mobile
function handleOrientationChange() { ... } // Mobile
function handlePauseToggle() { ... }     // Pause/Play functionality

// 7. Game Initialization
function initGame() { ... }
function initMobileControls() { ... }
```

### 2. Coding Standards

#### 2.1 JavaScript Best Practices
- ใช้ `const` และ `let` แทน `var`
- เขียน JSDoc comments สำหรับฟังก์ชันสำคัญ
- ใช้ arrow functions เมื่อเหมาะสม
- จัดกลุ่มโค้ดที่เกี่ยวข้องเข้าด้วยกัน

#### 2.2 Error Handling
```javascript
// ตัวอย่างการจัดการ error
try {
    updateGameState();
} catch (error) {
    console.error('Game update failed:', error);
    gameState = 'error';
}
```

#### 2.3 Performance Considerations
- ใช้ `requestAnimationFrame()` แทน `setTimeout()` เมื่อเป็นไปได้
- หลีกเลี่ยงการสร้าง object ใหม่ในทุก frame
- Cache DOM elements ที่ใช้บ่อย

#### 2.4 Mobile Performance Optimization
```javascript
// ปรับ frame rate สำหรับมือถือ
const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const FRAME_RATE = isMobile ? 8 : 10; // ลด frame rate บนมือถือ

// ลดการใช้ memory บนมือถือ
function optimizeForMobile() {
    if (isMobile) {
        // ลดขนาด canvas ถ้าจำเป็น
        canvas.width = Math.min(400, window.innerWidth * 0.9);
        canvas.height = canvas.width; // รักษาสัดส่วนสี่เหลี่ยมจัตุรัส
        
        // ปิด context menu บนมือถือ
        canvas.addEventListener('contextmenu', e => e.preventDefault());
        
        // ป้องกัน pull-to-refresh
        document.body.style.overscrollBehavior = 'none';
    }
}

// จัดการ viewport สำหรับมือถือ
function setupMobileViewport() {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(meta);
    }
}
```

### 3. Game Development Principles

#### 3.1 Game Loop Pattern
```javascript
function gameLoop() {
    // ตรวจสอบสถานะเกมก่อนทำงาน
    if (gameState !== GameStates.PLAYING) {
        // หากเกมไม่ได้อยู่ในสถานะ PLAYING ให้รอและตรวจสอบอีกครั้ง
        if (gameState === GameStates.PAUSED) {
            // แสดง Pause overlay หรือ UI
            showPauseOverlay();
        }
        // ยังคงรัน loop แต่ไม่อัปเดตเกม
        requestAnimationFrame(gameLoop);
        return;
    }
    
    // 1. Process Input (เฉพาะเมื่อเกมกำลังเล่น)
    handleInput();
    
    // 2. Update Game State
    updateGame();
    
    // 3. Render Graphics
    renderGame();
    
    // 4. Schedule Next Frame
    requestAnimationFrame(gameLoop);
}

// ฟังก์ชันสำหรับแสดง Pause Overlay
function showPauseOverlay() {
    const ctx = canvas.getContext('2d');
    
    // วาดพื้นหลังโปร่งใส
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // แสดงข้อความ "PAUSED"
    ctx.fillStyle = 'white';
    ctx.font = 'bold 32px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
    
    // แสดงคำแนะนำ
    ctx.font = '16px Courier New';
    ctx.fillText('Press Pause button or Space to continue', canvas.width / 2, canvas.height / 2 + 40);
}
```

#### 3.2 State Management
```javascript
const GameStates = {
    MENU: 'menu',
    PLAYING: 'playing',
    PAUSED: 'paused',
    GAME_OVER: 'gameOver'
};

// ใช้ state machine pattern
function changeGameState(newState) {
    switch(newState) {
        case GameStates.PLAYING:
            startGame();
            break;
        case GameStates.PAUSED:
            pauseGame();
            break;
        case GameStates.GAME_OVER:
            endGame();
            break;
        // ...
    }
    gameState = newState;
}

// Pause/Play Toggle Function
function togglePause() {
    if (gameState === GameStates.PLAYING) {
        changeGameState(GameStates.PAUSED);
        updatePauseButton('paused');
    } else if (gameState === GameStates.PAUSED) {
        changeGameState(GameStates.PLAYING);
        updatePauseButton('playing');
    }
}

function updatePauseButton(state) {
    const pauseBtn = document.getElementById('pauseBtn');
    if (state === 'paused') {
        pauseBtn.textContent = '▶️ Play';
        pauseBtn.setAttribute('aria-label', 'Resume game');
    } else {
        pauseBtn.textContent = '⏸️ Pause';
        pauseBtn.setAttribute('aria-label', 'Pause game');
    }
}
```

### 4. UI/UX Guidelines

#### 4.1 Mobile-First Design (Primary Focus)
```css
/* เน้นการออกแบบสำหรับมือถือเป็นหลัก */
.game-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
}

.game-canvas {
    max-width: 90vw;
    max-height: 60vh;
    border: 2px solid #333;
}

/* Virtual Controls สำหรับมือถือ */
.mobile-controls {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 10px;
    width: 200px;
    height: 200px;
    margin-top: 20px;
}

.control-btn {
    background: #333;
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    min-height: 44px; /* Apple HIG recommendation */
    min-width: 44px;
    touch-action: manipulation; /* ป้องกัน zoom */
    user-select: none;
}

.control-btn:active {
    background: #555;
    transform: scale(0.95);
}

.btn-up { grid-column: 2; grid-row: 1; }
.btn-left { grid-column: 1; grid-row: 2; }
.btn-right { grid-column: 3; grid-row: 2; }
.btn-down { grid-column: 2; grid-row: 3; }

/* Game Action Buttons */
.game-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    justify-content: center;
    flex-wrap: wrap;
}

.action-btn {
    background: #007bff;
    border: none;
    border-radius: 6px;
    color: white;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: bold;
    min-height: 44px;
    min-width: 80px;
    touch-action: manipulation;
    cursor: pointer;
    transition: all 0.2s ease;
}

.action-btn:hover {
    background: #0056b3;
}

.action-btn:active {
    transform: scale(0.95);
}

.action-btn:disabled {
    background: #666;
    cursor: not-allowed;
    opacity: 0.6;
}

/* Pause Button Specific Styling */
#pauseBtn {
    background: #ffc107;
    color: #000;
}

#pauseBtn:hover {
    background: #e0a800;
}

/* Desktop responsive */
@media (min-width: 768px) {
    .mobile-controls {
        display: none; /* ซ่อนปุ่มบน desktop */
    }
    
    .game-container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        height: auto;
    }
}
```

#### 4.2 Touch Event Handling
```javascript
// จัดการ touch events สำหรับ virtual controls
class MobileControls {
    constructor(gameInstance) {
        this.game = gameInstance;
        this.setupVirtualButtons();
        this.setupActionButtons();
        this.preventDefaultTouchBehavior();
    }
    
    setupVirtualButtons() {
        const buttons = {
            'btn-up': 'ArrowUp',
            'btn-down': 'ArrowDown', 
            'btn-left': 'ArrowLeft',
            'btn-right': 'ArrowRight'
        };
        
        Object.entries(buttons).forEach(([btnClass, keyCode]) => {
            const btn = document.querySelector(`.${btnClass}`);
            if (btn) {
                // Touch events
                btn.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this.handleDirectionInput(keyCode);
                });
                
                // Mouse events สำหรับ desktop testing
                btn.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    this.handleDirectionInput(keyCode);
                });
            }
        });
    }
    
    setupActionButtons() {
        // Pause/Play Button
        const pauseBtn = document.getElementById('pauseBtn');
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                this.game.togglePause();
            });
            
            pauseBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.game.togglePause();
            });
        }
        
        // Start Button
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.game.startGame();
            });
        }
        
        // Restart Button
        const restartBtn = document.getElementById('restartBtn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                this.game.restartGame();
            });
        }
        
        // Keyboard support for Pause (Space key)
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && this.game.gameState !== 'menu') {
                e.preventDefault();
                this.game.togglePause();
            }
        });
    }
    
    handleDirectionInput(direction) {
        // ส่ง input ไปยัง game logic (เฉพาะเมื่อเกมกำลังเล่น)
        if (this.game.gameState === 'playing') {
            this.game.changeDirection(direction);
        }
    }
    
    preventDefaultTouchBehavior() {
        // ป้องกัน default touch behaviors
        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });
        
        document.addEventListener('touchstart', (e) => {
            if (e.target.classList.contains('control-btn') || 
                e.target.classList.contains('action-btn')) {
                e.preventDefault();
            }
        }, { passive: false });
    }
}
```

#### 4.3 Responsive Design
```css
/* Mobile-first approach */
.game-container {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
}

@media (max-width: 480px) {
    canvas {
        width: 100%;
        height: auto;
    }
}
```

#### 4.4 HTML Structure for Mobile Controls
```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Snake Game - Mobile</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="game-container">
        <!-- Game Info -->
        <div class="game-info">
            <div class="score">Score: <span id="score">0</span></div>
            <div class="high-score">High: <span id="high-score">0</span></div>
        </div>
        
        <!-- Game Canvas -->
        <canvas id="gameCanvas" class="game-canvas"></canvas>
        
        <!-- Mobile Controls -->
        <div class="mobile-controls">
            <button class="control-btn btn-up" data-direction="ArrowUp">↑</button>
            <button class="control-btn btn-left" data-direction="ArrowLeft">←</button>
            <button class="control-btn btn-right" data-direction="ArrowRight">→</button>
            <button class="control-btn btn-down" data-direction="ArrowDown">↓</button>
        </div>
        
        <!-- Game Actions -->
        <div class="game-actions">
            <button id="startBtn" class="action-btn">🚀 Start Game</button>
            <button id="pauseBtn" class="action-btn" disabled>⏸️ Pause</button>
            <button id="restartBtn" class="action-btn">🔄 Restart</button>
        </div>
        
        <!-- Game Over Screen -->
        <div id="gameOverScreen" class="game-over hidden">
            <h2>Game Over!</h2>
            <p>Final Score: <span id="finalScore">0</span></p>
            <button id="playAgainBtn" class="action-btn">Play Again</button>
        </div>
    </div>
    
    <script src="js/game.js"></script>
</body>
</html>
```

#### 4.5 Accessibility
- เพิ่ม keyboard navigation
- ใส่ alt text สำหรับ images
- ใช้ semantic HTML
- เพิ่ม ARIA labels เมื่อจำเป็น

#### 4.6 User Feedback
```javascript
// แสดงข้อความแจ้งเตือนอย่างชัดเจน
function showMessage(message, type = 'info') {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    // แสดงผลและซ่อนหลัง 3 วินาที
    document.body.appendChild(messageElement);
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}
```

### 5. Testing Guidelines

#### 5.1 Manual Testing Checklist

##### Desktop Testing
- [ ] เกมเริ่มต้นได้ปกติ
- [ ] ควบคุมงูด้วยปุ่มลูกศรได้
- [ ] ตรวจจับการชนทำงานถูกต้อง
- [ ] คะแนนเพิ่มขึ้นเมื่อกินอาหาร
- [ ] เกมจบเมื่อชนตัวเองหรือขอบ
- [ ] ทำงานบนเบราว์เซอร์ต่างๆ (Chrome, Firefox, Safari)

##### Mobile Testing (Primary Focus)
- [ ] Virtual arrow buttons ทำงานได้ถูกต้อง
- [ ] ปุ่มมีขนาดเหมาะสมสำหรับการแตะ (44px+)
- [ ] ไม่มี accidental touch/zoom
- [ ] หน้าจอไม่เลื่อนขณะเล่น
- [ ] Canvas ปรับขนาดได้เหมาะสมกับหน้าจอ
- [ ] ทดสอบบน iOS Safari และ Android Chrome
- [ ] ทดสอบทั้งแนวตั้งและแนวนอน
- [ ] ทดสอบบนหน้าจอขนาดต่างๆ (320px - 768px)
- [ ] ปุ่ม Pause/Play ทำงานได้ถูกต้อง
- [ ] สถานะเกมเปลี่ยนได้ถูกต้องเมื่อกด Pause/Play
- [ ] เกมหยุดและเล่นต่อได้อย่างถูกต้อง

#### 5.2 Performance Testing
```javascript
// วัดประสิทธิภาพ
function measurePerformance() {
    const startTime = performance.now();
    
    // ทำงานที่ต้องการวัด
    updateGame();
    renderGame();
    
    const endTime = performance.now();
    console.log(`Frame time: ${endTime - startTime}ms`);
}
```

### 6. Version Control Best Practices

#### 6.1 Git Commit Messages
```
feat: add collision detection system
fix: prevent snake from reversing direction
docs: update README with installation guide
style: improve CSS formatting
refactor: reorganize game logic functions
test: add unit tests for Snake class
```

#### 6.2 Branching Strategy
```
main         # Production-ready code
develop      # Development branch
feature/*    # New features
hotfix/*     # Critical fixes
```

### 7. Deployment Checklist

#### 7.1 Pre-deployment
- [ ] ทดสอบบนเบราว์เซอร์หลัก (Chrome, Firefox, Safari)
- [ ] ตรวจสอบ responsive design
- [ ] Optimize images และ assets
- [ ] Minify CSS และ JavaScript
- [ ] ตรวจสอบ console errors
- [ ] ทดสอบประสิทธิภาพ

#### 7.2 GitHub Pages Deployment
```bash
# 1. สร้าง gh-pages branch
git checkout -b gh-pages

# 2. Push code ไป GitHub
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages

# 3. เปิดใช้งาน GitHub Pages ใน Settings
```

### 8. Future Enhancement Ideas

#### 8.1 แนวคิดสำหรับพัฒนาต่อ
- Multiplayer mode (ใช้ WebSocket)
- Power-ups และ special items
- Different game modes (time attack, survival)
- Level progression system
- Leaderboard บน server
- Swipe gestures สำหรับการควบคุมบนมือถือ
- Progressive Web App (PWA)
- Haptic feedback สำหรับมือถือ

#### 8.2 Technical Improvements
- Convert to TypeScript
- Add unit testing framework
- Implement webpack bundling
- Add ESLint และ Prettier
- CI/CD pipeline

---

## 🎯 Quick Reference

### Essential Commands
```bash
# เริ่มต้น local server
npx live-server

# Git workflow
git add .
git commit -m "commit message"
git push origin main

# Deploy to GitHub Pages
git subtree push --prefix . origin gh-pages
```

### Useful Resources
- [MDN Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [JavaScript Game Development](https://developer.mozilla.org/en-US/docs/Games)
- [GitHub Pages Guide](https://pages.github.com/)

---

*Guidelines v1.0 - 6 มิถุนายน 2025*
