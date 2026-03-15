import React from 'react';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const handleNavigation = (page) => {
    setCurrentPage(page);
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <nav className="navigation">
      <div className="nav-buttons">
        <button
          className={`nav-button ${currentPage === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleNavigation('dashboard')}
        >
          <span className="nav-icon">📊</span>
          <span className="nav-label">Insights</span>
        </button>
        <button
          className={`nav-button ${currentPage === 'learn' ? 'active' : ''}`}
          onClick={() => handleNavigation('learn')}
        >
          <span className="nav-icon">📚</span>
          <span className="nav-label">Learn</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
