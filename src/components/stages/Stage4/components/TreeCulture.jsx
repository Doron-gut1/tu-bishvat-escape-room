import React, { useState } from 'react';
import { TREES } from '../data/trees';

const TreeCulture = ({ onComplete }) => {
  const [selectedPiece, setSelectedPiece] = useState(null);

  const handlePieceSelect = (piece) => {
    setSelectedPiece(piece);
  };

  const pieces = TREES.map(tree => ({
    id: tree.name,
    image: tree.image,
    content: tree.culturalFacts 
  })).flat();

  return (
    <div className="bg-green-50 px-4 py-8 rounded-lg">
      <h3 className="text-center mb-8">מידע תרבותי על העצים</h3>

      {selectedPiece ? (
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
          <h4 className="text-xl font-bold text-center">
            {selectedPiece.id}  
          </h4>
          <img 
            src={selectedPiece.image}
            alt={selectedPiece.id}
            className="w-64 h-64 object-contain mx-auto"  
          />
          {selectedPiece.content.map((fact, index) => (
            <p key={index} className="text-lg leading-7">
              {fact}
            </p>  
          ))}
          <button
            onClick={() => setSelectedPiece(null)} 
            className="bg-green-500 text-white px-6 py-2 rounded-lg mt-4 mx-auto block"
          >
            חזור  
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-6">
            {pieces.map(piece => (
              <div
                key={piece.id} 
                onClick={() => handlePieceSelect(piece)}
                className="bg-white p-4 rounded-lg shadow-md cursor-pointer transition-shadow hover:shadow-lg"
              >
                <img
                  src={piece.image} 
                  alt={piece.id}
                  className="w-32 h-32 object-contain mx-auto mb-2"  
                />
                <div className="text-center font-bold">{piece.id}</div>
              </div>  
            ))}
          </div>
          
          <button
            onClick={onComplete} 
            className="bg-green-500 text-white px-6 py-2 rounded-lg mt-8 mx-auto block"  
          >
            סיים  
          </button>
        </>
      )}
    </div>
  );
};

export default TreeCulture;