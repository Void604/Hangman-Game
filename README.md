# 🎮 Hangman Game

A modern, feature-rich implementation of the classic Hangman game built with React, TypeScript, and Tailwind CSS.

## 🔗Live Link:- https://hangmanhq.netlify.app/


## Features

- 🎮 Three difficulty levels (Easy, Medium, Hard)
- 🎯 Progressive scoring system based on difficulty
- 💡 Hint system with limited hints per game
- 🎨 Beautiful dark-themed UI with animations
- 📱 Mobile-responsive design with haptic feedback
- 🎉 Victory celebrations with confetti effects
- 📊 Comprehensive player statistics
- 🔐 User authentication system
- 💾 Persistent game progress and stats


## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Effects**: Canvas Confetti
- **State Management**: React Context API
- **Storage**: Local Storage for persistence


## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hangman-game.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser


## Game Rules

1. Choose a difficulty level:
   - Easy: Shorter words, 3 hints available
   - Medium: Moderate words, 2 hints available
   - Hard: Complex words, 1 hint available

2. Guess letters to reveal the hidden word
   - Each wrong guess adds to the hangman drawing
   - Game ends after 6 wrong guesses
   - Use hints wisely to get clues about the word

3. Scoring System:
   - Points based on word length
   - Bonus points for fewer wrong guesses
   - Difficulty multipliers: Easy (1x), Medium (2x), Hard (3x)


## Features in Detail

### User Authentication
- Email and password-based signup/login
- Persistent user sessions
- Secure password handling


### Game Statistics
- Games played and won
- Current and best winning streaks
- Average guesses per game
- Total points earned


### Animations and Feedback
- Shake effect on wrong guesses
- Haptic feedback on mobile devices
- Confetti celebration on wins
- Smooth transitions between game states


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Acknowledgments

- Word list curated for different difficulty levels
- Tailwind CSS for the beautiful dark theme
- Framer Motion for smooth animations
- Canvas Confetti for victory celebrations


 ## 👤 Author

* Aryan Kashyap
* aryankashyap7899@gmail.com
* [My Github Profile](https://github.com/Void604)
