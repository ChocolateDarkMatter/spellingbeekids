
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Word, UserProgress, GameState, Difficulty } from './types';
import { INITIAL_WORDS } from './constants';
import { audioService } from './services/audioService';
import WordDisplay from './components/WordDisplay';
import LetterBank from './components/LetterBank';
import ParentDashboard from './components/ParentDashboard';

const App: React.FC = () => {
  // --- State ---
  const [gameState, setGameState] = useState<GameState>('LOBBY');
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('sbk_progress');
    return saved ? JSON.parse(saved) : {
      completedWords: [],
      currentLevel: Difficulty.LEVEL_1,
      stars: 0,
      streak: 0
    };
  });
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState<string[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoPlayScheduled, setAutoPlayScheduled] = useState(false);

  // --- Derived State ---
  const availableWords = useMemo(() => {
    return INITIAL_WORDS.filter(w => w.difficulty === progress.currentLevel);
  }, [progress.currentLevel]);

  const currentWord = useMemo(() => {
    const index = currentWordIndex % availableWords.length;
    return availableWords[index];
  }, [availableWords, currentWordIndex]);

  const nextWord = useMemo(() => {
    const index = (currentWordIndex + 1) % availableWords.length;
    return availableWords[index];
  }, [availableWords, currentWordIndex]);

  // --- Persistence ---
  useEffect(() => {
    localStorage.setItem('sbk_progress', JSON.stringify(progress));
  }, [progress]);

  // --- Prefetching Logic ---
  useEffect(() => {
    // Aggressively prefetch current and next words
    if (currentWord) {
      audioService.prefetch(currentWord.word, 'Kore');
      audioService.prefetch(currentWord.sentence, 'Puck');
    }
    if (nextWord) {
      audioService.prefetch(nextWord.word, 'Kore');
      audioService.prefetch(nextWord.sentence, 'Puck');
    }
    // Prefetch a few more ahead just in case
    const thirdWordIndex = (currentWordIndex + 2) % availableWords.length;
    const thirdWord = availableWords[thirdWordIndex];
    if (thirdWord) {
      audioService.prefetch(thirdWord.word, 'Kore');
    }
  }, [currentWord, nextWord, availableWords, currentWordIndex]);

  // --- Audio Execution ---
  const playCurrentWordAudio = useCallback(async (withSentence: boolean = false) => {
    if (isSpeaking || !currentWord) return;
    setIsSpeaking(true);
    try {
      await audioService.speak(currentWord.word, 'Kore');
      if (withSentence) {
        await new Promise(r => setTimeout(r, 400));
        await audioService.speak(currentWord.sentence, 'Puck');
      }
    } finally {
      setIsSpeaking(false);
    }
  }, [currentWord, isSpeaking]);

  // --- Auto-play Synchronizer ---
  useEffect(() => {
    if (gameState === 'PLAYING' && autoPlayScheduled) {
      playCurrentWordAudio(true);
      setAutoPlayScheduled(false);
    }
  }, [gameState, currentWordIndex, autoPlayScheduled, playCurrentWordAudio]);

  // --- Handlers ---
  const handleStartGame = () => {
    setGameState('PLAYING');
    setCurrentInput([]);
    setAutoPlayScheduled(true);
  };

  const handleLetterClick = useCallback((letter: string) => {
    if (gameState !== 'PLAYING' || isSpeaking || currentInput.length >= currentWord.word.length) return;
    
    const newInput = [...currentInput, letter];
    setCurrentInput(newInput);

    if (newInput.length === currentWord.word.length) {
      if (newInput.join('').toLowerCase() === currentWord.word.toLowerCase()) {
        handleSuccess();
      } else {
        handleMistake();
      }
    }
  }, [currentInput, currentWord, gameState, isSpeaking]);

  const handleBackspace = useCallback(() => {
    if (gameState !== 'PLAYING') return;
    setCurrentInput(prev => prev.slice(0, -1));
  }, [gameState]);

  const handleSuccess = async () => {
    setGameState('FEEDBACK_CORRECT');
    
    setProgress(prev => ({
      ...prev,
      completedWords: Array.from(new Set([...prev.completedWords, currentWord.word])),
      stars: prev.stars + 1,
      streak: prev.streak + 1
    }));

    await audioService.speak("Great job! That's correct!", 'Zephyr');

    setTimeout(() => {
      setCurrentWordIndex(prev => prev + 1);
      setCurrentInput([]);
      setGameState('PLAYING');
      setAutoPlayScheduled(true);
    }, 1500);
  };

  const handleMistake = async () => {
    setGameState('FEEDBACK_TRY_AGAIN');
    await audioService.speak("Good try! Let's listen again.", 'Kore');
    
    setTimeout(() => {
      setGameState('PLAYING');
      setCurrentInput([]);
      // Just play the word again on mistake, not the full sentence
      playCurrentWordAudio(false);
    }, 1200);
  };

  const resetProgress = () => {
    audioService.clearCache();
    const fresh = {
      completedWords: [],
      currentLevel: Difficulty.LEVEL_1,
      stars: 0,
      streak: 0
    };
    setProgress(fresh);
    setCurrentWordIndex(0);
    setGameState('LOBBY');
  };

  const setLevel = (lvl: Difficulty) => {
    audioService.clearCache();
    setProgress(prev => ({ ...prev, currentLevel: lvl }));
    setCurrentWordIndex(0);
    setCurrentInput([]);
    setGameState('LOBBY');
  };

  return (
    <div className="min-h-screen flex flex-col items-center select-none overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg float-animation">
            <span className="text-2xl">🐝</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-blue-600 tracking-tight font-kids">
            SPELLING BEE <span className="text-yellow-500">KIDS</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
            <span className="text-yellow-500">⭐</span>
            <span className="font-bold text-slate-700">{progress.stars}</span>
          </div>
          <button 
            onClick={() => setGameState('PARENT_DASHBOARD')}
            className="p-3 bg-white hover:bg-slate-100 rounded-full shadow-sm transition-all border border-slate-100"
            title="Parents"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 12H13.5" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl px-4 flex flex-col items-center justify-center relative">
        {gameState === 'LOBBY' && (
          <div className="text-center animate-in fade-in zoom-in duration-500">
            <div className="text-8xl mb-8 float-animation">🎒</div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 font-kids">Ready to Spell?</h2>
            <p className="text-xl text-slate-500 mb-10 max-w-sm mx-auto">Learn new words and earn stars with our friendly bee! 🐝</p>
            <button 
              onClick={handleStartGame}
              className="bg-blue-500 hover:bg-blue-600 text-white text-2xl font-bold px-12 py-6 rounded-3xl shadow-[0_8px_0_0_#2563eb] active:translate-y-[4px] active:shadow-[0_4px_0_0_#2563eb] transition-all"
            >
              LET'S GO!
            </button>
          </div>
        )}

        {(gameState === 'PLAYING' || gameState === 'FEEDBACK_CORRECT' || gameState === 'FEEDBACK_TRY_AGAIN') && (
          <div className="w-full flex flex-col items-center">
            {/* Audio Controls */}
            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => playCurrentWordAudio(false)}
                disabled={isSpeaking}
                className={`
                  w-20 h-20 md:w-24 md:h-24 bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center gap-1 border-2 border-transparent hover:border-blue-400 transition-all active:scale-95
                  ${isSpeaking ? 'opacity-50 grayscale' : 'animate-bounce'}
                `}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-blue-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
                <span className="text-xs font-bold text-slate-400">WORD</span>
              </button>

              <button 
                onClick={() => playCurrentWordAudio(true)}
                disabled={isSpeaking}
                className={`
                  w-20 h-20 md:w-24 md:h-24 bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center gap-1 border-2 border-transparent hover:border-pink-400 transition-all active:scale-95
                  ${isSpeaking ? 'opacity-50 grayscale' : ''}
                `}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-pink-500">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                <span className="text-xs font-bold text-slate-400">SENTENCE</span>
              </button>
            </div>

            {/* Word Display Area */}
            <div className="relative w-full max-w-lg mb-12">
               {gameState === 'FEEDBACK_CORRECT' && (
                 <div className="absolute -top-16 left-0 right-0 flex justify-center animate-bounce">
                    <span className="text-6xl">🌟</span>
                 </div>
               )}
               <WordDisplay 
                word={currentWord.word} 
                currentInput={currentInput} 
                isCorrect={gameState === 'FEEDBACK_CORRECT'}
               />
               
               {gameState === 'FEEDBACK_TRY_AGAIN' && (
                 <p className="text-center text-pink-500 font-bold animate-pulse">Let's try one more time!</p>
               )}
            </div>

            {/* Input Bank */}
            <div className={`w-full transition-opacity duration-300 ${gameState !== 'PLAYING' ? 'opacity-30' : 'opacity-100'}`}>
              <LetterBank 
                onLetterClick={handleLetterClick} 
                onBackspace={handleBackspace} 
                disabled={gameState !== 'PLAYING'}
              />
            </div>
          </div>
        )}
      </main>

      {/* Progress Footer */}
      {gameState !== 'LOBBY' && gameState !== 'PARENT_DASHBOARD' && (
        <footer className="w-full p-6 flex justify-center">
          <div className="bg-white/50 backdrop-blur px-6 py-3 rounded-full flex items-center gap-4 shadow-sm border border-white/50">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Progress</span>
            <div className="flex gap-2">
              {availableWords.map((w, i) => (
                <div 
                  key={i} 
                  className={`w-3 h-3 rounded-full transition-colors ${progress.completedWords.includes(w.word) ? 'bg-green-400' : i === (currentWordIndex % availableWords.length) ? 'bg-blue-400 animate-pulse' : 'bg-slate-200'}`}
                />
              ))}
            </div>
          </div>
        </footer>
      )}

      {/* Overlays */}
      {gameState === 'PARENT_DASHBOARD' && (
        <ParentDashboard 
          progress={progress} 
          onClose={() => setGameState('LOBBY')}
          onReset={resetProgress}
          onSetLevel={setLevel}
        />
      )}

      {/* Decorative Elements */}
      <div className="fixed -bottom-20 -left-20 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
      <div className="fixed -top-20 -right-20 w-64 h-64 bg-yellow-100/50 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

export default App;
