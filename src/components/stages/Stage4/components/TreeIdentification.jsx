import React, { useState } from 'react';
import { TREES } from '../data/trees';

const TreeIdentification = ({ onComplete, addScore }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerResult, setAnswerResult] = useState(null);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    const currentTree = TREES[currentQuestion];
    const isCorrect = selectedAnswer === currentTree.name;
    
    setAnswerResult(isCorrect);

    if (isCorrect) {
      addScore(10);
    }
    
    setTimeout(() => {
      setSelectedAnswer(null);
      setAnswerResult(null);

      if (currentQuestion === TREES.length - 1) {
        onComplete();
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 1000);
  };

  const currentTree = TREES[currentQuestion];
  const treeOptions = [
    currentTree,
    ...TREES.filter(t => t.name !== currentTree.name).sort(() => 0.5 - Math.random()).slice(0, 3)
  ].sort(() => 0.5 - Math.random());

  return (
    <div className="space-y-6">
      <h3 className="text-2xl text-center">
        זהו את העץ לפי התמונה והרמז ({currentQuestion + 1}/{TREES.length})  
      </h3>
      
      <img 
        src={currentTree.imageUrl} 
        alt={currentTree.name}
        className="w-64 h-64 object-cover mx-auto rounded-lg mb-4"
      />
      
      <p className="text-xl text-center">{currentTree.clue}</p>
      
      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {treeOptions.map(option => (
          <button
            key={option.name}
            onClick={() => handleAnswerSelect(option.name)}
            className={`p-4 rounded-lg transition-colors ${
              selectedAnswer === option.name 
                ? 'bg-blue-200 text-blue-800 border-2 border-blue-500' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            disabled={selectedAnswer}
          >
            {option.name}  
          </button>
        ))}
      </div>

      {answerResult !== null && (
        <div className={`text-center text-xl ${answerResult ? 'text-green-600' : 'text-red-600'}`}>
          {answerResult ? 'תשובה נכונה! 🌿' : 'טעות, נסו שוב 🍂'}  
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!selectedAnswer}  
        className="mt-8 bg-green-500 text-white text-xl px-6 py-3 rounded-lg shadow hover:bg-green-600 
                   disabled:cursor-not-allowed disabled:bg-gray-400 block mx-auto"
      >
        {currentQuestion === TREES.length - 1 ? 'סיים' : 'הבא'}  
      </button>
      
    </div>
  );
};

export default TreeIdentification;