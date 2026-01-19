import React from 'react';
import { FaUser, FaRobot } from 'react-icons/fa';

const MessageBubble = ({ message }) => {
  const isUser = message.type === 'user';
  const timeString = message.timestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className={`flex items-start space-x-2 ${
        isUser ? 'flex-row-reverse space-x-reverse' : ''
      }`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? 'bg-crisis-blue-600 text-white'
            : 'bg-gray-200 text-gray-700'
        }`}
        aria-hidden="true"
      >
        {isUser ? <FaUser size={16} /> : <FaRobot size={16} />}
      </div>
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`chat-message ${
            isUser ? 'chat-message-user' : 'chat-message-bot'
          }`}
          role={isUser ? 'user message' : 'assistant message'}
        >
          <p className="whitespace-pre-wrap">{message.text}</p>
        </div>
        <span
          className={`text-xs text-gray-500 mt-1 ${
            isUser ? 'text-right' : 'text-left'
          }`}
          aria-label={`Message sent at ${timeString}`}
        >
          {timeString}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
