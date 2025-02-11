import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import SummaryCard from './components/SummaryCard';
import { SUMMARY_CARDS } from './data/summaryCards';

const Stage5 = ({ onComplete }) => {
  useEffect(() => {
    // הפעלת אנימציית קונפטי בטעינת השלב
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const colors = ['#34D399', '#10B981', '#059669']; // ירוקים שונים

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-green-800 mb-4">
          כל הכבוד! 🎊
        </h2>
        <p className="text-xl text-gray-700">
          סיימתם את משחק הבריחה של ט"ו בשבט
        </p>
      </motion.div>

      <div className="space-y-6">
        {SUMMARY_CARDS.map((card, index) => (
          <SummaryCard
            key={card.id}
            {...card}
            delay={index * 0.2}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-12"
      >
        <button
          onClick={() => window.location.reload()}
          className="
            px-8 py-3 bg-green-500 text-white rounded-lg
            hover:bg-green-600 transition-colors
            text-lg font-medium
          "
        >
          שחק שוב
        </button>
      </motion.div>
    </div>
  );
};

export default Stage5;