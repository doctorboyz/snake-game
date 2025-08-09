# 🐍 Snake Game - Mobile-First Edition

A modern, responsive Snake game built with HTML5 Canvas and JavaScript, optimized for mobile devices with touch controls.

## 🚀 Live Demo

**[Play the Game](https://your-username.github.io/snake-game/)** *(Update with your GitHub Pages URL)*

## ✨ Features

### 🎮 Game Features
- **Classic Snake Gameplay** - Navigate the snake to eat food and grow
- **Progressive Difficulty** - Game speed increases as you score higher
- **Local High Score** - Automatically saves your best score
- **Particle Effects** - Visual feedback when eating food
- **Sound Effects** - Audio feedback using Web Audio API

### 📱 Mobile-First Design
- **Touch Controls** - Virtual arrow buttons with haptic feedback
- **Swipe Gestures** - Swipe on canvas to control snake direction
- **Responsive Layout** - Adapts to any screen size
- **Portrait/Landscape** - Optimized for both orientations
- **No Zoom Issues** - Prevents accidental zoom on mobile

### 🎯 User Experience
**Visual Feedback** - Button animations and state indicators
**Pause/Resume** - Game state management with overlay messages
**Share Scores** - Native sharing or clipboard fallback
**Help Section** - Expandable game instructions and tips

## 🛠️ Technology Stack

- **HTML5 Canvas** - Game rendering
- **Vanilla JavaScript** - Game logic and interactions
- **CSS3** - Responsive design and animations
- **Web Audio API** - Sound effects
- **Local Storage** - High score persistence
- **Progressive Web App Ready** - Offline-capable design

## 🎯 Controls

### Desktop
**Arrow Keys** - Move snake (↑↓←→)
**Spacebar** - Pause/Resume game
**R Key** - Restart game
**Enter** - Start new game

### Mobile
**Virtual Buttons** - Tap directional arrows
**Swipe Gestures** - Swipe on canvas to change direction
**Touch Feedback** - Haptic vibration (if supported)

## 📁 Project Structure

```
snake-game/
├── index.html              # Main HTML file
├── css/
│   └── style.css           # Styles and responsive design
├── js/
│   └── game.js            # Game logic and classes
├── assets/
│   ├── images/            # Game images (icons, etc.)
│   └── sounds/            # Sound effects documentation
├── PROJECT_PLAN.md        # Development roadmap
├── GUIDELINES.md          # Coding standards
└── README.md             # This file
```

## 🏗️ Architecture

### Core Classes
**`Snake`** - Snake entity with movement and collision detection
**`Food`** - Food generation and rendering
**`Particle`** - Visual effects system

### Game States
- **Menu** - Initial state, ready to start
- **Playing** - Active gameplay
- **Paused** - Game temporarily stopped
- **Game Over** - End state with score display

## 🎨 Design Philosophy

### Mobile-First Approach
1. **Touch-Friendly** - All interactions designed for finger taps
2. **Clear Visual Hierarchy** - Important elements are prominent
3. **Performance Optimized** - Smooth 60fps gameplay on mobile
4. **Accessibility** - High contrast colors and clear feedback

### User Experience Priority
1. **Feedback** - Visual and audio confirmation of actions
2. **Error Prevention** - Intuitive controls prevent mistakes
3. **Progressive Enhancement** - Works on all devices

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/snake-game.git
   cd snake-game
   ```

2. **Start a local server**
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### GitHub Pages Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to Pages section
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Save and wait for deployment

3. **Access your game**
   ```
   https://your-username.github.io/snake-game/
   ```

## 🎮 Gameplay Tips

### For Beginners
- **Start Slow** - Get comfortable with controls first
- **Plan Ahead** - Think about your path before moving
- **Use Walls** - Corners can help you navigate tight spaces
- **Stay Calm** - Don't panic when the snake gets longer

### Advanced Strategies
- **Speed Management** - Game gets faster as you score
- **Efficient Patterns** - Develop consistent movement patterns
- **Risk Assessment** - Sometimes it's better to wait for better food placement
- **Score Targets** - Set incremental goals (50, 100, 200 points)

## 🔧 Customization

### Modify Game Settings
Edit `CONFIG` object in `js/game.js`:
```javascript
const CONFIG = {
    GRID_SIZE: 20,           // Size of each grid cell
    CANVAS_WIDTH: 400,       // Canvas width in pixels
    CANVAS_HEIGHT: 400,      // Canvas height in pixels
    FRAME_RATE: 150,         // Initial game speed (ms)
    // ... more settings
};
```

### Customize Colors
Update colors in `css/style.css`:
```css
:root {
    --snake-color: #00FF00;
    --food-color: #FF0000;
    --background-color: #000000;
    /* ... more colors */
}
```

## 🐛 Browser Compatibility

### Fully Supported
- **Chrome/Edge** 80+ (Chromium-based)
- **Firefox** 75+
- **Safari** 13+ (iOS/macOS)
- **Samsung Internet** 12+

### Partially Supported
- **Internet Explorer** - Not supported (uses modern JavaScript)
- **Older Android Browsers** - Basic functionality only

## 📈 Performance

### Optimization Features
- **Efficient Rendering** - Only draws when needed
- **Memory Management** - Automatic cleanup of particles
- **Touch Optimization** - Prevents common mobile browser issues
- **Responsive Canvas** - Scales appropriately for device

### Performance Metrics
- **60 FPS** - Smooth gameplay on modern devices
- **< 50ms** - Touch response time
- **< 2MB** - Total download size
- **Offline Ready** - Cacheable for offline play

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Follow the coding standards** (see `GUIDELINES.md`)
4. **Test on multiple devices**
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Development Guidelines
**Mobile-First** - Test on mobile devices first
**Performance** - Maintain 60fps gameplay
**Accessibility** - Ensure all features are accessible
**Documentation** - Update comments and documentation

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Classic Snake Game** - Inspired by the original Nokia Snake
- **Mobile Gaming** - Optimized for modern touch devices
- **Web Standards** - Built with modern web technologies
- **Open Source Community** - Thanks to all contributors

## 📞 Support

- **Issues** - [GitHub Issues](https://github.com/your-username/snake-game/issues)
- **Discussions** - [GitHub Discussions](https://github.com/your-username/snake-game/discussions)
- **Email** - your-email@example.com

---

**Built with ❤️ for mobile-first gaming**

*Play responsibly and enjoy the game!* 🎮🐍
