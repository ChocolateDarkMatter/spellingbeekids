
import React from 'react';

interface LetterBankProps {
  onLetterClick: (letter: string) => void;
  onBackspace: () => void;
  disabled?: boolean;
}

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

const LetterBank: React.FC<LetterBankProps> = ({ onLetterClick, onBackspace, disabled }) => {
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white/50 backdrop-blur-sm rounded-3xl shadow-xl border border-white/40">
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {ALPHABET.map((letter) => (
          <button
            key={letter}
            onClick={() => onLetterClick(letter)}
            disabled={disabled}
            className={`
              w-10 h-12 md:w-14 md:h-16
              flex items-center justify-center
              text-xl md:text-2xl font-bold uppercase
              bg-white rounded-xl border-b-4 border-slate-200
              hover:bg-blue-50 hover:border-blue-300 hover:translate-y-[-2px]
              active:translate-y-[2px] active:border-b-0
              transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed
              text-slate-700
            `}
          >
            {letter}
          </button>
        ))}
        <button
          onClick={onBackspace}
          disabled={disabled}
          className="w-14 h-12 md:w-20 md:h-16 flex items-center justify-center bg-pink-100 text-pink-600 rounded-xl border-b-4 border-pink-200 hover:bg-pink-200 active:translate-y-[2px] transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LetterBank;
