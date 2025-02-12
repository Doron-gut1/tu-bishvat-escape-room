// src/components/stages/Stage3/components/BikurimJourney/index.jsx

import React, { useState, useEffect } from 'react';
import { JOURNEY_STATIONS } from '../../data/bikurim';

const BikurimJourney = ({ onComplete }) => {
  const [currentStation, setCurrentStation] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [stations, setStations] = useState([]);

  useEffect(() => {
    // מערבב את האופציות בכל תחנה
    const shuffledStations = JOURNEY_STATIONS.map(station => ({
      ...station,
      options: [...station.options].sort(() => Math.random() - 0.5)
    }));
    setStations(shuffledStations);
  }, []);

  const station = stations[currentStation];

  // שאר הקוד כמו קודם...
  // אבל משתמשים ב-station במקום JOURNEY_STATIONS[currentStation]
};

export default BikurimJourney;