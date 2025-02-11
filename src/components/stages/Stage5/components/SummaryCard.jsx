import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SummaryCard = ({ title, points, stageNumber, delay = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="w-full"
    >
      <motion.div
        className={`
          bg-white rounded-lg shadow-lg p-6 cursor-pointer
          transition-all duration-300 transform
          ${isExpanded ? 'scale-105' : 'hover:scale-102'}
        `}
        onClick={() => setIsExpanded(!isExpanded)}
        layout
      >
        <motion.div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-green-800">
            שלב {stageNumber}: {title}
          </h3>
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl text-green-600"
          >
            ▼
          </motion.span>
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-2"
            >
              {points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start"
                >
                  <span className="text-green-500 mt-1 ml-2">•</span>
                  <p className="text-gray-700">{point}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default SummaryCard;