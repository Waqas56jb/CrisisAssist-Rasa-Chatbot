import axios from 'axios';

// Rasa API configuration
const RASA_API_URL = process.env.REACT_APP_RASA_API_URL || 'http://localhost:5005';
const RASA_WEBHOOK = `${RASA_API_URL}/webhooks/rest/webhook`;

/**
 * Send a message to the Rasa chatbot
 * @param {string} message - User message text
 * @param {string} senderId - Unique sender identifier
 * @returns {Promise<Array>} Array of bot responses
 */
export const sendMessageToRasa = async (message, senderId = 'user') => {
  try {
    const response = await axios.post(RASA_WEBHOOK, {
      sender: senderId,
      message: message,
    });

    return response.data || [];
  } catch (error) {
    console.error('Error sending message to Rasa:', error);
    throw error;
  }
};

/**
 * Get conversation tracker state from Rasa
 * @param {string} senderId - Unique sender identifier
 * @returns {Promise<Object>} Tracker state
 */
export const getTrackerState = async (senderId = 'user') => {
  try {
    const response = await axios.get(`${RASA_API_URL}/conversations/${senderId}/tracker`);
    return response.data;
  } catch (error) {
    console.error('Error getting tracker state:', error);
    throw error;
  }
};

/**
 * Trigger a custom action in Rasa
 * @param {string} actionName - Name of the custom action
 * @param {Object} parameters - Action parameters
 * @param {string} senderId - Unique sender identifier
 * @returns {Promise<Object>} Action result
 */
export const triggerAction = async (actionName, parameters = {}, senderId = 'user') => {
  try {
    const response = await axios.post(`${RASA_API_URL}/conversations/${senderId}/execute`, {
      name: actionName,
      policy: 'MappingPolicy',
      confidence: 1.0,
      ...parameters,
    });
    return response.data;
  } catch (error) {
    console.error('Error triggering action:', error);
    throw error;
  }
};

/**
 * Get location-based emergency information
 * @param {Object} location - Location object with coords or address
 * @returns {Promise<Object>} Emergency information
 */
export const getLocationBasedInfo = async (location) => {
  try {
    // This would typically call a custom Rasa action or external API
    const response = await axios.post(`${RASA_API_URL}/webhooks/rest/webhook`, {
      sender: 'location_service',
      message: `get_location_info ${JSON.stringify(location)}`,
    });
    return response.data;
  } catch (error) {
    console.error('Error getting location info:', error);
    throw error;
  }
};

/**
 * Escalate to human operator
 * @param {Array} conversationHistory - Full conversation context
 * @param {string} senderId - Unique sender identifier
 * @returns {Promise<Object>} Handover confirmation
 */
export const escalateToHuman = async (conversationHistory, senderId = 'user') => {
  try {
    const response = await axios.post(`${RASA_API_URL}/webhooks/rest/webhook`, {
      sender: senderId,
      message: '/escalate_to_human',
      metadata: {
        conversation_history: conversationHistory,
        timestamp: new Date().toISOString(),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error escalating to human:', error);
    throw error;
  }
};

export default {
  sendMessageToRasa,
  getTrackerState,
  triggerAction,
  getLocationBasedInfo,
  escalateToHuman,
};
