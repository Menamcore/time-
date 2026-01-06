
import React, { useState, useEffect } from 'react';
import { TIME_WORDS } from '../constants';

const MatchingMix: React.FC = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);

  useEffect(() => {
    const deck = [
      ...TIME_WORDS.map(w => ({ content: w.english, matchId: w.english, type: 'en' })),
      ...TIME_WORDS.map(w => ({ content: w.arabic, matchId: w.english, type: 'ar' }))
    ].sort(() => 0.5 - Math.random());
    setCards(deck);
  }, []);

  const handleCardClick = (idx: number) => {
    if (solved.includes(idx) || selected.includes(idx) || selected.length >= 2) return;
    
    const newSelected = [...selected, idx];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      const card1 = cards[newSelected[0]];
      const card2 = cards[newSelected[1]];

      if (card1.matchId === card2.matchId && card1.type !== card2.type) {
        setSolved([...solved, ...newSelected]);
        setSelected([]);
      } else {
        setTimeout(() => setSelected([]), 800);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-700 text-center mb-8">Matching Mix! 🌀</h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {cards.map((card, idx) => (
          <button
            key={idx}
            onClick={() => handleCardClick(idx)}
            className={`h-32 rounded-2xl text-xl font-bold transition-all transform flex items-center justify-center p-2 shadow-md ${
              solved.includes(idx) 
                ? 'bg-green-100 text-green-600 opacity-50 border-2 border-green-200 cursor-default'
                : selected.includes(idx)
                ? 'bg-purple-500 text-white scale-105 shadow-xl rotate-3'
                : 'bg-white hover:bg-purple-50 border-2 border-purple-100'
            } ${card.type === 'ar' ? 'arabic text-2xl' : ''}`}
          >
            {card.content}
          </button>
        ))}
      </div>
      {solved.length === cards.length && cards.length > 0 && (
        <div className="mt-12 text-center animate-bounce-in">
          <h3 className="text-4xl font-black text-purple-600">Great Job! 🎉</h3>
          <button onClick={() => window.location.reload()} className="mt-4 text-purple-500 underline">Play Again?</button>
        </div>
      )}
    </div>
  );
};

export default MatchingMix;
