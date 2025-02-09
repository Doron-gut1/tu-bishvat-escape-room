import React, { useState } from 'react';
import { Wheat, Grape, Palm, Cherry, Tree } from 'lucide-react';

const SpeciesIcons = {
  wheat: <Wheat className="w-8 h-8 text-yellow-600" />,
  barley: <Wheat className="w-8 h-8 text-yellow-700" />,
  grape: <Grape className="w-8 h-8 text-purple-600" />,
  fig: <Cherry className="w-8 h-8 text-red-600" />,
  pomegranate: <Cherry className="w-8 h-8 text-pink-600" />,
  olive: <Tree className="w-8 h-8 text-green-700" />,
  date: <Palm className="w-8 h-8 text-green-600" />
};

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

    if (totalAssigned !== speciesArray.length) {
      correct = false;
    }

    setShowExplanation(true);

    if (correct) {
      setTimeout(() => {
        onComplete(5);
      }, 2000);
    }
  };

  const isSpeciesCorrect = (speciesId) => {
    if (!showExplanation) return null;
    return species[speciesId].blessing === assignments[speciesId];
  };

  return (
    <div className="space-y-8">
      {/* אזור המינים */}
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
                p-4 rounded-lg cursor-grab text-center min-w-[120px]
                transition-all transform hover:scale-105
                ${isAssigned ? 'opacity-50' : 'bg-white shadow-md'}
                ${showExplanation && isCorrect !== null
                  ? isCorrect
                    ? 'bg-green-100 border-2 border-green-500'
                    : 'bg-red-100 border-2 border-red-500'
                  : ''
                }
              `}
            >
              <div className="mb-2 flex justify-center">
                {SpeciesIcons[item.id]}
              </div>
              <div className="font-bold text-gray-800">{item.name}</div>
            </div>
          );
        })}
      </div>

      {/* קבוצות הברכות */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.values(blessingGroups).map((group) => {
          const assignedSpecies = speciesArray.filter(
            item => assignments[item.id] === group.id
          );

          return (
            <div
              key={group.id}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(group.id)}
              className="p-6 rounded-lg bg-green-50 space-y-4"
            >
              <h4 className="font-bold text-center text-green-800 text-lg">
                {group.name}
              </h4>
              
              <div className="min-h-[150px] border-2 border-dashed border-green-200 rounded-lg p-4 flex flex-col items-center gap-4">
                {assignedSpecies.map(item => (
                  <div
                    key={item.id}
                    className="flex flex-col items-center gap-2 p-2"
                  >
                    {SpeciesIcons[item.id]}
                    <div className="font-medium">{item.name}</div>
                  </div>
                ))}
              </div>

              {showExplanation && (
                <p className="text-sm text-gray-600 text-center">
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
              px-6 py-3 rounded-lg text-white font-medium transition-colors
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
        <div className="p-6 rounded-lg bg-green-50 mt-6">
          <h4 className="font-bold text-center text-xl mb-4 text-green-800">
            הידעת? 🤔
          </h4>
          <p className="text-center text-gray-700 leading-relaxed">
            סדר הברכות נקבע לפי חשיבות המינים. 
            ברכת המזונות/המוציא קודמת כי היא על עיקר המזון, 
            הגפן קודמת כי היא ברכה מיוחדת,
            ואחריהן ברכת העץ לשאר הפירות.
          </p>
        </div>
      )}
    </div>
  );
};

export default BlessingGroups;