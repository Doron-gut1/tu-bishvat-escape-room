// src/components/stages/Stage2/components/AreaCard.jsx

import React from 'react';

const AreaCard = ({ area, completedTasks, onClick }) => {
  const completedTasksInArea = area.tasks.filter(task => 
    completedTasks.includes(task.id)
  ).length;

  const totalTasksInArea = area.tasks.length;
  const progress = (completedTasksInArea / totalTasksInArea) * 100;

  return (
    <div 
      onClick={onClick}
      className={`
        p-4 md:p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer
        ${completedTasksInArea === totalTasksInArea ? 'bg-green-100' : 'bg-white'}
      `}
    >
      {/* כותרת ואייקון */}
      <div className="flex items-center mb-4">
        <span className="text-3xl md:text-4xl ml-4">{area.icon}</span>
        <div>
          <h3 className="text-lg md:text-xl font-bold text-green-800">{area.name}</h3>
          <p className="text-sm md:text-base text-gray-600">{area.description}</p>
        </div>
      </div>

      {/* התקדמות */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">
            הושלמו {completedTasksInArea} מתוך {totalTasksInArea} משימות
          </span>
          <span className="text-sm font-bold text-green-800">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* קישור למקורות */}
      {area.biblicalConnection && (
        <div className="text-xs md:text-sm text-gray-600 border-r-2 border-green-500 pr-2 mt-4">
          {area.biblicalConnection}
        </div>
      )}

      {/* טיפ סביבתי */}
      {area.environmentalTip && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg text-xs md:text-sm">
          <span className="font-bold">💡 טיפ: </span>
          {area.environmentalTip}
        </div>
      )}
    </div>
  );
};

export default AreaCard;