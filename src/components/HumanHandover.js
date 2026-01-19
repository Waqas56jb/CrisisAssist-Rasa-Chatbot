import React, { useState } from 'react';
import { FaUserFriends, FaTimes, FaCheck, FaClock } from 'react-icons/fa';

const HumanHandover = ({ conversationContext, onConfirm, onCancel }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConfirm = () => {
    setIsConnecting(true);
    setTimeout(() => {
      onConfirm();
    }, 2000);
  };

  const contextSummary = conversationContext
    .filter((msg) => msg.type === 'user')
    .slice(-5)
    .map((msg) => msg.text)
    .join('; ');

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="handover-title"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2
            id="handover-title"
            className="text-2xl font-bold text-crisis-blue-600 flex items-center space-x-2"
          >
            <FaUserFriends />
            <span>Connect to Human Operator</span>
          </h2>
          {!isConnecting && (
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Cancel handover"
            >
              <FaTimes size={20} />
            </button>
          )}
        </div>

        {isConnecting ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-crisis-blue-100 rounded-full mb-4">
              <FaClock className="text-crisis-blue-600 animate-spin" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Connecting...</h3>
            <p className="text-gray-700">
              Please wait while we connect you to a trained emergency operator.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                A human operator will be connected to assist you. They will have
                full context of our conversation to provide personalized help.
              </p>

              <div className="bg-blue-50 border-l-4 border-crisis-blue-500 p-4 rounded mb-4">
                <h4 className="font-semibold text-crisis-blue-600 mb-2">
                  Conversation Context (will be shared):
                </h4>
                <p className="text-sm text-gray-700">
                  {contextSummary || 'No previous context'}
                </p>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <FaCheck className="text-green-600" />
                  <span>24/7 available emergency operators</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCheck className="text-green-600" />
                  <span>Full conversation history shared</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCheck className="text-green-600" />
                  <span>Immediate response for critical situations</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleConfirm}
                className="flex-1 flex items-center justify-center space-x-2 
                           px-4 py-3 bg-crisis-blue-600 text-white rounded-lg
                           hover:bg-crisis-blue-700 transition-colors"
              >
                <FaUserFriends />
                <span>Yes, Connect Me</span>
              </button>
              <button
                onClick={onCancel}
                className="px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg
                           hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HumanHandover;
