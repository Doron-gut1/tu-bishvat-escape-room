// src/components/stages/Stage2/components/ScoreBoard.jsx

import React from 'react';

const ScoreBoard = ({ points, totalNeeded, achievement }) => {
  const progress = (points / totalNeeded) * 100;

  return (
    <div className="bg-green-50 p-4 md:p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="text-center md:text-right mb-4 md:mb-0">
          <h3 className="text-xl font-bold text-green-800">הניקוד שלך</h3>
          <p className="text-gray-600">
            {points} מתוך {totalNeeded} נקודות
          </p>
        </div>
        {achievement && (
          <div className="text-center">
            <span className="text-4xl block mb-1">{achievement.badge}</span>
            <span className="text-sm text-green-700 font-bold">
              {achievement.title}
            </span>
          </div>
        )}
      </div>

      {/* סרגל התקדמות */}
      <div className="relative mb-8">
        <div className="w-full h-4 bg-gray-200 rounded-full">
          <div 
            className="h-4 bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* נקודות ציון */}
        <div className="absolute top-6 w-full hidden md:flex justify-between text-sm text-gray-600">
          <span>מתחיל 🌱</span>
          <span>מתקדם 🌿</span>
          <span>מומחה 🌳</span>
        </div>
        
        {/* נקודות ציון למובייל */}
        <div className="md:hidden mt-4 flex justify-between text-xs text-gray-600">
          <div className="text-center">
            <span className="block">🌱</span>
            <span>מתחיל</span>
          </div>
          <div className="text-center">
            <span className="block">🌿</span>
            <span>מתקדם</span>
          </div>
          <div className="text-center">
            <span className="block">🌳</span>
            <span>מומחה</span>
          </div>
        </div>
      </div>

      {/* הודעת עידוד */}
      <div className="text-center">
        {points === 0 ? (
          <p>בואו נתחיל לשמור על הסביבה!</p>
        ) : points < totalNeeded * 0.4 ? (
          <p>יופי! התחלת לעזור לסביבה</p>
        ) : points < totalNeeded * 0.7 ? (
          <p>מצוין! אתה בדרך להיות שומר סביבה אמיתי</p>
        ) : points < totalNeeded ? (
          <p>כמעט שם! עוד קצת ותהיה מומחה</p>
        ) : (
          <p>כל הכבוד! הפכת למומחה בשמירת הסביבה! 🌟</p>
        )}
      </div>

      {/* טיפ */}
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>כל משימה שתשלים תעזור לשמור על הסביבה!</p>
      </div>
    </div>
  );
};

export default ScoreBoard;