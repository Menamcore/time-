
import React, { useState } from 'react';

interface Quest {
  id: number;
  prompt: string;
  targetUnit: string;
  arabicHint: string;
  correctAnswer: string;
  prefix: string;
}

const QUESTS: Quest[] = [
  { id: 1, prefix: 'Add', prompt: '24 Hours', targetUnit: 'Day', arabicHint: 'يوم واحد', correctAnswer: '1' },
  { id: 2, prefix: 'Mix', prompt: '7 Days', targetUnit: 'Week', arabicHint: 'أسبوع واحد', correctAnswer: '1' },
  { id: 3, prefix: 'Pour', prompt: '14 Days', targetUnit: 'Weeks', arabicHint: 'أسبوعين', correctAnswer: '2' },
  { id: 4, prefix: 'Stir', prompt: '12 Months', targetUnit: 'Year', arabicHint: 'سنة واحدة', correctAnswer: '1' },
  { id: 5, prefix: 'Infuse', prompt: '1 Hour', targetUnit: 'Minutes', arabicHint: 'دقيقة', correctAnswer: '60' },
  { id: 6, prefix: 'Brew', prompt: '48 Hours', targetUnit: 'Days', arabicHint: 'يومين', correctAnswer: '2' },
];

const MathWizard: React.FC = () => {
  const [currentQuest, setCurrentQuest] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [shake, setShake] = useState(false);

  const handleCheck = () => {
    const quest = QUESTS[currentQuest];
    if (!quest) return;

    if (inputValue.trim() === quest.correctAnswer) {
      setIsCorrect(true);
      setShowHint(false);
      setTimeout(() => {
        if (currentQuest < QUESTS.length - 1) {
          setCurrentQuest(prev => prev + 1);
          setInputValue('');
          setIsCorrect(null);
        } else {
          setIsFinished(true);
        }
      }, 1200);
    } else {
      setIsCorrect(false);
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setIsCorrect(null);
      }, 500);
    }
  };

  const getRank = () => {
    if (currentQuest < 2) return "Apprentice";
    if (currentQuest < 4) return "Time Traveler";
    return "Master Alchemist";
  };

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto bg-gradient-to-b from-indigo-900 to-purple-900 rounded-[3rem] p-12 text-center text-white border-8 border-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.3)] animate-bounce-in">
        <div className="text-8xl mb-6">🏆</div>
        <h2 className="text-5xl font-black text-yellow-400 mb-4">GRAND ALCHEMIST!</h2>
        <p className="text-2xl text-blue-200 mb-8 font-bold">You have successfully brewed the Elixir of Time! لقد صنعت إكسير الوقت بنجاح!</p>
        <button 
          onClick={() => {
            setCurrentQuest(0);
            setIsFinished(false);
            setInputValue('');
          }}
          className="bg-yellow-500 hover:bg-yellow-400 text-indigo-900 px-12 py-5 rounded-full text-2xl font-black transition-all shadow-xl active:scale-95"
        >
          Brew Again 🔄
        </button>
      </div>
    );
  }

  const quest = QUESTS[currentQuest];

  // Safety fallback if quest is somehow undefined
  if (!quest) return null;

  return (
    <div className="max-w-2xl mx-auto bg-slate-900 rounded-[3rem] p-8 md:p-12 border-4 border-indigo-500 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full -ml-16 -mb-16 blur-3xl"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-black text-white mb-1">Time Alchemist 🧪</h2>
            <p className="text-indigo-400 font-bold uppercase tracking-widest text-sm">Rank: <span className="text-yellow-400">{getRank()}</span></p>
          </div>
          <div className="text-right">
            <div className="text-xs text-indigo-300 font-bold mb-1">QUEST PROGRESS</div>
            <div className="w-32 h-4 bg-slate-800 rounded-full border border-slate-700 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700"
                style={{ width: `${((currentQuest) / QUESTS.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Arabic Tutorial Section */}
        <div className="bg-indigo-950/40 p-5 rounded-2xl mb-8 border border-indigo-500/30 arabic text-right shadow-inner">
          <p className="text-indigo-200 font-bold text-lg mb-2">كيف تصبح خيميائي الوقت؟ 🧪</p>
          <ul className="text-indigo-300 text-sm space-y-1 font-medium list-none">
            <li>✨ قم بتحويل وحدات الوقت المطلوبة واكتب الرقم في المربع.</li>
            <li>🪄 اضغط على <span className="text-white font-bold">Cast Spell</span> للتأكد من إجابتك.</li>
            <li>📜 إذا احتجت للمساعدة، اضغط على <span className="text-white font-bold">Magic Hint</span> لرؤية الترجمة.</li>
          </ul>
        </div>

        <div className="flex flex-col items-center gap-8 py-4">
          <div className="relative group">
            <div className={`text-9xl transition-all duration-500 ${isCorrect ? 'scale-125' : 'scale-100'} ${shake ? 'animate-shake' : ''}`}>
              {isCorrect ? '✨' : '⚗️'}
            </div>
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full blur-2xl opacity-50 transition-colors duration-500 ${isCorrect ? 'bg-green-500' : 'bg-indigo-500 animate-pulse'}`}></div>
          </div>

          <div className="text-center">
            <p className="text-indigo-300 text-lg font-medium mb-2 italic">"{quest.prefix} the following ingredient..."</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="text-4xl font-black text-white">{quest.prompt}</span>
              <span className="text-2xl font-bold text-indigo-400">=</span>
              <div className="relative">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                  placeholder="?"
                  className={`w-24 bg-slate-800 border-4 rounded-2xl p-3 text-center text-3xl font-black outline-none transition-all ${
                    isCorrect === true ? 'border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 
                    isCorrect === false ? 'border-red-500 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 
                    'border-indigo-600 text-indigo-200 focus:border-indigo-400'
                  }`}
                />
              </div>
              <span className="text-4xl font-black text-white">{quest.targetUnit}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <button 
              onClick={() => setShowHint(true)}
              className="w-full sm:flex-1 bg-slate-800 hover:bg-slate-700 text-indigo-300 py-4 rounded-2xl font-bold border-2 border-slate-700 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              📜 Magic Hint
            </button>
            <button 
              onClick={handleCheck}
              className="w-full sm:flex-[2] bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-black text-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
            >
              Cast Spell! 🪄
            </button>
          </div>

          {showHint && (
            <div className="w-full bg-indigo-950/50 p-6 rounded-2xl border-2 border-indigo-500/30 animate-fade-in text-center">
              <p className="text-indigo-300 text-sm mb-2 uppercase tracking-widest font-bold">The Scroll Says:</p>
              <h3 className="text-4xl font-black text-white arabic">{quest.arabicHint}</h3>
            </div>
          )}

          {isCorrect === true && (
            <p className="text-green-400 font-bold animate-bounce">Correct! The potion glows green! 🧪✨</p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 2; }
      `}</style>
    </div>
  );
};

export default MathWizard;
