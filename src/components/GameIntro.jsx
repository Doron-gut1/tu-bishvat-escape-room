import React from 'react';

const GameIntro = ({ onStart }) => {
  return (
    <div className="text-center p-8 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-green-800 mb-6">
        המסע הקסום בארץ שבעת המינים
      </h1>
      <div className="space-y-4 text-right mb-8">
        <p className="text-lg text-gray-700">
          !ילדים יקרים
        </p>
        <p className="text-lg text-gray-700">
          אני שומר הטבע של ארץ ישראל. דור אחר דור אנחנו שומרים על האדמה המיוחדת שלנו, על העצים ועל הפירות המיוחדים שה' נתן לנו
        </p>
        <p className="text-lg text-gray-700">
          השנה, לקראת טו בשבט, אני צריך את עזרתכם במשימה מיוחדת - לגלות את הסודות של שבעת המינים ולהבין למה הם כל כך חשובים לנו
        </p>
        <p className="text-lg text-gray-700">
          ?האם תעזרו לי לשמור על ארץ ישראל היפה שלנו
        </p>
      </div>
      <button
        onClick={onStart}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
      >
        !בואו נתחיל
      </button>
    </div>
  );
};

export default GameIntro;