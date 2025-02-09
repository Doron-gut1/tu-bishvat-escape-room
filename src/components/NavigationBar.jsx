import React from 'react';

const NavigationBar = ({ currentStage, completedStages, onStageSelect, onReset }) => {
  const stages = [
    { id: 0, name: 'התחלה' },
    { id: 1, name: 'נטיעות בארץ ישראל' },
    { id: 2, name: 'שמירה על הסביבה' },
    { id: 3, name: 'חגיגת ביכורים' },
    { id: 4, name: 'אהבת הארץ' },
    { id: 5, name: 'סיום' }
  ];

  // פונקציה שבודקת אם השלב נעול
  const isStageDisabled = (stageId) => {
    if (stageId === 0) return false; // מסך הפתיחה תמיד זמין
    const maxAllowedStage = Math.max(...completedStages, 1) + 1;
    return stageId > maxAllowedStage;
  };

  return (
    <div className="sticky top-0 bg-white shadow-md p-4 z-40">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          {/* ניווט שלבים */}
          <div className="flex flex-wrap gap-2">
            {stages.map((stage) => {
              const isDisabled = isStageDisabled(stage.id);
              const isCompleted = completedStages.includes(stage.id);
              return (
                <button
                  key={stage.id}
                  onClick={() => !isDisabled && onStageSelect(stage.id)}
                  className={`
                    px-3 py-1 rounded-lg text-sm transition-colors
                    ${currentStage === stage.id
                      ? 'bg-green-500 text-white'
                      : isCompleted
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : isDisabled
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                  disabled={isDisabled}
                >
                  {stage.name}
                  {isCompleted && stage.id !== 0 && ' ✓'}
                </button>
              );
            })}
          </div>

          {/* כפתור ריסט */}
          <button
            onClick={onReset}
            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            התחל מחדש
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;