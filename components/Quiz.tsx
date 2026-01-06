
import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import { getAIFeedback } from '../services/gemini';

const Quiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleAnswer = async (option: string) => {
    if (selectedAnswer || isLoading) return;
    
    setSelectedAnswer(option);
    setIsLoading(true);
    
    const isCorrect = option === currentQuestion.correctAnswer;
    if (isCorrect) setScore(s => s + 1);

    // Now passing the result locally to get instant feedback
    const feedbackText = await getAIFeedback(currentQuestion.question, option, isCorrect);
    setFeedback(feedbackText);
    setIsLoading(false);
  };

  const nextQuestion = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedAnswer(null);
      setFeedback(null);
    } else {
      setShowFinal(true);
    }
  };

  if (showFinal) {
    return (
      <div className="bg-white rounded-3xl p-12 shadow-2xl text-center border-4 border-yellow-200">
        <h2 className="text-6xl mb-6">🏆</h2>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Quiz Finished!</h2>
        <p className="text-2xl text-blue-600 font-bold mb-8">
          Your Score: {score} / {QUIZ_QUESTIONS.length}
        </p>
        <button 
          onClick={() => {
            setCurrentIdx(0);
            setSelectedAnswer(null);
            setFeedback(null);
            setShowFinal(false);
            setScore(0);
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-xl font-bold transition-all shadow-lg active:scale-95"
        >
          Try Again! 🔄
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex justify-between items-center px-4">
        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold">Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">Score: {score}</span>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-blue-50">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-700 mb-2">{currentQuestion.question}</h3>
          <h3 className="text-3xl font-bold text-blue-600 arabic">{currentQuestion.arabicQuestion}</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {currentQuestion.options.map(option => (
            <button
              key={option}
              disabled={!!selectedAnswer || isLoading}
              onClick={() => handleAnswer(option)}
              className={`p-6 text-2xl font-bold rounded-2xl border-4 transition-all ${
                selectedAnswer === option 
                  ? (option === currentQuestion.correctAnswer ? 'bg-green-500 text-white border-green-600' : 'bg-red-500 text-white border-red-600')
                  : 'bg-white border-blue-100 hover:border-blue-400 text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {feedback && (
          <div className="mt-8 bg-blue-50 p-6 rounded-2xl border-2 border-blue-100 animate-bounce-in">
            <p className="text-lg text-blue-800 font-medium text-center">
              {feedback}
            </p>
            <button 
              onClick={nextQuestion}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-xl shadow-lg transition-all"
            >
              Next Question ➡️
            </button>
          </div>
        )}

        {isLoading && (
          <div className="mt-8 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
