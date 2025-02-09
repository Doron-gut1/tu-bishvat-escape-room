import React, { useState } from 'react';
import { TREES } from '../data/trees';

const TreeUsages = ({ onComplete, addScore }) => {
  const [selectedTree, setSelectedTree] = useState(null);
  const [selectedUsages, setSelectedUsages] = useState([]);

  const handleTreeSelect = (tree) => {
    setSelectedTree(tree);
    setSelectedUsages([]);
  };

  const toggleUsageSelect = (usage) => {
    if (selectedUsages.includes(usage)) {
      setSelectedUsages(selectedUsages.filter(u => u !== usage));
    } else {
      setSelectedUsages([...selectedUsages, usage]);
    }
  };

  const handleSubmit = () => {
    const correctUsages = TREES.find(t => t.name === selectedTree).usages;
    const isCorrect = 
      JSON.stringify(selectedUsages.sort()) === 
      JSON.stringify(correctUsages.sort());
    
    if (isCorrect) {
      addScore(10);
    }

    if (TREES.findIndex(t => t.name === selectedTree) === TREES.length - 1) {
      onComplete();
    } else {
      const nextTree = TREES[TREES.findIndex(t => t.name === selectedTree) + 1];
      handleTreeSelect(nextTree.name); 
    }
  };

  return (
    <div>
      <h3>בחר את השימושים המתאימים לעץ הנבחר</h3>
      <p>
        <strong>{selectedTree || 'בחר עץ מהרשימה...'}</strong>  
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {TREES.map(tree => (
          <button
            key={tree.name}
            onClick={() => handleTreeSelect(tree.name)}
            className={`
              ${selectedTree === tree.name
                ? 'bg-green-200'
                : 'bg-gray-100'
              }
              p-4 rounded-lg transition-colors
            `}  
          >
            {tree.name}
          </button>  
        ))}
      </div>

      {selectedTree && (
        <>
          <h4 className="mb-2">בחר שימושים:</h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {TREES
              .find(t => t.name === selectedTree)
              .allUsages
              .map(usage => (
                <div
                  key={usage} 
                  onClick={() => toggleUsageSelect(usage)}
                  className={`
                    ${selectedUsages.includes(usage)
                      ? 'bg-green-200'
                      : 'bg-gray-100'
                    }
                    p-4 rounded-lg transition-colors cursor-pointer
                  `}
                >
                  {usage}
                </div>  
              ))
            }
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg"
          >
            אישור  
          </button>
        </>
      )}
    </div>
  );
};

export default TreeUsages;