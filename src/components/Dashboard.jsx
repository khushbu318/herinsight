import React, { useState, useEffect } from 'react';
import DataInput from './DataInput';
import CycleVisualization from './CycleVisualization';
import CycleTrend from './CycleTrend';
import CurrentPhaseCard from './CurrentPhaseCard';
import { loadData } from '../utils/storage';
import { calculateCycleLengths, calculateStats, getPredictedPhases } from '../utils/predictionEngine';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [cycling, setCycling] = useState(false);

  useEffect(() => {
    const loadedData = loadData();
    setData(loadedData);
    setCycling(loadedData.periodDates.length >= 2);
  }, []);

  const handleDataUpdate = () => {
    const loadedData = loadData();
    setData(loadedData);
    setCycling(loadedData.periodDates.length >= 2);
  };

  if (!data) {
    return <div className="dashboard loading">Loading your data...</div>;
  }

  const cycleLengths = calculateCycleLengths(data.periodDates);
  const cycleStats = calculateStats(cycleLengths);

  return (
    <div className="dashboard">
      <DataInput onDataUpdate={handleDataUpdate} />

      {cycling ? (
        <>
          <CurrentPhaseCard 
            lastPeriodDate={new Date(data.periodDates[data.periodDates.length - 1])} 
            cycleStats={cycleStats}
          />

          <CycleVisualization 
            lastPeriodDate={new Date(data.periodDates[data.periodDates.length - 1])} 
            cycleStats={cycleStats}
          />

          {cycleLengths.length > 2 && (
            <CycleTrend cycleLengths={cycleLengths} cycleStats={cycleStats} />
          )}
        </>
      ) : (
        <div className="no-data-message fade-in">
          <p>👋 Welcome to HerInsight!</p>
          <p>Start by logging at least 2 period dates to see insights about your cycle.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
