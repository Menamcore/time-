
import React, { useState, useEffect } from 'react';
import { TIME_WORDS } from '../constants';

const StarJumble: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [jumbled, setJumbled] = useState<string[]>([]);
  const [guess, setGuess] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);

  const currentWord = TIME_WORDS[index];

  const initJumble = () => {
    const letters = currentWord.english.toUpperCase().split('');
    // Shuffle letters
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
    // Ensure it's actually jumbled
    if (shuffled.join('') === letters.join('')) {
      shuffled.push(shuffled.shift()!);
    }
    setJumbled(shuffled);
    setGuess([]);
    setIsCorrect(null);
  };

  useEffect(() => {
    initJumble();
  }, [index]);

  const addLetter = (letter: string, idx: number) => {
    setGuess([...guess, letter]);
    const newJumbled = [...jumbled];
    newJumbled.splice(idx, 1);
    setJumbled(newJumbled);
  };

  const removeLetter = (letter: string, idx: number) => {
    const newGuess = [...guess];
    newGuess.splice(idx, 1);
    setGuess(newGuess);
    setJumbled([...jumbled, letter]);
  };

  const checkResult = () => {
    const finalGuess = guess.join('').toUpperCase();
    const target = currentWord.english.toUpperCase();
    if (finalGuess === target) {
      setIsCorrect(true);
      if (!completed.includes(target)) {
        setCompleted([...completed, target]);
      }
      setTimeout(() => {
        if (index < TIME_WORDS.length - 1) {
          setIndex(index + 1);
        } else {
          setIsCorrect(null); // Just stay on win state
        }
      }, 1500);
    } else {
      setIsCorrect(false);
      setTimeout(() => {
        setJumbled([...jumbled, ...guess].sort(() => Math.random() - 0.5));
        setGuess([]);
        setIsCorrect(null);
      }, 800);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-indigo-950 rounded-[3rem] p-8 md:p-12 border-4 border-indigo-400 shadow-[0_0_50px_rgba(79,70,229,0.3)] relative overflow-hidden">
      {/* Stars Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-white rounded-full animate-star"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 2 + 's'
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2">Star Jumble! ✨</h2>
          
          {/* Arabic Tutorial */}
          <div className="bg-indigo-900/60 p-4 rounded-2xl mb-6 arabic text-right border border-indigo-500/30">
            <p className="text-indigo-200 font-bold mb-1">كيف ترتب النجوم؟ ⭐</p>
            <p className="text-indigo-300 text-sm">اضغط على الحروف المبعثرة لترتيب الكلمة الإنجليزية الصحيحة. استكمل كل الكلمات لتضيء المجرة!</p>
          </div>
          
          <div className="flex justify-center gap-2 mb-4">
            {TIME_WORDS.map((w, i) => (
              <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${completed.includes(w.english.toUpperCase()) ? 'bg-yellow-400 text-indigo-900 shadow-[0_0_15px_rgba(250,204,21,0.5)]' : 'bg-indigo-800 text-indigo-400'}`}>
                {w.icon}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-12">
          {/* Target Arabic/Icon */}
          <div className="text-center animate-bounce-in">
            <span className="text-7xl block mb-4">{currentWord.icon}</span>
            <span className="text-5xl font-black text-white arabic">{currentWord.arabic}</span>
          </div>

          {/* Slots for Guessed Letters */}
          <div className="flex flex-wrap justify-center gap-3 min-h-[80px]">
            {currentWord.english.split('').map((_, i) => (
              <div 
                key={i} 
                onClick={() => guess[i] && removeLetter(guess[i], i)}
                className={`w-14 h-14 md:w-16 md:h-16 border-b-4 flex items-center justify-center text-3xl font-black transition-all cursor-pointer rounded-xl
                  ${isCorrect === true ? 'bg-green-500 border-green-300 text-white' : 
                    isCorrect === false ? 'bg-red-500 border-red-300 text-white' :
                    guess[i] ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-indigo-900/40 border-indigo-700 text-transparent'}
                `}
              >
                {guess[i] || ''}
              </div>
            ))}
          </div>

          {/* Source Letters (Jumbled) */}
          <div className="flex flex-wrap justify-center gap-4">
            {jumbled.map((letter, i) => (
              <button
                key={i + letter}
                onClick={() => addLetter(letter, i)}
                className="w-14 h-14 md:w-16 md:h-16 bg-white hover:bg-yellow-400 text-indigo-900 rounded-2xl text-3xl font-black shadow-lg transition-all active:scale-90 hover:-translate-y-1"
              >
                {letter}
              </button>
            ))}
          </div>

          {jumbled.length === 0 && isCorrect === null && (
            <button 
              onClick={checkResult}
              className="px-12 py-4 bg-yellow-500 hover:bg-yellow-400 text-indigo-900 font-black text-2xl rounded-full shadow-2xl transition-all animate-pulse"
            >
              Verify! ✅
            </button>
          )}

          {isCorrect === true && completed.length === TIME_WORDS.length && (
            <div className="text-center text-yellow-400 font-black text-3xl animate-bounce">
              GALAXY MASTER! 🏆✨
              <p className="text-sm mt-2 text-indigo-300 arabic">لقد أتقنت جميع الكلمات!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StarJumble;
