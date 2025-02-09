import React, { useState } from 'react';

const Stage2 = ({ onComplete }) => {
  return (
    <div className="text-center">
      <h3 className="text-xl text-green-800 mb-4">שמירה על הסביבה</h3>
      <p className="text-gray-600 mb-4">שלב זה בפיתוח...</p>
      <button 
        onClick={onComplete}
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        המשך לשלב הבא
      </button>
    </div>
  );
};

export default Stage2;