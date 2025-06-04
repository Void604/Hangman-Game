import React from 'react';

interface WordProps {
  word: string;
  guessedLetters: string[];
  reveal?: boolean;
}

const Word: React.FC<WordProps> = ({ word, guessedLetters, reveal = false }) => {
  return (
    <div className="flex justify-center gap-2 my-8">
      {word.split('').map((letter, index) => {
        const isGuessed = guessedLetters.includes(letter);
        const shouldReveal = isGuessed || reveal;
        
        return (
          <div
            key={index}
            className="w-10 h-12 border-b-4 border-primary-400 flex items-end justify-center pb-1"
          >
            <span
              className={`text-2xl font-bold ${
                shouldReveal
                  ? isGuessed
                    ? 'text-primary-300'
                    : 'text-red-500'
                  : 'invisible'
              }`}
            >
              {letter.toUpperCase()}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Word;