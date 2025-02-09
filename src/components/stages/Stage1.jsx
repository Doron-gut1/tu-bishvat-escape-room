import React, { useState } from 'react';

const TREES = [
  {
    id: 'olive',
    name: 'עץ זית',
    hint: 'בהרי הגליל אני גדל, שמן טהור אני נותן למקדש',
    correctRegion: 'galilee',
    hints: [
      'אני גדל במקום גבוה',
      'השמן שלי שימש להדלקת המנורה במקדש',
      'בסיפור המבול, היונה הביאה עלה שלי'
    ],
    biblical: {
      verses: [
        'וַיָּבֹא אֵלָיו הַיּוֹנָה לְעֵת עֶרֶב וְהִנֵּה עֲלֵה-זַיִת טָרָף בְּפִיהָ (בראשית ח, יא)',
        'שֶׁמֶן זַיִת זָךְ כָּתִית לַמָּאוֹר לְהַעֲלֹת נֵר תָּמִיד (שמות כז, כ)'
      ],
      info: 'הזית הוא אחד משבעת המינים שנשתבחה בהם ארץ ישראל. השמן שלו שימש להדלקת המנורה במקדש ולמשיחת מלכים וכהנים. עץ הזית מסמל שלום ותקווה.'
    }
  },
  {
    id: 'date',
    name: 'עץ תמר',
    hint: 'בבקעת הירדן אני משגשג, מים מהנחל אני סופג',
    correctRegion: 'jordan-valley',
    hints: [
      'אני צריך הרבה מים ואקלים חם',
      'יריחו נקראת עיר התמרים',
      'דבורה הנביאה ישבה תחתי'
    ],
    biblical: {
      verses: [
        'צַדִּיק כַּתָּמָר יִפְרָח (תהילים צב, יג)',
        'וְדִבוֹרָה אִשָּׁה נְבִיאָה... יוֹשֶׁבֶת תַּחַת תֹּמֶר דְּבוֹרָה (שופטים ד, ד-ה)'
      ],
      info: 'התמר היה מקור חשוב למזון וצל במדבר. הוא מסמל צדיקים בגלל צמיחתו הזקופה והישרה. יריחו הייתה מפורסמת בתמרים שלה.'
    }
  },
  {
    id: 'grape',
    name: 'גפן',
    hint: 'על הרי יהודה בטרסות, יין משובח אני עושה',
    correctRegion: 'judean-hills',
    hints: [
      'המרגלים נשאו אשכול ממני',
      'היין שלי משמש לקידוש',
      'אני גדל על מדרגות בהר'
    ],
    biblical: {
      verses: [
        'וַיָּבֹאוּ עַד-נַחַל אֶשְׁכֹּל, וַיִּכְרְתוּ מִשָּׁם זְמוֹרָה וְאֶשְׁכּוֹל עֲנָבִים אֶחָד (במדבר יג, כג)',
        'וְגֶפֶן תְּאֵנָה וְרִמּוֹן אֶרֶץ זֵית שֶׁמֶן וּדְבָשׁ (דברים ח, ח)'
      ],
      info: 'הגפן היא סמל לעם ישראל ולברכת הארץ. היין משמש לקידוש ולשמחה. אשכול הענבים שהביאו המרגלים הראה את פוריות הארץ.'
    }
  },
  {
    id: 'fig',
    name: 'תאנה',
    hint: 'ליד הים אני גדלה, צל ומתיקות אני מעניקה',
    correctRegion: 'coastal-plain',
    hints: [
      'אני נותנת פירות מתוקים',
      'העלים שלי גדולים ומצלים',
      'אדם וחוה השתמשו בעלים שלי'
    ],
    biblical: {
      verses: [
        'וַיִּתְפְּרוּ עֲלֵה תְאֵנָה וַיַּעֲשׂוּ לָהֶם חֲגֹרֹת (בראשית ג, ז)',
        'וְיָשְׁבוּ אִישׁ תַּחַת גַּפְנוֹ וְתַחַת תְּאֵנָתוֹ (מלכים א ה, ה)'
      ],
      info: 'התאנה מסמלת שלום ושלווה. היא מוזכרת כבר בגן עדן. בימי שלמה המלך, ישיבה תחת גפן ותאנה סימלה תקופת שלום ושגשוג.'
    }
  }
];

const REGIONS = [
  {
    id: 'galilee',
    name: 'הרי הגליל',
  },
  {
    id: 'jordan-valley',
    name: 'בקעת הירדן',
  },
  {
    id: 'judean-hills',
    name: 'הרי יהודה',
  },
  {
    id: 'coastal-plain',
    name: 'מישור החוף',
  },
];

