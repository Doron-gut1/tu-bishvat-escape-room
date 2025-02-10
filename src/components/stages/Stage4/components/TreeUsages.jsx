// Path: src/components/stages/Stage4/components/TreeUsages.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TreeUsages = ({ trees = [], onComplete, addScore }) => {
  const [currentTree, setCurrentTree] = useState(0);
  const [selectedUsages, setSelectedUsages] = useState([]);
  const [disabledUsages, setDisabledUsages] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  
  const tree = trees[currentTree];
  
  useEffect(() => {
    if (tree) {
      setSelectedUsages([]);
      setDisabledUsages([]);
      setShowHint(false);
      setAttempts(0);
    }
  }, [currentTree]);
  
  if (!tree) return null;

  const handleUsageClick = (usage) => {
    if (disabledUsages.includes(usage)) return;

    if (selectedUsages.includes(usage)) {
      setSelectedUsages(prev => prev.filter(u => u !== usage));
    } else {
      const isCorrect = tree.usages.includes(usage);
      
      if (isCorrect) {
        setSelectedUsages(prev => [...prev, usage]);
        // בדיקה אם זה היה השימוש האחרון שנדרש
        const updatedSelected = [...selectedUsages, usage];
        if (updatedSelected.length === tree.usages.length && 
            updatedSelected.every(u => tree.usages.includes(u))) {
          const baseScore = 10;
          const attemptBonus = Math.max(0, 5 - attempts);
          addScore(baseScore + attemptBonus);
          
          setTimeout(() => {
            if (currentTree === trees.length - 1) {
              onComplete();
            } else {
              setCurrentTree(prev => prev + 1);
            }
          }, 1500);
        }
      } else {
        setAttempts(prev => prev + 1);
        setDisabledUsages(prev => [...prev, usage]);
        if (!showHint && attempts >= 2) {
          setShowHint(true);
        }
      }
    }
  };

  const remainingCorrect = tree.usages.length - selectedUsages.filter(u => tree.usages.includes(u)).length;

  return (
    <div className="space-y-6 p-4 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-green-800 mb-2">
          {tree.name} - שימושים ומשמעויות
        </h3>
        <p className="text-gray-600 mb-4">
          בחרו את כל השימושים המתאימים לעץ זה
        </p>
      </div>

      {showHint && (
        <div className="bg-yellow-50 p-4 rounded-lg text-center mb-4">
          <p className="text-yellow-800">
            רמז: נותרו עוד {remainingCorrect} שימושים נכונים לגלות
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {tree.allUsages.map((usage, index) => (
          <motion.button
            key={`${usage}-${index}`}
            whileHover={{ scale: disabledUsages.includes(usage) ? 1 : 1.05 }}
            whileTap={{ scale: disabledUsages.includes(usage) ? 1 : 0.95 }}
            onClick={() => handleUsageClick(usage)}
            disabled={disabledUsages.includes(usage)}
            className={`
              p-4 rounded-lg text-center transition-colors
              ${selectedUsages.includes(usage) 
                ? 'bg-green-100 border-2 border-green-500'
                : disabledUsages.includes(usage)
                  ? 'bg-red-100 border-2 border-red-500 cursor-not-allowed opacity-75'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
              }
            `}
          >
            {usage}
          </motion.button>
        ))}
      </div>

      <div className="text-center text-sm text-gray-500">
        עץ {currentTree + 1} מתוך {trees.length}
      </div>

      <AnimatePresence>
        {selectedUsages.length === tree.usages.length && 
         selectedUsages.every(u => tree.usages.includes(u)) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-xl font-bold text-green-600"
          >
            🌟 כל הכבוד! מצאתם את כל השימושים הנכונים!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TreeUsages;