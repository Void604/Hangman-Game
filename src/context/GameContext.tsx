import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameState, GameStats, Difficulty } from '../types';
import { getRandomWord, getWordHint } from '../data/words';
import { useAuth } from './AuthContext';
import confetti from 'canvas-confetti';

interface GameContextType {
  gameState: GameState;
  stats: GameStats;
  startNewGame: (difficulty?: Difficulty) => void;
  guessLetter: (letter: string) => void;
  useHint: () => string | null;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const INITIAL_GAME_STATE: GameState = {
  word: '',
  guessedLetters: [],
  wrongGuesses: 0,
  maxWrongGuesses: 6,
  gameStatus: 'playing',
  score: 0,
  difficulty: 'medium',
  hintsRemaining: 3,
  revealedHints: [],
};

const INITIAL_STATS: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  bestStreak: 0,
  averageGuesses: 0,
  pointsEarned: 0,
};

const DIFFICULTY_MULTIPLIERS = {
  easy: 1,
  medium: 2,
  hard: 3,
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [gameState, setGameState] = useState<GameState>({ 
    ...INITIAL_GAME_STATE, 
    word: getRandomWord('medium') 
  });
  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);

  useEffect(() => {
    if (user) {
      const savedStats = localStorage.getItem(`hangman_stats_${user.id}`);
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      } else {
        setStats(INITIAL_STATS);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`hangman_stats_${user.id}`, JSON.stringify(stats));
    }
  }, [stats, user]);

  const startNewGame = (difficulty: Difficulty = 'medium') => {
    setGameState({
      ...INITIAL_GAME_STATE,
      word: getRandomWord(difficulty),
      difficulty,
      hintsRemaining: difficulty === 'easy' ? 3 : difficulty === 'medium' ? 2 : 1,
    });
  };

  const useHint = () => {
    if (gameState.hintsRemaining <= 0 || gameState.gameStatus !== 'playing') {
      return null;
    }

    const hint = getWordHint(gameState.word);
    setGameState(prev => ({
      ...prev,
      hintsRemaining: prev.hintsRemaining - 1,
      revealedHints: [...prev.revealedHints, hint],
    }));

    return hint;
  };

  const triggerWrongGuessAnimation = () => {
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
      gameContainer.classList.add('shake');
      setTimeout(() => {
        gameContainer.classList.remove('shake');
      }, 500);
    }

    if ('vibrate' in navigator) {
      navigator.vibrate(200);
    }
  };

  const triggerWinAnimation = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const guessLetter = (letter: string) => {
    if (
      gameState.gameStatus !== 'playing' ||
      gameState.guessedLetters.includes(letter)
    ) {
      return;
    }

    const newGuessedLetters = [...gameState.guessedLetters, letter];
    const isWrongGuess = !gameState.word.includes(letter);
    const newWrongGuesses = isWrongGuess
      ? gameState.wrongGuesses + 1
      : gameState.wrongGuesses;

    if (isWrongGuess) {
      triggerWrongGuessAnimation();
    }

    const isWon = gameState.word
      .split('')
      .every(char => newGuessedLetters.includes(char));

    const isLost = newWrongGuesses >= gameState.maxWrongGuesses;

    let newScore = gameState.score;
    if (isWon) {
      const difficultyMultiplier = DIFFICULTY_MULTIPLIERS[gameState.difficulty];
      newScore = (gameState.word.length * 10 + 
        (gameState.maxWrongGuesses - newWrongGuesses) * 5) * 
        difficultyMultiplier;
      
      triggerWinAnimation();
    }

    const newGameState: GameState = {
      ...gameState,
      guessedLetters: newGuessedLetters,
      wrongGuesses: newWrongGuesses,
      gameStatus: isWon ? 'won' : isLost ? 'lost' : 'playing',
      score: newScore,
    };

    setGameState(newGameState);

    if (isWon || isLost) {
      const totalGuesses = newGuessedLetters.length;
      const newStats = {
        gamesPlayed: stats.gamesPlayed + 1,
        gamesWon: isWon ? stats.gamesWon + 1 : stats.gamesWon,
        currentStreak: isWon ? stats.currentStreak + 1 : 0,
        bestStreak: isWon
          ? Math.max(stats.bestStreak, stats.currentStreak + 1)
          : stats.bestStreak,
        averageGuesses:
          (stats.averageGuesses * stats.gamesPlayed + totalGuesses) /
          (stats.gamesPlayed + 1),
        pointsEarned: stats.pointsEarned + (isWon ? newScore : 0),
      };
      setStats(newStats);
    }
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        stats,
        startNewGame,
        guessLetter,
        useHint,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};