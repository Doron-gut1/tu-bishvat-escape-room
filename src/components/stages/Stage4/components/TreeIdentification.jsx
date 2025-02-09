import React, { useState } from 'react';
import { TREES } from '../data/trees';

const TreeIdentification = ({ onComplete, addScore }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    const isCorrect = 
      selectedAnswer === TREES[currentQuestion].name;
    
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      addScore(10);
    }

    if (currentQuestion === TREES.length - 1) {
      onComplete();
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  return (
    <div>
      <h3>
        זהו את העץ לפי התמונה והתיאור 
        ({currentQuestion + 1}/{TREES.length})  
      </h3>
      <img 
        src={TREES[currentQuestion].image} 
        alt={TREES[currentQuestion].name}
        className="w-64 h-64 object-contain mx-auto mb-4"
      />
      <p>{TREES[currentQuestion].description}</p>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        {['זית', 'חרוב', 'תאנה', 'רימון'].map(option => (
          <button
            key={option}  
            onClick={() => handleAnswerSelect(option)}
            className={`
              ${selectedAnswer === option 
                ? 'bg-green-200'
                : 'bg-gray-100'} 
              p-4 rounded-lg transition-colors
            `}
          >
            {option}  
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedAnswer}  
        className="mt-8 bg-green-500 text-white px-6 py-2 rounded-lg disabled:bg-gray-400"
      >
        {currentQuestion === TREES.length - 1 ? 'סיים' : 'הבא'}  
      </button>
    </div>
  );
};

export default TreeIdentification;