// src/components/stages/Stage3/index.jsx

import React, { useState } from 'react';
import BlessingGame from './components/BlessingGame';
import BikurimJourney from './components/BikurimJourney';
import VersesGame from './components/VersesGame';

const STAGES = {
  INTRO: 'intro',
  BLESSINGS: 'blessings',
  JOURNEY: 'journey',
  VERSES: 'verses',
  COMPLETED: 'completed'
};

const Stage3 = ({ onComplete }) => {
  const [currentStage, setCurrentStage] = useState(STAGES.INTRO);
  const [score, setScore] = useState(0);
  
  const handleStageComplete = (points) => {
    const newScore = score + points;
    setScore(newScore);
  };

  const handleNextStage = () => {
    switch (currentStage) {
      case STAGES.INTRO:
        setCurrentStage(STAGES.BLESSINGS);
        break;
      case STAGES.BLESSINGS:
        setCurrentStage(STAGES.JOURNEY);
        break;
      case STAGES.JOURNEY:
        setCurrentStage(STAGES.VERSES);
        break;
      case STAGES.VERSES:
        setCurrentStage(STAGES.COMPLETED);
        break;
      case STAGES.COMPLETED:
        onComplete();
        break;
      default:
        break;
    }
  };

  const renderStage = () => {
    switch (currentStage) {
      case STAGES.INTRO:
        return (
          <div className="text-center p-8 bg-white rounded-lg shadow-lg animate-fade-in">
            <h2 className="text-2xl font-bold text-green-800 mb-4">חגיגת הביכורים</h2>
            <p className="text-lg text-gray-700 mb-6">
              בואו נלמד על מצוות הביכורים, נכיר את הקשר המיוחד בין שבעת המינים 
              לארץ ישראל, ונגלה את סודות הברכות
            </p>
            <button
              onClick={handleNextStage}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              בואו נתחיל!
            </button>
          </div>
        );

      case STAGES.BLESSINGS:
        return (
          <BlessingGame 
            onComplete={(points) => {
              handleStageComplete(points);
              handleNextStage();
            }} 
          />
        );

      case STAGES.JOURNEY:
        return (
          <BikurimJourney 
            onComplete={(points) => {
              handleStageComplete(points);
              handleNextStage();
            }}
          />
        );

      case STAGES.VERSES:
        return (
          <VersesGame 
            onComplete={(points) => {
              handleStageComplete(points);
              handleNextStage();
            }}
          />
        );

      case STAGES.COMPLETED:
        return (
          <div className="text-center p-8 bg-white rounded-lg shadow-lg animate-fade-in">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              כל הכבוד! 🎉
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              השלמתם את כל המשימות בהצלחה וצברתם {score} נקודות!
            </p>
            <p className="text-lg text-gray-700 mb-6">
              למדתם על חשיבות הביכורים, על סדר הברכות ועל הקשר המיוחד
              בין עם ישראל לארצו ופירותיה
            </p>
            <button
              onClick={handleNextStage}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              סיים שלב
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const progress = (() => {
    switch (currentStage) {
      case STAGES.INTRO: return 0;
      case STAGES.BLESSINGS: return 25;
      case STAGES.JOURNEY: return 50;
      case STAGES.VERSES: return 75;
      case STAGES.COMPLETED: return 100;
      default: return 0;
    }
  })();

  return (
    <div className="space-y-6">
      {/* סרגל התקדמות */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-green-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* תוכן השלב */}
      {renderStage()}
    </div>
  );
};

export default Stage3;