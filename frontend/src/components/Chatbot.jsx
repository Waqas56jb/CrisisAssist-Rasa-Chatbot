import { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend, FiAlertCircle, FiShield, FiMap, FiCloud, FiHeart, FiInfo } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import './Chatbot.css';

const API_BASE = '/api';

function getSessionId() {
  try {
    let id = sessionStorage.getItem('crisisassist_chat_session_id');
    if (!id) {
      id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
      sessionStorage.setItem('crisisassist_chat_session_id', id);
    }
    return id;
  } catch {
    return `sess_${Date.now()}`;
  }
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      type: 'bot',
      text: '## Welcome to CrisisAssist\n\nHello! I\'m CrisisAssist, your emergency response assistant for Germany.\n\n## What I Can Help With\n\n- **Emergency numbers** (112, 110)\n- **Current MOWAS alerts** and warnings\n- **Weather forecasts** and conditions\n- **Safety precautions** and guidelines\n- **Shelter locations** and instructions\n- **First-aid** and caring instructions\n\nAsk me anything or use the quick reply buttons below.\n\n**Important:** In a life-threatening emergency, call **112** immediately.',
      time: new Date(),
    },
  ]);

  const QUICK_REPLIES = [
    { label: 'Emergency numbers', text: 'What are the emergency numbers in Germany?', icon: FiShield },
    { label: 'Current alerts', text: 'What are the current MOWAS alerts in Germany?', icon: FiAlertCircle },
    { label: 'Shelters', text: 'Where can I find shelters and what should I bring?', icon: FiMap },
    { label: 'Precautions', text: 'What precautions should I take in a crisis?', icon: FiInfo },
    { label: 'Weather', text: 'What is the weather in Germany right now?', icon: FiCloud },
    { label: 'First aid', text: 'What caring or first-aid instructions should I know?', icon: FiHeart },
  ];

  const sendQuickReply = (text) => {
    sendMessage(text);
  };
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const sessionIdRef = useRef(getSessionId());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const sendMessage = async (quickText) => {
    const text = (quickText != null ? quickText : input.trim()).trim();
    if (!text || loading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      type: 'user',
      text,
      time: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          session_id: sessionIdRef.current,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get reply');
      }

      const replies = data.replies || [];
      if (replies.length === 0) {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            type: 'bot',
            text: 'I\'m not sure how to answer that. Try asking about:\n- Alerts\n- Disasters\n- Emergency numbers\n- Safety advice',
            time: new Date(),
          },
        ]);
      } else {
        replies.forEach((r, i) => {
          if (r.text) {
            setMessages((prev) => [
              ...prev,
              {
                id: `bot-${Date.now()}-${i}`,
                type: 'bot',
                text: r.text,
                time: new Date(),
              },
            ]);
          }
        });
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          type: 'bot',
          text: `**Connection Error:** ${err.message || 'Connection error. Please try again.'}\n\nPlease check your connection and try again.`,
          time: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button
        type="button"
        className="chatbot-fab"
        onClick={() => setOpen(true)}
        aria-label="Open chat"
      >
        <FiMessageCircle className="chatbot-fab__icon" />
        <span className="chatbot-fab__label">CrisisAssist</span>
      </button>

      <div className={`chatbot-overlay ${open ? 'chatbot-overlay--open' : ''}`} aria-hidden={!open}>
        <div className="chatbot-panel">
          <header className="chatbot-header">
            <div className="chatbot-header__brand">
              <div className="chatbot-header__icon-wrapper">
                <FiShield className="chatbot-header__icon" />
              </div>
              <div>
                <h2 className="chatbot-header__title">CrisisAssist</h2>
                <p className="chatbot-header__subtitle">Emergency Response Assistant</p>
              </div>
            </div>
            <button
              type="button"
              className="chatbot-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <FiX />
            </button>
          </header>

          <div className="chatbot-safety" role="alert">
            <FiAlertCircle className="chatbot-safety__icon" />
            <span>Life-threatening emergency? Call <strong>112</strong> immediately (Germany, 24/7).</span>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chatbot-msg chatbot-msg--${msg.type}`}
              >
                {msg.type === 'bot' && (
                  <div className="chatbot-msg__avatar" aria-hidden>
                    <FiShield />
                  </div>
                )}
                <div className="chatbot-msg__bubble">
                  <div className="chatbot-msg__text">
                    <ReactMarkdown
                      components={{
                        // Enhanced heading rendering
                        h1: ({node, ...props}) => <h1 {...props} />,
                        h2: ({node, ...props}) => <h2 {...props} />,
                        h3: ({node, ...props}) => <h3 {...props} />,
                        // Enhanced paragraph rendering with proper spacing
                        p: ({node, ...props}) => <p {...props} />,
                        // Enhanced list rendering
                        ul: ({node, ...props}) => <ul {...props} />,
                        ol: ({node, ...props}) => <ol {...props} />,
                        li: ({node, ...props}) => <li {...props} />,
                        // Enhanced bold text
                        strong: ({node, ...props}) => <strong {...props} />,
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                  <span className="chatbot-msg__time">
                    {msg.time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="chatbot-msg chatbot-msg--bot">
                <div className="chatbot-msg__avatar">
                  <FiShield />
                </div>
                <div className="chatbot-msg__bubble chatbot-msg__bubble--typing">
                  <span className="chatbot-typing">
                    <span /><span /><span />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-quick-replies">
            {QUICK_REPLIES.map((qr) => {
              const IconComponent = qr.icon || FiInfo;
              return (
                <button
                  key={qr.label}
                  type="button"
                  className="chatbot-quick-reply"
                  onClick={() => sendQuickReply(qr.text)}
                  disabled={loading}
                  aria-label={qr.label}
                >
                  <IconComponent className="chatbot-quick-reply__icon" />
                  <span>{qr.label}</span>
                </button>
              );
            })}
          </div>

          <footer className="chatbot-footer">
            <textarea
              ref={inputRef}
              className="chatbot-input"
              placeholder="Ask emergency numbers, alerts, shelters, precautions…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={loading}
              aria-label="Message"
            />
            <button
              type="button"
              className="chatbot-send"
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              aria-label="Send"
            >
              <FiSend />
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}
