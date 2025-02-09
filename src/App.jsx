import React, { useState } from 'react';
import GameIntro from './components/GameIntro';
import GameStage from './components/GameStage';
import NavigationBar from './components/NavigationBar';

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState(new Set());

  const startGame = () => {
    setGameStarted(true);
    setCurrentStage(1);
  };

  const moveToNextStage = () => {
    setCompletedStages(prev => new Set(prev).add(currentStage));
    setCurrentStage(prev => prev + 1);
  };

  const handleStageSelect = (stage) => {
    // אם זה השלב הראשון, נאתחל את המשחק
    if (stage === 0) {
      setGameStarted(false);
      setCurrentStage(0);
      return;
    }

    // מעבר לשלב רק אם השלב הקודם הושלם או שזה שלב שכבר הושלם
    if (stage <= Math.max(...completedStages) + 1 || completedStages.has(stage - 1)) {
      setGameStarted(true);
      setCurrentStage(stage);
    }
  };

  const handleReset = () => {
    if (window.confirm('האם אתה בטוח שברצונך להתחיל מחדש? כל ההתקדמות תימחק')) {
      setGameStarted(false);
      setCurrentStage(0);
      setCompletedStages(new Set());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200" dir="rtl">
      {/* סרגל ניווט */}
      <NavigationBar 
        currentStage={currentStage}
        onStageSelect={handleStageSelect}
        onReset={handleReset}
      />

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