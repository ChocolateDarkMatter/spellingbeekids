
import React from 'react';

interface WordDisplayProps {
  word: string;
  currentInput: string[];
  isCorrect?: boolean;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ word, currentInput, isCorrect }) => {
  const letters = word.split('');
  
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8 mt-4">
      {letters.map((char, index) => {
        const inputChar = currentInput[index];
        const isFilled = !!inputChar;
        
        return (
          <div
            key={index}
            className={`
              w-12 h-16 md:w-16 md:h-20 
              flex items-center justify-center 
              text-3xl md:text-5xl font-bold rounded-xl 
              border-b-4 transition-all duration-300
              ${isCorrect ? 'bg-green-100 border-green-500 text-green-700' : 
                isFilled ? 'bg-white border-blue-400 text-blue-600 scale-105 shadow-md' : 
                'bg-slate-100 border-slate-300 text-transparent shadow-inner'}
            `}
          >
            {inputChar || '_'}
          </div>
        );
      })}
    </div>
  );
};

export default WordDisplay;
