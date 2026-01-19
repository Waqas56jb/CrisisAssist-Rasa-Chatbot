// Crisis types configuration
export const CRISIS_TYPES = {
  EARTHQUAKE: 'Earthquake',
  FLOOD: 'Flood',
  WILDFIRE: 'Wildfire',
  INFRASTRUCTURE: 'Infrastructure Failure',
  OTHER: 'Other Emergency',
};

// Risk levels
export const RISK_LEVELS = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

// Alert types
export const ALERT_TYPES = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  INFO: 'info',
};

// Message types
export const MESSAGE_TYPES = {
  USER: 'user',
  BOT: 'bot',
  SYSTEM: 'system',
};

// Conversation states
export const CONVERSATION_STATES = {
  INITIAL: 'initial',
  CRISIS_IDENTIFIED: 'crisis_identified',
  LOCATION_SET: 'location_set',
  RISK_ASSESSED: 'risk_assessed',
  INFORMATION_PROVIDED: 'information_provided',
  HUMAN_HANDOVER: 'human_handover',
};

// Quick reply options
export const QUICK_REPLIES = {
  CRISIS_TYPES: ['Earthquake', 'Flood', 'Wildfire', 'Infrastructure Failure', 'Other'],
  GENERAL: ['I need shelter', 'I need instructions', 'I need to report an emergency', 'Connect me to human operator'],
  LOCATION: ['Use GPS', 'Enter Manually', 'Skip'],
  HANDOVER: ['Yes, connect me', 'No, continue with bot'],
};

// API endpoints (to be configured)
export const API_ENDPOINTS = {
  RASA_WEBHOOK: '/webhooks/rest/webhook',
  TRACKER: '/conversations/{sender_id}/tracker',
  EXECUTE: '/conversations/{sender_id}/execute',
};

// Response time thresholds (in milliseconds)
export const RESPONSE_THRESHOLDS = {
  TYPING_INDICATOR: 1000,
  MAX_RESPONSE_TIME: 3000,
  TIMEOUT: 10000,
};

// Accessibility
export const ARIA_LABELS = {
  CHAT_INTERFACE: 'Chat interface for emergency assistance',
  MESSAGE_INPUT: 'Type your message or use voice input',
  SEND_BUTTON: 'Send message',
  VOICE_INPUT: 'Voice input',
  QUICK_REPLY: 'Quick reply option',
  LOCATION_DETECTOR: 'Location detection dialog',
  RISK_ASSESSMENT: 'Risk assessment questionnaire',
  HUMAN_HANDOVER: 'Human operator handover dialog',
};
