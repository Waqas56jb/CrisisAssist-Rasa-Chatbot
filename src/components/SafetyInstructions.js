import React from 'react';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const SafetyInstructions = ({ data }) => {
  const instructions = data?.instructions || [];
  const crisisType = data?.crisisType || 'emergency';

  return (
    <div className="mt-4 bg-blue-50 border-l-4 border-crisis-blue-500 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-3">
        <FaExclamationTriangle className="text-crisis-blue-600" />
        <h3 className="text-lg font-bold text-crisis-blue-600">
          Safety Instructions for {crisisType}
        </h3>
      </div>
      <ul className="space-y-2">
        {instructions.map((instruction, index) => (
          <li
            key={index}
            className="flex items-start space-x-3 text-gray-800"
          >
            <FaCheckCircle className="text-green-600 flex-shrink-0 mt-1" />
            <span>{instruction}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 p-3 bg-white rounded border border-crisis-blue-200">
        <p className="text-sm text-gray-700">
          <strong>Important:</strong> These are general guidelines. Always
          follow instructions from local emergency services and authorities.
        </p>
      </div>
    </div>
  );
};

export default SafetyInstructions;
