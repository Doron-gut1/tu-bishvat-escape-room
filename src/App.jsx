import React, { useState } from 'react';
import GameIntro from './components/GameIntro';
import GameStage from './components/GameStage';
import NavigationBar from './components/NavigationBar';

const App = () => {
  // המצב הבסיסי של המשחק
  const [gameStarted, setGameStarted] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState([]);

  const startGame = () => {
    setGameStarted(true);
    // התחלה משלב ראשון - נטיעות בארץ ישראל
    setCurrentStage(1);
  };

  const moveToNextStage = () => {
    const nextStage = currentStage + 1;
    // מוסיפים את השלב הנוכחי לרשימת השלבים שהושלמו
    if (!completedStages.includes(currentStage)) {
      setCompletedStages(prev => [...prev, currentStage]);
    }
    setCurrentStage(nextStage);
  };

  const handleStageSelect = (stage) => {
    // אם זה מסך הפתיחה
    if (stage === 0) {
      setGameStarted(false);
      setCurrentStage(0);
      return;
    }

    // בודקים אם השלב זמין
    const maxAllowedStage = completedStages.length > 0 
      ? Math.max(...completedStages) + 1 
      : 1;

    if (stage <= maxAllowedStage) {
      setGameStarted(true);
      setCurrentStage(stage);
    }
  };

  const handleReset = () => {
    if (window.confirm('האם אתה בטוח שברצונך להתחיל מחדש? כל ההתקדמות תימחק')) {
      setGameStarted(false);
      setCurrentStage(0);
      setCompletedStages([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200" dir="rtl">
      {/* סרגל ניווט - מוצג רק אם המשחק התחיל */}
      {gameStarted && (
        <NavigationBar 
          currentStage={currentStage}
          completedStages={completedStages}
          onStageSelect={handleStageSelect}
          onReset={handleReset}
        />
      )}

      {/* תוכן המשחק */}
      <div className="max-w-4xl mx-auto p-4">
        {!gameStarted ? (
          <GameIntro onStart={startGame} />
        ) : (
          <GameStage 
            stage={currentStage} 
            onComplete={moveToNextStage} 
          />
        )}
      </div>
    </div>
  );
};

export default App;