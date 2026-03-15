/**
 * LocalStorage Management for HerInsight
 * All data stays on device - no tracking, no cloud
 */

const STORAGE_KEY = "herinsight_data";

export const loadData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : getEmptyData();
  } catch (error) {
    console.error("Error loading data:", error);
    return getEmptyData();
  }
};

export const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error saving data:", error);
    return false;
  }
};

export const getEmptyData = () => ({
  periodDates: [],
  cycleLength: null,
  lastUpdated: null,
});

export const addPeriodDate = (date) => {
  const data = loadData();
  const dateStr = new Date(date).toISOString().split("T")[0];

  if (!data.periodDates.includes(dateStr)) {
    data.periodDates.push(dateStr);
    data.periodDates.sort();
    data.lastUpdated = new Date().toISOString();
    saveData(data);
  }

  return data;
};

export const removePeriodDate = (date) => {
  const data = loadData();
  const dateStr = new Date(date).toISOString().split("T")[0];
  data.periodDates = data.periodDates.filter((d) => d !== dateStr);
  data.lastUpdated = new Date().toISOString();
  saveData(data);
  return data;
};

export const clearAllData = () => {
  if (window.confirm("Are you sure? This will delete all your cycle data.")) {
    localStorage.removeItem(STORAGE_KEY);
    return getEmptyData();
  }
  return loadData();
};
