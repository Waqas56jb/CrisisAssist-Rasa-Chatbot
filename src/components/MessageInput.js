import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaMicrophone } from 'react-icons/fa';

const MessageInput = ({ onSend }) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
        alert('Speech recognition error. Please type your message instead.');
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end space-x-2"
      aria-label="Message input"
    >
      <div className="flex-1 relative">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message or use voice input..."
          className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg 
                     focus:border-crisis-blue-500 focus:outline-none resize-none
                     placeholder-gray-400"
          rows="1"
          aria-label="Message input field"
          aria-describedby="input-help"
        />
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`absolute right-2 bottom-2 p-2 rounded-full transition-colors
                     ${
                       isRecording
                         ? 'bg-red-500 text-white'
                         : 'text-gray-500 hover:text-crisis-blue-600'
                     }`}
          aria-label="Voice input"
          title="Voice input"
        >
          <FaMicrophone size={16} />
        </button>
      </div>
      <button
        type="submit"
        disabled={!input.trim()}
        className="px-6 py-3 bg-crisis-blue-600 text-white rounded-lg
                   hover:bg-crisis-blue-700 active:bg-crisis-blue-800
                   disabled:bg-gray-300 disabled:cursor-not-allowed
                   transition-colors duration-200 flex items-center space-x-2
                   focus:outline-none focus:ring-2 focus:ring-crisis-blue-500"
        aria-label="Send message"
      >
        <span className="hidden sm:inline">Send</span>
        <FaPaperPlane size={16} />
      </button>
      <span id="input-help" className="sr-only">
        Press Enter to send, Shift+Enter for new line
      </span>
    </form>
  );
};

export default MessageInput;
