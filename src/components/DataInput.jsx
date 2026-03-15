import React, { useState, useMemo } from 'react';
import { addPeriodDate, removePeriodDate, loadData } from '../utils/storage';

const DataInput = ({ onDataUpdate }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());
  const [editingDates, setEditingDates] = useState(false);
  const [data, setData] = useState(loadData());

  // Generate year options (current year to 10 years back)
  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i <= 10; i++) {
      years.push(currentYear - i);
    }
    return years;
  }, []);

  // Get number of days in selected month
  const getDaysInMonth = (monthNum, yearNum) => {
    return new Date(yearNum, monthNum, 0).getDate();
  };

  const maxDay = getDaysInMonth(month, year);

  // Ensure day doesn't exceed max days in selected month
  const validDay = Math.min(day, maxDay);

  const handleAddDate = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    // Get the most recent period date
    const recentDate = data.periodDates.length > 0 
      ? new Date(data.periodDates[data.periodDates.length - 1])
      : null;

    let newYear = currentYear;
    let newMonth = recentDate ? (recentDate.getMonth() === 0 ? 12 : recentDate.getMonth()) : currentMonth - 1;
    let newDay = recentDate ? recentDate.getDate() : validDay;

    // Handle case where recent month needs to go to previous year
    if (recentDate && recentDate.getMonth() === 0) {
      newYear = recentDate.getFullYear() - 1;
    } else if (recentDate) {
      newYear = recentDate.getFullYear();
    }

    // Validate day doesn't exceed days in the target month
    const maxDayInTargetMonth = getDaysInMonth(newMonth, newYear);
    newDay = Math.min(newDay, maxDayInTargetMonth);

    // Format as YYYY-MM-DD
    const dateString = `${newYear}-${String(newMonth).padStart(2, '0')}-${String(newDay).padStart(2, '0')}`;
    
    addPeriodDate(dateString);
    
    // Reset to current date
    setYear(currentYear);
    setMonth(currentMonth);
    setDay(currentDate.getDate());
    
    setData(loadData());
    onDataUpdate();
  };

  const handleRemoveDate = (date) => {
    removePeriodDate(date);
    setData(loadData());
    onDataUpdate();
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysArray = Array.from({ length: maxDay }, (_, i) => i + 1);

  return (
    <div className="data-input-section">
      <div className="input-card">
        <h2>📝 Track Your Period</h2>
        
        <div className="input-group-dropdowns">
          <div className="dropdown-container">
            <label htmlFor="year-select">Year</label>
            <select 
              id="year-select"
              value={year} 
              onChange={(e) => setYear(Number(e.target.value))}
              className="date-dropdown"
            >
              {yearOptions.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div className="dropdown-container">
            <label htmlFor="month-select">Month</label>
            <select 
              id="month-select"
              value={month} 
              onChange={(e) => setMonth(Number(e.target.value))}
              className="date-dropdown"
            >
              {months.map((m, i) => (
                <option key={i} value={i + 1}>{m}</option>
              ))}
            </select>
          </div>

          <div className="dropdown-container">
            <label htmlFor="day-select">Day</label>
            <select 
              id="day-select"
              value={validDay} 
              onChange={(e) => setDay(Number(e.target.value))}
              className="date-dropdown"
            >
              {daysArray.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <button onClick={handleAddDate} className="btn btn-primary btn-add-date">
            Add Period Date
          </button>
        </div>

        {data.periodDates.length > 0 && (
          <div className="recorded-dates">
            <button 
              className="toggle-dates-btn"
              onClick={() => setEditingDates(!editingDates)}
            >
              {editingDates ? '✓ Done' : `📋 View Dates (${data.periodDates.length})`}
            </button>

            {editingDates && (
              <div className="dates-list fade-in">
                <p className="dates-intro">Your recorded period dates:</p>
                <div className="dates-timeline">
                  {[...data.periodDates].reverse().map((date, index) => (
                    <div key={date} className="date-item slide-in">
                      <span className="date-display">{formatDate(date)}</span>
                      <button
                        className="btn btn-danger btn-small"
                        onClick={() => handleRemoveDate(date)}
                        title="Remove this date"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataInput;
