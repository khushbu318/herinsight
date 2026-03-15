import React, { useState, useEffect } from 'react';
import { getPhaseInfo } from '../utils/phaseInfo';

const Learn = () => {
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedGlossary, setExpandedGlossary] = useState({});

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const toggleGlossary = (key) => {
    setExpandedGlossary(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const phaseData = [
    {
      key: 'menstrual',
      icon: '🩸',
      name: 'Menstrual',
      days: 'Days 1–5 (approx.)',
      mood: 'Introspective',
      shortDesc: 'Your body sheds its lining and resets. Energy naturally dips — rest is genuinely useful here.',
      overview: {
        title: "What's happening in your body",
        content: "This is when your period happens. Your body is releasing the lining it built up last month, since there was no pregnancy. Your hormone levels — estrogen and progesterone — drop to their lowest point, which is why you may feel tired or low-energy. The bleeding usually lasts 3 to 7 days and varies a lot between people. Some feel cramping as the muscles of the uterus gently contract to help the lining come away.",
        trivia: [
          "Your sense of smell can become sharper during your period — some people notice scents more intensely than usual.",
          "The average person loses about 2–3 tablespoons of blood during a period — though it can look like a lot more."
        ]
      },
      hormones: {
        Estrogen: 'Low',
        Progesterone: 'Low',
        'LH (surge hormone)': 'Low',
        'FSH (prep hormone)': 'Low'
      },
      wellbeing: [
        'Rest is genuinely productive right now',
        'Iron-rich foods help: lentils, spinach, dark chocolate',
        'Gentle movement only — yin yoga or slow walks',
        'A warm compress or heat pad can ease cramps',
        'Warm drinks like ginger tea or raspberry leaf tea'
      ],
      notices: [
        'Bleeding that continues beyond 7 days',
        'Pain so strong it stops you doing daily things',
        'Passing very large clots regularly'
      ]
    },
    {
      key: 'follicular',
      icon: '🌸',
      name: 'Follicular',
      days: 'Days 6–13 (overlaps with period)',
      mood: 'Curious',
      shortDesc: 'Your body is preparing to release an egg. Energy starts to return and your mood often lifts.',
      overview: {
        title: "What's happening in your body",
        content: "Your pituitary gland releases FSH (Follicle-Stimulating Hormone), which tells your ovaries to produce follicles containing eggs. Estrogen levels start rising as your body prepares for ovulation. You may notice increased energy, mental clarity, and a lifting mood as hormones begin to shift. This is often when people feel most motivated and social.",
        trivia: [
          "This phase overlaps with the end of your period, so you might experience both the low energy of menstruation and the rising energy of the follicular phase.",
          "Estrogen is at its lowest at the start of this phase and gradually increases, which is why mood and energy naturally improve over these days."
        ]
      },
      hormones: {
        Estrogen: 'Rising',
        Progesterone: 'Low',
        'LH (surge hormone)': 'Low to Rising',
        'FSH (prep hormone)': 'Rising'
      },
      wellbeing: [
        'This is a great time to start new projects or activities',
        'High-intensity exercise feels good — cardio, strength training',
        'Social activities are energizing',
        'Eat nutrient-dense foods to support the hormone rise',
        'Great time for planning and goal-setting'
      ],
      notices: [
        'Acne or skin breakouts (hormonal changes)',
        'Tender or swollen breasts (less common than luteal)',
        'Unusual fatigue despite feeling "better" than menstruation'
      ]
    },
    {
      key: 'ovulation',
      icon: '✨',
      name: 'Ovulation',
      days: 'Around Day 14 (±2 days)',
      mood: 'Confident',
      shortDesc: 'An egg is released. This is your fertile window and often when you feel your most energetic and sociable.',
      overview: {
        title: "What's happening in your body",
        content: "Your LH (Luteinizing Hormone) surges, triggering the release of an egg from your ovary. This is your most fertile day — the egg can be fertilized for about 12–24 hours. Estrogen is at its peak, which is why you may feel confident, attractive, and energized. This phase is typically the shortest, lasting just a day or two around the LH surge.",
        trivia: [
          "Your body temperature rises slightly (about 0.5°C) after ovulation — some people track this to confirm ovulation has occurred.",
          "You're most fertile in the 5 days leading up to ovulation and the day of ovulation itself — this is your fertile window."
        ]
      },
      hormones: {
        Estrogen: 'Peak',
        Progesterone: 'Starting to rise',
        'LH (surge hormone)': 'Peak surge',
        'FSH (prep hormone)': 'Lower'
      },
      wellbeing: [
        'Peak energy — this is a great time for challenging workouts',
        'You may feel most confident and attractive',
        'Social and romantic energy is high',
        'Good time for important meetings or public speaking',
        'Metabolism may be slightly elevated'
      ],
      notices: [
        'Mild pain or discomfort on one side (ovulation pain)',
        'Change in cervical mucus (becomes clear and stretchy)',
        'Slight rise in body temperature',
        'Heightened senses — sight, smell, taste'
      ]
    },
    {
      key: 'luteal',
      icon: '🌙',
      name: 'Luteal',
      days: 'Days 15–28 (approx.)',
      mood: 'Detail-focused',
      shortDesc: 'Your body prepares in case of pregnancy. If it doesn\'t happen, hormone levels drop and your period begins again.',
      overview: {
        title: "What's happening in your body",
        content: "After ovulation, the empty follicle transforms into the corpus luteum, which produces progesterone to prepare the uterus for a potential pregnancy. Progesterone levels rise steadily while estrogen dips slightly. If fertilization doesn't occur, both hormones eventually drop sharply, triggering your period. This drop in hormones can affect mood, energy, and physical comfort in the latter half of this phase.",
        trivia: [
          "The luteal phase is typically longer than the follicular phase — often about 12–16 days compared to 12–15 days for follicular.",
          "Progesterone is a 'calming' hormone, which is why some people feel more introspective or withdrawn during the luteal phase."
        ]
      },
      hormones: {
        Estrogen: 'Second rise, then falls',
        Progesterone: 'Rising, then falls sharply',
        'LH (surge hormone)': 'Low',
        'FSH (prep hormone)': 'Low'
      },
      wellbeing: [
        'Early luteal: energy and mood are still good',
        'Late luteal: prioritize rest and self-care as hormones drop',
        'Strength training over cardio (progesterone suits this)',
        'Magnesium-rich foods help with mood and muscle tension',
        'Journaling or quiet reflection in the later part',
        'Saying "no" to extra commitments is OK'
      ],
      notices: [
        'Premenstrual symptoms in the second half: bloating, mood changes, low energy',
        'Cravings for certain foods (often carbs or sweets)',
        'Changes in sleep quality',
        'Sensitive or tender breasts',
        'Abdominal or period pain starting a few days before your period'
      ]
    }
  ];

  const detailContainerRef = React.useRef(null);

  const handlePhaseClick = (key) => {
    setExpandedPhase(expandedPhase === key ? null : key);
    setActiveTab('overview');
    // Scroll to the detail header location
    setTimeout(() => {
      if (detailContainerRef.current) {
        detailContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  };

  return (
    <div className="learn-page">
      {/* First Card: Understanding Your Cycle */}
      <div className="learn-intro-card">
        <h2>🌸 Understanding Your Cycle</h2>
        <h3>The Menstrual Cycle, Phase by Phase</h3>
        <p>A typical cycle lasts 21–35 days and moves through four phases — each with its own hormones, energy, and mood. This is general educational content, not medical guidance.</p>
        <p className="intro-instruction">✨ <strong>Click on any phase below</strong> to explore its details, hormones, and wellbeing tips.</p>
      </div>

      {/* Second Card: Full Cycle at a Glance */}
      <div className="learn-phases-card">
        <div className="phases-grid">
          {phaseData.map((phase) => (
            <div
              key={phase.key}
              className={`phase-preview-card ${expandedPhase === phase.key ? 'active' : ''}`}
              onClick={() => handlePhaseClick(phase.key)}
            >
              <div className="phase-preview-header">
                <span className="phase-icon">{phase.icon}</span>
                <h3>{phase.name}</h3>
              </div>
              <p className="phase-days">{phase.days}</p>
              <p className="phase-short-desc">{phase.shortDesc}</p>
              <p className="phase-mood">💭 {phase.mood}</p>
              <p className="click-hint">Click to explore →</p>
            </div>
          ))}
        </div>

        {/* Expanded Phase Detail */}
        {expandedPhase && (
          <div className="phase-detail-container fade-in" ref={detailContainerRef}>
            {phaseData.map((phase) => {
              if (phase.key !== expandedPhase) return null;

              return (
                <div key={phase.key} className="phase-detail-box">
                  <div className="detail-header">
                    <div className="detail-title">
                      <span className="detail-icon">{phase.icon}</span>
                      <div>
                        <h3>{phase.name}</h3>
                        <p className="detail-duration">{phase.days}</p>
                        <p className="detail-mood">💭 {phase.mood}</p>
                      </div>
                    </div>
                    <button
                      className="close-btn"
                      onClick={() => setExpandedPhase(null)}
                    >
                      ✕
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="tabs-container">
                    <div className="tabs">
                      {['overview', 'hormones', 'wellbeing'].map((tab) => (
                        <button
                          key={tab}
                          className={`tab ${activeTab === tab ? 'active' : ''}`}
                          onClick={() => setActiveTab(tab)}
                        >
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                      ))}
                    </div>

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                      <div className="tab-content">
                        <h4>{phase.overview.title}</h4>
                        <p>{phase.overview.content}</p>
                        
                        <div className="trivia-section">
                          <h5>✨ Did you know?</h5>
                          <p>{phase.overview.trivia[0]}</p>
                          <h5>🔬 Also interesting</h5>
                          <p>{phase.overview.trivia[1]}</p>
                        </div>

                        <div className="notices-section">
                          <h5>📋 Things to Notice</h5>
                          <p className="notice-intro">These are general awareness points — things some people notice in this phase. If anything concerns you, mention it to a doctor.</p>
                          {phase.notices.map((notice, idx) => (
                            <div key={idx} className="notice-item">
                              <span className="notice-icon">📋</span>
                              <p>{notice}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Hormones Tab */}
                    {activeTab === 'hormones' && (
                      <div className="tab-content">
                        <p className="hormone-note">These bars show the relative activity level of key hormones in the {phase.name} phase — not real clinical values. Hormone levels vary between individuals and can only be measured through testing.</p>
                        
                        <div className="hormone-list">
                          {Object.entries(phase.hormones).map(([hormone, level]) => {
                            const levelMap = { 'Low': 20, 'Rising': 50, 'Rising, then falls': 60, 'Second rise, then falls': 65, 'Peak': 90, 'Starting to rise': 40, 'Low to Rising': 35, 'Peak surge': 100 };
                            const levelValue = levelMap[level] || 50;
                            return (
                              <div key={hormone} className="hormone-item">
                                <span className="hormone-name">{hormone}</span>
                                <div className="hormone-bar-container">
                                  <div className="hormone-bar" style={{ width: `${levelValue}%` }}></div>
                                </div>
                                <span className="hormone-level">{level}</span>
                              </div>
                            );
                          })}
                        </div>

                        <p className="hormone-disclaimer">ℹ️ FSH = Follicle-Stimulating Hormone · LH = Luteinising Hormone. These are general patterns — not clinical readings. Only a healthcare provider can assess your actual hormone levels.</p>
                      </div>
                    )}

                    {/* Wellbeing Tips Tab */}
                    {activeTab === 'wellbeing' && (
                      <div className="tab-content">
                        <h4>💚 General Suggestions</h4>
                        <div className="tips-list">
                          {phase.wellbeing.map((tip, idx) => (
                            <div key={idx} style={{
                              padding: '1rem',
                              marginBottom: '0.75rem',
                              background: 'linear-gradient(135deg, rgba(232, 139, 151, 0.05) 0%, rgba(255, 182, 217, 0.05) 100%)',
                              borderRadius: '8px',
                              borderLeft: '3px solid var(--primary)',
                              color: 'var(--text-light)',
                              fontSize: '0.95rem',
                              lineHeight: '1.6'
                            }}>
                              {tip}
                            </div>
                          ))}
                        </div>

                        <div className="wellbeing-note">
                          <h5>🌿 Works well this phase</h5>
                          <ul className="works-well-list">
                            <li>💭 Introspection</li>
                            <li>🌿 Nature walks</li>
                            <li>✍️ Journaling</li>
                            <li>🧘 Meditation</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Phase Footer */}
                  <div className="phase-footer">
                    <p>⚕️ For general awareness only. HerInsight provides estimates based on the dates you enter. Every body is different — these are not medical predictions. Please consult a healthcare provider for any health concerns.</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Glossary Section */}
      <div className="learn-glossary-card">
        <h3>📚 Period Terms Explained</h3>
        <p className="glossary-intro">See a word you don't know? Click on any term to expand and read a simple explanation.</p>
        
        <div className="glossary-accordion">
          <div className="glossary-item glossary-accordion-item">
            <button className={`glossary-toggle ${expandedGlossary['pms'] ? 'expanded' : ''}`} onClick={() => toggleGlossary('pms')}>
              <h4>PMS (Premenstrual Syndrome)</h4>
              <span className="toggle-icon">+</span>
            </button>
            {expandedGlossary['pms'] && <p className="glossary-content">Symptoms some people feel a few days before their period starts — like mood changes, bloating, or tiredness. It's your body's response to changing hormone levels.</p>}
          </div>

          <div className="glossary-item glossary-accordion-item">
            <button className={`glossary-toggle ${expandedGlossary['menstruation'] ? 'expanded' : ''}`} onClick={() => toggleGlossary('menstruation')}>
              <h4>Menstruation / Period</h4>
              <span className="toggle-icon">+</span>
            </button>
            {expandedGlossary['menstruation'] && <p className="glossary-content">When your body sheds the uterine lining through the vagina. Bleeding usually lasts 3–7 days. It's a normal process that happens roughly once a month.</p>}
          </div>

          <div className="glossary-item glossary-accordion-item">
            <button className={`glossary-toggle ${expandedGlossary['ovulation'] ? 'expanded' : ''}`} onClick={() => toggleGlossary('ovulation')}>
              <h4>Ovulation</h4>
              <span className="toggle-icon">+</span>
            </button>
            {expandedGlossary['ovulation'] && <p className="glossary-content">When an egg is released from one of your ovaries. This happens roughly in the middle of your cycle and is when you're most likely to get pregnant if sperm is present.</p>}
          </div>

          <div className="glossary-item glossary-accordion-item">
            <button className={`glossary-toggle ${expandedGlossary['fertile'] ? 'expanded' : ''}`} onClick={() => toggleGlossary('fertile')}>
              <h4>Fertile Window</h4>
              <span className="toggle-icon">+</span>
            </button>
            {expandedGlossary['fertile'] && <p className="glossary-content">The days when pregnancy is most likely to happen. It's about 5 days before ovulation plus the day of ovulation. During this time, sperm can meet an egg.</p>}
          </div>

          <div className="glossary-item glossary-accordion-item">
            <button className={`glossary-toggle ${expandedGlossary['estrogen'] ? 'expanded' : ''}`} onClick={() => toggleGlossary('estrogen')}>
              <h4>Estrogen</h4>
              <span className="toggle-icon">+</span>
            </button>
            {expandedGlossary['estrogen'] && <p className="glossary-content">A hormone that rises during the first half of your cycle. It affects your mood, energy, skin, and how you feel socially. Higher estrogen often means more energy and confidence.</p>}
          </div>

          <div className="glossary-item glossary-accordion-item">
            <button className={`glossary-toggle ${expandedGlossary['progesterone'] ? 'expanded' : ''}`} onClick={() => toggleGlossary('progesterone')}>
              <h4>Progesterone</h4>
              <span className="toggle-icon">+</span>
            </button>
            {expandedGlossary['progesterone'] && <p className="glossary-content">A hormone that rises after ovulation. It prepares your body for a possible pregnancy and can make you feel calmer or more introspective. It drops sharply if pregnancy doesn't happen.</p>}
          </div>

          <div className="glossary-item glossary-accordion-item">
            <button className={`glossary-toggle ${expandedGlossary['fsh'] ? 'expanded' : ''}`} onClick={() => toggleGlossary('fsh')}>
              <h4>FSH (Follicle-Stimulating Hormone)</h4>
              <span className="toggle-icon">+</span>
            </button>
            {expandedGlossary['fsh'] && <p className="glossary-content">A hormone your pituitary gland releases that tells your ovaries to prepare eggs. It's high during the first half of your cycle to get things ready for ovulation.</p>}
          </div>

          <div className="glossary-item glossary-accordion-item">
            <button className={`glossary-toggle ${expandedGlossary['lh'] ? 'expanded' : ''}`} onClick={() => toggleGlossary('lh')}>
              <h4>LH (Luteinizing Hormone)</h4>
              <span className="toggle-icon">+</span>
            </button>
            {expandedGlossary['lh'] && <p className="glossary-content">A hormone that causes ovulation. When it spikes (called the LH surge), it signals your body to release an egg. This is when you're most fertile.</p>}
          </div>

          <div className="glossary-item glossary-accordion-item">
            <button className={`glossary-toggle ${expandedGlossary['mucus'] ? 'expanded' : ''}`} onClick={() => toggleGlossary('mucus')}>
              <h4>Cervical Mucus</h4>
              <span className="toggle-icon">+</span>
            </button>
            {expandedGlossary['mucus'] && <p className="glossary-content">A fluid your cervix produces that changes through your cycle. Around ovulation, it becomes clear and stretchy — this helps sperm travel to meet the egg.</p>}
          </div>

          <div className="glossary-item glossary-accordion-item">
            <button className={`glossary-toggle ${expandedGlossary['corpus'] ? 'expanded' : ''}`} onClick={() => toggleGlossary('corpus')}>
              <h4>Corpus Luteum</h4>
              <span className="toggle-icon">+</span>
            </button>
            {expandedGlossary['corpus'] && <p className="glossary-content">What's left of the egg-containing follicle after ovulation. It produces progesterone to prepare your uterus for pregnancy. If pregnancy doesn't happen, it breaks down.</p>}
          </div>

          <div className="glossary-item glossary-accordion-item">
            <button className={`glossary-toggle ${expandedGlossary['cycle'] ? 'expanded' : ''}`} onClick={() => toggleGlossary('cycle')}>
              <h4>Menstrual Cycle</h4>
              <span className="toggle-icon">+</span>
            </button>
            {expandedGlossary['cycle'] && <p className="glossary-content">A roughly 28-day monthly process your body goes through, including menstruation, ovulation, and hormone changes. It can be 21–35 days — everyone's is different.</p>}
          </div>

          <div className="glossary-item glossary-accordion-item">
            <button className={`glossary-toggle ${expandedGlossary['tracking'] ? 'expanded' : ''}`} onClick={() => toggleGlossary('tracking')}>
              <h4>Cycle Tracking</h4>
              <span className="toggle-icon">+</span>
            </button>
            {expandedGlossary['tracking'] && <p className="glossary-content">Keeping track of when your period starts and how long it lasts. Doing this helps you understand your cycle patterns and predict future periods.</p>}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="learn-footer">
        <h3>🌿 Every body is different</h3>
        <p>
          Cycle length, phase duration, and how you feel in each phase can vary a lot between people — and even from one cycle to the next for the same person. Stress, sleep, food, age, and health all play a role. This content reflects general patterns and is not a substitute for personalised medical advice.
        </p>
      </div>
    </div>
  );
};

export default Learn;
