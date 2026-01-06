
import React, { useState, useEffect } from 'react';
import { TabType } from './types';
import DiscoveryJourney from './components/DiscoveryJourney';
import MatchingMix from './components/MatchingMix';
import SizeSorter from './components/SizeSorter';
import MathWizard from './components/MathWizard';
import StarJumble from './components/StarJumble';
import TimePilot from './components/TimePilot';

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('discovery');

  // Tracking tab changes in Google Analytics
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: activeTab.charAt(0).toUpperCase() + activeTab.slice(1),
        page_location: window.location.href,
        page_path: `/${activeTab}`,
      });
      
      // Also log as a custom interaction event
      window.gtag('event', 'tab_interaction', {
        event_category: 'navigation',
        event_label: activeTab,
        value: 1
      });
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b-4 border-blue-100 py-8 px-6 text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-blue-600 mb-2 drop-shadow-sm">Time Explorer! 🚀</h1>
        <p className="text-lg text-gray-500 font-bold uppercase tracking-widest">Master Time: 5th Grade Edition</p>
      </header>

      {/* Gamified Navigation */}
      <nav className="sticky top-4 z-50 px-4 mb-12">
        <div className="max-w-4xl mx-auto bg-white p-2 rounded-3xl shadow-xl flex flex-wrap gap-2">
          {[
            { id: 'discovery', label: 'Learn', color: 'bg-blue-500', icon: '📖' },
            { id: 'matching', label: 'Match', color: 'bg-purple-500', icon: '🌀' },
            { id: 'jumble', label: 'Jumble', color: 'bg-indigo-600', icon: '✨' },
            { id: 'sorter', label: 'Order', color: 'bg-orange-500', icon: '🪜' },
            { id: 'pilot', label: 'Pilot', color: 'bg-red-500', icon: '🚀' },
            { id: 'wizard', label: 'Math', color: 'bg-blue-900', icon: '🧙‍♂️' },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex-1 min-w-[80px] py-4 rounded-2xl font-black transition-all flex flex-col items-center gap-1 ${
                activeTab === tab.id 
                  ? `${tab.color} text-white shadow-lg scale-105` 
                  : 'text-gray-400 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="text-[10px] md:text-xs uppercase">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        {activeTab === 'discovery' && <DiscoveryJourney />}
        {activeTab === 'matching' && <MatchingMix />}
        {activeTab === 'jumble' && <StarJumble />}
        {activeTab === 'sorter' && <SizeSorter />}
        {activeTab === 'pilot' && <TimePilot />}
        {activeTab === 'wizard' && <MathWizard />}
      </main>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes bounceIn { 0% { transform: scale(0.9); opacity: 0; } 70% { transform: scale(1.05); } 100% { transform: scale(1); opacity: 1; } }
        .animate-bounce-in { animation: bounceIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-shake { animation: shake 0.2s ease-in-out infinite; }
        @keyframes starTwinkle { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
        .animate-star { animation: starTwinkle 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default App;
