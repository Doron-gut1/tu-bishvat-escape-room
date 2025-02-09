import React, { useState } from 'react';
import { BLESSING_GROUPS, SPECIES, BLESSING_ORDER } from '../../data/blessings';
import BlessingGroups from './BlessingGroups';
import OrderByLand from './OrderByLand';

const GAME_STAGES = {
  GROUPS: 'groups',
  ORDER: 'order',
  COMPLETED: 'completed'
};

const BlessingGame = ({ onComplete }) => {
  const [gameStage, setGameStage] = useState(GAME_STAGES.GROUPS);
  const [score, setScore] = useState(0);
  
  const handleGroupsComplete = (points) => {
    setScore(prev => prev + points);
    setGameStage(GAME_STAGES.ORDER);
  };

  const handleOrderComplete = (points) => {
    setScore(prev => prev + points);
    setGameStage(GAME_STAGES.COMPLETED);
    setTimeout(() => onComplete(score + points), 2000);
  };

  const renderStage = () => {
    switch (gameStage) {
      case GAME_STAGES.GROUPS:
        return (
          <div className="animate-fade-in">
            <div className="mb-6 text-center">
              <h3 className="text-xl font-bold text-green-800 mb-2">
                קבוצות הברכות
              </h3>
              <p className="text-gray-600">
                סדרו את שבעת המינים לפי הברכה המתאימה להם
              </p>
            </div>
            <BlessingGroups 
              blessingGroups={BLESSING_GROUPS}
              species={SPECIES}
              onComplete={handleGroupsComplete}
            />
          </div>
        );

      case GAME_STAGES.ORDER:
        return (
          <div className="animate-fade-in">
            <div className="mb-6 text-center">
              <h3 className="text-xl font-bold text-green-800 mb-2">
                סדר קדימה בברכות
              </h3>
              <p className="text-gray-600">
                סדרו את הפירות לפי קרבתם למילה "ארץ" בפסוק
              </p>
            </div>
            <OrderByLand
              species={SPECIES}
              correctOrder={BLESSING_ORDER}
              onComplete={handleOrderComplete}
            />
          </div>
        );

      case GAME_STAGES.COMPLETED:
        return (
          <div className="text-center p-6 bg-green-50 rounded-lg animate-fade-in">
            <h3 className="text-xl font-bold text-green-800 mb-4">
              כל הכבוד! 🎉
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              השלמתם בהצלחה את משחק הברכות וצברתם {score} נקודות!
            </p>
            <p className="text-md text-gray-600">
              למדתם על סדר הברכות ועל החשיבות המיוחדת של כל אחד משבעת המינים
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  // סרגל התקדמות
  const progress = (() => {
    switch (gameStage) {
      case GAME_STAGES.GROUPS: return 33;
      case GAME_STAGES.ORDER: return 66;
      case GAME_STAGES.COMPLETED: return 100;
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

      {/* תוכן המשחק */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {renderStage()}
      </div>
    </div>
  );
};

export default BlessingGame;