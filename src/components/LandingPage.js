import React, { useState } from 'react';
import { FaShieldAlt, FaUsers, FaClock, FaGlobe, FaArrowRight, FaCheck, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import ChatInterface from './ChatInterface';
import ChatButton from './ChatButton';

const LandingPage = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-crisis-blue-700 via-crisis-blue-600 to-crisis-blue-700 text-white shadow-2xl sticky top-0 z-40 backdrop-blur-md bg-opacity-95 border-b border-crisis-blue-500/30">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 md:py-4">
            {/* Logo Section */}
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 group cursor-pointer flex-shrink-0">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-white rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
                {/* Icon container */}
                <div className="relative bg-gradient-to-br from-white/25 to-white/10 p-2 sm:p-2.5 md:p-3 rounded-full border border-white/30 group-hover:border-white/40 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <FaShieldAlt className="text-xl sm:text-2xl md:text-3xl text-white drop-shadow-lg animate-pulse-slow" />
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white to-crisis-blue-100 bg-clip-text text-transparent leading-tight">
                  CrisisAssist
                </h1>
                <p className="text-[10px] xs:text-xs sm:text-sm text-crisis-blue-100 font-medium tracking-wide truncate sm:whitespace-normal">
                  Emergency Response Assistant
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white/10 hover:bg-white/15 rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 shadow-md hover:shadow-lg group/status">
                <div className="relative">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-[10px] xs:text-xs sm:text-sm font-semibold text-white/95 whitespace-nowrap">
                  <span className="hidden xs:inline">24/7 </span>Active
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Subtle bottom gradient line with animation */}
        <div className="relative h-0.5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-crisis-blue-600 via-crisis-blue-500 to-crisis-blue-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&h=1080&fit=crop"
            alt="Emergency Response"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Your Trusted Emergency Response Assistant
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-crisis-blue-100 animate-fade-in-delay">
              Get real-time, verified guidance during natural disasters and emergencies. 
              Location-based alerts, risk assessment, and instant human operator connection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
              <button
                onClick={() => setShowChat(true)}
                className="px-8 py-4 bg-white text-crisis-blue-600 rounded-lg hover:bg-crisis-blue-50 transition-all transform hover:scale-105 font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Get Started Now</span>
                <FaArrowRight />
              </button>
              <button
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-crisis-blue-600 transition-all transform hover:scale-105 font-semibold text-lg"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced AI-powered emergency response system designed to keep you safe and informed
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FaShieldAlt,
                title: 'Real-Time Risk Assessment',
                description: 'Advanced multi-turn questioning system to assess your risk level and provide personalized safety recommendations.',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
              },
              {
                icon: FaMapMarkerAlt,
                title: 'Location-Based Alerts',
                description: 'GPS and manual location input for accurate, location-specific emergency information and shelter locations.',
                image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop',
              },
              {
                icon: FaUsers,
                title: 'Human Operator Escalation',
                description: 'Seamless handover to trained emergency operators with full conversation context for critical situations.',
                image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop',
              },
              {
                icon: FaClock,
                title: '24/7 Availability',
                description: 'Round-the-clock emergency assistance, always ready to help when you need it most.',
                image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
              },
              {
                icon: FaGlobe,
                title: 'Multi-Language Support',
                description: 'Accessible in multiple languages with screen-reader support for inclusive emergency assistance.',
                image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
              },
              {
                icon: FaCheck,
                title: 'Verified Information',
                description: 'Only verified, accurate emergency information from trusted sources and official channels.',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-crisis-blue-600 bg-opacity-80 flex items-center justify-center">
                      <Icon className="text-5xl text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">About CrisisAssist</h2>
              <p className="text-xl text-gray-600">
                Advanced conversational AI for emergency response
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                  alt="About CrisisAssist"
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mission Statement</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  CrisisAssist is designed to enhance citizen readiness and provide rapid access to 
                  emergency information during natural disasters and large-scale emergencies. Our 
                  mission is to reduce pressure on emergency call centers while improving 
                  coordination and communication during crises.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Built using advanced NLP techniques and the Rasa framework, CrisisAssist delivers 
                  context-aware, user-centric assistance that adapts to evolving user needs and 
                  rapidly changing emergency situations.
                </p>
                <ul className="space-y-2">
                  {[
                    'Real-time verified guidance',
                    'Personalized location-based assistance',
                    'Multi-turn risk assessment',
                    'Seamless human operator handover',
                    'Ethical and transparent operation',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-2 text-gray-700">
                      <FaCheck className="text-green-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-crisis-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '24/7', label: 'Availability' },
              { number: '<3s', label: 'Response Time' },
              { number: '100%', label: 'Verified Info' },
              { number: '50+', label: 'Languages' },
            ].map((stat, index) => (
              <div key={index} className="animate-fade-in">
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-crisis-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-xl text-gray-600">
              Get in touch with our emergency response team
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: FaPhone, title: 'Emergency Hotline', info: '+1-800-EMERGENCY', link: 'tel:+18003637464' },
              { icon: FaEnvelope, title: 'Email Support', info: 'support@crisisassist.org', link: 'mailto:support@crisisassist.org' },
              { icon: FaMapMarkerAlt, title: 'Headquarters', info: '123 Emergency St, Safety City', link: null },
            ].map((contact, index) => {
              const Icon = contact.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-crisis-blue-100 rounded-full mb-4">
                    <Icon className="text-crisis-blue-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{contact.title}</h3>
                  {contact.link ? (
                    <a
                      href={contact.link}
                      className="text-crisis-blue-600 hover:text-crisis-blue-700 transition-colors"
                    >
                      {contact.info}
                    </a>
                  ) : (
                    <span className="text-crisis-blue-600">{contact.info}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FaShieldAlt className="text-2xl text-crisis-blue-500" />
                <span className="text-xl font-bold text-white">CrisisAssist</span>
              </div>
              <p className="text-sm leading-relaxed">
                Advanced AI-powered emergency response system designed to keep citizens safe 
                and informed during natural disasters and emergencies.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-left hover:text-crisis-blue-400 transition-colors bg-transparent border-none p-0 cursor-pointer"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-left hover:text-crisis-blue-400 transition-colors bg-transparent border-none p-0 cursor-pointer"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-left hover:text-crisis-blue-400 transition-colors bg-transparent border-none p-0 cursor-pointer"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button className="text-left hover:text-crisis-blue-400 transition-colors bg-transparent border-none p-0 cursor-pointer">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button className="text-left hover:text-crisis-blue-400 transition-colors bg-transparent border-none p-0 cursor-pointer">
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button className="text-left hover:text-crisis-blue-400 transition-colors bg-transparent border-none p-0 cursor-pointer">
                    Emergency Response
                  </button>
                </li>
                <li>
                  <button className="text-left hover:text-crisis-blue-400 transition-colors bg-transparent border-none p-0 cursor-pointer">
                    Risk Assessment
                  </button>
                </li>
                <li>
                  <button className="text-left hover:text-crisis-blue-400 transition-colors bg-transparent border-none p-0 cursor-pointer">
                    Location Services
                  </button>
                </li>
                <li>
                  <button className="text-left hover:text-crisis-blue-400 transition-colors bg-transparent border-none p-0 cursor-pointer">
                    Human Operator
                  </button>
                </li>
                <li>
                  <button className="text-left hover:text-crisis-blue-400 transition-colors bg-transparent border-none p-0 cursor-pointer">
                    Safety Instructions
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <button
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-crisis-blue-600 transition-colors cursor-pointer border-none"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </button>
                <button
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-crisis-blue-600 transition-colors cursor-pointer border-none"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </button>
                <button
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-crisis-blue-600 transition-colors cursor-pointer border-none"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </button>
                <button
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-crisis-blue-600 transition-colors cursor-pointer border-none"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </button>
              </div>
              <p className="text-sm">
                Follow us for emergency preparedness tips and updates
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>
              &copy; {new Date().getFullYear()} CrisisAssist. All rights reserved. | 
              Built with React.js and Rasa Framework | 
              MSc in Artificial Intelligence - Advanced Conversational UI Design
            </p>
            <p className="mt-2 text-gray-500">
              This system is designed for educational and emergency response purposes. 
              In case of actual emergency, please call your local emergency services immediately.
            </p>
          </div>
        </div>
      </footer>

      {/* Chat Button - Floating */}
      <ChatButton onClick={() => setShowChat(true)} />

      {/* Chat Interface Modal */}
      {showChat && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 sm:p-4 animate-fade-in"
          onClick={() => setShowChat(false)}
        >
          <div
            className="bg-white rounded-t-3xl md:rounded-3xl shadow-2xl w-full h-full md:h-[90vh] md:max-h-[900px] max-w-5xl md:w-full flex flex-col overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 md:px-8 py-5 border-b border-white/20 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-2xl relative overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-50 animate-gradient-x"></div>
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }}></div>
              
              <div className="flex items-center space-x-3 sm:space-x-4 relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border-2 border-white/30 shadow-xl ring-2 ring-white/20">
                  <FaShieldAlt className="text-xl sm:text-2xl" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">
                    CrisisAssist
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 font-medium flex items-center space-x-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span>AI Emergency Assistant</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 flex items-center justify-center text-white hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20 shadow-lg relative z-10"
                aria-label="Close chat"
              >
                <span className="text-2xl sm:text-3xl font-light leading-none">×</span>
              </button>
            </div>
            <div className="flex-1 overflow-hidden bg-white">
              <ChatInterface />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
