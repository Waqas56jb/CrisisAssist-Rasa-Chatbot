import React, { useState } from 'react';
import { FaCheckCircle, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

const RiskAssessment = ({ crisisType, onComplete, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [riskLevel, setRiskLevel] = useState(null);

  const questions = [
    {
      id: 'immediate_danger',
      text: 'Are you in immediate physical danger?',
      options: [
        { value: 'yes', label: 'Yes, I am in immediate danger' },
        { value: 'no', label: 'No, I am safe for now' },
        { value: 'unsure', label: 'I am not sure' },
      ],
      weight: 'high',
    },
    {
      id: 'location_safety',
      text: 'Is your current location safe?',
      options: [
        { value: 'safe', label: 'Yes, my location is safe' },
        { value: 'unsafe', label: 'No, my location is not safe' },
        { value: 'unknown', label: 'I am not sure' },
      ],
      weight: 'high',
    },
    {
      id: 'injuries',
      text: 'Are you or anyone with you injured?',
      options: [
        { value: 'serious', label: 'Yes, serious injuries' },
        { value: 'minor', label: 'Yes, minor injuries' },
        { value: 'no', label: 'No injuries' },
      ],
      weight: 'medium',
    },
    {
      id: 'evacuation',
      text: 'Can you safely evacuate if needed?',
      options: [
        { value: 'yes', label: 'Yes, I can evacuate' },
        { value: 'no', label: 'No, I cannot evacuate' },
        { value: 'maybe', label: 'Maybe, with assistance' },
      ],
      weight: 'medium',
    },
    {
      id: 'supplies',
      text: 'Do you have access to emergency supplies?',
      options: [
        { value: 'yes', label: 'Yes, I have supplies' },
        { value: 'limited', label: 'Limited supplies' },
        { value: 'no', label: 'No supplies' },
      ],
      weight: 'low',
    },
  ];

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateRiskLevel(newAnswers);
    }
  };

  const calculateRiskLevel = (allAnswers) => {
    let highRiskCount = 0;
    let mediumRiskCount = 0;

    questions.forEach((question) => {
      const answer = allAnswers[question.id];
      if (question.weight === 'high') {
        if (
          (question.id === 'immediate_danger' && answer === 'yes') ||
          (question.id === 'location_safety' && answer === 'unsafe')
        ) {
          highRiskCount += 2;
        } else if (answer === 'unsure' || answer === 'unknown') {
          mediumRiskCount += 1;
        }
      } else if (question.weight === 'medium') {
        if (
          (question.id === 'injuries' && answer === 'serious') ||
          (question.id === 'evacuation' && answer === 'no')
        ) {
          highRiskCount += 1;
          mediumRiskCount += 1;
        } else if (answer === 'minor' || answer === 'maybe') {
          mediumRiskCount += 1;
        }
      }
    });

    let level = 'low';
    if (highRiskCount >= 2) {
      level = 'high';
    } else if (highRiskCount >= 1 || mediumRiskCount >= 2) {
      level = 'medium';
    }

    setRiskLevel(level);
    setTimeout(() => {
      onComplete({
        level,
        answers: allAnswers,
        timestamp: new Date(),
      });
    }, 1500);
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="risk-assessment-title"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2
            id="risk-assessment-title"
            className="text-2xl font-bold text-crisis-blue-600 flex items-center space-x-2"
          >
            <FaExclamationTriangle />
            <span>Risk Assessment</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close risk assessment"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {riskLevel ? (
          <div className="text-center py-8">
            <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                riskLevel === 'high'
                  ? 'bg-red-100 text-red-600'
                  : riskLevel === 'medium'
                  ? 'bg-yellow-100 text-yellow-600'
                  : 'bg-green-100 text-green-600'
              }`}
            >
              <FaExclamationTriangle size={40} />
            </div>
            <h3 className="text-xl font-bold mb-2">
              Assessment Complete
            </h3>
            <p className="text-gray-700">
              Your risk level has been calculated. Providing recommendations...
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-crisis-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {question.text}
              </h3>
              <div className="space-y-3">
                {question.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(question.id, option.value)}
                    className="w-full text-left px-4 py-3 border-2 border-gray-300 
                               rounded-lg hover:border-crisis-blue-500 hover:bg-crisis-blue-50
                               transition-all focus:outline-none focus:ring-2 
                               focus:ring-crisis-blue-500"
                  >
                    <div className="flex items-center space-x-2">
                      <FaCheckCircle className="text-crisis-blue-600" />
                      <span>{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RiskAssessment;
