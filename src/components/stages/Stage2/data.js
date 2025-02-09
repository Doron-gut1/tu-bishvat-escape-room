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
        options: [
          { id: 'morning', text: 'בשעות הבוקר המוקדמות', correct: true },
          { id: 'noon', text: 'בצהריים', correct: false },
          { id: 'evening', text: 'בערב', correct: true },
          { id: 'afternoon', text: 'אחר הצהריים החמות', correct: false }
        ],
        explanation: 'השקיה בבוקר או בערב מונעת התאדות מים מיותרת ועוזרת לעצים לקלוט את המים בצורה יעילה יותר',
        source: 'ונתתי מטר ארצכם בעתו - דברים י"א, י"ד',
        points: 2
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
        points: 3
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
        points: 2
      }
    ],
    biblicalConnection: 'ושבתה הארץ שבת לה׳ (ויקרא כ״ה, ב׳)',
    environmentalTip: 'קומפוסט ביתי יכול להפחית עד 30% מכמות הפסולת הביתית'
  }
];

export const TOTAL_POINTS_NEEDED = 10;

export const ACHIEVEMENT_LEVELS = [
  { points: 3, title: 'מתחיל', badge: '🌱' },
  { points: 6, title: 'מתקדם', badge: '🌿' },
  { points: 10, title: 'מומחה', badge: '🌳' }
];

// הוספת אנימציות CSS
export const ANIMATIONS = {
  fadeIn: 'animate-fade-in',
  slideIn: 'animate-slide-in',
  bounce: 'animate-bounce'
};