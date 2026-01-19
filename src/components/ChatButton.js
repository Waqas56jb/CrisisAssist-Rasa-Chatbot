import React from 'react';
import { FaCommentDots } from 'react-icons/fa';

const ChatButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-16 h-16 bg-crisis-blue-600 text-white rounded-full 
                 shadow-2xl hover:bg-crisis-blue-700 transition-all transform hover:scale-110 
                 active:scale-95 flex items-center justify-center z-40 animate-bounce-slow
                 focus:outline-none focus:ring-4 focus:ring-crisis-blue-300"
      aria-label="Open chat assistant"
    >
      <FaCommentDots className="text-2xl" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
    </button>
  );
};

export default ChatButton;
