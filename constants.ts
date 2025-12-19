
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

  // Level 3: Silent Letters
  ,{ id: '21', word: 'knee', phonemes: ['n', 'e', 'e'], difficulty: Difficulty.LEVEL_3, sentence: 'I scraped my knee on the sidewalk.' },
  { id: '22', word: 'gnome', phonemes: ['n', 'o', 'm'], difficulty: Difficulty.LEVEL_3, sentence: 'The garden gnome wears a red hat.' },
  { id: '23', word: 'write', phonemes: ['r', 'i', 't'], difficulty: Difficulty.LEVEL_3, sentence: 'Please write your name neatly.' },
  { id: '24', word: 'island', phonemes: ['i', 's', 'l', 'a', 'n', 'd'], difficulty: Difficulty.LEVEL_3, sentence: 'We sailed to a sunny island.' },
  { id: '25', word: 'castle', phonemes: ['c', 'a', 's', 'l'], difficulty: Difficulty.LEVEL_3, sentence: 'The castle has tall stone walls.' },
  { id: '26', word: 'lamb', phonemes: ['l', 'a', 'm'], difficulty: Difficulty.LEVEL_3, sentence: 'The lamb followed its mother.' },
  { id: '27', word: 'thumb', phonemes: ['th', 'u', 'm'], difficulty: Difficulty.LEVEL_3, sentence: 'I gave a thumbs up.' },
  { id: '28', word: 'climb', phonemes: ['c', 'l', 'i', 'm'], difficulty: Difficulty.LEVEL_3, sentence: 'We climb the hill slowly.' },
  { id: '29', word: 'knight', phonemes: ['n', 'i', 't'], difficulty: Difficulty.LEVEL_3, sentence: 'The knight rode a white horse.' },
  { id: '30', word: 'answer', phonemes: ['a', 'n', 's', 'e', 'r'], difficulty: Difficulty.LEVEL_3, sentence: 'Please answer the question.' },

  // Level 4: Tricky Words
  { id: '31', word: 'because', phonemes: ['b', 'e', 'c', 'au', 's'], difficulty: Difficulty.LEVEL_4, sentence: 'I smile because I am happy.' },
  { id: '32', word: 'friend', phonemes: ['f', 'r', 'i', 'e', 'n', 'd'], difficulty: Difficulty.LEVEL_4, sentence: 'My friend came over to play.' },
  { id: '33', word: 'enough', phonemes: ['e', 'n', 'u', 'f'], difficulty: Difficulty.LEVEL_4, sentence: 'I had enough snacks for everyone.' },
  { id: '34', word: 'laugh', phonemes: ['l', 'a', 'f'], difficulty: Difficulty.LEVEL_4, sentence: 'The joke made us laugh loudly.' },
  { id: '35', word: 'though', phonemes: ['th', 'o'], difficulty: Difficulty.LEVEL_4, sentence: 'I finished the puzzle though it was hard.' },
  { id: '36', word: 'their', phonemes: ['th', 'air'], difficulty: Difficulty.LEVEL_4, sentence: 'They lost their kite in the tree.' },
  { id: '37', word: 'eight', phonemes: ['a', 't'], difficulty: Difficulty.LEVEL_4, sentence: 'There are eight crayons in the box.' },
  { id: '38', word: 'people', phonemes: ['p', 'ee', 'p', 'l'], difficulty: Difficulty.LEVEL_4, sentence: 'Many people love ice cream.' },
  { id: '39', word: 'school', phonemes: ['s', 'k', 'oo', 'l'], difficulty: Difficulty.LEVEL_4, sentence: 'We walk to school together.' },
  { id: '40', word: 'water', phonemes: ['w', 'o', 't', 'e', 'r'], difficulty: Difficulty.LEVEL_4, sentence: 'Drink water to stay healthy.' },

  // Level 5: Classic Bee (harder vocabulary)
  { id: '41', word: 'courage', phonemes: ['c', 'o', 'r', 'ij'], difficulty: Difficulty.LEVEL_5, sentence: 'It takes courage to try new things.' },
  { id: '42', word: 'delicate', phonemes: ['d', 'e', 'l', 'i', 'k', 'it'], difficulty: Difficulty.LEVEL_5, sentence: 'Handle the delicate glass carefully.' },
  { id: '43', word: 'journey', phonemes: ['j', 'er', 'n', 'ee'], difficulty: Difficulty.LEVEL_5, sentence: 'We began our journey at sunrise.' },
  { id: '44', word: 'whisper', phonemes: ['w', 'i', 's', 'p', 'er'], difficulty: Difficulty.LEVEL_5, sentence: 'Please whisper in the library.' },
  { id: '45', word: 'marvelous', phonemes: ['m', 'ar', 'v', 'uh', 'l', 'us'], difficulty: Difficulty.LEVEL_5, sentence: 'The fireworks were marvelous.' },
  { id: '46', word: 'champion', phonemes: ['ch', 'a', 'm', 'p', 'ee', 'u', 'n'], difficulty: Difficulty.LEVEL_5, sentence: 'She is the champion of the contest.' },
  { id: '47', word: 'adventure', phonemes: ['a', 'd', 'v', 'e', 'n', 'ch', 'er'], difficulty: Difficulty.LEVEL_5, sentence: 'We love a good adventure story.' },
  { id: '48', word: 'rhythm', phonemes: ['r', 'i', 'th', 'u', 'm'], difficulty: Difficulty.LEVEL_5, sentence: 'The song has a catchy rhythm.' },
  { id: '49', word: 'knowledge', phonemes: ['n', 'o', 'l', 'ij'], difficulty: Difficulty.LEVEL_5, sentence: 'Reading gives us knowledge.' },
  { id: '50', word: 'caterpillar', phonemes: ['c', 'a', 't', 'er', 'p', 'i', 'l', 'er'], difficulty: Difficulty.LEVEL_5, sentence: 'The caterpillar turned into a butterfly.' }
];
