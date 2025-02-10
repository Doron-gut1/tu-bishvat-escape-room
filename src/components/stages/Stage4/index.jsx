// Path: src/components/stages/Stage4/index.jsx
import React, { useState } from 'react';
import TreeIdentification from './components/TreeIdentification';
import TreeUsages from './components/TreeUsages';
import { TREES } from './data/trees';

const STAGES = {
  INTRO: 'intro',
  IDENTIFICATION: 'identification',
  USAGES: 'usages',
  COMPLETED: 'completed'
};

const Stage4 = ({ onComplete }) => {
  const [currentStage, setCurrentStage] = useState(STAGES.INTRO);
  const [score, setScore] = useState(0);
  
  const addScore = (points) => {
    setScore(prevScore => prevScore + points);
  };

  const handleStageChange = (stage) => {
    setCurrentStage(stage);
  };

  const handleStageComplete = () => {
    if (currentStage === STAGES.COMPLETED) {
      onComplete(score);
    }
  };

  // קומפוננטת כפתור לניווט
  const StageButton = ({ stage, label, enabled = true }) => (
    <button
      onClick={() => enabled && handleStageChange(stage)}
      className={`
        px-4 py-2 rounded-full text-sm font-medium transition-colors
        ${currentStage === stage 
          ? 'bg-green-500 text-white' 
          : enabled 
            ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }
      `}
      disabled={!enabled}
    >
      {label}
    </button>
  );

  // תפריט ניווט
  const renderNavigation = () => (
    <div className="flex justify-center gap-4 mb-6">
      <StageButton stage={STAGES.IDENTIFICATION} label="זיהוי עצים" />
      <StageButton stage={STAGES.USAGES} label="שימושי העצים" />
    </div>
  );

  // תוכן השלב
  const renderStage = () => {
    switch (currentStage) {
      case STAGES.INTRO:
        return (
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              אהבת הארץ 🌳
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              בואו נכיר את העצים המיוחדים הנזכרים במסורת ישראל,
              נלמד על סגולותיהם ועל מקומם בתרבות היהודית.
            </p>
            <button
              onClick={() => handleStageChange(STAGES.IDENTIFICATION)}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              התחל
            </button>
          </div>
        );
      case STAGES.IDENTIFICATION:
        return (
          <TreeIdentification
            trees={TREES}
            onComplete={() => handleStageChange(STAGES.USAGES)}
            addScore={addScore}
          />
        );
      case STAGES.USAGES:
        return (
          <TreeUsages
            trees={TREES}
            onComplete={() => handleStageChange(STAGES.COMPLETED)}
            addScore={addScore}
          />
        );
      case STAGES.COMPLETED:
        return (
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              כל הכבוד! 🎉
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              השלמתם את כל המשימות וצברתם {score} נקודות!
            </p>
            <p className="text-lg text-gray-700 mb-6">
              למדנו על העצים המיוחדים שליוו את עם ישראל לאורך הדורות.
              מאילנות אלו אנו יונקים השראה לחיים, לתורה ולמצוות.
            </p>
            <button
              onClick={handleStageComplete}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              סיים שלב
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* תפריט ניווט */}
      {currentStage !== STAGES.INTRO && renderNavigation()}
      
      {/* סרגל התקדמות */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-500"
          style={{ 
            width: `${currentStage === STAGES.INTRO ? 0 
              : currentStage === STAGES.IDENTIFICATION ? 33
              : currentStage === STAGES.USAGES ? 66
              : 100}%` 
          }}
        />
      </div>

      {/* תוכן השלב */}
      {renderStage()}

      {/* הצגת ניקוד */}
      {currentStage !== STAGES.INTRO && (
        <div className="text-center text-lg font-bold text-green-800">
          ניקוד: {score}
        </div>
      )}
    </div>
  );
};

export default Stage4;