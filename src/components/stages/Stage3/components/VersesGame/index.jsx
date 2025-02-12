// src/components/stages/Stage3/components/VersesGame/index.jsx

import React, { useState } from 'react';
import { BIKURIM_VERSES } from '../../data/verses';

const VersesGame = ({ onComplete }) => {
  const [currentVerse, setCurrentVerse] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const verse = BIKURIM_VERSES[currentVerse];

  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value);
    if (isAnswerChecked) {
      setIsAnswerChecked(false);
    }
  };

  const checkAnswer = () => {
    const correct = userAnswer.trim() === verse.missingWord;
    setIsCorrect(correct);
    setIsAnswerChecked(true);
    if (correct) {
      setScore(score + 5);
    }
  };

  const handleNext = () => {
    if (currentVerse === BIKURIM_VERSES.length - 1) {
      onComplete(score);
    } else {
      setCurrentVerse(currentVerse + 1);
      setUserAnswer('');
      setIsAnswerChecked(false);
      setIsCorrect(false);
    }
  };

  const tryAgain = () => {
    setUserAnswer('');
    setIsAnswerChecked(false);
  };

  const renderVerse = () => {
    return (
      <div className="text-lg font-bold mb-4 text-right" dir="rtl">
        {verse.text.split('___').map((part, index, array) => (
          <React.Fragment key={index}>
            {part}
            {index < array.length - 1 && (
              <div className="inline-block mx-2 border-2 border-dashed border-gray-400 px-4 py-1 min-w-[100px] rounded bg-gray-50">
                {isAnswerChecked ? (
                  <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                    {userAnswer || "___"}
                  </span>
                ) : (
                  <span className="text-gray-400">___</span>
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      {/* התקדמות */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">פסוק {currentVerse + 1} מתוך {BIKURIM_VERSES.length}</span>
          <span className="text-gray-600">ניקוד: {score}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentVerse) / BIKURIM_VERSES.length) * 100}%` }}
          />
        </div>
      </div>

      {/* מקור */}
      <div className="text-center mb-4">
        <p className="text-gray-600">{verse.source}</p>
      </div>

      {/* שאלה */}
      <div className="bg-yellow-50 p-4 rounded-lg mb-4">
        {renderVerse()}
        <div className="space-y-4">
          <div className="text-center text-gray-700">{verse.hint}</div>
          <div className="flex justify-center">
            <input
              type="text"
              value={userAnswer}
              onChange={handleAnswerChange}
              disabled={isAnswerChecked && isCorrect}
              dir="rtl"
              placeholder="הכנס את המילה החסרה..."
              className={`
                w-48 px-4 py-2 text-center border-2 rounded-lg text-lg
                ${isAnswerChecked 
                  ? isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                }
              `}
            />
          </div>
        </div>
      </div>

      {/* כפתורי פעולה */}
      <div className="flex justify-center gap-4 mt-6">
        {!isAnswerChecked ? (
          <button
            onClick={checkAnswer}
            disabled={!userAnswer.trim()}
            className={`
              px-6 py-2 rounded-lg
              ${userAnswer.trim()
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            בדוק תשובה
          </button>
        ) : (
          isCorrect ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              {currentVerse === BIKURIM_VERSES.length - 1 ? 'סיים' : 'המשך לפסוק הבא'}
            </button>
          ) : (
            <button
              onClick={tryAgain}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              נסה שוב
            </button>
          )
        )}
      </div>

      {/* הודעות משוב */}
      {isAnswerChecked && (
        <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
          <p className="font-bold text-center">
            {isCorrect ? 'כל הכבוד! 🎉' : 'לא בדיוק... נסה שוב! 🤔'}
          </p>
          {isCorrect && <p className="text-center mt-2">{verse.explanation}</p>}
        </div>
      )}
    </div>
  );
};

export default VersesGame;