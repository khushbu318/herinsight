import React, { useEffect } from 'react';
import { getCurrentPhase, predictNextPeriod } from '../utils/predictionEngine';
import { getPhaseInfo } from '../utils/phaseInfo';

const CurrentPhaseCard = ({ lastPeriodDate, cycleStats }) => {
  const currentPhase = getCurrentPhase(lastPeriodDate, cycleStats);
  const phaseInfo = getPhaseInfo(currentPhase.daysIntoPhase.name);
  const nextPeriod = predictNextPeriod(lastPeriodDate, cycleStats);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getPhaseProgress = () => {
    const cycleLength = Math.round(cycleStats.average);
    return (currentPhase.dayInCycle / cycleLength) * 100;
  };

  // Calculate fertile window
  const getFertileWindowDates = () => {
    const cycleLength = Math.round(cycleStats.average);
    const ovulationDay = Math.round(cycleLength * 0.48);
    const fertileWindowStart = ovulationDay - 5;
    const fertileWindowEnd = ovulationDay + 1;
    
    const windowStartDate = new Date(lastPeriodDate);
    windowStartDate.setDate(windowStartDate.getDate() + fertileWindowStart - 1);
    const windowEndDate = new Date(lastPeriodDate);
    windowEndDate.setDate(windowEndDate.getDate() + fertileWindowEnd - 1);
    return { windowStartDate, windowEndDate };
  };

  const { windowStartDate, windowEndDate } = getFertileWindowDates();

  return (
    <div className="current-phase-card fade-in">
      <div className="phase-header" style={{ borderTop: `4px solid ${currentPhase.daysIntoPhase.color}` }}>
        <div className="phase-main">
          <h2>
            <span className="phase-icon">{currentPhase.daysIntoPhase.icon}</span>
            {currentPhase.daysIntoPhase.name}
          </h2>
          <p className="phase-day">
            Day <strong>{currentPhase.dayInCycle}</strong> of your cycle
          </p>
        </div>

        <div className="phase-quick-info">
          <div className="energy-level">
            <span className="energy-label">Energy:</span>
            <span className="energy-value">{phaseInfo?.energy}</span>
          </div>
        </div>
      </div>

      <div className="phase-progress">
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ 
              width: `${getPhaseProgress()}%`,
              backgroundColor: currentPhase.daysIntoPhase.color
            }}
          />
        </div>
        <p className="progress-text">{Math.round(getPhaseProgress())}% through cycle</p>
      </div>

      <div className="phase-predictions">
        <div className="prediction-box">
          <h3>📅 Next Period Expected</h3>
          <p className="prediction-date">{formatDate(nextPeriod.expectedDate)}</p>
          <p className="prediction-range">
            <small>Likely between {formatDate(nextPeriod.startDate)} — {formatDate(nextPeriod.endDate)}</small>
          </p>
          <p className="prediction-caption">
            💡 <em>Predictions are based on your logged dates. More data = more accurate predictions. This is an estimate, not a guarantee.</em>
          </p>
          <div className="fertile-window-box">
            <h4>🔴 Fertile Window</h4>
            <p className="fertile-dates">{formatDate(windowStartDate)} — {formatDate(windowEndDate)}</p>
          </div>
        </div>
      </div>

      {phaseInfo && (
        <div className="phase-highlights">
          <div className="highlight-item">
            <h4>💭 Mood & Mind</h4>
            <p>{phaseInfo.mood.join(', ')}</p>
          </div>
          <div className="highlight-item">
            <h4>🏃 Recommended Activity</h4>
            <p>{phaseInfo.tips[0]}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentPhaseCard;
