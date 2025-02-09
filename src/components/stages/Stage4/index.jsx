import React, { useState } from 'react';
import TreeIdentification from './components/TreeIdentification';
import TreeUsages from './components/TreeUsages';
import TreeCulture from './components/TreeCulture';

const STAGES = {
  INTRO: 'intro',
  IDENTIFICATION: 'identification',
  USAGES: 'usages', 
  CULTURE: 'culture',
  COMPLETED: 'completed'
};

const Stage4 = ({ onComplete }) => {
  const [currentStage, setCurrentStage] = useState(STAGES.INTRO);
  const [score, setScore] = useState(0);
  
  const addScore = (points) => {
    setScore(prevScore => prevScore + points);
  };

  const handleStageComplete = () => {
    switch (currentStage) {
      case STAGES.INTRO:
        setCurrentStage(STAGES.IDENTIFICATION);
        break;
      case STAGES.IDENTIFICATION:  
        setCurrentStage(STAGES.USAGES);
        break;
      case STAGES.USAGES:
        setCurrentStage(STAGES.CULTURE); 
        break;
      case STAGES.CULTURE:
        setCurrentStage(STAGES.COMPLETED);
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
          &lt;div className="text-center p-8 bg-white rounded-lg shadow-lg">
            &lt;h2 className="text-2xl font-bold text-green-800 mb-4">
              משחק העצים של ארץ ישראל 🌳
            &lt;/h2>
            &lt;p className="text-lg text-gray-700 mb-6">
              בואו נכיר את העצים המיוחדים הנזכרים במסורת ישראל,
              נלמד על סגולותיהם ועל מקומם בתרבות היהודית.  
            &lt;/p>
            &lt;button
              onClick={handleStageComplete}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"  
            >
              התחל
            &lt;/button>
          &lt;/div>
        );
      case STAGES.IDENTIFICATION:
        return (
          &lt;TreeIdentification 
            onComplete={handleStageComplete} 
            addScore={addScore}
          />
        );
      case STAGES.USAGES:
        return (
          &lt;TreeUsages 
            onComplete={handleStageComplete}
            addScore={addScore} 
          />
        );  
      case STAGES.CULTURE:
        return (
          &lt;TreeCulture
            onComplete={handleStageComplete}
          />  
        );
      case STAGES.COMPLETED:
        return (
          &lt;div className="text-center p-8 bg-white rounded-lg shadow-lg">
            &lt;h2 className="text-2xl font-bold text-green-800 mb-4">
              כל הכבוד! 🎉
            &lt;/h2>
            &lt;p className="text-lg text-gray-700 mb-4">
              השלמתם את כל המשימות וצברתם {score} נקודות!
            &lt;/p>
            &lt;p className="text-lg text-gray-700"> 
              למדנו על העצים המיוחדים שליוו את עם ישראל לאורך הדורות.
              מאילנות אלו אנו יונקים השראה לחיים, לתורה ולמצוות.
              תודה שלקחתם חלק במסע!
            &lt;/p>
          &lt;/div>
        );
      default:
        return null;
    }
  };

  const progress = (() => {
    switch (currentStage) {
      case STAGES.INTRO: return 0;  
      case STAGES.IDENTIFICATION: return 33;
      case STAGES.USAGES: return 66;
      case STAGES.CULTURE: 
      case STAGES.COMPLETED:
        return 100;
      default: return 0;
    }
  })();

  return (
    &lt;div className="space-y-6">
      &lt;div className="w-full bg-gray-200 rounded-full h-2">
        &lt;div
          className="bg-green-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />&lt;/div>
      {renderStage()}
    &lt;/div>
  );
};

export default Stage4;