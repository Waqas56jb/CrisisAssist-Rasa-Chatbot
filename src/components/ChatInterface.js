import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import LocationDetector from './LocationDetector';
import CrisisTypeSelector from './CrisisTypeSelector';
import RiskAssessment from './RiskAssessment';
import HumanHandover from './HumanHandover';
import SafetyAlert from './SafetyAlert';
import { FaRobot } from 'react-icons/fa';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: '👋 Hello! I\'m CrisisAssist, your intelligent emergency response assistant. I\'m here 24/7 to help you during any crisis situation.',
      timestamp: new Date(),
    },
    {
      id: 2,
      type: 'bot',
      text: 'How can I assist you today? You can ask me about emergency procedures, find nearby shelters, or get real-time safety guidance.',
      timestamp: new Date(),
      quickReplies: ['Report Emergency', 'Find Shelter', 'Safety Instructions', 'Risk Assessment'],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [crisisType, setCrisisType] = useState(null);
  const [showLocationDetector, setShowLocationDetector] = useState(false);
  const [showCrisisSelector, setShowCrisisSelector] = useState(false);
  const [showRiskAssessment, setShowRiskAssessment] = useState(false);
  const [showHumanHandover, setShowHumanHandover] = useState(false);
  const [safetyAlerts, setSafetyAlerts] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text, type = 'user', quickReplies = null, metadata = null) => {
    const newMessage = {
      id: Date.now(),
      type,
      text,
      timestamp: new Date(),
      quickReplies,
      metadata,
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  };

  const simulateTyping = () => {
    setIsTyping(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsTyping(false);
        resolve();
      }, 800 + Math.random() * 800);
    });
  };

  const handleUserMessage = async (text) => {
    addMessage(text, 'user');

    await simulateTyping();

    const lowerText = text.toLowerCase();

    if (lowerText.includes('location') || lowerText.includes('where') || lowerText.includes('gps')) {
      setShowLocationDetector(true);
      addMessage(
        '📍 I can help you with location services. Would you like to use GPS or enter your location manually?',
        'bot',
        ['Use GPS', 'Enter Manually', 'Skip']
      );
      return;
    }

    if (lowerText.includes('earthquake') || lowerText.includes('flood') || 
        lowerText.includes('wildfire') || lowerText.includes('emergency') || lowerText.includes('report emergency')) {
      setCrisisType(text);
      addMessage(
        `🚨 I understand you're experiencing a crisis. Let me help you assess the situation and provide immediate guidance.`,
        'bot'
      );
      setTimeout(() => {
        setShowRiskAssessment(true);
        addMessage(
          'I need to ask you a few quick questions to assess your risk level. This will help me provide the most accurate safety recommendations.',
          'bot'
        );
      }, 1500);
      return;
    }

    if (lowerText.includes('shelter') || lowerText.includes('safe place') || lowerText.includes('find shelter')) {
      addMessage(
        '🏠 Let me find the nearest emergency shelters and safe locations for you right away.',
        'bot'
      );
      setTimeout(() => {
        addMessage('', 'bot', null, {
          type: 'information_carousel',
          data: {
            title: 'Nearby Emergency Shelters',
            items: [
              {
                id: 1,
                name: 'Community Center - Main Street',
                address: '123 Main Street, Downtown',
                distance: '0.5 km',
                capacity: 'Available',
                phone: '+1-555-0101',
              },
              {
                id: 2,
                name: 'High School Gymnasium',
                address: '456 Oak Avenue, Midtown',
                distance: '1.2 km',
                capacity: 'Available',
                phone: '+1-555-0102',
              },
              {
                id: 3,
                name: 'City Hall Emergency Center',
                address: '789 Pine Road, Uptown',
                distance: '2.0 km',
                capacity: 'Limited',
                phone: '+1-555-0103',
              },
            ],
          },
        });
      }, 1500);
      return;
    }

    if (lowerText.includes('help') || lowerText.includes('human') || lowerText.includes('operator')) {
      setShowHumanHandover(true);
      addMessage(
        '👤 I can connect you with a trained human operator immediately. They will have full context of our conversation and can provide personalized assistance.',
        'bot',
        ['Yes, connect me', 'No, continue with bot']
      );
      return;
    }

    if (lowerText.includes('safety') || lowerText.includes('instructions') || lowerText.includes('what to do')) {
      addMessage(
        '📋 Here are essential safety instructions for emergency situations:',
        'bot',
        null,
        {
          type: 'instructions',
          data: {
            crisisType: 'General Emergency',
            instructions: [
              'Stay calm and assess your immediate surroundings',
              'Move to a safe location if possible',
              'Avoid damaged structures and hazardous areas',
              'Listen to local emergency broadcasts',
              'Keep emergency supplies ready',
              'Follow official evacuation orders if issued',
            ],
          },
        }
      );
      return;
    }

    // Default response with intent recovery
    addMessage(
      'I want to make sure I understand you correctly. Could you provide more details? You can also use the quick reply buttons below for faster assistance.',
      'bot',
      ['Report Emergency', 'Find Shelter', 'Safety Instructions', 'Connect to Human Operator']
    );
  };

  const handleQuickReply = async (reply) => {
    await simulateTyping();
    await handleUserMessage(reply);
  };

  const handleLocationSet = (location) => {
    setShowLocationDetector(false);
    addMessage(
      `✅ Location set successfully! ${location.address || (location.coords ? 'GPS location detected' : 'Manual entry confirmed')}`,
      'bot'
    );
    addMessage(
      'Based on your location, I can now provide location-specific emergency information, alerts, and nearby resources.',
      'bot'
    );
  };

  const handleRiskAssessmentComplete = (riskData) => {
    setShowRiskAssessment(false);
    
    const alertMessage = riskData.level === 'high' 
      ? '🔴 URGENT: Your risk level is HIGH. Please follow safety instructions immediately and consider evacuating if safe to do so.'
      : riskData.level === 'medium'
      ? '🟡 CAUTION: Your risk level is MEDIUM. Please take appropriate precautions and stay alert.'
      : '🟢 Your risk level is LOW. Stay informed and follow safety guidelines.';

    addMessage(alertMessage, 'bot');
    
    if (riskData.level === 'high') {
      setSafetyAlerts([
        {
          id: 1,
          type: 'high',
          title: 'High Risk Situation Detected',
          message: 'Please evacuate to a safe location immediately if possible. Follow official emergency instructions.',
        },
      ]);
    }

    setTimeout(() => {
      addMessage(
        '📚 Here are verified safety instructions tailored to your situation:',
        'bot',
        null,
        {
          type: 'instructions',
          data: {
            crisisType: crisisType || 'Emergency',
            instructions: [
              'Stay calm and assess your immediate surroundings',
              'Move to a safe location if possible',
              'Avoid damaged structures and areas',
              'Listen to local emergency broadcasts',
              'Keep emergency supplies ready',
              'Follow official evacuation orders',
            ],
          },
        }
      );
    }, 1000);
  };

  const handleHumanHandover = () => {
    setShowHumanHandover(false);
    addMessage(
      '🔄 Connecting you to a human operator now. They have full context of our conversation and will assist you immediately.',
      'bot'
    );
    setSafetyAlerts([
      {
        id: 2,
        type: 'info',
        title: 'Human Operator Connected',
        message: 'You are now speaking with a trained emergency operator who can provide personalized assistance.',
      },
    ]);
  };

  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Safety Alerts */}
      {safetyAlerts.length > 0 && (
        <div className="px-4 sm:px-6 pt-4 space-y-2 animate-slide-down">
          {safetyAlerts.map((alert) => (
            <SafetyAlert
              key={alert.id}
              type={alert.type}
              title={alert.title}
              message={alert.message}
            />
          ))}
        </div>
      )}

      {/* Location Detector Modal */}
      {showLocationDetector && (
        <LocationDetector
          onLocationSet={handleLocationSet}
          onClose={() => setShowLocationDetector(false)}
        />
      )}

      {/* Crisis Type Selector */}
      {showCrisisSelector && (
        <CrisisTypeSelector
          onSelect={(type) => {
            setCrisisType(type);
            setShowCrisisSelector(false);
            handleUserMessage(type);
          }}
          onClose={() => setShowCrisisSelector(false)}
        />
      )}

      {/* Risk Assessment */}
      {showRiskAssessment && (
        <RiskAssessment
          crisisType={crisisType}
          onComplete={handleRiskAssessmentComplete}
          onClose={() => setShowRiskAssessment(false)}
        />
      )}

      {/* Human Handover */}
      {showHumanHandover && (
        <HumanHandover
          conversationContext={messages}
          onConfirm={handleHumanHandover}
          onCancel={() => setShowHumanHandover(false)}
        />
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 py-6 md:py-8 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(99, 102, 241) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-1 relative z-10">
          <MessageList messages={messages} onQuickReply={handleQuickReply} />
          
          {isTyping && (
            <div className="flex items-center space-x-3 py-4 animate-fade-in">
              <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-full flex items-center justify-center shadow-md ring-2 ring-white">
                <FaRobot className="text-indigo-600 text-lg" />
              </div>
              <div className="bg-white rounded-3xl rounded-bl-md px-5 py-4 shadow-lg border border-gray-100/50">
                <div className="typing-indicator flex space-x-1.5">
                  <span className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce"></span>
                  <span className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200/60 bg-white/80 backdrop-blur-xl shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)]">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-5">
          <MessageInput onSend={handleUserMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
