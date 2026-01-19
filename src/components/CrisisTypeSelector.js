import React from 'react';
import {
  FaExclamationTriangle,
  FaWater,
  FaFire,
  FaBuilding,
  FaExclamationCircle,
} from 'react-icons/fa';

const CrisisTypeSelector = ({ onSelect, onClose }) => {
  const crisisTypes = [
    {
      id: 'earthquake',
      name: 'Earthquake',
      icon: FaExclamationTriangle,
      color: 'bg-orange-100 text-orange-700 border-orange-500',
      hoverColor: 'hover:bg-orange-200',
    },
    {
      id: 'flood',
      name: 'Flood',
      icon: FaWater,
      color: 'bg-blue-100 text-blue-700 border-blue-500',
      hoverColor: 'hover:bg-blue-200',
    },
    {
      id: 'wildfire',
      name: 'Wildfire',
      icon: FaFire,
      color: 'bg-red-100 text-red-700 border-red-500',
      hoverColor: 'hover:bg-red-200',
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure Failure',
      icon: FaBuilding,
      color: 'bg-gray-100 text-gray-700 border-gray-500',
      hoverColor: 'hover:bg-gray-200',
    },
    {
      id: 'other',
      name: 'Other Emergency',
      icon: FaExclamationCircle,
      color: 'bg-yellow-100 text-yellow-700 border-yellow-500',
      hoverColor: 'hover:bg-yellow-200',
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="crisis-selector-title"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
        <h2
          id="crisis-selector-title"
          className="text-2xl font-bold text-crisis-blue-600 mb-4"
        >
          Select Emergency Type
        </h2>
        <p className="text-gray-700 mb-6">
          Please select the type of emergency you're experiencing:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {crisisTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => onSelect(type.name)}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 
                           ${type.color} ${type.hoverColor} transition-all
                           transform hover:scale-105 focus:outline-none focus:ring-2
                           focus:ring-crisis-blue-500`}
                aria-label={`Select ${type.name} emergency`}
              >
                <Icon size={24} />
                <span className="font-semibold text-lg">{type.name}</span>
              </button>
            );
          })}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CrisisTypeSelector;
