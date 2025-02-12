import React, { useState, useEffect } from 'react';
import { FULL_VERSE } from '../../data/blessings';

const OrderByLand = ({ species, correctOrder, onComplete }) => {
  const [orderedSpecies, setOrderedSpecies] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [showError, setShowError] = useState(false);
  const [unorderedSpecies, setUnorderedSpecies] = useState([]);

  // אתחול המינים בסדר רנדומלי
  useEffect(() => {
    const initialSpecies = Object.values(species)
      .filter(s => s.orderRank !== null)
      .sort(() => Math.random() - 0.5);
    setUnorderedSpecies(initialSpecies);
  }, [species]);

  const getUnorderedSpecies = () => {
    return unorderedSpecies.filter(s => !orderedSpecies.includes(s.id));
  };

  const handleDragStart = (e, index) => {
    // מונע גרירת תמונות במובייל
    if (e.type === 'touchstart') {
      e.preventDefault();
    }
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {ז
    e.preventDefault();
  };

  const handleDrop = (targetIndex, fromOrdered = false) => {
    if (draggedIndex === null) return;

    let newOrder = [...orderedSpecies];
    let itemToMove;

    if (fromOrdered) {
      // הזזה מתוך הרשימה המסודרת
      itemToMove = orderedSpecies[draggedIndex];
      newOrder = newOrder.filter((_, idx) => idx !== draggedIndex);
    } else {
      // הזזה מהרשימה הלא מסודרת
      itemToMove = getUnorderedSpecies()[draggedIndex].id;
    }

    // הכנסה למיקום החדש
    newOrder.splice(targetIndex, 0, itemToMove);
    setOrderedSpecies(newOrder);
    setDraggedIndex(null);
    setShowError(false);
  };

  const checkOrder = () => {
    const isCorrect = orderedSpecies.every(
      (speciesId, index) => speciesId === correctOrder[index]
    );

    if (isCorrect) {
      setShowExplanation(true);
      setShowError(false);
      onComplete(5);
    } else {
      setShowError(true);
    }
  };

  const handleTryAgain = () => {
    setOrderedSpecies([]);
    setShowError(false);
  };

  // מטפל באירועי מגע למובייל
  const handleTouch = (e, index, type) => {
    e.preventDefault();
    if (type === 'start') {
      handleDragStart({ type: 'touchstart' }, index);
    } else if (type === 'end' && draggedIndex !== null) {
      const touch = e.changedTouches[0];
      const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
      const dropTarget = elements.find(el => el.dataset.dropTarget);
      if (dropTarget) {
        handleDrop(parseInt(dropTarget.dataset.index), dropTarget.dataset.fromOrdered === 'true');
      }
    }
  };

  const renderSpeciesImage = (item) => {
    if (item.image.type === 'image') {
      return (
        <img 
          src={item.image.src} 
          alt={item.name} 
          className="w-12 h-12 object-contain pointer-events-none"
          draggable="false"
        />
      );
    } else if (item.image.type === 'emoji') {
      return (
        <span className="text-4xl pointer-events-none" role="img" aria-label={item.name}>
          {item.image.src}
        </span>
      );
    }
    return null;
  };

  const SpeciesBox = ({ item, isDraggable = true, isOrdered = false, index }) => (
    <div
      draggable={!showExplanation && isDraggable}
      onDragStart={(e) => handleDragStart(e, index)}
      onTouchStart={(e) => handleTouch(e, index, 'start')}
      onTouchEnd={(e) => handleTouch(e, index, 'end')}
      data-from-ordered={isOrdered}
      className={`
        p-3 rounded-lg text-center min-w-[100px] transition-all touch-manipulation
        ${isDraggable && !showExplanation ? 'cursor-grab hover:scale-105' : ''}
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
     {/*  {renderVerse()} */}

      {/* אזור המינים הלא מסודרים */}
      {!showExplanation && getUnorderedSpecies().length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          {getUnorderedSpecies().map((item, index) => (
            <SpeciesBox 
              key={item.id} 
              item={item} 
              index={index}
              isDraggable={!showExplanation}
            />
          ))}
        </div>
      )}

      {/* אזור הסידור */}
      <div className="space-y-4">
        <h4 className="text-center font-bold text-gray-700">
          סדרו את הפירות לפי סדר קדימה
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 p-4 bg-green-50 rounded-lg min-h-[150px]">
          {Array.from({ length: 5 }).map((_, index) => {
            const speciesId = orderedSpecies[index];
            const currentSpecies = speciesId ? species[speciesId] : null;

            return (
              <div
                key={index}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index, true)}
                data-drop-target="true"
                data-index={index}
                className="border-2 border-dashed border-green-200 rounded-lg p-2 min-h-[100px] flex items-center justify-center"
              >
                {currentSpecies && (
                  <SpeciesBox 
                    item={currentSpecies} 
                    isDraggable={!showExplanation}
                    isOrdered={true}
                    index={index}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* כפתורי פעולה */}
      <div className="flex justify-center space-x-4 rtl:space-x-reverse">
        {showError && (
          <button
            onClick={handleTryAgain}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            נסה שוב
          </button>
        )}

        {!showExplanation && orderedSpecies.length === 5 && !showError && (
          <button
            onClick={checkOrder}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            בדוק תשובות
          </button>
        )}
      </div>

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