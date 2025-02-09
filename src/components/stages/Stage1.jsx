import React, { useState } from 'react';
import { MapInteraction } from 'react-map-interaction';

const TREES = [
  {
    id: 'olive',
    name: 'עץ זית',
    hint: 'בהרי הגליל אני גדל, שמן טהור אני נותן למקדש',
    correctRegion: 'galilee',
  },
  {
    id: 'date',
    name: 'עץ תמר',
    hint: 'בבקעת הירדן אני משגשג, מים מהנחל אני סופג',
    correctRegion: 'jordan-valley',
  },
  {
    id: 'grape',
    name: 'גפן',
    hint: 'על הרי יהודה בטרסות, יין משובח אני עושה',
    correctRegion: 'judean-hills',
  },
  {
    id: 'fig',
    name: 'תאנה',
    hint: 'ליד הים אני גדלה, צל ומתיקות אני מעניקה',
    correctRegion: 'coastal-plain',
  },
];

const REGIONS = [
  {
    id: 'galilee',
    name: 'הרי הגליל',
    path: 'M50,50 L100,50 L100,100 L50,100 Z', // This is a placeholder path
  },
  {
    id: 'jordan-valley',
    name: 'בקעת הירדן',
    path: 'M150,50 L200,50 L200,100 L150,100 Z',
  },
  {
    id: 'judean-hills',
    name: 'הרי יהודה',
    path: 'M250,50 L300,50 L300,100 L250,100 Z',
  },
  {
    id: 'coastal-plain',
    name: 'מישור החוף',
    path: 'M350,50 L400,50 L400,100 L350,100 Z',
  },
];

const Stage1 = ({ onComplete }) => {
  const [selectedTree, setSelectedTree] = useState(null);
  const [plantedTrees, setPlantedTrees] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleTreeSelect = (tree) => {
    setSelectedTree(tree);
    setShowHint(true);
  };

  const handleRegionClick = (region) => {
    if (!selectedTree) return;

    if (selectedTree.correctRegion === region.id) {
      setPlantedTrees([...plantedTrees, { ...selectedTree, region: region.id }]);
      setSelectedTree(null);
      setShowHint(false);

      if (plantedTrees.length + 1 === TREES.length) {
        setTimeout(() => {
          onComplete();
        }, 1500);
      }
    } else {
      setAttempts(attempts + 1);
      if (attempts >= 2) {
        setShowHint(true);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-xl text-green-800 mb-2">בואו נעזור לעצים למצוא את הבית שלהם!</h3>
        <p className="text-gray-600">בחרו עץ ומצאו את המקום המתאים לו על המפה</p>
      </div>

      {/* Trees Selection */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {TREES.map((tree) => {
          const isPlanted = plantedTrees.some(planted => planted.id === tree.id);
          return (
            <button
              key={tree.id}
              onClick={() => !isPlanted && handleTreeSelect(tree)}
              className={`px-4 py-2 rounded-lg ${
                isPlanted 
                  ? 'bg-gray-200 cursor-not-allowed' 
                  : selectedTree?.id === tree.id
                    ? 'bg-green-500 text-white'
                    : 'bg-green-100 hover:bg-green-200'
              }`}
              disabled={isPlanted}
            >
              {tree.name}
            </button>
          );
        })}
      </div>

      {/* Hint Display */}
      {showHint && selectedTree && (
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <p className="text-lg">{selectedTree.hint}</p>
        </div>
      )}

      {/* Map Component */}
      <div className="relative border-2 border-green-300 rounded-lg overflow-hidden h-96">
        <MapInteraction>
          <svg width="100%" height="100%" viewBox="0 0 500 500">
            {REGIONS.map((region) => {
              const treePlanted = plantedTrees.find(tree => tree.region === region.id);
              return (
                <g key={region.id} onClick={() => handleRegionClick(region)}>
                  <path
                    d={region.path}
                    className={`${
                      treePlanted 
                        ? 'fill-green-200' 
                        : 'fill-gray-100 hover:fill-green-100'
                    } stroke-gray-400 cursor-pointer transition-colors`}
                  />
                  <text
                    x="50%"
                    y="50%"
                    className="text-sm fill-gray-700"
                    textAnchor="middle"
                  >
                    {region.name}
                  </text>
                  {treePlanted && (
                    <text
                      x="50%"
                      y="70%"
                      className="text-sm fill-green-700"
                      textAnchor="middle"
                    >
                      {treePlanted.name}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </MapInteraction>
      </div>

      {/* Progress Display */}
      <div className="text-center">
        <p className="text-gray-600">
          נשתלו {plantedTrees.length} מתוך {TREES.length} עצים
        </p>
      </div>
    </div>
  );
};

export default Stage1;