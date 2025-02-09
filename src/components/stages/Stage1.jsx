import React, { useState } from 'react';

const Stage1 = ({ onComplete }) => {
  const [selectedTree, setSelectedTree] = useState(null);
  const [plantedTrees, setPlantedTrees] = useState([]);

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
    },
    {
      id: 'jordan-valley',
      name: 'בקעת הירדן',
    },
    {
      id: 'judean-hills',
      name: 'הרי יהודה',
    },
    {
      id: 'coastal-plain',
      name: 'מישור החוף',
    },
  ];

  const handleTreeSelect = (tree) => {
    setSelectedTree(tree);
  };

  const handleRegionClick = (region) => {
    if (!selectedTree) return;

    if (selectedTree.correctRegion === region.id) {
      setPlantedTrees([...plantedTrees, { ...selectedTree, region: region.id }]);
      setSelectedTree(null);

      if (plantedTrees.length + 1 === TREES.length) {
        setTimeout(() => {
          onComplete();
        }, 1500);
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
      {selectedTree && (
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <p className="text-lg">{selectedTree.hint}</p>
        </div>
      )}

      {/* Map Component */}
      <div className="relative border-2 border-green-300 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4">
          {REGIONS.map((region) => {
            const treePlanted = plantedTrees.find(tree => tree.region === region.id);
            return (
              <div
                key={region.id}
                onClick={() => handleRegionClick(region)}
                className={`
                  p-4 rounded-lg text-center cursor-pointer transition-colors
                  ${treePlanted 
                    ? 'bg-green-200' 
                    : 'bg-gray-100 hover:bg-green-100'
                  }
                `}
              >
                <h4 className="font-bold mb-2">{region.name}</h4>
                {treePlanted && (
                  <p className="text-green-700">{treePlanted.name}</p>
                )}
              </div>
            );
          })}
        </div>
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