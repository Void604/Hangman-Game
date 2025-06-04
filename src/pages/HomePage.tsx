import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Play, UserPlus, LogIn } from 'lucide-react';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary-300">
          Welcome to Hangman
        </h1>
        
        <p className="text-xl text-gray-300 mb-8">
          Test your vocabulary and have fun with this classic word-guessing game. 
          Sign up to track your progress and compete with others!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isAuthenticated ? (
            <Link 
              to="/game" 
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-lg font-medium transition-colors"
            >
              <Play size={20} />
              Play Now
            </Link>
          ) : (
            <>
              <Link 
                to="/signup" 
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-lg font-medium transition-colors"
              >
                <UserPlus size={20} />
                Sign Up
              </Link>
              
              <Link 
                to="/login" 
                className="flex items-center justify-center gap-2 px-6 py-3 bg-dark-100 hover:bg-dark-200 text-white rounded-md text-lg font-medium transition-colors"
              >
                <LogIn size={20} />
                Login
              </Link>
            </>
          )}
        </div>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <div className="bg-dark-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-3 text-primary-400">How to Play</h2>
          <p className="text-gray-300">
            Guess the hidden word one letter at a time. Each wrong guess brings you closer to completing the hangman. Can you guess the word before it's too late?
          </p>
        </div>
        
        <div className="bg-dark-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-3 text-primary-400">Track Progress</h2>
          <p className="text-gray-300">
            Create an account to save your game statistics, track your winning streaks, and see how you improve over time.
          </p>
        </div>
        
        <div className="bg-dark-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-3 text-primary-400">Challenge Yourself</h2>
          <p className="text-gray-300">
            With hundreds of words across various categories, each game presents a new challenge to test your vocabulary and deduction skills.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;