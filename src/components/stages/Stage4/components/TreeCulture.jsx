import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TreeCulture = ({ trees, onComplete }) => {
  const [currentTree, setCurrentTree] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const tree = trees[currentTree];

  const handleNext = () => {
    if (currentTree === trees.length - 1) {
      onComplete();
    } else {
      setCurrentTree(prev => prev + 1);
      setShowAll(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold text-green-800 mb-2">
            {tree.name} - עובדות מעניינות
          </h3>
          <p className="text-gray-600">
            בואו נלמד על המשמעות המיוחדת של {tree.name} במסורת ובתרבות שלנו
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-3 text-green-800">
            תיאור כללי:
          </h4>
          <p className="text-gray-700">
            {tree.description}
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-lg text-green-800">
            עובדות מהמקורות:
          </h4>
          {tree.culturalFacts.map((fact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-4 rounded-lg border-2 border-green-100"
            >
              {fact}
            </motion.div>
          ))}
        </div>

        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="w-full py-2 text-green-600 hover:text-green-700 font-medium"
          >
            הצג עוד... 📚
          </button>
        )}

        {showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-lg mb-3 text-green-800">
                שימושים נוספים:
              </h4>
              <ul className="list-disc list-inside space-y-2">
                {tree.allUsages.map((usage, index) => (
                  <li key={index} className="text-gray-700">{usage}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        <button
          onClick={handleNext}
          className="
            w-full py-3 px-6 rounded-lg
            bg-green-500 text-white font-bold
            hover:bg-green-600 transition-colors
          "
        >
          {currentTree === trees.length - 1 ? 'סיים' : 'הבא'}
        </button>

        <div className="text-center text-sm text-gray-500">
          עץ {currentTree + 1} מתוך {trees.length}
        </div>
      </motion.div>
    </div>
  );
};

export default TreeCulture;