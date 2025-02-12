import React, { useState, useEffect } from 'react';

const BlessingGroups = ({ blessingGroups, species, onComplete }) => {
  const [assignments, setAssignments] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [draggedSpecies, setDraggedSpecies] = useState(null);
  const [showError, setShowError] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // בדיקת מובייל בטעינה ובשינוי גודל המסך
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const speciesArray = Object.values(species);

  // פעולת גרירה
  const handleDragStart = (speciesId) => {
    if (!isMobile) {
      setDraggedSpecies(speciesId);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (groupId) => {
    if (!draggedSpecies) return;
    
    // בודקים אם המין כבר משויך לקבוצה אחרת
    const isAlreadyAssigned = Object.entries(assignments).some(
      ([id, group]) => id !== draggedSpecies && group === groupId
    );
    
    // מעדכנים את השיוך בכל מקרה
    setAssignments(prev => ({
      ...prev,
      [draggedSpecies]: groupId
    }));

    setDraggedSpecies(null);
    setShowError(false);
  };

  // פעולות מובייל
  const handleSpeciesClick = (speciesId) => {
    if (isMobile) {
      // אם המין כבר משוייך, נאפשר להזיז אותו
      if (assignments[speciesId]) {
        const wasAssigned = assignments[speciesId];
        setAssignments(prev => {
          const newAssignments = { ...prev };
          delete newAssignments[speciesId];
          return newAssignments;
        });
        setSelectedSpecies(speciesId);
      } else {
        setSelectedSpecies(prev => prev === speciesId ? null : speciesId);
      }
    }
  };

  const handleGroupClick = (groupId) => {
    if (isMobile && selectedSpecies) {
      // לוודא שהמין לא כבר משויך לקבוצה אחרת
      const isAlreadyAssigned = Object.entries(assignments).some(
        ([id, group]) => id !== selectedSpecies && group === groupId
      );
      
      // אם המין כבר משויך לקבוצה אחרת, נעדכן את השיוך שלו
      setAssignments(prev => ({
        ...prev,
        [selectedSpecies]: groupId
      }));
      
      setSelectedSpecies(null);
      setShowError(false);
    }
  };

  const checkAnswers = () => {
    let correct = true;
    let totalAssigned = 0;

    Object.entries(assignments).forEach(([speciesId, assignedGroup]) => {
      if (species[speciesId].blessing !== assignedGroup) {
        correct = false;
      }
      totalAssigned++;
    });

    if (totalAssigned !== speciesArray.length) {
      correct = false;
    }

    if (correct) {
      setShowExplanation(true);
      onComplete(5);
    } else {
      setShowError(true);
    }
  };

  const handleReset = () => {
    setAssignments({});
    setShowError(false);
    setSelectedSpecies(null);
    setShowExplanation(false);
  };

  const isSpeciesCorrect = (speciesId) => {
    if (!showExplanation) return null;
    return species[speciesId].blessing === assignments[speciesId];
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

  return (
    <div className="space-y-8" dir="rtl">
      {/* אזור המינים הלא משוייכים */}
      <div className="flex flex-wrap justify-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
        {speciesArray.map((item) => {
          const isAssigned = assignments[item.id];
          const isCorrect = isSpeciesCorrect(item.id);
          const isSelected = selectedSpecies === item.id;
          
          return (
            <div
              key={item.id}
              draggable={!isMobile && !showExplanation}
              onDragStart={() => handleDragStart(item.id)}
              onClick={() => handleSpeciesClick(item.id)}
              className={`
                p-3 rounded-lg text-center min-w-[100px]
                transition-all transform
                ${!isAssigned && 'hover:scale-105'}
                ${isAssigned && !showError ? 'opacity-50' : 'bg-gray-100'}
                ${isSelected ? 'ring-4 ring-blue-500 shadow-lg scale-105' : ''}
                ${showExplanation && isCorrect !== null
                  ? isCorrect
                    ? 'bg-green-100 border-2 border-green-500'
                    : 'bg-red-100 border-2 border-red-500'
                  : ''
                }
                ${isMobile ? 'cursor-pointer active:scale-95' : 'cursor-grab'}
              `}
            >
              <div className="mb-2">
                {renderSpeciesImage(item)}
              </div>
              <div className="font-bold">{item.name}</div>
            </div>
          );
        })}
      </div>

      {/* קבוצות הברכות */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.values(blessingGroups).map((group) => {
          const assignedSpecies = speciesArray.filter(
            item => assignments[item.id] === group.id
          );

          return (
            <div
              key={group.id}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(group.id)}
              onClick={() => handleGroupClick(group.id)}
              className={`
                p-4 rounded-lg space-y-4
                ${selectedSpecies ? 'bg-blue-50 cursor-pointer' : 'bg-green-50'}
                transition-colors duration-300
              `}
            >
              <h4 className="font-bold text-center text-green-800">
                {group.name}
              </h4>
              
              <div className={`
                min-h-[100px] border-2 border-dashed rounded-lg p-2
                ${selectedSpecies ? 'border-blue-300 bg-blue-50' : 'border-green-200'}
              `}>
                {assignedSpecies.map(item => (
                  <div
                    key={item.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeciesClick(item.id);
                    }}
                    className={`
                      text-center p-2
                      ${isMobile ? 'cursor-pointer active:scale-95' : 'cursor-grab'}
                      transition-transform
                    `}
                  >
                    <div className="mb-2">
                      {renderSpeciesImage(item)}
                    </div>
                    <div>{item.name}</div>
                  </div>
                ))}
              </div>

              {showExplanation && (
                <p className="text-sm text-gray-600">
                  {group.description}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* כפתורי פעולה */}
      <div className="flex justify-center items-center gap-4 flex-wrap">
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
        >
          נסה מחדש
        </button>

        {!showExplanation && (
          <button
            onClick={checkAnswers}
            disabled={Object.keys(assignments).length !== speciesArray.length}
            className={`
              px-6 py-2 rounded-lg text-white
              ${Object.keys(assignments).length === speciesArray.length
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-400 cursor-not-allowed'
              }
            `}
          >
            בדוק תשובות
          </button>
        )}
      </div>

      {/* הסבר */}
      {showExplanation && (
        <div className="p-4 rounded-lg bg-green-50 mt-6">
          <h4 className="font-bold text-center text-xl mb-4">
            הידעת? 🤔
          </h4>
          <p className="text-center text-gray-700">
            סדר הברכות נקבע לפי חשיבות המינים. 
            מזונות/המוציא קודמים כי הם עיקר המזון, 
            הגפן קודמת כי היא ברכה מיוחדת,
            ואחריהם ברכת העץ לשאר הפירות.
          </p>
        </div>
      )}
      
      {/* הודעת הדרכה למובייל */}
      {isMobile && !showExplanation && (
        <div className="text-center text-sm text-gray-500 mt-4">
          {selectedSpecies 
            ? "לחץ על שם הברכה כדי למקם את המין הנבחר"
            : " לחץ על אחד המינים כדי לבחור אותו"}
        </div>
      )}
    </div>
  );
};

export default BlessingGroups;