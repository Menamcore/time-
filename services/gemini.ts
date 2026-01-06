
/**
 * Local implementation of services to remove API dependency.
 * Uses native browser SpeechSynthesis for pronunciation 
 * and static logic for feedback.
 */

export const getGeminiTTS = async (text: string): Promise<void> => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      console.warn("Sorry, your browser doesn't support speech synthesis.");
      resolve();
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9; // Slightly slower for better learning
    utterance.pitch = 1.0;

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
};

/**
 * Generates encouraging educational feedback locally without API calls.
 */
export const getAIFeedback = async (question: string, userAnswer: string, isCorrect: boolean): Promise<string> => {
  // Simulating a short delay for a more natural feel
  await new Promise(resolve => setTimeout(resolve, 300));

  if (isCorrect) {
    const praises = [
      "Excellent! ممتاز!",
      "Great job! عمل رائع!",
      "You're a star! أنت نجم!",
      "Perfect! مثالي!",
      "Correct! إجابة صحيحة!"
    ];
    return praises[Math.floor(Math.random() * praises.length)];
  } else {
    const tips = [
      "Not quite. Try again! حاول مرة أخرى!",
      "Almost there! اقتربت من الإجابة!",
      "Think about it again. فكر مرة أخرى.",
      "Don't give up! لا تستسلم!"
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  }
};
