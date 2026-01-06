
import React, { useState } from 'react';
import { SCENARIOS } from '../constants.tsx';

const TimePilot: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle');
  const [score, setScore] = useState(0);

  const scenario = SCENARIOS[index];

  const handleChoice = (choice: string) => {
    if (selected) return;
    setSelected(choice);
    if (choice === scenario.correct) {
      setStatus('correct');
      setScore(s => s + 1);
      setTimeout(() => {
        if (index < SCENARIOS.length - 1) {
          setIndex(index + 1);
          setSelected(null);
          setStatus('idle');
        } else {
          // Finished
        }
      }, 1500);
    } else {
      setStatus('wrong');
      setTimeout(() => {
        setSelected(null);
        setStatus('idle');
      }, 1000);
    }
  };

  if (index >= SCENARIOS.length) {
    return (
      <div className="max-w-2xl mx-auto bg-slate-900 text-white rounded-[3rem] p-12 text-center border-8 border-red-500">
        <div className="text-9xl mb-6">🚀</div>
        <h2 className="text-5xl font-black mb-4">MISSION COMPLETE!</h2>
        <p className="text-2xl text-red-300 mb-8 font-bold arabic">أنت طيار وقت محترف! نتيجتك: {score} / {SCENARIOS.length}</p>
        <button 
          onClick={() => {
            setIndex(0);
            setScore(0);
            setSelected(null);
            setStatus('idle');
          }}
          className="bg-red-500 hover:bg-red-400 text-white px-12 py-5 rounded-full text-2xl font-black shadow-2xl transition-all"
        >
          New Mission 🔄
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-zinc-900 border-x-8 border-t-8 border-zinc-700 rounded-t-[4rem] rounded-b-3xl p-8 relative overflow-hidden shadow-2xl">
      {/* Pilot Dashboard UI */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500"></div>
      
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <span className="text-red-500 font-black text-xl tracking-tighter">TIME PILOT v1.0</span>
          <span className="text-zinc-500 text-[10px] font-bold">RADAR ACTIVE: SCANNING CONTEXT</span>
        </div>
        <div className="bg-zinc-800 px-4 py-2 rounded-xl border border-zinc-700">
          <span className="text-red-400 font-mono font-bold">FUEL: {((score / SCENARIOS.length) * 100).toFixed(0)}%</span>
        </div>
      </div>

      {/* Arabic Tutorial */}
      <div className="bg-red-950/30 p-4 rounded-xl mb-8 border border-red-500/20 arabic text-right">
        <p className="text-red-200 font-bold mb-1">كيف تقود السفينة؟ 👨‍✈️</p>
        <p className="text-red-400 text-sm">اقرأ الموقف واختبر وحدة الوقت المناسبة لإكمال الجملة. الإجابات الصحيحة تشحن وقود السفينة!</p>
      </div>

      <div className="bg-zinc-800/50 p-8 rounded-[2rem] border-2 border-zinc-700 mb-8 relative">
        <div className="text-6xl absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 p-4 rounded-full border-4 border-zinc-700">
          {scenario.icon}
        </div>
        <div className="mt-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white leading-tight">
            {scenario.text}
          </h3>
          <h3 className="text-3xl font-black text-red-500 arabic leading-relaxed">
            {scenario.arabicText}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {scenario.options.map(opt => (
          <button
            key={opt}
            disabled={!!selected}
            onClick={() => handleChoice(opt)}
            className={`py-5 px-8 rounded-2xl text-2xl font-black transition-all border-4 flex justify-between items-center
              ${selected === opt 
                ? (status === 'correct' ? 'bg-green-600 border-green-400 text-white' : 'bg-red-600 border-red-400 text-white animate-shake')
                : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:border-red-500/50'
              }
            `}
          >
            <span>{opt}</span>
            {selected === opt && (status === 'correct' ? '🚀' : '💥')}
          </button>
        ))}
      </div>

      <div className="mt-10 flex justify-center gap-2">
        {SCENARIOS.map((_, i) => (
          <div key={i} className={`h-2 w-8 rounded-full transition-all ${i === index ? 'bg-red-500' : i < index ? 'bg-zinc-600' : 'bg-zinc-800'}`}></div>
        ))}
      </div>
    </div>
  );
};

export default TimePilot;
