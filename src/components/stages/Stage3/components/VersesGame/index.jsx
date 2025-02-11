// src/components/stages/Stage3/components/VersesGame/index.jsx

import React, { useState } from 'react';
import { BIKURIM_VERSES, VERSES_SPECIES_CONNECTION } from '../../data/verses';

const VersesGame = ({ onComplete }) => {
  const [currentVerse, setCurrentVerse] = useState(0);
  const [selectedPart, setSelectedPart] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showError, setShowError] = useState(false);
  const [score, setScore] = useState(0);

  const handlePartSelect = (partIndex) => {
    if (!isCorrect) {
      setSelectedPart(partIndex);
      setShowError(false);
    }
  };

  const checkAnswer = () => {
    const verse = BIKURIM_VERSES[currentVerse];
    const selected = verse.parts[selectedPart];
    
    if (selected.missing) {
      setIsCorrect(true);
      setScore(score + 5);
    } else {
      setShowError(true);
    }
  };

  const handleNextVerse = () => {
    if (currentVerse < BIKURIM_VERSES.length - 1) {
      setCurrentVerse(currentVerse + 1);
      setSelectedPart(null);
      setIsCorrect(false);
      setShowError(false);
    } else {
      onComplete(score);
    }
  };

  const handleTryAgain = () => {
    setSelectedPart(null);
    setShowError(false);
  };

  const progress = ((currentVerse + (isCorrect ? 1 : 0)) / BIKURIM_VERSES.length) * 100;

  return (
    <div className="space-y-6">
      {/* סרגל התקדמות */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-green-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-2">
            פסוקי הביכורים
          </h3>
          <p className="text-gray-600">
            השלימו את המילים החסרות בפסוקי הביכורים
          </p>
        </div>

        {/* הפסוק */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {BIKURIM_VERSES[currentVerse].parts.map((part, index) => (
            <div
              key={index}
              onClick={() => handlePartSelect(index)}
              className={`
                p-3 rounded-lg cursor-pointer transition-all text-lg md:text-xl
                ${part.missing ? 'bg-yellow-100 min-w-[100px]' : ''}
                ${selectedPart === index ? 'ring-2 ring-green-500' : ''}
              `}
            >
              {part.text || '_____'}
            </div>
          ))}
        </div>

        {/* הסבר */}
        <div className="mb-6">
          <p className="text-gray-700">
            {BIKURIM_VERSES[currentVerse].explanation}
          </p>
        </div>

        {/* הודעת שגיאה */}
        {showError && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg">
            <p className="text-red-700">זה לא החלק החסר בפסוק, נסה שוב!</p>
          </div>
        )}

        {/* כפתורים */}
        <div className="flex justify-center space-x-4">
          {isCorrect ? (
            <button
              onClick={handleNextVerse}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              {currentVerse === BIKURIM_VERSES.length - 1 ? 'סיים' : 'המשך לפסוק הבא'}
            </button>
          ) : showError ? (
            <button
              onClick={handleTryAgain}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              נסה שוב
            </button>
          ) : (
            <button
              onClick={checkAnswer}
              disabled={selectedPart === null}
              className={`
                px-6 py-3 rounded-lg transition-colors
                ${selectedPart !== null
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              בדוק תשובה
            </button>
          )}
        </div>

        {/* ניקוד */}
        <div className="mt-6 text-center text-gray-600">
          <p>ניקוד: {score} נקודות</p>
          <p className="text-sm">
            פסוק {currentVerse + 1} מתוך {BIKURIM_VERSES.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VersesGame;