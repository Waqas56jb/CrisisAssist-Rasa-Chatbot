import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import LocationDetector from './LocationDetector';
import CrisisTypeSelector from './CrisisTypeSelector';
import RiskAssessment from './RiskAssessment';
import InformationCarousel from './InformationCarousel';
import HumanHandover from './HumanHandover';
import SafetyAlert from './SafetyAlert';
import QuickReplies from './QuickReplies';
import { FaRobot, FaUser } from 'react-icons/fa';
import axios from 'axios';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! I\'m CrisisAssist, your emergency response assistant. I\'m here to help you during crises.',
      timestamp: new Date(),
    },
    {
      id: 2,
      type: 'bot',
      text: 'What type of emergency are you experiencing?',
      timestamp: new Date(),
      quickReplies: ['Earthquake', 'Flood', 'Wildfire', 'Infrastructure Failure', 'Other'],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [crisisType, setCrisisType] = useState(null);
  const [riskLevel, setRiskLevel] = useState(null);
  const [conversationState, setConversationState] = useState('initial');
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
      }, 1000 + Math.random() * 1000);
    });
  };

  const handleUserMessage = async (text) => {
    addMessage(text, 'user');

    await simulateTyping();

    // Intent classification simulation
    const lowerText = text.toLowerCase();

    if (lowerText.includes('location') || lowerText.includes('where')) {
      setShowLocationDetector(true);
      addMessage(
        'I can help you with location services. Would you like to use GPS or enter your location manually?',
        'bot',
        ['Use GPS', 'Enter Manually', 'Skip']
      );
      return;
    }

    if (lowerText.includes('earthquake') || lowerText.includes('flood') || 
        lowerText.includes('wildfire') || lowerText.includes('emergency')) {
      setCrisisType(text);
      setConversationState('crisis_identified');
      addMessage(
        `I understand you're experiencing a ${text}. Let me help you assess the situation.`,
        'bot'
      );
      setTimeout(() => {
        setShowRiskAssessment(true);
        addMessage(
          'I need to ask you a few questions to assess your risk level. This will help me provide the best guidance.',
          'bot'
        );
      }, 1500);
      return;
    }

    if (lowerText.includes('shelter') || lowerText.includes('safe place')) {
      addMessage(
        'Let me find the nearest emergency shelters and safe locations for you.',
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
                address: '123 Main Street',
                distance: '0.5 km',
                capacity: 'Available',
                phone: '+1-555-0101',
              },
              {
                id: 2,
                name: 'High School Gymnasium',
                address: '456 Oak Avenue',
                distance: '1.2 km',
                capacity: 'Available',
                phone: '+1-555-0102',
              },
              {
                id: 3,
                name: 'City Hall',
                address: '789 Pine Road',
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
        'I can connect you with a human operator. They will have full context of our conversation.',
        'bot',
        ['Yes, connect me', 'No, continue with bot']
      );
      return;
    }

    // Default response with intent recovery
    addMessage(
      'I want to make sure I understand correctly. Could you provide more details? You can also use the quick reply buttons below.',
      'bot',
      ['I need shelter', 'I need instructions', 'I need to report an emergency', 'Connect me to human operator']
    );
  };

  const handleQuickReply = async (reply) => {
    addMessage(reply, 'user');
    await simulateTyping();
    await handleUserMessage(reply);
  };

  const handleLocationSet = (location) => {
    setUserLocation(location);
    setShowLocationDetector(false);
    addMessage(
      `Location set: ${location.address || location.coords ? 'GPS Location' : 'Manual Entry'}`,
      'bot'
    );
    addMessage(
      'Based on your location, I can provide location-specific emergency information and alerts.',
      'bot'
    );
  };

  const handleRiskAssessmentComplete = (riskData) => {
    setRiskLevel(riskData.level);
    setShowRiskAssessment(false);
    
    const alertMessage = riskData.level === 'high' 
      ? 'URGENT: Your risk level is HIGH. Please follow safety instructions immediately.'
      : riskData.level === 'medium'
      ? 'CAUTION: Your risk level is MEDIUM. Please take appropriate precautions.'
      : 'Your risk level is LOW. Stay informed and follow safety guidelines.';

    addMessage(alertMessage, 'bot');
    
    if (riskData.level === 'high') {
      setSafetyAlerts([
        {
          id: 1,
          type: 'high',
          title: 'High Risk Situation',
          message: 'Please evacuate to a safe location immediately if possible.',
        },
      ]);
    }

    setTimeout(() => {
      addMessage(
        'Here are some verified safety instructions for your situation:',
        'bot',
        null,
        {
          type: 'instructions',
          data: {
            crisisType: crisisType,
            instructions: [
              'Stay calm and assess your immediate surroundings',
              'Move to a safe location if possible',
              'Avoid damaged structures and areas',
              'Listen to local emergency broadcasts',
              'Keep emergency supplies ready',
            ],
          },
        }
      );
    }, 1000);
  };

  const handleHumanHandover = () => {
    setShowHumanHandover(false);
    addMessage(
      'Connecting you to a human operator now. They have full context of our conversation and will assist you immediately.',
      'bot'
    );
    setSafetyAlerts([
      {
        id: 2,
        type: 'info',
        title: 'Human Operator Connected',
        message: 'You are now speaking with a trained emergency operator.',
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-4xl mx-auto w-full">
      {/* Safety Alerts */}
      {safetyAlerts.length > 0 && (
        <div className="px-4 pt-4 space-y-2">
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
      <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50">
        <MessageList messages={messages} onQuickReply={handleQuickReply} />
        {isTyping && (
          <div className="flex items-center space-x-2 py-2">
            <FaRobot className="text-crisis-blue-600" />
            <div className="typing-indicator flex space-x-1">
              <span className="w-2 h-2 bg-crisis-blue-600 rounded-full"></span>
              <span className="w-2 h-2 bg-crisis-blue-600 rounded-full"></span>
              <span className="w-2 h-2 bg-crisis-blue-600 rounded-full"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <MessageInput onSend={handleUserMessage} />
      </div>
    </div>
  );
};

export default ChatInterface;
