import React from 'react';
import { FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-crisis-blue-600 text-white shadow-lg" role="banner">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FaShieldAlt className="text-2xl" aria-hidden="true" />
            <div>
              <h1 className="text-xl font-bold">CrisisAssist</h1>
              <p className="text-sm text-crisis-blue-100">
                Emergency Response Assistant
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <FaExclamationTriangle className="text-crisis-yellow-500" aria-hidden="true" />
            <span className="hidden sm:inline">24/7 Emergency Support</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
