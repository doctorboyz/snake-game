# Sound Effects

This folder contains sound effects for the Snake Game. Currently using Web Audio API for programmatic sound generation.

## Current Implementation
- **Eat Sound**: 440Hz sine wave (A4 note) - 0.1s duration
- **Game Over Sound**: 220Hz square wave (A3 note) - 0.5s duration  
- **Move Sound**: 330Hz triangle wave (E4 note) - 0.05s duration

## Future Enhancements
You can replace the programmatic sounds with actual audio files:
- `eat.mp3` - Sound when snake eats food
- `gameover.mp3` - Sound when game ends
- `move.mp3` - Sound for movement (optional)
- `background.mp3` - Background music (optional)

## Implementation Notes
The current Web Audio API implementation works across all modern browsers and doesn't require external files, making it perfect for a mobile-first web game.
