import React, { useState, useEffect } from 'react';
import { FULL_VERSE } from '../../data/blessings';

const OrderByLand = ({ species, correctOrder, onComplete }) => {
  const [orderedSpecies, setOrderedSpecies] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [initialSpecies, setInitialSpecies] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [swapMode, setSwapMode] = useState(false);
  const [firstSwapSelection, setFirstSwapSelection] = useState(null);

  // בדיקת מובייל בטעינה ובשינוי גודל המסך
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const validSpecies = Object.values(species).filter(s => s.orderRank !== null);
    const shuffledSpecies = [...validSpecies].sort(() => Math.random() - 0.5);
    setInitialSpecies(shuffledSpecies);
  }, [species]);

  const getUnorderedSpecies = () => {
    return initialSpecies.filter(s => !orderedSpecies.includes(s.id));
  };

  // טיפול במיקום מינים במובייל
  const handleSpeciesClick = (speciesId) => {
    if (!isMobile || showExplanation) return;

    if (swapMode) {
      // מצב החלפה
      if (firstSwapSelection === null) {
        setFirstSwapSelection(speciesId);
      } else {
        // מבצע החלפה
        const newOrder = [...orderedSpecies];
        const firstIndex = newOrder.indexOf(firstSwapSelection);
        const secondIndex = newOrder.indexOf(speciesId);
        
        if (firstIndex !== -1 && secondIndex !== -1) {
          // החלפה בין שני מיקומים
          [newOrder[firstIndex], newOrder[secondIndex]] = [newOrder[secondIndex], newOrder[firstIndex]];
        }
        
        setOrderedSpecies(newOrder);
        setFirstSwapSelection(null);
        setSwapMode(false);
      }
    } else {
      // מצב הוספה רגיל
      if (!orderedSpecies.includes(speciesId)) {
        setOrderedSpecies([...orderedSpecies, speciesId]);
      }
    }
  };

  const handleDragStart = (index) => {
    if (!isMobile) {
      setDraggedIndex(index);
    }
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
      onComplete(5);
    }
  };

  const handleReset = () => {
    setOrderedSpecies([]);
    setShowExplanation(false);
    setSwapMode(false);
    setFirstSwapSelection(null);
    setInitialSpecies([...initialSpecies].sort(() => Math.random() - 0.5));
  };

  const removeFromOrder = (speciesId) => {
    if (!showExplanation) {
      setOrderedSpecies(orderedSpecies.filter(id => id !== speciesId));
    }
  };

  const renderSpeciesImage = (item) => {
    // בחירת התמונה המתאימה - אם זה יין אז משתמשים בתמונה החלופית
    const useAlternate = item.id === 'wine';
    const imageData = useAlternate ? item.alternateImage : item.image;
    const displayName = useAlternate ? item.alternateName : item.name;
  
    console.log('Rendering species:', {
      id: item.id,
      imageData,
      displayName
    });
  
    if (imageData.type === 'image') {
      return (
        <img 
          src={imageData.src}
          alt={displayName}
          className="w-12 h-12 object-contain"
        />
      );
    } else if (imageData.type === 'emoji') {
      return (
        <span className="text-4xl" role="img" aria-label={displayName}>
          {imageData.src}
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
      draggable={!isMobile && isDraggable && !showExplanation}
      onDragStart={() => handleDragStart(index)}
      onClick={() => handleSpeciesClick(item.id)}
      className={`
        p-3 rounded-lg text-center min-w-[100px] transition-all
        ${isMobile ? 'active:scale-95' : isDraggable ? 'cursor-grab hover:scale-105' : ''}
        ${isOrdered && firstSwapSelection === item.id ? 'ring-4 ring-blue-500 scale-105' : ''}
        ${showExplanation 
          ? isOrdered 
            ? item.orderRank === index + 1
              ? 'bg-green-100 border-2 border-green-500'
              : 'bg-red-100 border-2 border-red-500'
            : 'bg-gray-100'
          : swapMode && isOrdered
            ? 'bg-blue-50 hover:bg-blue-100'
            : 'bg-gray-100'
        }
      `}
    >
      <div className="mb-2">
        {renderSpeciesImage(item)}
      </div>
      <div className="font-bold">
        {item.id === 'wine' ? item.alternateName : item.name}
      </div>
      {showExplanation && (
        <p className="text-sm mt-2 text-gray-600">
          {item.explanation}
        </p>
      )}
      {isOrdered && !showExplanation && isMobile && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeFromOrder(item.id);
          }}
          className="mt-2 text-sm text-red-600 hover:text-red-700"
        >
          הסר
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-6" dir="rtl">
      {renderVerse()}

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
        <div className={`
          grid gap-2 p-4 bg-green-50 rounded-lg min-h-[150px]
          ${isMobile ? 'grid-cols-1' : 'grid-cols-5'}
        `}>
          {Array.from({ length: 5 }).map((_, index) => {
            const speciesId = orderedSpecies[index];
            const currentSpecies = speciesId ? species[speciesId] : null;

            return (
              <div
                key={index}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                className={`
                  border-2 border-dashed rounded-lg p-2 min-h-[100px] 
                  flex items-center justify-center
                  ${swapMode ? 'border-blue-200' : 'border-green-200'}
                `}
              >
                {currentSpecies ? (
                  <SpeciesBox 
                    item={currentSpecies} 
                    isDraggable={false}
                    isOrdered={true}
                    index={index}
                  />
                ) : (
                  <span className="text-gray-400">מיקום {index + 1}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* כפתורי פעולה */}
      <div className="flex justify-center gap-4 flex-wrap">
        {!showExplanation && (
          <>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              התחל מחדש
            </button>

            {isMobile && orderedSpecies.length >= 2 && (
              <button
                onClick={() => {
                  setSwapMode(!swapMode);
                  setFirstSwapSelection(null);
                }}
                className={`
                  px-6 py-2 rounded-lg
                  ${swapMode 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'bg-gray-500 text-white hover:bg-gray-600'}
                `}
              >
                {swapMode ? 'בטל החלפה' : 'החלף מיקום'}
              </button>
            )}
          </>
        )}

        {!showExplanation && orderedSpecies.length === 5 && (
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
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 mb-4"
          >
            התחל מחדש
          </button>
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

      {/* הודעות עזרה למובייל */}
      {isMobile && !showExplanation && (
        <div className="text-center text-sm text-gray-500">
          {swapMode 
            ? firstSwapSelection 
              ? 'בחר מין נוסף להחלפה'
              : 'בחר מין ראשון להחלפה'
            : orderedSpecies.length === 5 
              ? 'לחץ על "החלף מיקום" כדי לשנות את הסדר'
              : 'לחץ על המינים כדי להוסיף אותם לסדר'}
        </div>
      )}
    </div>
  );
};

export default OrderByLand;