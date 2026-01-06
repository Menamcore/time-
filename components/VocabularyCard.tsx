
import React, { useState } from 'react';
import { TimeWord } from '../types';
import { getGeminiTTS } from '../services/gemini';

interface VocabularyCardProps {
  word: TimeWord;
}

const VocabularyCard: React.FC<VocabularyCardProps> = ({ word }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlaySound = async () => {
    setIsPlaying(true);
    await getGeminiTTS(word.english);
    setIsPlaying(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-blue-100 hover:border-yellow-400 transition-all duration-300 transform hover:-translate-y-2">
      <div className="text-6xl mb-4 text-center">{word.icon}</div>
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-4xl font-bold text-blue-600">{word.english}</h3>
        <p className="text-2xl text-gray-500 italic">({word.pluralEnglish})</p>
        
        <div className="w-full h-px bg-gray-100 my-4"></div>
        
        <div className="flex flex-col items-center">
          <h3 className="text-4xl font-bold text-green-600 arabic">{word.arabic}</h3>
          <p className="text-lg text-gray-400 font-medium">[{word.transliteration}]</p>
        </div>

        <button 
          onClick={handlePlaySound}
          disabled={isPlaying}
          className={`mt-6 flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-all ${
            isPlaying ? 'bg-gray-400' : 'bg-yellow-400 hover:bg-yellow-500 shadow-lg active:scale-95'
          }`}
        >
          {isPlaying ? 'Listening...' : '🔊 Pronounce'}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600 bg-blue-50 p-3 rounded-xl italic">
          💡 {word.fact}
        </p>
      </div>
    </div>
  );
};

export default VocabularyCard;
