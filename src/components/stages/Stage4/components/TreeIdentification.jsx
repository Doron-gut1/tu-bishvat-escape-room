import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CulturalFactPopup from './CulturalFactPopup';

const TreeIdentification = ({ trees, onComplete, addScore }) => {
  const [currentTree, setCurrentTree] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFact, setShowFact] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    // יצירת אפשרויות רק בטעינת עץ חדש
    const currentTreeData = trees[currentTree];
    const otherTrees = trees.filter(t => t.id !== currentTreeData.id);
    const shuffledOtherTrees = [...otherTrees].sort(() => 0.5 - Math.random()).slice(0, 3);
    const allOptions = [currentTreeData, ...shuffledOtherTrees].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
    setAttempts(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
  }, [currentTree, trees]);

  const handleAnswerSelect = (treeId) => {
    if (showFeedback) return;
    
    const currentTreeData = trees[currentTree];
    const correct = treeId === currentTreeData.id;

    setSelectedAnswer(treeId);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      const baseScore = 10;
      const attemptBonus = Math.max(0, 5 - attempts);
      addScore(baseScore + attemptBonus);
      setTimeout(() => {
        setShowFact(true);
      }, 1000);
    } else {
      setAttempts(prev => prev + 1);
      if (attempts >= 2) {
        // אחרי 3 ניסיונות נראה את התשובה הנכונה
        setTimeout(() => {
          setShowFact(true);
        }, 1500);
      } else {
        setTimeout(() => {
          setShowFeedback(false);
          setSelectedAnswer(null);
        }, 1500);
      }
    }
  };

  const handleFactClose = () => {
    if (currentFact < trees[currentTree].culturalFacts.length - 1) {
      setCurrentFact(prev => prev + 1);
    } else {
      setShowFact(false);
      setCurrentFact(0);
      if (currentTree === trees.length - 1) {
        onComplete();
      } else {
        setCurrentTree(prev => prev + 1);
      }
    }
  };

  const currentTreeData = trees[currentTree];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold text-green-800 mb-2">
            זהו את העץ
          </h3>
          <p className="text-gray-600 mb-4">
            שאלה {currentTree + 1} מתוך {trees.length}
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative w-64 h-64 rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={currentTreeData.imageUrl}
              alt="עץ לזיהוי"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/images/trees/placeholder.jpg';
              }}
            />
          </motion.div>
        </div>

        <div className="text-center mb-6">
          <p className="text-lg text-gray-700 bg-yellow-50 p-4 rounded-lg inline-block">
            רמז: {currentTreeData.clue}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {options.map((tree) => (
            <motion.button
              key={tree.id}
              onClick={() => handleAnswerSelect(tree.id)}
              disabled={showFeedback}
              className={`
                p-4 rounded-lg text-center transition-all transform
                ${selectedAnswer === tree.id
                  ? showFeedback
                    ? isCorrect
                      ? 'bg-green-100 border-2 border-green-500'
                      : 'bg-red-100 border-2 border-red-500'
                    : 'bg-blue-100 border-2 border-blue-500'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
                }
                ${showFeedback && currentTreeData.id === tree.id && !isCorrect
                  ? 'bg-green-100 border-2 border-green-500'
                  : ''
                }
                disabled:opacity-75 disabled:cursor-not-allowed
              `}
            >
              {tree.name}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mt-4"
            >
              <p className={`text-xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect
                  ? '🌟 כל הכבוד!'
                  : attempts >= 2
                    ? 'נסו פעם אחרונה!'
                    : '❌ לא מדויק, נסו שוב'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <CulturalFactPopup
          fact={currentTreeData.culturalFacts[currentFact]}
          onClose={handleFactClose}
          isVisible={showFact}
        />
      </motion.div>
    </div>
  );
};

export default TreeIdentification;