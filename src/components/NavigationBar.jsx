import React from 'react';

const NavigationBar = ({ currentStage, onStageSelect, onReset }) => {
  const stages = [
    { id: 0, name: 'התחלה' },
    { id: 1, name: 'שלב 1: נטיעות' },
    { id: 2, name: 'שלב 2: שמירת הסביבה' },
    { id: 3, name: 'שלב 3: חגיגת ביכורים' },
    { id: 4, name: 'שלב 4: חידון' },
    { id: 5, name: 'סיום' }
  ];

  return (
    <div className="sticky top-0 bg-white shadow-md p-4 z-40">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          {/* ניווט שלבים */}
          <div className="flex space-x-2 rtl:space-x-reverse">
            {stages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => onStageSelect(stage.id)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  currentStage === stage.id
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {stage.name}
              </button>
            ))}
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