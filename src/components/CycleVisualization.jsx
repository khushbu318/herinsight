import React from 'react';
import { calculatePhaseOnDay } from '../utils/predictionEngine';

const CycleVisualization = ({ lastPeriodDate, cycleStats }) => {
  const cycleLength = Math.round(cycleStats.average);
  const today = new Date();
  const lastDate = new Date(lastPeriodDate);
  const diffTime = today - lastDate;
  const daysSinceStart = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const currentDayInCycle = (daysSinceStart % cycleLength) + 1;

  // Create phase segments with proper boundaries
  const phases = [];
  let currentDay = 1;

  // Menstrual (1-5)
  phases.push({ name: 'Menstrual', days: 5, color: '#E94963', icon: '🩸', start: 1 });
  currentDay += 5;

  // Follicular (6 to ovulation-1)
  const ovulationDay = Math.round(cycleLength * 0.48);
  const follicularDays = ovulationDay - currentDay;
  phases.push({ name: 'Follicular', days: follicularDays, color: '#FFB6D9', icon: '🌸', start: currentDay });
  currentDay += follicularDays;

  // Ovulation (~3 days)
  phases.push({ name: 'Ovulation', days: 3, color: '#FFD93D', icon: '✨', start: currentDay });
  currentDay += 3;

  // Luteal (rest)
  phases.push({ name: 'Luteal', days: cycleLength - currentDay + 1, color: '#9B6BA8', icon: '🌙', start: currentDay });

  // Fertile window: 5 days before ovulation to ovulation day (days 14-19 in typical 28-day cycle)
  const fertileWindowStart = ovulationDay - 5;
  const fertileWindowEnd = ovulationDay + 1;

  return (
    <div className="cycle-visualization">
      <div className="timeline-container">
        <div className="phase-timeline">
          {phases.map((phase, index) => {
            const phaseStart = phase.start;
            const phaseEnd = phase.start + phase.days - 1;
            const isCurrentPhase = currentDayInCycle >= phaseStart && currentDayInCycle <= phaseEnd;
            const isFertilePhase = fertileWindowStart <= currentDayInCycle && currentDayInCycle <= fertileWindowEnd;
            
            return (
              <div
                key={index}
                className={`timeline-segment ${isFertilePhase ? 'fertile-phase' : ''}`}
                style={{
                  flex: phase.days,
                  backgroundColor: phase.color,
                  opacity: isCurrentPhase ? 1 : 0.7,
                }}
              >
                <div className="segment-content">
                  <span className="segment-icon">{phase.icon}</span>
                  <span className="segment-name">{phase.name}</span>
                  <span className="segment-days">{phase.days}d</span>
                </div>
                {isCurrentPhase && (
                  <div className="today-marker" style={{
                    left: `${((currentDayInCycle - phaseStart) / phase.days) * 100}%`
                  }}>
                    <div className="pulse"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="timeline-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#E94963' }}></span>
          <span>Menstrual</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#FFB6D9' }}></span>
          <span>Follicular</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#FFD93D' }}></span>
          <span>Ovulation</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#9B6BA8' }}></span>
          <span>Luteal</span>
        </div>
      </div>
    </div>
  );
};

export default CycleVisualization;
