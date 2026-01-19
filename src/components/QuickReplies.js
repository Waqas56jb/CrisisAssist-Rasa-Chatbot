import React from 'react';

const QuickReplies = ({ replies, onSelect }) => {
  if (!replies || replies.length === 0) return null;

  return (
    <div
      className="mt-3 flex flex-wrap gap-2"
      role="group"
      aria-label="Quick reply options"
    >
      {replies.map((reply, index) => (
        <button
          key={index}
          onClick={() => onSelect(reply)}
          className="quick-reply-button"
          aria-label={`Quick reply: ${reply}`}
        >
          {reply}
        </button>
      ))}
    </div>
  );
};

export default QuickReplies;
