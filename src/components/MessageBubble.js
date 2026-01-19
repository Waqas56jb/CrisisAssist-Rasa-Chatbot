import React from 'react';
import { FaUser, FaRobot, FaCheckDouble } from 'react-icons/fa';

const MessageBubble = ({ message }) => {
  const isUser = message.type === 'user';
  const timeString = message.timestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className={`flex items-end space-x-3 mb-5 animate-slide-in ${
        isUser ? 'flex-row-reverse space-x-reverse' : ''
      }`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg ring-2 ring-white">
          <FaRobot className="text-white text-sm" />
        </div>
      )}

      {/* Message Container */}
      <div className={`flex flex-col max-w-[80%] sm:max-w-[75%] md:max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Message Bubble */}
        <div
          className={`group relative rounded-3xl px-5 py-3.5 shadow-xl transition-all duration-300 hover:shadow-2xl ${
            isUser
              ? 'bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white rounded-br-md'
              : 'bg-white text-gray-800 rounded-bl-md border border-gray-100/50 backdrop-blur-sm'
          }`}
          role={isUser ? 'user message' : 'assistant message'}
        >
          {/* Shine effect on hover */}
          <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            isUser ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-50/50 to-transparent'
          }`}></div>
          
          <p className="relative whitespace-pre-wrap text-sm sm:text-base leading-relaxed break-words font-medium">
            {message.text}
          </p>

          {/* Message Tail */}
          <div
            className={`absolute bottom-0 ${
              isUser ? 'right-0 translate-x-1' : 'left-0 -translate-x-1'
            }`}
          >
            <div
              className={`w-4 h-4 transform rotate-45 ${
                isUser
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600'
                  : 'bg-white border-l border-b border-gray-100/50'
              }`}
            ></div>
          </div>
        </div>

        {/* Timestamp and Status */}
        <div
          className={`flex items-center space-x-2 mt-2 px-2 ${
            isUser ? 'flex-row-reverse space-x-reverse' : ''
          }`}
        >
          <span className="text-[10px] sm:text-xs text-gray-400 font-medium">
            {timeString}
          </span>
          {isUser && (
            <div className="text-indigo-500">
              <FaCheckDouble size={10} />
            </div>
          )}
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-lg ring-2 ring-white">
          <FaUser className="text-white text-sm" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
