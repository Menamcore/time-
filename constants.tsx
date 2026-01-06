
import { TimeWord, QuizQuestion, Scenario } from './types';

export const TIME_WORDS: TimeWord[] = [
  {
    english: 'Hour',
    arabic: 'ساعة',
    transliteration: "Sa'ah",
    pluralEnglish: 'Hours',
    pluralArabic: 'ساعات',
    fact: '60 Minutes = 1 Hour',
    icon: '⏰'
  },
  {
    english: 'Day',
    arabic: 'يوم',
    transliteration: 'Yawm',
    pluralEnglish: 'Days',
    pluralArabic: 'أيام',
    fact: '24 Hours = 1 Day',
    icon: '☀️'
  },
  {
    english: 'Week',
    arabic: 'أسبوع',
    transliteration: "Usbu'",
    pluralEnglish: 'Weeks',
    pluralArabic: 'أسابيع',
    fact: '7 Days = 1 Week',
    icon: '📅'
  },
  {
    english: 'Month',
    arabic: 'شهر',
    transliteration: 'Shahr',
    pluralEnglish: 'Months',
    pluralArabic: 'شهور',
    fact: '4 Weeks ≈ 1 Month',
    icon: '🌙'
  },
  {
    english: 'Year',
    arabic: 'سنة',
    transliteration: 'Sanah',
    pluralEnglish: 'Years',
    pluralArabic: 'سنوات',
    fact: '12 Months = 1 Year',
    icon: '🌎'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "How many hours are in a day?",
    arabicQuestion: "كم ساعة في اليوم؟",
    options: ["12", "24", "7", "60"],
    correctAnswer: "24"
  },
  {
    question: "What is 'Month' in Arabic?",
    arabicQuestion: "ما معنى كلمة 'شهر' بالإنجليزية؟",
    options: ["Day", "Week", "Month", "Year"],
    correctAnswer: "Month"
  },
  {
    question: "How many days are in a week?",
    arabicQuestion: "كم يوماً في الأسبوع؟",
    options: ["5", "7", "10", "12"],
    correctAnswer: "7"
  },
  {
    question: "How many months are in a year?",
    arabicQuestion: "كم شهراً في السنة؟",
    options: ["4", "12", "24", "52"],
    correctAnswer: "12"
  },
  {
    question: "Which unit is larger?",
    arabicQuestion: "أي وحدة هي الأكبر؟",
    options: ["Hour", "Day", "Week", "Month"],
    correctAnswer: "Month"
  }
];

export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    text: "A school day usually lasts for 7...",
    arabicText: "يستمر اليوم الدراسي عادة لمدة 7...",
    options: ["Hours", "Days", "Weeks"],
    correct: "Hours",
    icon: "🏫"
  },
  {
    id: 2,
    text: "Summer vacation is about 3...",
    arabicText: "إجازة الصيف مدتها حوالي 3...",
    options: ["Days", "Months", "Years"],
    correct: "Months",
    icon: "🏖️"
  },
  {
    id: 3,
    text: "We celebrate our birthday once every...",
    arabicText: "نحتفل بعيد ميلادنا مرة واحدة كل...",
    options: ["Month", "Week", "Year"],
    correct: "Year",
    icon: "🎂"
  },
  {
    id: 4,
    text: "You can finish a small drawing in one...",
    arabicText: "يمكنك إنهاء رسمة صغيرة في...",
    options: ["Hour", "Year", "Month"],
    correct: "Hour",
    icon: "🎨"
  },
  {
    id: 5,
    text: "The distance from Earth to the Moon takes 3...",
    arabicText: "المسافة من الأرض إلى القمر تستغرق 3...",
    options: ["Hours", "Days", "Years"],
    correct: "Days",
    icon: "🚀"
  }
];
