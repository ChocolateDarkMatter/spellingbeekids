
import { Word, Difficulty } from './types';

export const COLORS = {
  primary: '#60A5FA', // Blue 400
  secondary: '#FACC15', // Yellow 400
  accent: '#F472B6', // Pink 400
  success: '#4ADE80', // Green 400
  background: '#F8FAFC', // Slate 50
  text: '#1E293B' // Slate 800
};

export const INITIAL_WORDS: Word[] = [
  // Level 1: CVC
  { id: '1', word: 'cat', phonemes: ['c', 'a', 't'], difficulty: Difficulty.LEVEL_1, sentence: 'The cat sat on the mat.' },
  { id: '2', word: 'dog', phonemes: ['d', 'o', 'g'], difficulty: Difficulty.LEVEL_1, sentence: 'I have a friendly dog.' },
  { id: '3', word: 'sun', phonemes: ['s', 'u', 'n'], difficulty: Difficulty.LEVEL_1, sentence: 'The sun is very hot.' },
  { id: '4', word: 'pig', phonemes: ['p', 'i', 'g'], difficulty: Difficulty.LEVEL_1, sentence: 'The pig is playing in the mud.' },
  { id: '5', word: 'bat', phonemes: ['b', 'a', 't'], difficulty: Difficulty.LEVEL_1, sentence: 'He hit the ball with a bat.' },
  { id: '6', word: 'cup', phonemes: ['c', 'u', 'p'], difficulty: Difficulty.LEVEL_1, sentence: 'Please fill my cup with milk.' },
  { id: '7', word: 'jam', phonemes: ['j', 'a', 'm'], difficulty: Difficulty.LEVEL_1, sentence: 'I like strawberry jam on toast.' },
  { id: '8', word: 'red', phonemes: ['r', 'e', 'd'], difficulty: Difficulty.LEVEL_1, sentence: 'My favorite color is red.' },
  { id: '9', word: 'fox', phonemes: ['f', 'o', 'x'], difficulty: Difficulty.LEVEL_1, sentence: 'The red fox runs fast.' },
  { id: '10', word: 'map', phonemes: ['m', 'a', 'p'], difficulty: Difficulty.LEVEL_1, sentence: 'We use a map to find the way.' },
  
  // Level 2: Blends
  { id: '11', word: 'stop', phonemes: ['s', 't', 'o', 'p'], difficulty: Difficulty.LEVEL_2, sentence: 'Stop at the red light.' },
  { id: '12', word: 'frog', phonemes: ['f', 'r', 'o', 'g'], difficulty: Difficulty.LEVEL_2, sentence: 'A green frog jumped in the pond.' },
  { id: '13', word: 'flag', phonemes: ['f', 'l', 'a', 'g'], difficulty: Difficulty.LEVEL_2, sentence: 'The flag is waving in the wind.' },
  { id: '14', word: 'star', phonemes: ['s', 't', 'a', 'r'], difficulty: Difficulty.LEVEL_2, sentence: 'Look at the bright star in the sky.' },
  { id: '15', word: 'skip', phonemes: ['s', 'k', 'i', 'p'], difficulty: Difficulty.LEVEL_2, sentence: 'Can you skip down the sidewalk?' },
  { id: '16', word: 'blue', phonemes: ['b', 'l', 'u', 'e'], difficulty: Difficulty.LEVEL_2, sentence: 'The ocean is deep blue.' },
  { id: '17', word: 'plum', phonemes: ['p', 'l', 'u', 'm'], difficulty: Difficulty.LEVEL_2, sentence: 'I ate a sweet purple plum.' },
  { id: '18', word: 'glow', phonemes: ['g', 'l', 'o', 'w'], difficulty: Difficulty.LEVEL_2, sentence: 'Fireflies glow in the dark.' },
  { id: '19', word: 'tree', phonemes: ['t', 'r', 'e', 'e'], difficulty: Difficulty.LEVEL_2, sentence: 'The apple tree is very tall.' },
  { id: '20', word: 'nest', phonemes: ['n', 'e', 's', 't'], difficulty: Difficulty.LEVEL_2, sentence: 'The bird built a small nest.' }
];
