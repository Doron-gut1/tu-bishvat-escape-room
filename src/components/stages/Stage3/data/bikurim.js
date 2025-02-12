// src/components/stages/Stage3/data/bikurim.js

// תחנות במסע הביכורים
export const JOURNEY_STATIONS = [
  {
    id: 'gathering',
    name: 'נקודת האיסוף',
    description: 'כאן מתאספים כל מביאי הביכורים',
    question: 'איך היו מארגנים את הביכורים לפני התהלוכה?',
    options: [
      {
        text: 'בסלים מקושטים עם שבעת המינים',
        correct: true,
        explanation: 'הביכורים סודרו בסלים מקושטים, העשירים בסלי כסף וזהב והעניים בסלי נצרים'
      },
      {
        text: 'בארגזים פשוטים',
        correct: false
      },
      {
        text: 'בשקים גדולים',
        correct: false
      }
    ]
  },
  {
    id: 'procession',
    name: 'התהלוכה',
    description: 'מתחילים במסע לירושלים',
    question: 'מה היו שרים בדרך לירושלים?',
    options: [
      {
        text: '"שמחתי באומרים לי בית ה\' נלך"',
        correct: true,
        explanation: 'היו שרים מזמורי תהילים, במיוחד את "שיר המעלות"'
      },
      {
        text: 'שירי עבודה',
        correct: false
      },
      {
        text: 'שירי לכת',
        correct: false
      }
    ]
  },
  {
    id: 'jerusalem',
    name: 'שערי ירושלים',
    description: 'מגיעים לירושלים הקדושה',
    question: 'מי היה יוצא לקבל את מביאי הביכורים?',
    options: [
      {
        text: 'הפחות והסגנים והגזברים',
        correct: true,
        explanation: 'כל הפקידים הגדולים היו יוצאים לכבודם של מביאי הביכורים'
      },
      {
        text: 'רק השומרים',
        correct: false
      },
      {
        text: 'אף אחד',
        correct: false
      }
    ]
  },
  {
    id: 'temple',
    name: 'בית המקדש',
    description: 'מגיעים אל היעד הסופי',
    question: 'מה היה הדבר הראשון שעשו בבית המקדש?',
    options: [
      {
        text: 'קריאת וידוי ביכורים',
        correct: true,
        explanation: 'היו מתוודים ומספרים את סיפור יציאת מצרים והודיה על הארץ'
      },
      {
        text: 'הנחת הסלים בחצר',
        correct: false
      },
      {
        text: 'הקרבת קורבן',
        correct: false
      }
    ]
  }
];

// מנהגי הביכורים
export const BIKURIM_CUSTOMS = {
  BASKET_DECORATION: {
    title: 'קישוט הסלים',
    description: 'היו מקשטים את הסלים בפרחים ועלים',
    source: 'משנה ביכורים ג, ג'
  },
  MUSIC: {
    title: 'נגינה בדרך',
    description: 'החליל היה מכה לפניהם עד שמגיעים להר הבית',
    source: 'משנה ביכורים ג, ג'
  },
  ARRANGEMENT: {
    title: 'סדר הפירות',
    description: 'מסדרים את שבעת המינים לפי סדר חשיבותם, השעורים והחיטים למטה והביכורים למעלה',
    source: 'משנה ביכורים ג, ג'
  }
};

// סדר הנחת הפירות בסל
export const BASKET_ARRANGEMENT = [
  {
    layer: 1,
    name: 'שכבה תחתונה',
    items: ['שעורה', 'חיטה'],
    explanation: 'הדגנים בתחתית הסל'
  },
  {
    layer: 2,
    name: 'שכבה אמצעית',
    items: ['זיתים', 'תמרים', 'ענבים'],
    explanation: 'הפירות הרכים באמצע'
  },
  {
    layer: 3,
    name: 'שכבה עליונה',
    items: ['תאנים', 'רימונים'],
    explanation: 'הפירות העדינים למעלה'
  }
];