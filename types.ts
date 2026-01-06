
export interface TimeWord {
  english: string;
  arabic: string;
  transliteration: string;
  pluralEnglish: string;
  pluralArabic: string;
  fact: string;
  icon: string;
}

export type TabType = 'discovery' | 'matching' | 'sorter' | 'wizard' | 'jumble' | 'pilot';

export interface MatchingCard {
  id: string;
  content: string;
  type: 'english' | 'arabic';
  matchId: string;
}

export interface QuizQuestion {
  question: string;
  arabicQuestion: string;
  options: string[];
  correctAnswer: string;
}

export interface Scenario {
  id: number;
  text: string;
  arabicText: string;
  options: string[];
  correct: string;
  icon: string;
}
