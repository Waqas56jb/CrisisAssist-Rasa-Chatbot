import React, { useState } from 'react';
import { FaMapMarkerAlt, FaCrosshairs, FaTimes, FaCheck } from 'react-icons/fa';

const LocationDetector = ({ onLocationSet, onClose }) => {
  const [mode, setMode] = useState('select'); // 'select', 'gps', 'manual'
  const [manualAddress, setManualAddress] = useState('');
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState(null);

  const handleGPSLocation = () => {
    setGpsLoading(true);
    setGpsError(null);

    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      setGpsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          source: 'gps',
        };
        setGpsLoading(false);
        onLocationSet(location);
      },
      (error) => {
        setGpsError(
          error.message === 'User denied Geolocation'
            ? 'Location access denied. Please use manual entry.'
            : 'Unable to retrieve location. Please try manual entry.'
        );
        setGpsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualAddress.trim()) {
      onLocationSet({
        address: manualAddress.trim(),
        source: 'manual',
      });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-dialog-title"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2
            id="location-dialog-title"
            className="text-xl font-bold text-crisis-blue-600 flex items-center space-x-2"
          >
            <FaMapMarkerAlt />
            <span>Set Your Location</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close location dialog"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {mode === 'select' && (
          <div className="space-y-3">
            <p className="text-gray-700 mb-4">
              Your location helps us provide accurate emergency information and
              alerts.
            </p>
            <button
              onClick={() => setMode('gps')}
              className="w-full flex items-center justify-center space-x-2 
                         px-4 py-3 bg-crisis-blue-600 text-white rounded-lg
                         hover:bg-crisis-blue-700 transition-colors"
            >
              <FaCrosshairs />
              <span>Use GPS Location</span>
            </button>
            <button
              onClick={() => setMode('manual')}
              className="w-full flex items-center justify-center space-x-2 
                         px-4 py-3 border-2 border-crisis-blue-600 text-crisis-blue-600 
                         rounded-lg hover:bg-crisis-blue-50 transition-colors"
            >
              <FaMapMarkerAlt />
              <span>Enter Address Manually</span>
            </button>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Skip for now
            </button>
          </div>
        )}

        {mode === 'gps' && (
          <div className="space-y-4">
            <p className="text-gray-700">
              We'll request permission to access your location.
            </p>
            {gpsError && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                {gpsError}
              </div>
            )}
            <div className="flex space-x-2">
              <button
                onClick={handleGPSLocation}
                disabled={gpsLoading}
                className="flex-1 flex items-center justify-center space-x-2 
                           px-4 py-3 bg-crisis-blue-600 text-white rounded-lg
                           hover:bg-crisis-blue-700 disabled:bg-gray-400
                           transition-colors"
              >
                {gpsLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Getting location...</span>
                  </>
                ) : (
                  <>
                    <FaCrosshairs />
                    <span>Get GPS Location</span>
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setMode('select');
                  setGpsError(null);
                }}
                className="px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg
                           hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {mode === 'manual' && (
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="address-input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter your address
              </label>
              <input
                id="address-input"
                type="text"
                value={manualAddress}
                onChange={(e) => setManualAddress(e.target.value)}
                placeholder="Street, City, State, ZIP"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg
                           focus:border-crisis-blue-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center space-x-2 
                           px-4 py-3 bg-crisis-blue-600 text-white rounded-lg
                           hover:bg-crisis-blue-700 transition-colors"
              >
                <FaCheck />
                <span>Confirm Location</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('select');
                  setManualAddress('');
                }}
                className="px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg
                           hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LocationDetector;
