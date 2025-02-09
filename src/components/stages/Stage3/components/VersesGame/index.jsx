import React from 'react';

const VersesGame = ({ onComplete }) => {
  return (
    <div className="text-center">
      <h3 className="text-xl font-bold text-green-800 mb-4">
        משחק הפסוקים
      </h3>
      <p className="text-gray-600 mb-4">
        חלק זה בפיתוח...
      </p>
      <button 
        onClick={() => onComplete(5)}
        className="bg-green-500 text-white px-6 py-2 rounded-lg"
      >
        המשך לשלב הבא
      </button>
    </div>
  );
};

export default VersesGame;