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
      setTimeout(() => {
        onComplete();
      }, 3000);
    }

    setCurrentTask(null);
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {/* חלון ברכות */}
      {showCongrats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              כל הכבוד! 🎉
            </h3>
            <p className="text-lg">
              השלמת את כל המשימות והפכת לשומר סביבה אמיתי!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stage2;