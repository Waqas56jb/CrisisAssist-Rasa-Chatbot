import React from 'react';
import MessageBubble from './MessageBubble';
import QuickReplies from './QuickReplies';
import InformationCarousel from './InformationCarousel';
import SafetyInstructions from './SafetyInstructions';

const MessageList = ({ messages, onQuickReply }) => {
  return (
    <div className="space-y-4" role="log" aria-live="polite" aria-label="Chat messages">
      {messages.map((message) => (
        <div key={message.id} className="flex flex-col">
          <MessageBubble message={message} />
          
          {/* Render metadata content */}
          {message.metadata?.type === 'information_carousel' && (
            <InformationCarousel data={message.metadata.data} />
          )}
          
          {message.metadata?.type === 'instructions' && (
            <SafetyInstructions data={message.metadata.data} />
          )}
          
          {/* Quick Replies */}
          {message.quickReplies && message.quickReplies.length > 0 && (
            <QuickReplies
              replies={message.quickReplies}
              onSelect={onQuickReply}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
