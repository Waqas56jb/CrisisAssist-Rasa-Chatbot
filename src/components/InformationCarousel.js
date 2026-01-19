import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaChevronLeft, FaChevronRight, FaUsers } from 'react-icons/fa';

const InformationCarousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = data?.items || [];

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="mt-4 bg-gradient-to-br from-white to-gray-50 border-2 border-crisis-blue-200/50 rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-bold text-crisis-blue-600 flex items-center space-x-2">
          <div className="p-2 bg-crisis-blue-100 rounded-lg">
            <FaMapMarkerAlt className="text-crisis-blue-600" />
          </div>
          <span>{data.title || 'Emergency Information'}</span>
        </h3>
        {items.length > 1 && (
          <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-2 py-1">
            <button
              onClick={prevItem}
              className="p-1.5 sm:p-2 rounded-full hover:bg-white transition-all duration-200 text-gray-600 hover:text-crisis-blue-600 focus:outline-none focus:ring-2 focus:ring-crisis-blue-500"
              aria-label="Previous item"
            >
              <FaChevronLeft size={14} />
            </button>
            <span className="text-xs sm:text-sm text-gray-600 font-medium px-2">
              {currentIndex + 1} / {items.length}
            </span>
            <button
              onClick={nextItem}
              className="p-1.5 sm:p-2 rounded-full hover:bg-white transition-all duration-200 text-gray-600 hover:text-crisis-blue-600 focus:outline-none focus:ring-2 focus:ring-crisis-blue-500"
              aria-label="Next item"
            >
              <FaChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-crisis-blue-100 to-crisis-blue-200 rounded-xl flex items-center justify-center shadow-sm">
            <FaMapMarkerAlt className="text-crisis-blue-600 text-lg sm:text-xl" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-1">{currentItem.name}</h4>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{currentItem.address}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {currentItem.distance && (
            <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
              <div className="w-8 h-8 bg-crisis-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-crisis-blue-600 text-xs font-bold">📍</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Distance</span>
                <span className="text-sm sm:text-base font-semibold text-gray-900">{currentItem.distance}</span>
              </div>
            </div>
          )}
          {currentItem.capacity && (
            <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
              <div className="w-8 h-8 bg-crisis-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaUsers className="text-crisis-blue-600 text-sm" />
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Status</span>
                <span
                  className={`text-sm sm:text-base font-semibold ${
                    currentItem.capacity === 'Available'
                      ? 'text-green-600'
                      : currentItem.capacity === 'Limited'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  {currentItem.capacity}
                </span>
              </div>
            </div>
          )}
        </div>

        {currentItem.phone && (
          <div className="flex items-center space-x-3 pt-3 border-t border-gray-200">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FaPhone className="text-green-600" />
            </div>
            <a
              href={`tel:${currentItem.phone}`}
              className="text-crisis-blue-600 hover:text-crisis-blue-700 font-semibold text-sm sm:text-base transition-colors flex-1"
            >
              {currentItem.phone}
            </a>
          </div>
        )}

        {items.length > 1 && (
          <div className="flex justify-center space-x-2 pt-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-crisis-blue-500 ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-crisis-blue-600'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to item ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InformationCarousel;
