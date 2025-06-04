import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import Hangman from '../components/Hangman';
import Word from '../components/Word';
import Keyboard from '../components/Keyboard';
import GameStats from '../components/GameStats';
import { RefreshCw, Lightbulb, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const GamePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { gameState, stats, startNewGame, guessLetter, useHint } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleDifficultyChange = (difficulty: 'easy' | 'medium' | 'hard') => {
    startNewGame(difficulty);
  };

  const handleUseHint = () => {
    const hint = useHint();
    if (hint) {
      // Show hint in a toast or modal
      alert(hint); // Replace with better UI feedback
    }
  };

  const isGameOver = gameState.gameStatus !== 'playing';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="game-container bg-dark-100 rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-primary-300">Hangman Game</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-300">Score: </span>
                <motion.span 
                  key={gameState.score}
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  className="text-xl font-bold text-primary-400"
                >
                  {gameState.score}
                </motion.span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb size={18} className="text-primary-400" />
                <span className="text-gray-300">Hints: {gameState.hintsRemaining}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => handleDifficultyChange('easy')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                gameState.difficulty === 'easy'
                  ? 'bg-green-600 text-white'
                  : 'bg-dark-200 text-gray-300 hover:bg-dark-300'
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => handleDifficultyChange('medium')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                gameState.difficulty === 'medium'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-dark-200 text-gray-300 hover:bg-dark-300'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => handleDifficultyChange('hard')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                gameState.difficulty === 'hard'
                  ? 'bg-red-600 text-white'
                  : 'bg-dark-200 text-gray-300 hover:bg-dark-300'
              }`}
            >
              Hard
            </button>
          </div>
          
          <Hangman wrongGuesses={gameState.wrongGuesses} />
          
          <Word 
            word={gameState.word} 
            guessedLetters={gameState.guessedLetters} 
            reveal={gameState.gameStatus === 'lost'} 
          />
          
          {gameState.hintsRemaining > 0 && !isGameOver && (
            <div className="text-center mb-4">
              <button
                onClick={handleUseHint}
                className="flex items-center justify-center gap-2 mx-auto px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium transition-colors"
              >
                <Brain size={18} />
                Use Hint ({gameState.hintsRemaining} left)
              </button>
            </div>
          )}

          {isGameOver && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6"
            >
              <p className={`text-xl font-bold mb-4 ${
                gameState.gameStatus === 'won' ? 'text-green-500' : 'text-red-500'
              }`}>
                {gameState.gameStatus === 'won' 
                  ? 'Congratulations! You won!' 
                  : 'Game Over! Better luck next time.'}
              </p>
              
              {gameState.gameStatus === 'lost' && (
                <p className="text-gray-300 mb-4">
                  The word was: <span className="font-bold text-primary-300">{gameState.word.toUpperCase()}</span>
                </p>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => startNewGame(gameState.difficulty)}
                className="flex items-center justify-center gap-2 mx-auto px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium transition-colors"
              >
                <RefreshCw size={18} />
                Play Again
              </motion.button>
            </motion.div>
          )}
          
          <Keyboard
            guessedLetters={gameState.guessedLetters}
            onGuess={guessLetter}
            disabled={isGameOver}
            word={gameState.word}
          />
        </div>
        
        <GameStats stats={stats} />
      </div>
    </motion.div>
  );
};

export default GamePage;