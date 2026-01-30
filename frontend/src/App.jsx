import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Chatbot from './components/Chatbot'
import './App.css'
import { FiShield, FiAlertCircle, FiMap, FiCloud, FiMessageCircle, FiArrowRight, FiCheckCircle, FiPhone, FiBarChart2, FiUsers, FiZap, FiGlobe, FiTrendingUp, FiClock, FiTarget } from 'react-icons/fi'

function App() {
  const [showDashboard, setShowDashboard] = useState(false)

  if (showDashboard) {
    return (
      <main className="app">
        <Dashboard />
        <Chatbot />
      </main>
    )
  }

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <header className="landing-hero">
        <div className="landing-hero__content">
          <div className="landing-hero__badge">
            <FiShield className="landing-hero__badge-icon" />
            <span>Emergency Response System</span>
          </div>
          <h1 className="landing-hero__title">
            CrisisAssist
            <span className="landing-hero__subtitle">Your Trusted Emergency Companion</span>
          </h1>
          <p className="landing-hero__description">
            Real-time disaster alerts, weather updates, and emergency guidance for Germany. 
            Stay informed, stay safe with instant access to MOWAS alerts, GDACS events, and expert crisis response advice.
          </p>
          <div className="landing-hero__actions">
            <button 
              className="landing-hero__cta landing-hero__cta--primary"
              onClick={() => setShowDashboard(true)}
            >
              <span>View Dashboard</span>
              <FiArrowRight />
            </button>
            <button 
              className="landing-hero__cta landing-hero__cta--secondary"
              onClick={() => {
                setShowDashboard(true)
                setTimeout(() => {
                  const chatbotBtn = document.querySelector('.chatbot-fab')
                  if (chatbotBtn) chatbotBtn.click()
                }, 500)
              }}
            >
              <FiMessageCircle />
              <span>Chat Now</span>
            </button>
          </div>
        </div>
        <div className="landing-hero__visual">
          <div className="landing-hero__gradient"></div>
        </div>
      </header>

      {/* Features Section */}
      <section className="landing-features">
        <div className="landing-container">
          <h2 className="landing-section__title">Powerful Features</h2>
          <div className="landing-features__grid">
            <div className="landing-feature-card">
              <div className="landing-feature-card__icon">
                <FiAlertCircle />
              </div>
              <h3 className="landing-feature-card__title">Real-Time Alerts</h3>
              <p className="landing-feature-card__description">
                Get instant notifications from MOWAS (warnung.bund.de) with live updates on emergencies, 
                severe weather, and public safety warnings across Germany.
              </p>
            </div>
            <div className="landing-feature-card">
              <div className="landing-feature-card__icon">
                <FiMap />
              </div>
              <h3 className="landing-feature-card__title">Global Disaster Tracking</h3>
              <p className="landing-feature-card__description">
                Monitor GDACS disaster events worldwide with interactive maps, filtering by type, 
                severity, and location. Stay informed about earthquakes, floods, cyclones, and more.
              </p>
            </div>
            <div className="landing-feature-card">
              <div className="landing-feature-card__icon">
                <FiCloud />
              </div>
              <h3 className="landing-feature-card__title">Weather Intelligence</h3>
              <p className="landing-feature-card__description">
                Comprehensive 5-day weather forecasts for German cities with hourly updates, 
                temperature trends, and detailed meteorological data.
              </p>
            </div>
            <div className="landing-feature-card">
              <div className="landing-feature-card__icon">
                <FiMessageCircle />
              </div>
              <h3 className="landing-feature-card__title">AI-Powered Assistant</h3>
              <p className="landing-feature-card__description">
                Get instant answers about emergency numbers, safety precautions, shelter locations, 
                and first-aid instructions with our intelligent chatbot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Numbers Section */}
      <section className="landing-emergency">
        <div className="landing-container">
          <div className="landing-emergency__header">
            <FiPhone className="landing-emergency__icon" />
            <h2 className="landing-section__title">Emergency Numbers in Germany</h2>
            <p className="landing-section__subtitle">
              Know who to call in an emergency. Save these numbers and share with family.
            </p>
          </div>
          <div className="landing-emergency__grid">
            <div className="landing-emergency-card landing-emergency-card--critical">
              <div className="landing-emergency-card__number">112</div>
              <h3 className="landing-emergency-card__title">Life-Threatening Emergency</h3>
              <p className="landing-emergency-card__description">
                Fire, medical emergency, rescue. EU-wide, free, 24/7. Call immediately for life-threatening situations.
              </p>
            </div>
            <div className="landing-emergency-card">
              <div className="landing-emergency-card__number">110</div>
              <h3 className="landing-emergency-card__title">Police</h3>
              <p className="landing-emergency-card__description">
                For non-life-threatening situations requiring police assistance. Available 24/7.
              </p>
            </div>
            <div className="landing-emergency-card">
              <div className="landing-emergency-card__number">116 117</div>
              <h3 className="landing-emergency-card__title">Medical On-Call Service</h3>
              <p className="landing-emergency-card__description">
                Ärztlicher Bereitschaftsdienst. For non-emergency medical consultations outside regular hours.
              </p>
            </div>
            <div className="landing-emergency-card">
              <div className="landing-emergency-card__number">0800-1110111</div>
              <h3 className="landing-emergency-card__title">Mental Crisis Helpline</h3>
              <p className="landing-emergency-card__description">
                Telefonseelsorge. Free, confidential, 24/7 support for mental health crises. Also: 0800-1110222
              </p>
            </div>
            <div className="landing-emergency-card">
              <div className="landing-emergency-card__number">030-19240</div>
              <h3 className="landing-emergency-card__title">Poison Control</h3>
              <p className="landing-emergency-card__description">
                Giftnotruf Berlin. Munich: 089-19240. Other regions: 0361-730730. For poisoning emergencies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="landing-how-it-works">
        <div className="landing-container">
          <h2 className="landing-section__title">How It Works</h2>
          <p className="landing-section__subtitle">
            Three simple steps to stay informed and prepared
          </p>
          <div className="landing-steps">
            <div className="landing-step">
              <div className="landing-step__number">1</div>
              <div className="landing-step__icon">
                <FiZap />
              </div>
              <h3 className="landing-step__title">Real-Time Monitoring</h3>
              <p className="landing-step__description">
                Our system continuously monitors official sources including MOWAS, GDACS, and weather services. 
                Data is updated every minute to ensure you have the latest information.
              </p>
            </div>
            <div className="landing-step">
              <div className="landing-step__number">2</div>
              <div className="landing-step__icon">
                <FiBarChart2 />
              </div>
              <h3 className="landing-step__title">Visual Analytics</h3>
              <p className="landing-step__description">
                Interactive charts and visualizations help you understand trends, patterns, and the severity 
                of current events. KPIs provide at-a-glance insights into the current situation.
              </p>
            </div>
            <div className="landing-step">
              <div className="landing-step__number">3</div>
              <div className="landing-step__icon">
                <FiMessageCircle />
              </div>
              <h3 className="landing-step__title">AI-Powered Assistance</h3>
              <p className="landing-step__description">
                Get instant answers to your questions about emergencies, safety procedures, and preparedness. 
                Our chatbot provides expert guidance based on real-time data and official sources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="landing-stats">
        <div className="landing-container">
          <h2 className="landing-section__title">Trusted by Thousands</h2>
          <div className="landing-stats__grid">
            <div className="landing-stat">
              <FiGlobe className="landing-stat__icon" />
              <div className="landing-stat__value">100+</div>
              <div className="landing-stat__label">Countries Monitored</div>
            </div>
            <div className="landing-stat">
              <FiTrendingUp className="landing-stat__icon" />
              <div className="landing-stat__value">24/7</div>
              <div className="landing-stat__label">Real-Time Updates</div>
            </div>
            <div className="landing-stat">
              <FiClock className="landing-stat__icon" />
              <div className="landing-stat__value">&lt;1min</div>
              <div className="landing-stat__label">Update Frequency</div>
            </div>
            <div className="landing-stat">
              <FiTarget className="landing-stat__icon" />
              <div className="landing-stat__value">100%</div>
              <div className="landing-stat__label">Official Sources</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="landing-benefits">
        <div className="landing-container">
          <h2 className="landing-section__title">Why Choose CrisisAssist?</h2>
          <div className="landing-benefits__list">
            <div className="landing-benefit-item">
              <FiCheckCircle className="landing-benefit-item__icon" />
              <div>
                <h3 className="landing-benefit-item__title">Official Sources</h3>
                <p className="landing-benefit-item__description">
                  All alerts come directly from official German authorities (warnung.bund.de) and verified international disaster databases (GDACS).
                </p>
              </div>
            </div>
            <div className="landing-benefit-item">
              <FiCheckCircle className="landing-benefit-item__icon" />
              <div>
                <h3 className="landing-benefit-item__title">24/7 Availability</h3>
                <p className="landing-benefit-item__description">
                  Access critical information anytime, anywhere. Our system is always monitoring and updating with automatic refresh every minute.
                </p>
              </div>
            </div>
            <div className="landing-benefit-item">
              <FiCheckCircle className="landing-benefit-item__icon" />
              <div>
                <h3 className="landing-benefit-item__title">User-Friendly Interface</h3>
                <p className="landing-benefit-item__description">
                  Intuitive design with beautiful visualizations, charts, and KPIs makes it easy to find the information you need quickly during emergencies.
                </p>
              </div>
            </div>
            <div className="landing-benefit-item">
              <FiCheckCircle className="landing-benefit-item__icon" />
              <div>
                <h3 className="landing-benefit-item__title">Comprehensive Coverage</h3>
                <p className="landing-benefit-item__description">
                  From local weather alerts to global disaster events, we cover all aspects of crisis management with detailed analytics and insights.
                </p>
              </div>
            </div>
            <div className="landing-benefit-item">
              <FiCheckCircle className="landing-benefit-item__icon" />
              <div>
                <h3 className="landing-benefit-item__title">Data-Driven Insights</h3>
                <p className="landing-benefit-item__description">
                  Advanced charts and visualizations help you understand trends, patterns, and make informed decisions based on real-time data.
                </p>
              </div>
            </div>
            <div className="landing-benefit-item">
              <FiCheckCircle className="landing-benefit-item__icon" />
              <div>
                <h3 className="landing-benefit-item__title">AI-Powered Guidance</h3>
                <p className="landing-benefit-item__description">
                  Get instant, accurate answers from our intelligent chatbot trained on official emergency procedures and real-time data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-cta">
        <div className="landing-container">
          <div className="landing-cta__content">
            <h2 className="landing-cta__title">Ready to Stay Safe?</h2>
            <p className="landing-cta__description">
              Access real-time emergency information and expert guidance right now.
            </p>
            <button 
              className="landing-cta__button"
              onClick={() => setShowDashboard(true)}
            >
              <span>Get Started</span>
              <FiArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-container">
          <p className="landing-footer__text">
            <strong>CrisisAssist</strong> – Emergency Response System for Germany
          </p>
          <p className="landing-footer__disclaimer">
            In life-threatening emergencies, always call <strong>112</strong> immediately.
            This service provides information only and does not replace official emergency services.
          </p>
        </div>
      </footer>

      <Chatbot />
    </div>
  )
}

export default App
