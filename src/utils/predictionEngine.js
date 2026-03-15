/**
 * HerInsight Prediction Engine
 * Statistical cycle prediction based on user history
 */

export const calculateStats = (cycleLengths) => {
  if (!cycleLengths || cycleLengths.length === 0) return null;

  const sorted = [...cycleLengths].sort((a, b) => a - b);
  const avg = cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length;
  const variance =
    cycleLengths.reduce((sum, len) => sum + Math.pow(len - avg, 2), 0) /
    cycleLengths.length;
  const stdDev = Math.sqrt(variance);

  return {
    average: Math.round(avg * 10) / 10,
    stdDev: Math.round(stdDev * 10) / 10,
    min: Math.min(...cycleLengths),
    max: Math.max(...cycleLengths),
    count: cycleLengths.length,
  };
};

export const calculateCycleLengths = (periodDates) => {
  if (!periodDates || periodDates.length < 2) return [];

  const sorted = periodDates
    .map((date) => new Date(date))
    .sort((a, b) => a - b);

  const lengths = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const current = sorted[i];
    const next = sorted[i + 1];
    const diffTime = next - current;
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) lengths.push(diffDays);
  }

  return lengths;
};

export const predictNextPeriod = (lastPeriodDate, cycleStats) => {
  const last = new Date(lastPeriodDate);
  const avgCycle = cycleStats.average;
  let stdDev = cycleStats.stdDev;
  
  // Ensure minimum prediction range of ±3 days even if stdDev is very small
  const minRange = 3;
  if (stdDev < minRange) {
    stdDev = minRange;
  }

  // Calculate prediction range with integer days
  const rangeInDays = Math.ceil(stdDev);
  
  const predictionStart = new Date(last);
  predictionStart.setDate(predictionStart.getDate() + Math.floor(avgCycle) - rangeInDays);

  const predictionEnd = new Date(last);
  predictionEnd.setDate(predictionEnd.getDate() + Math.floor(avgCycle) + rangeInDays);

  const expectedDate = new Date(last);
  expectedDate.setDate(expectedDate.getDate() + Math.round(avgCycle));

  return {
    startDate: predictionStart,
    endDate: predictionEnd,
    expectedDate: expectedDate,
  };
};

export const calculatePhaseOnDay = (dayInCycle, cycleLength) => {
  // Menstrual: Day 1-5
  if (dayInCycle <= 5) {
    return {
      name: "Menstrual",
      color: "#E94963",
      icon: "🩸",
      percentage: (dayInCycle / 5) * 100,
    };
  }

  // Follicular: Day 6 to ovulation - 1
  const ovulationDay = Math.round(cycleLength * 0.48); // ~day 14 for 28-day cycle
  if (dayInCycle <= ovulationDay - 1) {
    return {
      name: "Follicular",
      color: "#FFB6D9",
      icon: "🌸",
      percentage: ((dayInCycle - 5) / (ovulationDay - 6)) * 100,
    };
  }

  // Ovulation: Day 13-15 (approximate)
  if (dayInCycle <= ovulationDay + 1) {
    return {
      name: "Ovulation",
      color: "#FFD93D",
      icon: "✨",
      percentage: ((dayInCycle - (ovulationDay - 1)) / 3) * 100,
    };
  }

  // Luteal: Rest of cycle
  return {
    name: "Luteal",
    color: "#9B6BA8",
    icon: "🌙",
    percentage: ((dayInCycle - (ovulationDay + 1)) / (cycleLength - ovulationDay - 1)) * 100,
  };
};

export const getPredictedPhases = (lastPeriodDate, cycleStats, daysAhead = 90) => {
  const phases = [];
  const cycleLength = Math.round(cycleStats.average);
  const lastDate = new Date(lastPeriodDate);

  for (let i = 0; i < daysAhead; i++) {
    const currentDate = new Date(lastDate);
    currentDate.setDate(currentDate.getDate() + i);

    const dayInCycle = (i % cycleLength) + 1;
    const phase = calculatePhaseOnDay(dayInCycle, cycleLength);

    phases.push({
      date: currentDate,
      dayInCycle,
      ...phase,
    });
  }

  return phases;
};

export const getCurrentPhase = (lastPeriodDate, cycleStats) => {
  const today = new Date();
  const lastDate = new Date(lastPeriodDate);
  const diffTime = today - lastDate;
  const daysSinceStart = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const cycleLength = Math.round(cycleStats.average);
  const dayInCycle = (daysSinceStart % cycleLength) + 1;

  return {
    dayInCycle,
    daysIntoPhase: calculatePhaseOnDay(dayInCycle, cycleLength),
  };
};
