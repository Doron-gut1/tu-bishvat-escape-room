import React, { useState } from 'react';

const TaskModal = ({ task, onComplete, onClose }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleOptionSelect = (optionId) => {
    if (task.type === 'select') {
      setSelectedOptions([optionId]);
    } else if (task.type === 'sort') {
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions(selectedOptions.filter(id => id !== optionId));
      } else {
        setSelectedOptions([...selectedOptions, optionId]);
      }
    }
  };

  const checkAnswer = () => {
    let correct = false;

    if (task.type === 'select') {
      const selectedOption = task.options.find(opt => opt.id === selectedOptions[0]);
      correct = selectedOption?.correct || false;
    } else if (task.type === 'sort') {
      const correctItems = task.items
        .filter(item => item.category === 'compost')
        .map(item => item.id);
      
      correct = selectedOptions.length === correctItems.length &&
        correctItems.every(id => selectedOptions.includes(id));
    }

    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      setTimeout(() => {
        onComplete(task.id, task.points);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* כותרת */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-green-800 mb-2">
            {task.question}
          </h3>
          {task.points && (
            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
              {task.points} נקודות
            </span>
          )}
        </div>

        {/* תוכן המשימה */}
        <div className="space-y-4 mb-6">
          {task.type === 'select' && (
            <div className="grid gap-3">
              {task.options.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`
                    p-4 rounded-lg text-right transition-all
                    ${selectedOptions.includes(option.id)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                    }
                    ${showExplanation && option.correct
                      ? 'ring-2 ring-green-500'
                      : ''
                    }
                  `}
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}

          {task.type === 'sort' && (
            <div className="grid gap-3">
              {task.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleOptionSelect(item.id)}
                  className={`
                    p-4 rounded-lg text-right transition-all
                    ${selectedOptions.includes(item.id)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                    }
                    ${showExplanation && item.category === 'compost'
                      ? 'ring-2 ring-green-500'
                      : ''
                    }
                  `}
                >
                  {item.text}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* הסבר */}
        {showExplanation && (
          <div className={`p-4 rounded-lg mb-6 ${
            isCorrect ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <p className="font-bold mb-2">
              {isCorrect ? 'כל הכבוד! 🎉' : 'לא בדיוק... 🤔'}
            </p>
            <p>{task.explanation}</p>
          </div>
        )}

        {/* כפתורים */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            חזור
          </button>
          {!showExplanation && (
            <button
              onClick={checkAnswer}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              disabled={selectedOptions.length === 0}
            >
              בדוק תשובה
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;