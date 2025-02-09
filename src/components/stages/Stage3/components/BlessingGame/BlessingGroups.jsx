import React, { useState } from 'react';

const BlessingGroups = ({ blessingGroups, species, onComplete }) => {
  const [assignments, setAssignments] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [draggedSpecies, setDraggedSpecies] = useState(null);

  // הפיכת אובייקט המינים למערך
  const speciesArray = Object.values(species);

  const handleDragStart = (speciesId) => {
    setDraggedSpecies(speciesId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (groupId) => {
    if (!draggedSpecies) return;

    setAssignments(prev => ({
      ...prev,
      [draggedSpecies]: groupId
    }));

    setDraggedSpecies(null);
  };

  const checkAnswers = () => {
    let correct = true;
    let totalAssigned = 0;

    Object.entries(assignments).forEach(([speciesId, assignedGroup]) => {
      if (species[speciesId].blessing !== assignedGroup) {
        correct = false;
      }
      totalAssigned++;
    });

    // בודק שכל המינים שובצו
    if (totalAssigned !== speciesArray.length) {
      correct = false;
    }

    setShowExplanation(true);

    if (correct) {
      setTimeout(() => {
        onComplete(5); // 5 נקודות על השלמת המשימה
      }, 2000);
    }
  };

  const isSpeciesCorrect = (speciesId) => {
    if (!showExplanation) return null;
    return species[speciesId].blessing === assignments[speciesId];
  };

  return (
    <div className="space-y-8">
      {/* אזור המינים שצריך לסדר */}
      <div className="flex flex-wrap justify-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
        {speciesArray.map((item) => {
          const isAssigned = assignments[item.id];
          const isCorrect = isSpeciesCorrect(item.id);
          
          return (
            <div
              key={item.id}
              draggable={!isAssigned && !showExplanation}
              onDragStart={() => handleDragStart(item.id)}
              className={`
                p-3 rounded-lg cursor-grab text-center min-w-[100px]
                transition-all transform hover:scale-105
                ${isAssigned ? 'opacity-50' : 'bg-gray-100'}
                ${showExplanation && isCorrect !== null
                  ? isCorrect
                    ? 'bg-green-100 border-2 border-green-500'
                    : 'bg-red-100 border-2 border-red-500'
                  : ''
                }
              `}
            >
              <span className="text-2xl mb-2">{item.image}</span>
              <div className="font-bold">{item.name}</div>
            </div>
          );
        })}
      </div>

      {/* קבוצות הברכות */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.values(blessingGroups).map((group) => {
          const assignedSpecies = speciesArray.filter(
            item => assignments[item.id] === group.id
          );

          return (
            <div
              key={group.id}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(group.id)}
              className="p-4 rounded-lg bg-green-50 space-y-4"
            >
              <h4 className="font-bold text-center text-green-800">
                {group.name}
              </h4>
              
              <div className="min-h-[100px] border-2 border-dashed border-green-200 rounded-lg p-2">
                {assignedSpecies.map(item => (
                  <div
                    key={item.id}
                    className="text-center p-2"
                  >
                    <span className="text-xl">{item.image}</span>
                    <div>{item.name}</div>
                  </div>
                ))}
              </div>

              {showExplanation && (
                <p className="text-sm text-gray-600">
                  {group.description}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* כפתור בדיקה */}
      {!showExplanation && (
        <div className="text-center mt-6">
          <button
            onClick={checkAnswers}
            disabled={Object.keys(assignments).length !== speciesArray.length}
            className={`
              px-6 py-2 rounded-lg text-white
              ${Object.keys(assignments).length === speciesArray.length
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-400 cursor-not-allowed'
              }
            `}
          >
            בדוק תשובות
          </button>
        </div>
      )}

      {/* הסבר */}
      {showExplanation && (
        <div className="p-4 rounded-lg bg-green-50 mt-6">
          <h4 className="font-bold text-center text-xl mb-4">
            הידעת? 🤔
          </h4>
          <p className="text-center text-gray-700">
            סדר הברכות נקבע לפי חשיבות המינים. 
            מזונות/המוציא קודמים כי הם עיקר המזון, 
            הגפן קודמת כי היא ברכה מיוחדת,
            ואחריהם ברכת העץ לשאר הפירות.
          </p>
        </div>
      )}
    </div>
  );
};

export default BlessingGroups;