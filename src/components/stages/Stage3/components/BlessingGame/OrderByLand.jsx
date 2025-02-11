// src/components/stages/Stage3/components/BlessingGame/OrderByLand.jsx

import React, { useState } from 'react';
import { FULL_VERSE } from '../../data/blessings';

const OrderByLand = ({ species, correctOrder, onComplete }) => {
  const [orderedSpecies, setOrderedSpecies] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showError, setShowError] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  const availableSpecies = Object.values(species).filter(s => s.orderRank !== null);

  const getUnorderedSpecies = () => {
    return availableSpecies.filter(s => !orderedSpecies.includes(s.id));
  };

  // מנגנון חדש לטיפול במובייל וטאצ'
  const handleSpeciesClick = (speciesItem) => {
    if (showExplanation) return;
    
    if (selectedSpecies === speciesItem.id) {
      setSelectedSpecies(null);
    } else {
      setSelectedSpecies(speciesItem.id);
    }
  };

  const handlePositionClick = (position) => {
    if (!selectedSpecies || showExplanation) return;

    const newOrder = [...orderedSpecies];
    
    // אם כבר יש פריט במיקום הזה, נחליף אותם
    if (newOrder[position] !== undefined) {
      const oldSpecies = newOrder[position];
      newOrder[position] = selectedSpecies;
      setSelectedSpecies(oldSpecies);
    } else {
      newOrder[position] = selectedSpecies;
      setSelectedSpecies(null);
    }
    
    setOrderedSpecies(newOrder);
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
    setSelectedSpecies(null);
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

  const SpeciesBox = ({ item, isSelected = false, isOrdered = false, index = null }) => (
    <div
      onClick={() => handleSpeciesClick(item)}
      className={`
        p-3 rounded-lg text-center min-w-[100px] transition-all cursor-pointer
        ${isSelected ? 'ring-2 ring-green-500 transform scale-105' : ''}
        ${showExplanation 
          ? isOrdered 
            ? item.orderRank === index + 1
              ? 'bg-green-100 border-2 border-green-500'
              : 'bg-red-100 border-2 border-red-500'
            : 'bg-gray-100'
          : 'bg-gray-100 hover:bg-gray-200'
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
          {getUnorderedSpecies().map((item) => (
            <SpeciesBox 
              key={item.id} 
              item={item}
              isSelected={selectedSpecies === item.id}
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
                onClick={() => handlePositionClick(index)}
                className={`
                  border-2 border-dashed border-green-200 rounded-lg p-2 min-h-[100px] 
                  flex items-center justify-center cursor-pointer
                  ${!currentSpecies && selectedSpecies ? 'bg-green-100' : ''}
                `}
              >
                {currentSpecies && (
                  <SpeciesBox 
                    item={currentSpecies}
                    isOrdered={true}
                    index={index}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* הודעת שגיאה */}
      {showError && (
        <div className="p-4 bg-red-50 rounded-lg text-center">
          <p className="text-red-600 mb-2">הסדר אינו נכון, נסו שוב!</p>
          <button
            onClick={handleTryAgain}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            נסה שוב
          </button>
        </div>
      )}

      {/* כפתור בדיקה */}
      {!showExplanation && orderedSpecies.length === 5 && !showError && (
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
            אחריהם יין שקרוב למילה "ארץ" הראשונה,
            ולבסוף תאנה ורימון שרחוקים יותר.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderByLand;