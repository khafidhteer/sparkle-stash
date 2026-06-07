export interface Zone1Level {
  level: number
  targetSyllables: string[]
  pool: string[]
}

export interface Zone2Word {
  word: string
  syllables: string[]
  hint: string
}

export interface Zone2Level {
  level: number
  words: Zone2Word[]
  pool: string[] // extra syllables for distractors
}

export interface Zone3Level {
  level: number
  targetSyllable: string
  pool: string[]
  speed: number // px/s or speed multiplier
}

export const zone1Levels: Zone1Level[] = [
  {
    level: 1,
    targetSyllables: ['A', 'I', 'U', 'E', 'O'],
    pool: ['A', 'I', 'U', 'E', 'O']
  },
  {
    level: 2,
    targetSyllables: ['BA', 'BI', 'BU', 'BE', 'BO'],
    pool: ['BA', 'BI', 'BU', 'BE', 'BO']
  },
  {
    level: 3,
    targetSyllables: ['CA', 'CI', 'CU', 'CE', 'CO'],
    pool: ['CA', 'CI', 'CU', 'CE', 'CO', 'BA', 'BI']
  },
  {
    level: 4,
    targetSyllables: ['DA', 'DI', 'DU', 'DE', 'DO'],
    pool: ['DA', 'DI', 'DU', 'DE', 'DO', 'CA', 'CU']
  },
  {
    level: 5,
    targetSyllables: ['MA', 'MI', 'MU', 'ME', 'MO'],
    pool: ['MA', 'MI', 'MU', 'ME', 'MO', 'BA', 'BO', 'DA', 'DI']
  }
]

export const zone2Levels: Zone2Level[] = [
  {
    level: 1,
    words: [
      { word: 'UBI', syllables: ['U', 'BI'], hint: '🥔' },
      { word: 'IBU', syllables: ['I', 'BU'], hint: '👩' },
      { word: 'ABI', syllables: ['A', 'BI'], hint: '👨' }
    ],
    pool: ['U', 'BI', 'I', 'BU', 'A', 'BO']
  },
  {
    level: 2,
    words: [
      { word: 'BOLA', syllables: ['BO', 'LA'], hint: '⚽' },
      { word: 'BUKU', syllables: ['BU', 'KU'], hint: '📖' },
      { word: 'BATA', syllables: ['BA', 'TA'], hint: '🧱' }
    ],
    pool: ['BO', 'LA', 'BU', 'KU', 'BA', 'TA', 'MI', 'CE']
  },
  {
    level: 3,
    words: [
      { word: 'CARI', syllables: ['CA', 'RI'], hint: '🔍' },
      { word: 'CUCI', syllables: ['CU', 'CI'], hint: '🧼' },
      { word: 'COBA', syllables: ['CO', 'BA'], hint: '🧪' }
    ],
    pool: ['CA', 'RI', 'CU', 'CI', 'CO', 'BA', 'DA', 'DE']
  },
  {
    level: 4,
    words: [
      { word: 'DADU', syllables: ['DA', 'DU'], hint: '🎲' },
      { word: 'DASI', syllables: ['DA', 'SI'], hint: '👔' },
      { word: 'DURI', syllables: ['DU', 'RI'], hint: '🌵' }
    ],
    pool: ['DA', 'DU', 'SI', 'RI', 'BA', 'LA', 'CO', 'KI']
  },
  {
    level: 5,
    words: [
      { word: 'MATA', syllables: ['MA', 'TA'], hint: '👁️' },
      { word: 'MADU', syllables: ['MA', 'DU'], hint: '🍯' },
      { word: 'MEJA', syllables: ['ME', 'JA'], hint: '🪑' }
    ],
    pool: ['MA', 'TA', 'DU', 'ME', 'JA', 'BI', 'LU', 'BO']
  }
]

export const zone3Levels: Zone3Level[] = [
  {
    level: 1,
    targetSyllable: 'BA',
    pool: ['BA', 'BI', 'BU', 'BE', 'BO'],
    speed: 1.2
  },
  {
    level: 2,
    targetSyllable: 'CA',
    pool: ['CA', 'CI', 'CU', 'CE', 'CO', 'BA', 'BI'],
    speed: 1.5
  },
  {
    level: 3,
    targetSyllable: 'DA',
    pool: ['DA', 'DI', 'DU', 'DE', 'DO', 'MA', 'MI'],
    speed: 1.8
  },
  {
    level: 4,
    targetSyllable: 'MA',
    pool: ['MA', 'MI', 'MU', 'ME', 'MO', 'DA', 'DU', 'LA'],
    speed: 2.1
  },
  {
    level: 5,
    targetSyllable: 'LA',
    pool: ['LA', 'LI', 'LU', 'LE', 'LO', 'MA', 'BA', 'CA', 'DA'],
    speed: 2.5
  }
]
