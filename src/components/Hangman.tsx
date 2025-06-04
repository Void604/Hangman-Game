import React from 'react';

interface HangmanProps {
  wrongGuesses: number;
}

const Hangman: React.FC<HangmanProps> = ({ wrongGuesses }) => {
  return (
    <div className="w-64 h-64 mx-auto relative">
      {/* Base */}
      <div className="absolute bottom-0 left-0 w-48 h-2 bg-primary-500"></div>
      
      {/* Vertical pole */}
      {wrongGuesses > 0 && (
        <div className="absolute bottom-0 left-8 w-2 h-60 bg-primary-500"></div>
      )}
      
      {/* Horizontal beam */}
      {wrongGuesses > 1 && (
        <div className="absolute top-0 left-8 w-32 h-2 bg-primary-500"></div>
      )}
      
      {/* Rope */}
      {wrongGuesses > 2 && (
        <div className="absolute top-0 right-24 w-1 h-10 bg-primary-300"></div>
      )}
      
      {/* Head */}
      {wrongGuesses > 3 && (
        <div className="absolute top-10 right-20 w-10 h-10 rounded-full border-4 border-primary-400"></div>
      )}
      
      {/* Body */}
      {wrongGuesses > 4 && (
        <div className="absolute top-20 right-24 w-2 h-20 bg-primary-400"></div>
      )}
      
      {/* Arms */}
      {wrongGuesses > 5 && (
        <>
          <div className="absolute top-24 right-24 w-12 h-2 bg-primary-400 -rotate-45 origin-left"></div>
          <div className="absolute top-24 right-24 w-12 h-2 bg-primary-400 rotate-45 origin-right"></div>
        </>
      )}
      
      {/* Legs */}
      {wrongGuesses > 6 && (
        <>
          <div className="absolute top-40 right-24 w-12 h-2 bg-primary-400 -rotate-45 origin-left"></div>
          <div className="absolute top-40 right-24 w-12 h-2 bg-primary-400 rotate-45 origin-right"></div>
        </>
      )}
    </div>
  );
};

export default Hangman;