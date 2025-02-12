// src/components/stages/Stage3/components/BikurimJourney/index.jsx

import React, { useState, useEffect } from 'react';
import { JOURNEY_STATIONS } from '../../data/bikurim';

const BikurimJourney = ({ onComplete }) => {
  const [currentStation, setCurrentStation] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [stations, setStations] = useState([]);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // מערבב את האופציות בכל תחנה
    const shuffledStations = JOURNEY_STATIONS.map(station => ({
      ...station,
      options: [...station.options].sort(() => Math.random() - 0.5)
    }));
    setStations(shuffledStations);
  }, []);

  // אם אין תחנות, הצג טעינה
  if (stations.length === 0) {
    return <div>טוען...</div>;
  }

  const station = stations[currentStation];

  const handleAnswerSelect = (index) => {
    if (!isAnswerChecked) {
      setSelectedAnswer(index);
    }
  };

  const checkAnswer = () => {
    const isAnswerCorrect = station.options[selectedAnswer]?.correct || false;
    setIsCorrect(isAnswerCorrect);
    setIsAnswerChecked(true);

    if (isAnswerCorrect) {
      setScore(score + 5);
    }
  };

  const handleNext = () => {
    if (currentStation === stations.length - 1) {
      onComplete(score);
    } else {
      setCurrentStation(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
    }
  };

  const tryAgain = () => {
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      {/* התקדמות */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">תחנה {currentStation + 1} מתוך {stations.length}</span>
          <span className="text-gray-600">ניקוד: {score}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStation) / stations.length) * 100}%` }}
          />
        </div>
      </div>

      {/* תחנה נוכחית */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-green-800 mb-2">
          {station.name}
        </h3>
        <p className="text-gray-600">
          {station.description}
        </p>
      </div>

      {/* שאלה */}
      <div className="mb-8">
        <h4 className="text-xl font-bold mb-4 text-center">
          {station.question}
        </h4>
        <div className="space-y-3">
          {station.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={isAnswerChecked && isCorrect}
              className={`
                w-full p-4 rounded-lg text-right text-lg transition-all
                ${isAnswerChecked 
                  ? option.correct
                    ? 'bg-green-100 border-2 border-green-500'
                    : selectedAnswer === index
                      ? 'bg-red-100 border-2 border-red-500'
                      : 'bg-gray-100'
                  : selectedAnswer === index
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-gray-100 hover:bg-gray-200'
                }
              `}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      {/* כפתורי פעולה */}
      <div className="flex justify-center gap-4">
        {!isAnswerChecked && selectedAnswer !== null && (
          <button
            onClick={checkAnswer}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            בדוק תשובה
          </button>
        )}

        {isAnswerChecked && !isCorrect && (
          <button
            onClick={tryAgain}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            נסה שוב
          </button>
        )}

        {isAnswerChecked && isCorrect && (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            {currentStation === stations.length - 1 ? 'סיים' : 'המשך לתחנה הבאה'}
          </button>
        )}
      </div>

      {/* הסבר */}
      {isAnswerChecked && (
        <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
          <p className="font-bold text-center">
            {isCorrect ? 'כל הכבוד! 🎉' : 'לא מדויק... נסה שוב! 🤔'}
          </p>
          {isCorrect && station.options.find(opt => opt.correct)?.explanation && (
            <p className="text-center mt-2">
              {station.options.find(opt => opt.correct).explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BikurimJourney;