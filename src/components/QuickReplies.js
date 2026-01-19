import React from 'react';

const QuickReplies = ({ replies, onSelect }) => {
  if (!replies || replies.length === 0) return null;

  return (
    <div
      className="mt-5 flex flex-wrap gap-2.5 sm:gap-3 animate-fade-in"
      role="group"
      aria-label="Quick reply options"
    >
      {replies.map((reply, index) => (
        <button
          key={index}
          onClick={() => onSelect(reply)}
          className="px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl border-2 border-indigo-200/50 
                     text-indigo-700 bg-white/80 backdrop-blur-sm hover:bg-gradient-to-r 
                     hover:from-indigo-50 hover:to-purple-50 hover:border-indigo-400 
                     active:scale-95 transition-all duration-300 font-semibold text-sm sm:text-base
                     shadow-md hover:shadow-lg focus:outline-none focus:ring-2 
                     focus:ring-indigo-500 focus:ring-offset-2 whitespace-nowrap
                     group relative overflow-hidden"
          aria-label={`Quick reply: ${reply}`}
        >
          {/* Gradient shine on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span className="relative z-10">{reply}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickReplies;