const Stage1 = ({ onComplete }) => {
  const [selectedTree, setSelectedTree] = useState(null);
  const [plantedTrees, setPlantedTrees] = useState([]);
  const [attempts, setAttempts] = useState({});
  const [showHints, setShowHints] = useState({});
  const [showBiblical, setShowBiblical] = useState(null);

  const handleTreeSelect = (tree) => {
    setSelectedTree(tree);
  };

  const handleRegionClick = (region) => {
    if (!selectedTree) return;

    if (selectedTree.correctRegion === region.id) {
      const newTree = { ...selectedTree, region: region.id };
      setPlantedTrees([...plantedTrees, newTree]);
      setSelectedTree(null);
      setShowBiblical(newTree);
      
      if (plantedTrees.length + 1 === TREES.length) {
        setTimeout(() => {
          onComplete();
        }, 5000); // נותן זמן לקרוא את המידע על העץ האחרון
      }
    } else {
      const newAttempts = {
        ...attempts,
        [selectedTree.id]: (attempts[selectedTree.id] || 0) + 1
      };
      setAttempts(newAttempts);
      
      if (newAttempts[selectedTree.id] >= 2) {
        setShowHints({
          ...showHints,
          [selectedTree.id]: Math.min((showHints[selectedTree.id] || 0) + 1, 3)
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* כותרת */}
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-green-800 mb-2">בואו נעזור לעצים למצוא את הבית שלהם!</h3>
        <p className="text-lg text-gray-600">בחרו עץ ומצאו את המקום המתאים לו על המפה</p>
      </div>

      {/* בחירת עצים */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {TREES.map((tree) => {
          const isPlanted = plantedTrees.some(planted => planted.id === tree.id);
          return (
            <button
              key={tree.id}
              onClick={() => !isPlanted && handleTreeSelect(tree)}
              className={`px-6 py-3 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 ${
                isPlanted 
                  ? 'bg-gray-200 cursor-not-allowed' 
                  : selectedTree?.id === tree.id
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-green-100 hover:bg-green-200'
              }`}
              disabled={isPlanted}
            >
              {tree.name}
            </button>
          );
        })}
      </div>

      {/* רמזים */}
      {selectedTree && showHints[selectedTree.id] > 0 && (
        <div className="text-center p-6 bg-yellow-50 rounded-lg shadow-md">
          <h4 className="text-xl font-bold mb-4 text-yellow-800">רמזים:</h4>
          <ul className="space-y-3">
            {selectedTree.hints.slice(0, showHints[selectedTree.id]).map((hint, index) => (
              <li key={index} className="text-lg">{hint}</li>
            ))}
          </ul>
        </div>
      )}

      {/* רמז בסיסי */}
      {selectedTree && (
        <div className="text-center p-5 bg-green-50 rounded-lg shadow-md">
          <p className="text-xl">{selectedTree.hint}</p>
        </div>
      )}

      {/* מפת הארץ */}
      <div className="relative border-2 border-green-300 rounded-lg p-6 bg-white shadow-lg">
        <div className="grid grid-cols-2 gap-6">
          {REGIONS.map((region) => {
            const treePlanted = plantedTrees.find(tree => tree.region === region.id);
            return (
              <div
                key={region.id}
                onClick={() => handleRegionClick(region)}
                className={`
                  p-6 rounded-lg text-center cursor-pointer transition-all duration-300
                  transform hover:scale-105
                  ${treePlanted 
                    ? 'bg-green-200 shadow-md' 
                    : 'bg-gray-100 hover:bg-green-100'
                  }
                `}
              >
                <h4 className="text-xl font-bold mb-3">{region.name}</h4>
                {treePlanted && (
                  <div className="text-green-700 font-bold text-lg">
                    {treePlanted.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* מידע תנ"כי */}
      {showBiblical && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-2xl font-bold text-green-800 mb-6">{showBiblical.name} בתנ"ך</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold mb-3 text-green-700">פסוקים:</h4>
                {showBiblical.biblical.verses.map((verse, index) => (
                  <p key={index} className="text-lg mb-3 pr-4 border-r-4 border-green-500">{verse}</p>
                ))}
              </div>
              <div>
                <h4 className="text-xl font-bold mb-3 text-green-700">מידע:</h4>
                <p className="text-lg leading-relaxed">{showBiblical.biblical.info}</p>
              </div>
            </div>
            <button 
              onClick={() => setShowBiblical(null)}
              className="mt-8 bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition-colors duration-300"
            >
              סגור
            </button>
          </div>
        </div>
      )}

      {/* התקדמות */}
      <div className="text-center">
        <p className="text-xl text-gray-600">
          נשתלו {plantedTrees.length} מתוך {TREES.length} עצים
        </p>
      </div>

      {/* רשימת העצים שנמצאו */}
      {plantedTrees.length > 0 && (
        <div className="border-t-2 pt-6 mt-8">
          <h4 className="text-xl font-bold text-center mb-6">העצים שמצאנו:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plantedTrees.map((tree) => (
              <div key={tree.id} className="p-4 bg-green-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h5 className="font-bold text-lg mb-2">{tree.name}</h5>
                <button
                  onClick={() => setShowBiblical(tree)}
                  className="text-green-600 hover:text-green-700 underline text-lg"
                >
                  קרא עוד על העץ בתנ"ך
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Stage1;