import React from 'react';
import Stage1 from './stages/Stage1';
import Stage2 from './stages/Stage2';
import Stage3 from './stages/Stage3';
import Stage4 from './stages/Stage4';
import Stage5 from './stages/Stage5';

const GameStage = ({ stage, onComplete }) => {
  // שלבי המשחק
  const stages = [
    {
      id: 1,
      component: Stage1,
      title: 'נטיעות בארץ ישראל',
      description: 'עזרו לעצים למצוא את המקום המתאים להם'
    },
    {
      id: 2,
      component: Stage2,
      title: 'שמירה על הסביבה',
      description: 'בואו נלמד איך לשמור על הטבע שלנו'
    },
    {
      id: 3,
      component: Stage3,
      title: 'חגיגת ביכורים',
      description: 'הכירו את חגיגת הביכורים'
    },
    {
      id: 4,
      component: Stage4,
      title: 'אהבת הארץ',
      description: 'גלו את הקשר המיוחד לארץ ישראל'
    },
    {
      id: 5,
      component: Stage5,
      title: 'סיום',
      description: 'כל הכבוד! השלמתם את כל המשימות'
    }
  ];

  // מציאת השלב הנוכחי
  const currentStage = stages.find(s => s.id === stage);
  
  if (!currentStage) {
    return null;
  }

  const CurrentStageComponent = currentStage.component;

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-2 text-center">
        {currentStage.title}
      </h2>
      <p className="text-gray-600 text-center mb-6">
        {currentStage.description}
      </p>
      <CurrentStageComponent onComplete={onComplete} />
    </div>
  );
};

export default GameStage;