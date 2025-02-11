// src/components/stages/Stage3/components/BikurimJourney/index.jsx

import React, { useState } from 'react';
import { JOURNEY_STATIONS } from '../../data/bikurim';

const BikurimJourney = ({ onComplete }) => {
  const [currentStation, setCurrentStation] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showError, setShowError] = useState(false);

  const currentStationData = JOURNEY_STATIONS[currentStation];

  const handleAnswerSelect = (optionId) => {
    if (!isAnswerChecked) {
      setSelectedAnswer(optionId);
      setShowError(false);
    }
  };

  const checkAnswer = () => {
    const correct = currentStationData.options.find(
      opt => opt.id === selectedAnswer
    )?.correct;

    if (correct) {
      setScore(score + 5);
      if (currentStation === JOURNEY_STATIONS.length - 1) {
        // משחק הסתיים
        onComplete(score + 5);
      } else {
        // עבור לתחנה הבאה
        setCurrentStation(currentStation + 1);
        setSelectedAnswer(null);
        setIsAnswerChecked(false);
      }
    } else {
      setShowError(true);
      setIsAnswerChecked(true);
    }
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setShowError(false);
  };

  const progress = ((currentStation + (isAnswerChecked && !showError ? 1 : 0)) / JOURNEY_STATIONS.length) * 100;

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
        {/* כותרת התחנה */}
        <div className="text-center mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-2">
            {currentStationData.name}
          </h3>
          <p className="text-gray-600">
            {currentStationData.description}
          </p>
        </div>

        {/* שאלה */}
        <div className="mb-8">
          <h4 className="text-lg md:text-xl font-bold mb-4">
            {currentStationData.question}
          </h4>
          <div className="grid gap-3">
            {currentStationData.options.map(option => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                className={`
                  p-4 rounded-lg text-right transition-all
                  ${selectedAnswer === option.id 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                  }
                `}
                disabled={isAnswerChecked && !showError}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        {/* הודעת שגיאה */}
        {showError && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg">
            <p className="text-red-700 mb-2">התשובה אינה נכונה, נסה שוב!</p>
            <p className="text-gray-600">{currentStationData.hint}</p>
          </div>
        )}

        {/* כפתורים */}
        <div className="flex justify-center">
          {showError ? (
            <button
              onClick={handleTryAgain}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              נסה שוב
            </button>
          ) : (
            <button
              onClick={checkAnswer}
              disabled={!selectedAnswer}
              className={`
                px-6 py-3 rounded-lg transition-colors
                ${selectedAnswer
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
            תחנה {currentStation + 1} מתוך {JOURNEY_STATIONS.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BikurimJourney;