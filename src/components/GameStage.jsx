import React from 'react';
import Stage1 from './stages/Stage1';
import Stage2 from './stages/Stage2';
import Stage3 from './stages/Stage3';
import Stage4 from './stages/Stage4';
import Stage5 from './stages/Stage5';

const GameStage = ({ stage, onComplete }) => {
  const stages = [
    {
      component: Stage1,
      title: 'נטיעות בארץ ישראל',
      description: 'עזרו לנו למצוא את המקומות הנכונים לשתילת עצים מיוחדים בארץ ישראל'
    },
    {
      component: Stage2,
      title: 'שמירה על הסביבה',
      description: 'בואו נלמד איך לשמור על העצים והצמחים שלנו'
    },
    {
      component: Stage3,
      title: 'חגיגת הביכורים',
      description: 'גלו את הסודות של שבעת המינים וחשיבותם'
    },
    {
      component: Stage4,
      title: 'אהבת הארץ',
      description: 'הכירו את המקומות המיוחדים בארץ ישראל'
    },
    {
      component: Stage5,
      title: 'תיקון עולם',
      description: 'עזרו לנו לשמור על הטבע והסביבה'
    }
  ];

  if (stage >= stages.length) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-green-800 mb-6">כל הכבוד!</h2>
        <p className="text-lg text-gray-700 mb-4">השלמתם את כל המשימות בהצלחה!</p>
        <p className="text-lg text-gray-700">עזרתם לנו לשמור על ארץ ישראל היפה שלנו</p>
        <div className="mt-8">
          <img 
            src="/certificate.png" 
            alt="תעודת הצטיינות" 
            className="max-w-sm mx-auto"
          />
        </div>
      </div>
    );
  }

  const CurrentStageComponent = stages[stage].component;

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-green-800 mb-2 text-center">
          {stages[stage].title}
        </h2>
        <p className="text-gray-600 text-center">
          {stages[stage].description}
        </p>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          שלב {stage + 1} מתוך {stages.length}
        </div>
        <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: `${((stage + 1) / stages.length) * 100}%` }}
          ></div>
        </div>
      </div>
      <CurrentStageComponent onComplete={onComplete} />
    </div>
  );
};

export default GameStage;