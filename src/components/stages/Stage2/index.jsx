// src/components/stages/Stage2/index.jsx

import React, { useState } from 'react';
import { AREAS, TOTAL_POINTS_NEEDED, ACHIEVEMENT_LEVELS } from './data';
import AreaCard from './components/AreaCard';
import TaskModal from './components/TaskModal';
import ScoreBoard from './components/ScoreBoard';

const Stage2 = ({ onComplete }) => {
  const [currentArea, setCurrentArea] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [points, setPoints] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);

  const handleAreaClick = (area) => {
    setCurrentArea(area);
    if (area.tasks.length > 0) {
      // מציג את המשימה הראשונה שעוד לא הושלמה
      const nextTask = area.tasks.find(task => 
        !completedTasks.includes(task.id)
      );
      if (nextTask) {
        setCurrentTask(nextTask);
      }
    }
  };

  const handleTaskComplete = (taskId, earnedPoints) => {
    setCompletedTasks([...completedTasks, taskId]);
    const newPoints = points + earnedPoints;
    setPoints(newPoints);

    if (newPoints >= TOTAL_POINTS_NEEDED) {
      setShowCongrats(true);
    }

    setCurrentTask(null);
  };

  const handleFinishStage = () => {
    onComplete();
  };

  const getCurrentAchievement = () => {
    return ACHIEVEMENT_LEVELS
      .slice()
      .reverse()
      .find(level => points >= level.points);
  };

  return (
    <div className="space-y-6">
      {/* כותרת */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-2">
          שמירה על הסביבה
        </h2>
        <p className="text-lg text-gray-600">
          בואו נלמד איך לשמור על הטבע ועל הסביבה שלנו
        </p>
      </div>

      {/* לוח ניקוד */}
      <ScoreBoard 
        points={points} 
        totalNeeded={TOTAL_POINTS_NEEDED}
        achievement={getCurrentAchievement()}
      />

      {/* אזורי המשחק */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {AREAS.map(area => (
          <AreaCard
            key={area.id}
            area={area}
            completedTasks={completedTasks}
            onClick={() => handleAreaClick(area)}
          />
        ))}
      </div>

      {/* מודל משימה */}
      {currentTask && (
        <TaskModal
          task={currentTask}
          onComplete={handleTaskComplete}
          onClose={() => setCurrentTask(null)}
        />
      )}

      {/* כפתור סיום */}
      {points >= TOTAL_POINTS_NEEDED && !showCongrats && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowCongrats(true)}
            className="bg-green-500 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-green-600 transition-colors duration-300 shadow-lg"
          >
            סיימתי את כל המשימות!
          </button>
        </div>
      )}

      {/* חלון ברכות */}
      {showCongrats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 md:p-8 rounded-lg text-center max-w-lg w-full">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              כל הכבוד! 🎉
            </h3>
            <p className="text-lg mb-6">
              השלמת את כל המשימות והפכת לשומר סביבה אמיתי!
              <br />
              צברת {points} נקודות!
            </p>
            <div className="space-y-4">
              <p className="text-xl font-bold text-green-700">
                {getCurrentAchievement()?.badge} {getCurrentAchievement()?.title}
              </p>
              <button
                onClick={handleFinishStage}
                className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition-colors w-full md:w-auto"
              >
                המשך לשלב הבא
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stage2;