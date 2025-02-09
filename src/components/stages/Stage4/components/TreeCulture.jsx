import React, { useState } from 'react';
import { TREES } from '../data/trees';

const TreeCulture = ({ onComplete }) => {
  const [selectedTree, setSelectedTree] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  const handleTreeSelect = (tree) => {
    setSelectedTree(tree);
  };

  const handleNext = () => {
    const currentIndex = TREES.findIndex(t => t.name === selectedTree);

    if (currentIndex === TREES.length - 1) {
      setShowSummary(true);
    } else {
      setSelectedTree(TREES[currentIndex + 1].name);
    }
  };

  return (
    <div className="bg-green-50 px-4 py-8 rounded-lg min-h-[500px]">
      <h3 className="text-center mb-8">מידע תרבותי על העצים</h3>

      {showSummary ? (
        <div className="text-center space-y-4">
          <h3 className="text-2xl mb-2">סיכום</h3>
          <p>
            למדנו על המשמעות התרבותית והסמלית של עצי ארץ ישראל במסורת היהודית.
            כל עץ מספר סיפור ייחודי ומרתק!  
          </p>
          <p>
            מזית המסמל שלום ועד רימון המייצג ריבוי מצוות, 
            העצים שזורים בתרבות, בפולקלור ובמקורות  שלנו.
          </p>
          <button 
            onClick={onComplete}
            className="mt-8 bg-green-500 text-white text-lg px-6 py-2 rounded-lg shadow hover:bg-green-600"
          >
            סיום
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-5 gap-4 mb-8">
            {TREES.map(tree => (
              <div
                key={tree.name}
                onClick={() => handleTreeSelect(tree.name)}
                className={`p-2 rounded-lg transition-colors cursor-pointer text-center ${
                  selectedTree === tree.name
                    ? 'bg-green-200' 
                    : 'bg-white hover:bg-green-100'
                }`}
              >
                <img 
                  src={tree.imageUrl} 
                  alt={tree.name}
                  className="w-full h-32 object-cover rounded-lg mb-1"
                />
                <span>{tree.name}</span>
              </div>  
            ))}
          </div>

          {selectedTree && (
            <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
              <h4 className="text-2xl font-bold mb-2 text-center">{selectedTree}</h4>
              {TREES
                .find(t => t.name === selectedTree)
                .culturalFacts
                .map((fact, index) => (
                  <p key={index}>{fact}</p>  
                ))
              }
              <button
                onClick={handleNext} 
                className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 block mx-auto"
              >
                {TREES.findIndex(t => t.name === selectedTree) === TREES.length - 1
                  ? 'סיים' 
                  : 'הבא'
                }
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TreeCulture;