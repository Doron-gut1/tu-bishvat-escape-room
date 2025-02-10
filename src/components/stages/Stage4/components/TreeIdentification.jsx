// Path: src/components/stages/Stage4/components/TreeIdentification.jsx
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
  const [showHint, setShowHint] = useState(false);
  const [disabledAnswers, setDisabledAnswers] = useState([]);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

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
    setShowHint(false);
    setDisabledAnswers([]);
  }, [currentTree, trees]);

  const handleAnswerSelect = (treeId) => {
    if (showFeedback || disabledAnswers.includes(treeId)) return;
    
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
      setDisabledAnswers([...disabledAnswers, treeId]);
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswer(null);
      }, 1500);
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

        {/* החלק של התמונה - כאן מחליפים את הקוד הקיים */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`
              relative rounded-lg overflow-hidden shadow-lg cursor-pointer
              transition-all duration-300
              ${isImageEnlarged ? 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75' : ''}
            `}
            onClick={() => setIsImageEnlarged(!isImageEnlarged)}
          >
            <img
              src={currentTreeData.imageUrl}
              alt="עץ לזיהוי"
              className={`
                object-cover transition-all duration-300
                ${isImageEnlarged 
                  ? 'max-h-[90vh] max-w-[90vw] w-auto h-auto' 
                  : 'w-full h-auto md:w-96 md:h-96'}
              `}
              onError={(e) => {
                e.target.src = '/images/trees/placeholder.jpg';
              }}
            />
            {isImageEnlarged && (
              <div className="absolute top-4 right-4">
                <button
                  className="bg-white p-2 rounded-full shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsImageEnlarged(false);
                  }}
                >
                  ✕
                </button>
              </div>
            )}
            {!isImageEnlarged && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-30">
                <span className="text-white text-sm">לחץ להגדלה</span>
              </div>
            )}
          </motion.div>
        </div>

        {/* שאר הקוד נשאר אותו דבר... */}
        <div className="text-center mb-6">
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            {showHint ? 'הסתר רמז' : 'הצג רמז'}
          </button>
          
          <AnimatePresence>
            {showHint && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-lg text-gray-700 bg-yellow-50 p-4 rounded-lg mt-2"
              >
                {currentTreeData.clue}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {options.map((tree) => (
            <motion.button
              key={tree.id}
              onClick={() => handleAnswerSelect(tree.id)}
              disabled={showFeedback || disabledAnswers.includes(tree.id)}
              className={`
                p-4 rounded-lg text-center transition-all transform
                ${selectedAnswer === tree.id
                  ? isCorrect
                    ? 'bg-green-100 border-2 border-green-500'
                    : 'bg-red-100 border-2 border-red-500'
                  : disabledAnswers.includes(tree.id)
                    ? 'bg-gray-200 border-2 border-gray-300 cursor-not-allowed'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
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
                  : '❌ נסו תשובה אחרת'}
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