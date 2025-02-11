// src/components/stages/Stage2/data.js

export const AREAS = [
  {
    id: 'water',
    name: 'אזור השקיה',
    icon: '💧',
    description: 'שמירה על מים וחיסכון בהשקיה',
    tasks: [
      {
        id: 'water-1',
        type: 'select',
        question: 'מתי הכי נכון להשקות את העצים?',
        multiSelect: true,
        options: [
          { id: 'morning', text: 'בשעות הבוקר המוקדמות', correct: true },
          { id: 'noon', text: 'בצהריים', correct: false },
          { id: 'evening', text: 'בערב', correct: true },
          { id: 'afternoon', text: 'אחר הצהריים החמות', correct: false }
        ],
        explanation: 'השקיה בבוקר או בערב מונעת התאדות מים מיותרת ועוזרת לעצים לקלוט את המים בצורה יעילה יותר. יש לבחור את שתי התשובות הנכונות!',
        source: 'ונתתי מטר ארצכם בעתו - דברים י"א, י"ד',
        points: 3
      },
      {
        id: 'water-2',
        type: 'select',
        question: 'התאם את כמות המים הנכונה לעץ זית בוגר',
        options: [
          { id: 'low', text: '20-30 ליטר לשבוע', correct: true },
          { id: 'medium', text: '50-60 ליטר לשבוע', correct: false },
          { id: 'high', text: '100 ליטר לשבוע', correct: false }
        ],
        explanation: 'עץ זית הוא עץ חסכוני במים. הוא מסתפק בכמות מים קטנה יחסית ויכול לשרוד גם בתנאי יובש',
        source: 'כי ה׳ אלוקיך מביאך אל ארץ טובה... ארץ נחלי מים (דברים ח׳, ז׳)',
        points: 2
      },
      {
        id: 'water-3',
        type: 'select',
        question: 'איזו שיטת השקיה הכי יעילה לעצים?',
        options: [
          { id: 'drip', text: 'טפטפות', correct: true },
          { id: 'sprinkler', text: 'ממטרות', correct: false },
          { id: 'flood', text: 'השקיה בהצפה', correct: false },
          { id: 'manual', text: 'השקיה ידנית עם צינור', correct: false }
        ],
        explanation: 'טפטפות מאפשרות השקיה מדויקת ויעילה המגיעה ישירות לשורשי העץ, עם אובדן מינימלי של מים להתאדות',
        source: 'וְנָהָר יֹצֵא מֵעֵדֶן לְהַשְׁקוֹת אֶת הַגָּן (בראשית ב׳, י׳)',
        points: 2
      }
    ],
    biblicalConnection: 'כי ה׳ אלוקיך מביאך אל ארץ טובה... ארץ נחלי מים עינות ותהומות יוצאים בבקעה ובהר (דברים ח׳, ז׳)',
    environmentalTip: 'השקיה בטפטפות חוסכת עד 70% מכמות המים לעומת השקיה בהמטרה'
  },
  {
    id: 'compost',
    name: 'אזור קומפוסט',
    icon: '🌱',
    description: 'טיפול באדמה והכנת דשן טבעי',
    tasks: [
      {
        id: 'compost-1',
        type: 'sort',
        question: 'מיין את הפסולת - מה מתאים לקומפוסט?',
        items: [
          { id: 'leaves', text: 'עלים יבשים', category: 'compost' },
          { id: 'vegetables', text: 'שאריות ירקות', category: 'compost' },
          { id: 'plastic', text: 'שקית פלסטיק', category: 'trash' },
          { id: 'branches', text: 'ענפים קטנים', category: 'compost' }
        ],
        explanation: 'קומפוסט מיוצר מחומרים אורגניים בלבד שיכולים להתפרק באופן טבעי',
        source: 'ושבתה הארץ שבת לה׳ (ויקרא כ״ה, ב׳)',
        points: 2
      },
      {
        id: 'compost-2',
        type: 'select',
        question: 'מה התנאים הנדרשים להכנת קומפוסט טוב?',
        multiSelect: true,
        options: [
          { id: 'moisture', text: 'לחות מתאימה', correct: true },
          { id: 'sun', text: 'שמש ישירה', correct: false },
          { id: 'air', text: 'אוורור', correct: true },
          { id: 'freeze', text: 'קור מקפיא', correct: false }
        ],
        explanation: 'קומפוסט צריך תנאים מתאימים כדי שהחומרים יתפרקו כראוי. לחות ואוורור הם חיוניים לתהליך.',
        source: 'וְהָאָרֶץ תִּתֵּן אֶת יְבוּלָהּ (ויקרא כו, ד)',
        points: 3
      },
      {
        id: 'compost-3',
        type: 'select',
        question: 'מה היתרונות של שימוש בקומפוסט?',
        multiSelect: true,
        options: [
          { id: 'nutrition', text: 'מזין את האדמה', correct: true },
          { id: 'waste', text: 'מפחית פסולת', correct: true },
          { id: 'pesticide', text: 'מחליף חומרי הדברה', correct: false },
          { id: 'water', text: 'משפר את שמירת המים בקרקע', correct: true }
        ],
        explanation: 'קומפוסט משפר את איכות האדמה במספר דרכים: מוסיף חומרים מזינים, עוזר לאדמה לשמור על מים, ובנוסף מפחית את כמות הפסולת האורגנית שמגיעה למטמנות',
        source: 'וַיִּקַּח ה׳ אֱלֹהִים אֶת הָאָדָם וַיַּנִּחֵהוּ בְגַן עֵדֶן לְעָבְדָהּ וּלְשָׁמְרָהּ (בראשית ב, טו)',
        points: 3
      }
    ],
    biblicalConnection: 'ושבתה הארץ שבת לה׳ (ויקרא כ״ה, ב׳)',
    environmentalTip: 'קומפוסט ביתי יכול להפחית עד 30% מכמות הפסולת הביתית'
  }
];

export const TOTAL_POINTS_NEEDED = 15;

export const ACHIEVEMENT_LEVELS = [
  { points: 5, title: 'מתחיל', badge: '🌱' },
  { points: 10, title: 'מתקדם', badge: '🌿' },
  { points: 15, title: 'מומחה', badge: '🌳' }
];