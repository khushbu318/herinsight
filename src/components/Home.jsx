import React, { useState, useEffect } from 'react';
import { getRandomQuote, initializeQuoteFetching } from '../utils/quotes';

const Home = ({ setCurrentPage }) => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Initialize quote fetching from API
    initializeQuoteFetching();
    
    // Load first quote
    getRandomQuote().then(q => setQuote(q));
    
    // Change quote every 10 seconds
    const interval = setInterval(() => {
      getRandomQuote().then(q => setQuote(q));
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">Know Your Cycle, Know Yourself</h2>
          <p className="hero-subtitle">Track your menstrual cycle with complete privacy. Your data, your device, your control.</p>
        </div>
      </section>

      <section className="cta-section">
        <button 
          className="btn btn-primary btn-large"
          onClick={() => setCurrentPage('dashboard')}
        >
          Start Tracking
        </button>
        <button 
          className="btn btn-secondary btn-large"
          onClick={() => setCurrentPage('learn')}
        >
          Learn About Cycle
        </button>
      </section>

      <section className="features-section">
        <h3>Why HerInsight?</h3>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h4>100% Private</h4>
            <p>Your data never leaves your device. No tracking, no accounts, no ads.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h4>Smart Predictions</h4>
            <p>Uses your cycle history to predict upcoming periods and phases accurately.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h4>Learn & Grow</h4>
            <p>Educational content about your cycle, body, and wellbeing.</p>
          </div>
        </div>
      </section>

      <section className="how-to-use-section">
        <h3>How to Use HerInsight</h3>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h4>Log Your Dates</h4>
            <p>Simply select the year, month, and day of your period start dates.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h4>Get Insights</h4>
            <p>View your current cycle phase, energy levels, and upcoming predictions.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h4>Plan Ahead</h4>
            <p>Know what to expect and plan your activities accordingly.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h4>Learn More</h4>
            <p>Explore the Learning section to understand your cycle better.</p>
          </div>
        </div>
      </section>

      <section className="what-will-tell-section">
        <h3>What HerInsight Will Tell You</h3>
        <div className="tells-grid">
          <div className="tell-item">
            <span className="tell-emoji">📅</span>
            <h4>Period Predictions</h4>
            <p>Know when your next period is expected</p>
          </div>
          <div className="tell-item">
            <span className="tell-emoji">🌷</span>
            <h4>Current Phase</h4>
            <p>Which phase you're in and how many days in</p>
          </div>
          <div className="tell-item">
            <span className="tell-emoji">⚡</span>
            <h4>Energy Levels</h4>
            <p>Your expected energy and mood patterns</p>
          </div>
          <div className="tell-item">
            <span className="tell-emoji">📈</span>
            <h4>Cycle Trends</h4>
            <p>Your average cycle length and variations</p>
          </div>
          <div className="tell-item">
            <span className="tell-emoji">💡</span>
            <h4>Self-Care Tips</h4>
            <p>Personalized recommendations for each phase</p>
          </div>
        </div>
      </section>

      <section className="motivational-board">
        <div className="motivational-card">
          <p className="motivational-quote">✨ {quote} ✨</p>
        </div>
      </section>

    </div>
  );
};

export default Home;
