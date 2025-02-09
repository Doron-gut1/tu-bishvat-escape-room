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
    const currentTree = TREES[currentQuestion];
    const isCorrect = selectedAnswer === currentTree.name;
    
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      addScore(10);
    }

    setSelectedAnswer(null);
    
    if (currentQuestion === TREES.length - 1) {
      onComplete();
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const currentTree = TREES[currentQuestion];
  const treeOptions = [
    currentTree,
    ...TREES.filter(t => t.name !== currentTree.name).sort(() => 0.5 - Math.random()).slice(0, 3)
  ];

  return (
    <div>
      <h3>
        זהו את העץ לפי התמונה והרמז ({currentQuestion + 1}/{TREES.length})  
      </h3>
      
      <img 
        src={currentTree.imageUrl} 
        alt={currentTree.name}
        className="w-64 h-64 object-cover mx-auto rounded-lg mb-4"
      />
      
      <p className="text-center mb-6">{currentTree.clue}</p>
      
      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {treeOptions.map(option => (
          <button
            key={option.name}
            onClick={() => handleAnswerSelect(option.name)}
            className={`p-4 rounded-lg transition-colors ${
              selectedAnswer === option.name 
                ? 'bg-green-200 text-green-800' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {option.name}  
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedAnswer}  
        className="mt-8 bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 
                   disabled:cursor-not-allowed disabled:bg-gray-400 block mx-auto"
      >
        {currentQuestion === TREES.length - 1 ? 'סיים' : 'הבא'}  
      </button>
      
    </div>
  );
};

export default TreeIdentification;