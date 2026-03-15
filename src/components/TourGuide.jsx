import React, { useState, useEffect } from 'react';

const TourGuide = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0, position: 'bottom' });

  useEffect(() => {
    // Check if user has seen tour before
    const hasSeenTour = localStorage.getItem('herinsight_tour_seen');
    if (!hasSeenTour) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('scroll', updateTooltipPosition);
      window.addEventListener('resize', updateTooltipPosition);
      updateTooltipPosition();
      return () => {
        window.removeEventListener('scroll', updateTooltipPosition);
        window.removeEventListener('resize', updateTooltipPosition);
      };
    }
  }, [currentStep, isOpen]);

  const updateTooltipPosition = () => {
    const step = steps[currentStep];
    if (!step.highlight) {
      setTooltipPosition({ top: window.innerHeight / 2 - 150, left: window.innerWidth / 2 - 250, position: 'center' });
      return;
    }

    const element = document.querySelector(step.highlight);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const tooltipWidth = 340;
    const tooltipHeight = 320;
    const gap = 30; // Increased gap to avoid covering

    let top = 0;
    let left = 0;
    let position = 'bottom';

    // Prioritize positioning BELOW the element
    if (rect.bottom + gap + tooltipHeight < window.innerHeight) {
      top = rect.bottom + gap;
      position = 'bottom';
    }
    // Try positioning ABOVE the element
    else if (rect.top - gap - tooltipHeight > 0) {
      top = rect.top - gap - tooltipHeight;
      position = 'top';
    }
    // Try positioning to the RIGHT
    else if (rect.right + gap + tooltipWidth < window.innerWidth) {
      top = rect.top + rect.height / 2 - tooltipHeight / 2;
      left = rect.right + gap;
      position = 'center';
    }
    // Try positioning to the LEFT
    else if (rect.left - gap - tooltipWidth > 0) {
      top = rect.top + rect.height / 2 - tooltipHeight / 2;
      left = rect.left - gap - tooltipWidth;
      position = 'center';
    }
    // Fallback to center of screen
    else {
      top = window.innerHeight / 2 - tooltipHeight / 2;
      position = 'center';
    }

    // Center horizontally when positioning below/above
    if (position !== 'center') {
      left = rect.left + rect.width / 2 - tooltipWidth / 2;
    }

    // Bounds check
    if (left < 10) left = 10;
    if (left + tooltipWidth > window.innerWidth - 10) {
      left = window.innerWidth - tooltipWidth - 10;
    }
    if (top < 10) top = 10;
    if (top + tooltipHeight > window.innerHeight - 10) {
      top = window.innerHeight - tooltipHeight - 10;
    }

    setTooltipPosition({ top, left, position });
  };

  const steps = [
    {
      title: '👋 Welcome to HerInsight',
      description: 'Your private cycle tracking companion. Let\'s explore the key features!',
      highlight: null,
      icon: '🌸'
    },
    {
      title: '📊 Track Your Cycle',
      description: 'Click here to log your period dates. Your data stays on your device — never shared.',
      highlight: '.cta-section .btn-primary',
      icon: '📅'
    },
    {
      title: '📚 Learn About Cycle',
      description: 'Click here to explore each phase of your cycle, hormones, and wellbeing tips.',
      highlight: '.cta-section .btn-secondary',
      icon: '🧬'
    },
    {
      title: '🌙 Theme Toggle',
      description: 'Choose between light and dark mode based on your preference.',
      highlight: '.btn-theme-toggle',
      icon: '🎨'
    },
    {
      title: '🎉 You\'re All Set!',
      description: 'Start exploring HerInsight. Your health, your data, your control.',
      highlight: null,
      icon: '✨'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTour = () => {
    localStorage.setItem('herinsight_tour_seen', 'true');
    setIsOpen(false);
    if (onComplete) onComplete();
  };

  if (!isOpen) return null;

  const step = steps[currentStep];
  const highlightElement = step.highlight ? document.querySelector(step.highlight) : null;
  const rect = highlightElement?.getBoundingClientRect();

  return (
    <div className="tour-overlay">
      {/* Backdrop */}
      <div className="tour-backdrop" onClick={completeTour}></div>

      {/* Spotlight */}
      {rect && (
        <div
          className="tour-spotlight"
          style={{
            top: `${rect.top - 10}px`,
            left: `${rect.left - 10}px`,
            width: `${rect.width + 20}px`,
            height: `${rect.height + 20}px`,
          }}
        ></div>
      )}

      {/* Tooltip */}
      <div 
        className={`tour-tooltip tour-position-${tooltipPosition.position}`}
        style={{
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
        }}
      >
        <div className="tour-content">
          <div className="tour-step-counter">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="tour-icon">{step.icon}</div>
          <h3 className="tour-title">{step.title}</h3>
          <p className="tour-description">{step.description}</p>

          <div className="tour-buttons">
            <button
              className="tour-btn tour-btn-secondary"
              onClick={completeTour}
            >
              Skip Tour
            </button>
            {currentStep > 0 && (
              <button
                className="tour-btn tour-btn-secondary"
                onClick={handlePrev}
              >
                ← Back
              </button>
            )}
            <button
              className="tour-btn tour-btn-primary"
              onClick={handleNext}
            >
              {currentStep === steps.length - 1 ? 'Get Started ✨' : 'Next →'}
            </button>
          </div>

          {/* Progress dots */}
          <div className="tour-dots">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`tour-dot ${idx === currentStep ? 'active' : ''}`}
                onClick={() => setCurrentStep(idx)}
              ></div>
            ))}
          </div>
        </div>

        {/* Pointer arrow */}
        <div className={`tour-pointer tour-pointer-${tooltipPosition.position}`}></div>
      </div>
    </div>
  );
};

export default TourGuide;
