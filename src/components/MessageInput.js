import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaMicrophone, FaStop } from 'react-icons/fa';

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
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
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
      className="flex items-end space-x-3"
      aria-label="Message input"
    >
      <div className="flex-1 relative">
        {/* Input Container with Gradient Border */}
        <div className="relative bg-white rounded-3xl border-2 border-gray-200 focus-within:border-transparent focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl">
          {/* Gradient Border Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl opacity-0 focus-within:opacity-100 blur transition-opacity duration-300 -z-10"></div>
          
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
            }}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="w-full px-5 sm:px-6 py-4 sm:py-4.5 pr-24 sm:pr-28 rounded-3xl 
                       focus:outline-none resize-none text-sm sm:text-base
                       placeholder-gray-400 text-gray-900 leading-relaxed
                       max-h-[120px] overflow-y-auto bg-transparent"
            rows="1"
            aria-label="Message input field"
            aria-describedby="input-help"
          />
          
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`absolute right-3 sm:right-4 bottom-3 sm:bottom-3.5 p-2.5 sm:p-3 rounded-2xl transition-all duration-300
                       ${
                         isRecording
                           ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse shadow-lg scale-110 ring-2 ring-red-200'
                           : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
                       }`}
            aria-label="Voice input"
            title="Voice input"
          >
            {isRecording ? <FaStop size={14} /> : <FaMicrophone size={16} />}
          </button>
        </div>
      </div>
      
      {/* Send Button */}
      <button
        type="submit"
        disabled={!input.trim()}
        className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 
                   bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white rounded-2xl
                   hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 
                   active:scale-95 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed
                   transition-all duration-300 flex items-center justify-center
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                   shadow-xl hover:shadow-2xl disabled:shadow-none
                   group relative overflow-hidden"
        aria-label="Send message"
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        <FaPaperPlane size={18} className="relative z-10" />
      </button>
      
      <span id="input-help" className="sr-only">
        Press Enter to send, Shift+Enter for new line
      </span>
    </form>
  );
};

export default MessageInput;
