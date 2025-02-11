// src/components/stages/Stage3/data/blessings.js

export const BLESSING_GROUPS = {
  MEZONOT: {
    id: 'mezonot',
    name: 'בורא מיני מזונות / המוציא',
    description: 'ברכה על מיני דגן',
    species: ['wheat', 'barley']
  },
  HAGAFEN: {
    id: 'hagafen',
    name: 'בורא פרי הגפן',
    description: 'ברכה מיוחדת ליין',
    species: ['wine']
  },
  HAETZ: {
    id: 'haetz',
    name: 'בורא פרי העץ',
    description: 'ברכה על פירות העץ',
    species: ['olive', 'date', 'fig', 'pomegranate']
  }
};

export const SPECIES = {
  olive: {
    id: 'olive',
    name: 'זית',
    blessing: 'haetz',
    orderRank: 1,
    explanation: 'קרוב ביותר למילה "ארץ" השנייה בפסוק',
    verse: 'ארץ זית שמן',
    image: {
      type: 'image',
      src: '/images/Olive.png'
    }
  },
  date: {
    id: 'date',
    name: 'תמר',
    blessing: 'haetz',
    orderRank: 2,
    explanation: 'צמוד לזית בפסוק ("דבש" הוא דבש תמרים)',
    verse: 'ודבש',
    image: {
      type: 'emoji',
      src: '🌴'
    }
  },
  wine: {
    id: 'wine',
    name: 'יין',
    blessing: 'hagafen',
    orderRank: 3,
    explanation: 'הקרוב ביותר למילה "ארץ" הראשונה',
    verse: 'וגפן',
    image: {
      type: 'emoji',
      src: '🍷'
    }
  },
  fig: {
    id: 'fig',
    name: 'תאנה',
    blessing: 'haetz',
    orderRank: 4,
    explanation: 'מופיע אחרי גפן בפסוק',
    verse: 'ותאנה',
    image: {
      type: 'image',
      src: '/images/fig.png'
    }
  },
  pomegranate: {
    id: 'pomegranate',
    name: 'רימון',
    blessing: 'haetz',
    orderRank: 5,
    explanation: 'הרחוק ביותר ממילת "ארץ"',
    verse: 'ורימון',
    image: {
     type: 'image',
      src: '/images/Pomegranate.jpg'
    }
  },
  wheat: {
    id: 'wheat',
    name: 'חיטה',
    blessing: 'mezonot',
    orderRank: null,
    explanation: 'מהדגנים - ברכתו מיני מזונות או המוציא',
    verse: 'חיטה',
    image: {
      type: 'emoji',
      src: '🌾'
    }
  },
  barley: {
    id: 'barley',
    name: 'שעורה',
    blessing: 'mezonot',
    orderRank: null,
    explanation: 'מהדגנים - ברכתו מיני מזונות או המוציא',
    verse: 'ושעורה',
    image: {
      type: 'emoji',
      src: '🌾'
    }
  }
};

// הפסוק המלא
export const FULL_VERSE = 'ארץ חיטה ושעורה וגפן ותאנה ורימון ארץ זית שמן ודבש';

// סדר קדימה לברכות
export const BLESSING_ORDER = [
  'olive',   // 1. זית - קרוב ל"ארץ" השנייה
  'date',    // 2. תמר (דבש) - צמוד לזית
  'wine',    // 3. יין - קרוב ל"ארץ" הראשונה
  'fig',     // 4. תאנה - אחרי גפן
  'pomegranate' // 5. רימון - הכי רחוק
];