import React, { useState, useEffect } from 'react';
import './styles/App.css';
import './styles/home.css';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Learn from './components/Learn';
import Navigation from './components/Navigation';
import TourGuide from './components/TourGuide';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('herinsight-theme');
    if (savedTheme) {
      setIsDarkTheme(savedTheme === 'dark');
    }
  }, []);

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkTheme) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('herinsight-theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className="app" data-theme={isDarkTheme ? 'dark' : 'light'}>
      <TourGuide />
      <header className="app-header">
        <div className="header-container">
          <div className="header-left">
            <button 
              className="logo-brand"
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              title="Go to Home"
            >
              <span className="logo-emoji">🌸</span>
              <span className="brand-tagline">Awareness. Clarity. Confidence.</span>
            </button>
          </div>
          
          <div className="header-right">
            <button 
              className="btn-theme-toggle"
              onClick={toggleTheme}
              title={isDarkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkTheme ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'learn' && <Learn />}
      </main>

      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <footer className="app-footer">
        <div className="footer-content">
          <p>🔒 <strong>Privacy First:</strong> All your data stays on your device. No tracking. No accounts. No ads.</p>
          <p className="disclaimer">
            ⚠️ <strong>Disclaimer:</strong> HerInsight provides estimated cycle predictions for informational purposes only. 
            It is not medical advice. Please consult a healthcare provider for medical concerns.
          </p>
          <p className="built-with">Built with ❤️ for you</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
