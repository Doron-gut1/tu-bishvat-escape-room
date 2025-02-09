import React, { useState } from 'react';
import GameIntro from './components/GameIntro';
import GameStage from './components/GameStage';

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);

  const startGame = () => {
    setGameStarted(true);
  };

  const moveToNextStage = () => {
    setCurrentStage(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 p-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
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