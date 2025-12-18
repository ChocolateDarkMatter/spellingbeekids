
export enum Difficulty {
  LEVEL_1 = 1, // Phonetic CVC
  LEVEL_2 = 2, // Blends
  LEVEL_3 = 3, // Silent Letters
  LEVEL_4 = 4, // Tricky Words
  LEVEL_5 = 5  // Classic Bee
}

export interface Word {
  id: string;
  word: string;
  phonemes: string[];
  difficulty: Difficulty;
  sentence: string;
}

export interface UserProgress {
  completedWords: string[];
  currentLevel: Difficulty;
  stars: number;
  streak: number;
}

export type GameState = 'LOBBY' | 'PLAYING' | 'FEEDBACK_CORRECT' | 'FEEDBACK_TRY_AGAIN' | 'PARENT_DASHBOARD';
