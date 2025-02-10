import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CulturalFactPopup = ({ fact, onClose, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
          <motion.div 
            className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl relative z-10"
            layoutId={`fact-${fact.title}`}
          >
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-green-800">{fact.title}</h3>
              <p className="text-gray-700 text-lg">{fact.content}</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
              >
                המשך
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CulturalFactPopup;