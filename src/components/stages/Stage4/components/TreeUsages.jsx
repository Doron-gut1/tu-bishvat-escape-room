import React, { useState } from 'react';
import { TREES } from '../data/trees';

const TreeUsages = ({ onComplete, addScore }) => {
  const [selectedTree, setSelectedTree] = useState(null);
  const [draggedUsage, setDraggedUsage] = useState(null);

  const handleTreeSelect = (tree) => {
    setSelectedTree(tree);
  };

  const handleDragStart = (usage) => {
    setDraggedUsage(usage);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = () => {
    if (!draggedUsage) return;

    const isCorrect = TREES
      .find(t => t.name === selectedTree)
      .usages
      .includes(draggedUsage);
    
    if (isCorrect) {
      addScore(10);
    }

    setDraggedUsage(null);

    const nextIndex = TREES.findIndex(t => t.name === selectedTree) + 1;
    if (nextIndex === TREES.length) {
      onComplete();  
    } else {
      setSelectedTree(TREES[nextIndex].name);
    }
  };

  return (
    <div>
      <h3>גרור את השימושים המתאימים לעץ הנבחר</h3>
      
      <div className="flex justify-around items-start mt-8">
        <div>
          <h4 className="text-xl text-center mb-4">עצים</h4>
          <div className="grid grid-cols-2 gap-4">
            {TREES.map(tree => (
              <button
                key={tree.name}
                onClick={() => handleTreeSelect(tree.name)}
                className={`p-4 rounded-lg transition-colors ${
                  selectedTree === tree.name
                    ? 'bg-green-200 text-green-800'
                    : 'bg-gray-100 hover:bg-gray-200'  
                }`}
              >
                {tree.name}
              </button>
            ))}
          </div>
        </div>
        
        <div 
          className="w-1/2 border-4 border-dashed border-gray-400 rounded-lg p-4 min-h-[300px]"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <h4 className="text-xl text-center mb-4">
            גרור לכאן את השימושים של{' '}
            <span className="text-green-500">{selectedTree}</span>
          </h4>
          {selectedTree && (
            <div className="space-y-4">
              {TREES
                .find(t => t.name === selectedTree)
                .placedUsages
                .map((usage, index) => (
                  <div 
                    key={usage + index}
                    className="bg-green-500 text-white rounded-lg p-2 text-center"  
                  >
                    {usage}  
                  </div>
                ))
              }
            </div>
          )}
        </div>
        
        <div>
          <h4 className="text-xl text-center mb-4">שימושים</h4>
          <div className="grid grid-cols-2 gap-4">
            {TREES
              .find(t => t.name === selectedTree)
              ?.allUsages
              .filter(usage => !TREES.find(t => t.name === selectedTree).placedUsages.includes(usage))  
              .map(usage => (
                <div
                  key={usage} 
                  draggable
                  onDragStart={() => handleDragStart(usage)}
                  className="bg-gray-100 p-4 rounded-lg border border-gray-400 
                             hover:bg-gray-200 cursor-move text-center"
                >
                  {usage}
                </div>
              ))
            }
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default TreeUsages;