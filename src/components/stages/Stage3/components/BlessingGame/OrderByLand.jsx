import React, { useState } from 'react';
import { FULL_VERSE } from '../../data/blessings';

const OrderByLand = ({ species, correctOrder, onComplete }) => {
  const [orderedSpecies, setOrderedSpecies] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const availableSpecies = Object.values(species).filter(s => s.orderRank !== null);

  const getUnorderedSpecies = () => {
    return availableSpecies.filter(s => !orderedSpecies.includes(s.id));
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetIndex) => {
    if (draggedIndex === null) return;

    const newOrder = [...orderedSpecies];
    newOrder.splice(targetIndex, 0, getUnorderedSpecies()[draggedIndex].id);
    setOrderedSpecies(newOrder);
    setDraggedIndex(null);
  };

  const checkOrder = () => {
    const isCorrect = orderedSpecies.every(
      (speciesId, index) => speciesId === correctOrder[index]
    );

    setShowExplanation(true);

    if (isCorrect) {
      setTimeout(() => {
        onComplete(5);
      }, 2000);
    }
  };

  const renderSpeciesImage = (item) => {
    if (item.image.type === 'image') {
      return (
        <img 
          src={item.image.src} 
          alt={item.name} 
          className="w-12 h-12 object-contain"
        />
      );
    } else if (item.image.type === 'emoji') {
      return (
        <span className="text-4xl" role="img" aria-label={item.name}>
          {item.image.src}
        </span>
      );
    }
    return null;
  };

  const renderVerse = () => {
    const parts = FULL_VERSE.split(' ');
    return (
      <div className="text-center text-lg mb-6 p-4 bg-yellow-50 rounded-lg">
        {parts.map((word, index) => (
          <span
            key={index}
            className={word === 'ארץ' ? 'font-bold text-green-700' : ''}
          >
            {word}{' '}
          </span>
        ))}
      </div>
    );
  };

  const SpeciesBox = ({ item, isDraggable = true, isOrdered = false, index }) => (
    <div
      draggable={isDraggable && !showExplanation}
      onDragStart={() => handleDragStart(index)}
      className={`
        p-3 rounded-lg text-center min-w-[100px] transition-all
        ${isDraggable ? 'cursor-grab hover:scale-105' : ''}
        ${showExplanation 
          ? isOrdered 
            ? item.orderRank === index + 1
              ? 'bg-green-100 border-2 border-green-500'
              : 'bg-red-100 border-2 border-red-500'
            : 'bg-gray-100'
          : 'bg-gray-100'
        }
      `}
    >
      <div className="mb-2">
        {renderSpeciesImage(item)}
      </div>
      <div className="font-bold">{item.name}</div>
      {showExplanation && (
        <p className="text-sm mt-2 text-gray-600">
          {item.explanation}
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-6" dir="rtl">
      {/* הצגת הפסוק */}
      {renderVerse()}

      {/* אזור המינים הלא מסודרים */}
      {!showExplanation && getUnorderedSpecies().length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          {getUnorderedSpecies().map((item, index) => (
            <SpeciesBox key={item.id} item={item} index={index} />
          ))}
        </div>
      )}

      {/* אזור הסידור */}
      <div className="space-y-4">
        <h4 className="text-center font-bold text-gray-700">
          סדרו את הפירות לפי סדר קדימה
        </h4>
        <div className="grid grid-cols-5 gap-2 p-4 bg-green-50 rounded-lg min-h-[150px]">
          {Array.from({ length: 5 }).map((_, index) => {
            const speciesId = orderedSpecies[index];
            const currentSpecies = speciesId ? species[speciesId] : null;

            return (
              <div
                key={index}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                className="border-2 border-dashed border-green-200 rounded-lg p-2 min-h-[100px] flex items-center justify-center"
              >
                {currentSpecies && (
                  <SpeciesBox 
                    item={currentSpecies} 
                    isDraggable={false}
                    isOrdered={true}
                    index={index}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* כפתור בדיקה */}
      {!showExplanation && orderedSpecies.length === 5 && (
        <div className="text-center mt-6">
          <button
            onClick={checkOrder}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            בדוק תשובות
          </button>
        </div>
      )}

      {/* הסבר */}
      {showExplanation && (
        <div className="p-4 rounded-lg bg-green-50 mt-6">
          <h4 className="font-bold text-center text-xl mb-4">
            סדר קדימה בברכות 🌱
          </h4>
          <p className="text-center text-gray-700">
            סדר הקדימה נקבע לפי קרבת המינים למילה "ארץ" בפסוק.
            זית ותמר קודמים כי הם קרובים למילה "ארץ" השנייה,
            אחריהם גפן שקרוב למילה "ארץ" הראשונה,
            ולבסוף תאנה ורימון שרחוקים יותר.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderByLand;