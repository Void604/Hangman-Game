export interface User {
  id: string;
  username: string;
  email: string;
  points: number;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameState {
  word: string;
  guessedLetters: string[];
  wrongGuesses: number;
  maxWrongGuesses: number;
  gameStatus: 'playing' | 'won' | 'lost';
  score: number;
  difficulty: Difficulty;
  hintsRemaining: number;
  revealedHints: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  bestStreak: number;
  averageGuesses: number;
  pointsEarned: number;
}

export interface WordCategory {
  easy: string[];
  medium: string[];
  hard: string[];
}