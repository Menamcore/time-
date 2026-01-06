
import React, { useState, useEffect } from 'react';
import { TIME_WORDS } from '../constants';
import { getGeminiTTS } from '../services/gemini';

const DiscoveryJourney: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState<'intro' | 'test'>('intro');
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasListened, setHasListened] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const currentWord = TIME_WORDS[index];

  useEffect(() => {
    // Generate random options for the test
    const others = TIME_WORDS.filter(w => w.arabic !== currentWord.arabic)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map(w => w.arabic);
    setOptions([currentWord.arabic, ...others].sort(() => 0.5 - Math.random()));
    setHasListened(false);
    setIsFlipped(false);
    setFeedback(null);
    setStep('intro');
  }, [index]);

  const handleListen = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Don't flip when clicking the speaker button
    await getGeminiTTS(currentWord.english);
    setHasListened(true);
  };

  const handleCheck = (choice: string) => {
    if (choice === currentWord.arabic) {
      setFeedback({ type: 'success', msg: 'Correct! ممتاز!' });
      setTimeout(() => {
        if (index < TIME_WORDS.length - 1) {
          setIndex(index + 1);
        } else {
          setFeedback({ type: 'success', msg: 'You mastered all words! لقد أتقنت كل الكلمات!' });
        }
      }, 1500);
    } else {
      setFeedback({ type: 'error', msg: 'Try again! حاول مرة أخرى' });
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl p-8 shadow-2xl border-b-8 border-blue-200">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-gray-400 uppercase tracking-widest">Discovery Journey</h2>
          <div className="flex gap-1">
            {TIME_WORDS.map((_, i) => (
              <div key={i} className={`h-3 w-8 rounded-full transition-all duration-500 ${i <= index ? 'bg-green-400 w-12' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>

        <div className="text-center py-6 min-h-[450px] flex flex-col justify-center">
          {step === 'intro' ? (
            <div className="animate-fade-in perspective-1000">
              <p className="text-sm font-bold text-blue-400 mb-4 uppercase tracking-tighter">Tap the card to see the translation!</p>
              
              {/* Flashcard Component */}
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className={`relative w-full h-80 transition-transform duration-700 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
              >
                {/* Front Side (English) */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-50 to-white border-4 border-blue-200 rounded-3xl flex flex-col items-center justify-center p-6 shadow-inner">
                  <div className="text-8xl mb-4 transform group-hover:scale-110 transition-transform">{currentWord.icon}</div>
                  <h1 className="text-6xl font-black text-blue-600 mb-2">{currentWord.english}</h1>
                  <p className="text-xl text-gray-400 italic">({currentWord.pluralEnglish})</p>
                  
                  <button 
                    onClick={handleListen}
                    className={`mt-6 flex items-center gap-3 px-6 py-3 rounded-full font-bold text-white transition-all shadow-lg active:scale-95 ${hasListened ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700'}`}
                  >
                    <span>{hasListened ? '🔊 Heard It!' : '🔈 Hear English'}</span>
                  </button>
                </div>

                {/* Back Side (Arabic) */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-green-50 to-white border-4 border-green-200 rounded-3xl flex flex-col items-center justify-center p-6 shadow-inner">
                  <div className="text-5xl mb-4 text-green-300">Translation</div>
                  <h1 className="text-7xl font-black text-green-600 mb-2 arabic">{currentWord.arabic}</h1>
                  <p className="text-2xl text-gray-400 font-medium">[{currentWord.transliteration}]</p>
                  <div className="mt-6 bg-green-100/50 p-4 rounded-2xl border border-green-200 italic text-green-800 text-sm">
                    💡 {currentWord.fact}
                  </div>
                </div>
              </div>

              {hasListened && isFlipped && (
                <button 
                  onClick={() => setStep('test')}
                  className="mt-12 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-xl shadow-xl transition-all animate-bounce"
                >
                  I'm Ready for the Quiz! 🎯
                </button>
              )}
            </div>
          ) : (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-700 mb-8">What does "<span className="text-blue-600">{currentWord.english}</span>" mean?</h2>
              <div className="grid grid-cols-1 gap-4">
                {options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleCheck(opt)}
                    className="p-6 text-4xl font-bold bg-gray-50 border-4 border-gray-100 rounded-3xl hover:border-blue-400 hover:bg-blue-50 transition-all arabic active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {feedback && (
          <div className={`mt-6 p-6 rounded-2xl text-center font-black text-2xl animate-bounce-in shadow-lg ${feedback.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {feedback.msg}
          </div>
        )}
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default DiscoveryJourney;
