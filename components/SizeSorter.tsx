
import React, { useState } from 'react';
import { TIME_WORDS } from '../constants';

const SizeSorter: React.FC = () => {
  const [items, setItems] = useState(() => [...TIME_WORDS].sort(() => 0.5 - Math.random()));
  const [status, setStatus] = useState<'idle' | 'wrong' | 'win'>('idle');

  const move = (idx: number, dir: -1 | 1) => {
    const newItems = [...items];
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    [newItems[idx], newItems[targetIdx]] = [newItems[targetIdx], newItems[idx]];
    setItems(newItems);
    setStatus('idle');
  };

  const check = () => {
    const isCorrect = items.every((item, i) => item.english === TIME_WORDS[i].english);
    setStatus(isCorrect ? 'win' : 'wrong');
  };

  return (
    <div className="max-w-xl mx-auto bg-orange-50 rounded-3xl p-8 border-4 border-orange-100 shadow-xl">
      <h2 className="text-3xl font-bold text-orange-600 text-center mb-2">Time Ladder 🪜</h2>
      
      {/* Arabic Instructions */}
      <div className="bg-white/80 p-6 rounded-2xl mb-8 border-2 border-orange-200 arabic shadow-inner">
        <p className="text-orange-900 font-bold text-xl mb-3 text-right">كيف تلعب؟ 🤔</p>
        <ul className="text-right space-y-2 text-orange-800 font-medium">
          <li>١. رتب الكلمات من الأصغر (بالأعلى) إلى الأكبر (بالأسفل).</li>
          <li>٢. استخدم الأسهم <span className="bg-orange-100 px-2 py-0.5 rounded">▲</span> و <span className="bg-orange-100 px-2 py-0.5 rounded">▼</span> لتحريك الكلمة.</li>
          <li>٣. بعد الترتيب، اضغط على زر "Check My English" للتأكد.</li>
        </ul>
      </div>

      <p className="text-center text-orange-700 mb-6 font-medium italic">Order these from smallest to largest:</p>
      
      <div className="flex flex-col gap-3">
        {items.map((word, idx) => (
          <div key={word.english} className={`bg-white p-5 rounded-2xl shadow-sm border-2 transition-all duration-500 flex items-center justify-between group animate-fade-in ${status === 'win' ? 'border-green-400 bg-green-50' : 'border-orange-200'}`}>
            <div className="flex items-center gap-5">
              <span className="text-4xl">{word.icon}</span>
              <div className="flex flex-col">
                <span className={`text-2xl font-black transition-colors ${status === 'win' ? 'text-green-700' : 'text-gray-800'}`}>
                  {word.english}
                </span>
                {status === 'win' && (
                  <span className="text-xl font-bold text-green-600 arabic animate-fade-in">
                    {word.arabic}
                  </span>
                )}
              </div>
            </div>
            
            {status !== 'win' && (
              <div className="flex flex-col gap-1">
                <button 
                  onClick={() => move(idx, -1)} 
                  className="p-3 hover:bg-orange-100 rounded-xl bg-orange-50 text-orange-600 font-bold transition-all active:scale-90 hover:shadow-md"
                  aria-label="Move Up"
                >
                  ▲
                </button>
                <button 
                  onClick={() => move(idx, 1)} 
                  className="p-3 hover:bg-orange-100 rounded-xl bg-orange-50 text-orange-600 font-bold transition-all active:scale-90 hover:shadow-md"
                  aria-label="Move Down"
                >
                  ▼
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        {status !== 'win' ? (
          <button 
            onClick={check}
            className="px-12 py-5 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-full text-2xl shadow-lg transition-all active:scale-95 hover:shadow-orange-200 hover:shadow-2xl"
          >
            Check My English! ✅
          </button>
        ) : (
          <button 
            onClick={() => {
              setItems([...TIME_WORDS].sort(() => 0.5 - Math.random()));
              setStatus('idle');
            }}
            className="px-12 py-5 bg-green-500 hover:bg-green-600 text-white font-black rounded-full text-2xl shadow-lg transition-all"
          >
            Shuffle Again 🔄
          </button>
        )}
      </div>

      {status === 'win' && (
        <div className="mt-8 text-center text-green-600 font-black text-2xl animate-bounce-in bg-green-100 p-4 rounded-2xl">
          Amazing! You know your English units! 🌟
        </div>
      )}
      {status === 'wrong' && (
        <div className="mt-8 text-center text-red-500 font-bold text-xl animate-shake bg-red-50 p-4 rounded-2xl border-2 border-red-100">
          Not quite right. Try moving the cards! ❌
        </div>
      )}
    </div>
  );
};

export default SizeSorter;
