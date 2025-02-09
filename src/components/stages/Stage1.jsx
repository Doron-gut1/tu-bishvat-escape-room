import React, { useState } from 'react';

const TREES = [
  {
    id: 'olive',
    name: 'עץ זית',
    hint: 'בהרי הגליל אני גדל, שמן טהור אני נותן למקדש',
    correctRegion: 'galilee',
    source: 'וַיִּקַּח מִפִּרְיָהּ וַיֹּאכַל וַיִּתֵּן גַּם לְאִישָׁהּ עִמָּהּ וַיֹּאכַל - בראשית ג׳, ו׳'
  },
  {
    id: 'date',
    name: 'עץ תמר',
    hint: 'בבקעת הירדן אני משגשג, מים מהנחל אני סופג',
    correctRegion: 'jordan-valley',
    source: 'צַדִּיק כַּתָּמָר יִפְרָח - תהילים צ״ב, י״ג'
  },
  {
    id: 'grape',
    name: 'גפן',
    hint: 'על הרי יהודה בטרסות, יין משובח אני עושה',
    correctRegion: 'judean-hills',
    source: 'אָנֹכִי הַגֶּפֶן וְאַתֶּם הַשָּׂרִיגִים - יוחנן ט״ו, ה׳'
  },
  {
    id: 'fig',
    name: 'תאנה',
    hint: 'ליד הים אני גדלה, צל ומתיקות אני מעניקה',
    correctRegion: 'coastal-plain',
    source: 'וְיָשְׁבוּ אִישׁ תַּחַת גַּפְנוֹ וְתַחַת תְּאֵנָתוֹ - מלכים א׳ ה׳, ה׳'
  }
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
  }
];

const Stage1 = ({ onComplete }) => {
  const [selectedTree, setSelectedTree] = useState(null);
  const [plantedTrees, setPlantedTrees] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [showBiblical, setShowBiblical] = useState(null);

  const handleTreeSelect = (tree) => {
    setSelectedTree(tree);
    setShowHint(true);
  };

  const handleRegionClick = (region) => {
    if (!selectedTree) return;

    if (selectedTree.correctRegion === region.id) {
      setPlantedTrees([...plantedTrees, { ...selectedTree, region: region.id }]);
      setSelectedTree(null);
      setShowBiblical(selectedTree);

      if (plantedTrees.length + 1 === TREES.length) {
        setTimeout(() => {
          onComplete();
        }, 3000);
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
              className={`
                px-4 py-2 rounded-lg transition-all transform hover:scale-105
                ${isPlanted 
                  ? 'bg-gray-200 cursor-not-allowed' 
                  : selectedTree?.id === tree.id
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-green-100 hover:bg-green-200'
                }
              `}
              disabled={isPlanted}
            >
              {tree.name}
            </button>
          );
        })}
      </div>

      {/* Hint Display */}
      {selectedTree && (
        <div className="text-center p-4 bg-yellow-50 rounded-lg animate-fade-in">
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
                  p-4 rounded-lg text-center cursor-pointer transition-all transform hover:scale-105
                  ${treePlanted 
                    ? 'bg-green-200' 
                    : 'bg-gray-100 hover:bg-green-100'
                  }
                `}
              >
                <h4 className="font-bold mb-2">{region.name}</h4>
                {treePlanted && (
                  <div className="text-green-700 font-bold animate-fade-in">
                    {treePlanted.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Biblical Source Modal */}
      {showBiblical && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-2xl font-bold text-green-800 mb-4">{showBiblical.name} במקורות</h3>
            <p className="text-lg mb-6 pr-4 border-r-4 border-green-500">{showBiblical.source}</p>
            <button 
              onClick={() => setShowBiblical(null)}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
            >
              סגור
            </button>
          </div>
        </div>
      )}

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