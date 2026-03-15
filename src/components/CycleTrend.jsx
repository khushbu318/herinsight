import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CycleTrend = ({ cycleLengths, cycleStats }) => {
  const labels = cycleLengths.map((_, index) => `Cycle ${index + 1}`);
  
  // Create trend line using linear regression
  const trendLine = calculateTrendLine(cycleLengths);

  const data = {
    labels,
    datasets: [
      {
        label: 'Cycle Length',
        data: cycleLengths,
        borderColor: '#E88B97',
        backgroundColor: 'rgba(232, 139, 151, 0.1)',
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: '#E88B97',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Trend',
        data: trendLine,
        borderColor: '#FFD93D',
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
        tension: 0,
      },
      {
        label: 'Average',
        data: Array(cycleLengths.length).fill(cycleStats.average),
        borderColor: '#9B6BA8',
        borderWidth: 1,
        borderDash: [2, 2],
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: { size: 12 },
          padding: 15,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 10,
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        callbacks: {
          label: function (context) {
            if (context.dataset.label === 'Cycle Length') {
              return `Length: ${context.parsed.y} days`;
            }
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)} days`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: Math.min(...cycleLengths) - 5,
        max: Math.max(...cycleLengths) + 5,
        ticks: {
          font: { size: 11 },
        },
        title: {
          display: true,
          text: 'Days',
        },
      },
      x: {
        ticks: {
          font: { size: 11 },
        },
      },
    },
  };

  return (
    <div className="cycle-trend">
      <h3>📈 Cycle Trend Analysis</h3>
      <p className="trend-stats">
        Average: <strong>{cycleStats.average.toFixed(1)}</strong> days | 
        Min: <strong>{cycleStats.min}</strong> days | 
        Max: <strong>{cycleStats.max}</strong> days | 
        Std Dev: <strong>{cycleStats.stdDev.toFixed(1)}</strong> days
      </p>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

// Helper function to calculate trend line
function calculateTrendLine(data) {
  if (data.length < 2) return data;

  const n = data.length;
  const xAvg = (n - 1) / 2;
  const yAvg = data.reduce((a, b) => a + b) / n;

  let numerator = 0;
  let denominator = 0;

  for (let i = 0; i < n; i++) {
    numerator += (i - xAvg) * (data[i] - yAvg);
    denominator += (i - xAvg) * (i - xAvg);
  }

  const slope = denominator === 0 ? 0 : numerator / denominator;
  const intercept = yAvg - slope * xAvg;

  return data.map((_, i) => slope * i + intercept);
}

export default CycleTrend;
