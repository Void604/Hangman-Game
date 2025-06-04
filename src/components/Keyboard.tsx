import React from 'react';

interface KeyboardProps {
  guessedLetters: string[];
  onGuess: (letter: string) => void;
  disabled: boolean;
  word: string;
}

const Keyboard: React.FC<KeyboardProps> = ({
  guessedLetters,
  onGuess,
  disabled,
  word,
}) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  const getKeyClass = (letter: string) => {
    const normalizedLetter = letter.toLowerCase();
    const isGuessed = guessedLetters.includes(normalizedLetter);
    const isCorrect = word.includes(normalizedLetter);

    if (!isGuessed) {
      return 'bg-dark-100 hover:bg-primary-700 text-white';
    }
    
    return isCorrect
      ? 'bg-green-700 text-white cursor-default'
      : 'bg-red-700 text-white cursor-default';
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex justify-center gap-1 sm:gap-2 mb-2"
        >
          {row.map(letter => (
            <button
              key={letter}
              className={`w-8 h-10 sm:w-10 sm:h-12 rounded font-bold transition-colors ${getKeyClass(
                letter
              )}`}
              onClick={() => onGuess(letter.toLowerCase())}
              disabled={
                disabled || guessedLetters.includes(letter.toLowerCase())
              }
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;