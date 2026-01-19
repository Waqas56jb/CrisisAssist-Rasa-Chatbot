import React from 'react';
import { FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const SafetyAlert = ({ type = 'info', title, message, onClose }) => {
  const alertConfig = {
    high: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      text: 'text-red-800',
      icon: FaExclamationTriangle,
      iconColor: 'text-red-600',
    },
    medium: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-500',
      text: 'text-yellow-800',
      icon: FaExclamationTriangle,
      iconColor: 'text-yellow-600',
    },
    low: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-800',
      icon: FaInfoCircle,
      iconColor: 'text-blue-600',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-800',
      icon: FaInfoCircle,
      iconColor: 'text-blue-600',
    },
  };

  const config = alertConfig[type] || alertConfig.info;
  const Icon = config.icon;

  return (
    <div
      className={`crisis-alert ${config.bg} ${config.border} ${config.text} 
                  flex items-start space-x-3 animate-pulse-slow`}
      role="alert"
      aria-live="assertive"
    >
      <Icon className={`${config.iconColor} flex-shrink-0 mt-1`} size={20} />
      <div className="flex-1">
        {title && (
          <h4 className="font-bold mb-1">{title}</h4>
        )}
        <p className="text-sm">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-500 hover:text-gray-700"
          aria-label="Close alert"
        >
          <FaTimes size={16} />
        </button>
      )}
    </div>
  );
};

export default SafetyAlert;
