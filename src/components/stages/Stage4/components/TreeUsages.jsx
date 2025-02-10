import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TreeUsages = ({ trees, onComplete, addScore }) => {
  const [currentTree, setCurrentTree] = useState(0);
  const [selectedUsages, setSelectedUsages] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const tree = trees[currentTree];

  // מערך כל השימושים האפשריים - מערבב את השימושים הנכונים עם האחרים
  const allPossibleUsages = [...new Set([
    ...tree.usages,
    ...tree.allUsages.filter(usage => !tree.usages.includes(usage))
  ])].sort(() => Math.random() - 0.5);

  const handleUsageClick = (usage) => {
    if (showFeedback) return; // מונע בחירה בזמן הצגת המשוב

    setSelectedUsages(prev => {
      if (prev.includes(usage)) {
        return prev.filter(u => u !== usage);
      } else {
        return [...prev, usage];
      }
    });
  };

  const checkAnswers = () => {
    const correctUsages = tree.usages;
    const isAllCorrect = selectedUsages.length === correctUsages.length &&
      selectedUsages.every(usage => correctUsages.includes(usage));

    setIsCorrect(isAllCorrect);
    setShowFeedback(true);

    if (isAllCorrect) {
      addScore(15); // נקודות בונוס על השלמה מושלמת
    }

    setTimeout(() => {
      if (isAllCorrect) {
        if (currentTree === trees.length - 1) {
          onComplete();
        } else {
          setCurrentTree(prev => prev + 1);
          setSelectedUsages([]);
        }
      }
      setShowFeedback(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 p-4 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-green-800 mb-2">
          {tree.name}
        </h3>
        <p className="text-gray-600 mb-4">
          בחרו את כל השימושים המתאימים לעץ זה
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {allPossibleUsages.map((usage, index) => (
          <motion.button
            key={usage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleUsageClick(usage)}
            className={`
              p-4 rounded-lg text-center transition-colors
              ${selectedUsages.includes(usage) 
                ? 'bg-blue-100 border-2 border-blue-500'
                : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'}
              ${showFeedback && tree.usages.includes(usage) 
                ? 'bg-green-100 border-green-500'
                : ''}
              ${showFeedback && selectedUsages.includes(usage) && !tree.usages.includes(usage)
                ? 'bg-red-100 border-red-500'
                : ''}
            `}
          >
            {usage}
          </motion.button>
        ))}
      </div>

      {showFeedback && (
        <div className={`text-center text-lg font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
          {isCorrect 
            ? '🌟 כל הכבוד! בחרתם נכון!'
            : '❌ יש לנסות שוב'}
        </div>
      )}

      <button
        onClick={checkAnswers}
        disabled={selectedUsages.length === 0 || showFeedback}
        className="
          mt-6 w-full py-3 px-6 rounded-lg
          bg-green-500 text-white font-bold
          hover:bg-green-600 transition-colors
          disabled:bg-gray-300 disabled:cursor-not-allowed
        "
      >
        בדיקה
      </button>

      <div className="text-center text-sm text-gray-500">
        עץ {currentTree + 1} מתוך {trees.length}
      </div>
    </div>
  );
};

export default TreeUsages;