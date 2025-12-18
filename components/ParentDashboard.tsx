
import React, { useState } from 'react';
import { Difficulty, UserProgress } from '../types';

interface ParentDashboardProps {
  progress: UserProgress;
  onClose: () => void;
  onReset: () => void;
  onSetLevel: (lvl: Difficulty) => void;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({ progress, onClose, onReset, onSetLevel }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [answer, setAnswer] = useState('');
  const [challenge] = useState({ a: Math.floor(Math.random() * 10) + 1, b: Math.floor(Math.random() * 10) + 1 });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(answer) === challenge.a + challenge.b) {
      setIsUnlocked(true);
    } else {
      alert("Try again! Ask a grown-up for help.");
      setAnswer('');
    }
  };

  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Grown-ups Only</h2>
          <p className="text-slate-600 mb-6 text-center">Please solve this puzzle to enter the settings:</p>
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="text-4xl font-bold text-center text-blue-600 mb-4">
              {challenge.a} + {challenge.b} = ?
            </div>
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full text-center text-3xl p-4 border-2 border-slate-200 rounded-2xl focus:border-blue-400 outline-none"
              placeholder="?"
              autoFocus
            />
            <div className="flex gap-4">
              <button type="button" onClick={onClose} className="flex-1 p-4 bg-slate-100 rounded-2xl font-bold hover:bg-slate-200">Cancel</button>
              <button type="submit" className="flex-1 p-4 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-600">Enter</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-50 overflow-y-auto z-50">
      <div className="max-w-2xl mx-auto p-6 md:p-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Parent Dashboard</h1>
          <button onClick={onClose} className="p-3 bg-white shadow rounded-full hover:bg-slate-100">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <p className="text-slate-500 uppercase text-xs font-bold tracking-widest mb-1">Words Learned</p>
            <p className="text-4xl font-bold text-blue-600">{progress.completedWords.length}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <p className="text-slate-500 uppercase text-xs font-bold tracking-widest mb-1">Current Difficulty</p>
            <p className="text-4xl font-bold text-yellow-500">Level {progress.currentLevel}</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Set Learning Level</h2>
          <div className="flex flex-col gap-3">
            {[Difficulty.LEVEL_1, Difficulty.LEVEL_2].map((lvl) => (
              <button
                key={lvl}
                onClick={() => onSetLevel(lvl)}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${progress.currentLevel === lvl ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
              >
                <p className="font-bold">Level {lvl}</p>
                <p className="text-sm text-slate-500">{lvl === 1 ? 'CVC Words (cat, dog, sun)' : 'Blends (frog, flag, star)'}</p>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 text-red-600">Danger Zone</h2>
          <button
            onClick={() => {
              if (window.confirm("Reset all progress? This cannot be undone.")) {
                onReset();
                onClose();
              }
            }}
            className="w-full p-4 bg-red-50 text-red-600 border-2 border-red-100 rounded-2xl font-bold hover:bg-red-100"
          >
            Reset Progress
          </button>
        </section>

        <p className="mt-12 text-center text-slate-400 text-sm">
          Spelling Bee Kids v1.0.0 — Educational & Private
        </p>
      </div>
    </div>
  );
};

export default ParentDashboard;
