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
    <div className="mt-4 bg-white border-2 border-crisis-blue-200 rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-crisis-blue-600 flex items-center space-x-2">
          <FaMapMarkerAlt />
          <span>{data.title || 'Emergency Information'}</span>
        </h3>
        {items.length > 1 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={prevItem}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Previous item"
            >
              <FaChevronLeft />
            </button>
            <span className="text-sm text-gray-600">
              {currentIndex + 1} / {items.length}
            </span>
            <button
              onClick={nextItem}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Next item"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-10 h-10 bg-crisis-blue-100 rounded-full flex items-center justify-center">
            <FaMapMarkerAlt className="text-crisis-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{currentItem.name}</h4>
            <p className="text-sm text-gray-600">{currentItem.address}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          {currentItem.distance && (
            <div className="flex items-center space-x-2 text-gray-700">
              <span className="font-medium">Distance:</span>
              <span>{currentItem.distance}</span>
            </div>
          )}
          {currentItem.capacity && (
            <div className="flex items-center space-x-2 text-gray-700">
              <FaUsers className="text-crisis-blue-600" />
              <span className="font-medium">Status:</span>
              <span
                className={
                  currentItem.capacity === 'Available'
                    ? 'text-green-600 font-semibold'
                    : currentItem.capacity === 'Limited'
                    ? 'text-yellow-600 font-semibold'
                    : 'text-red-600 font-semibold'
                }
              >
                {currentItem.capacity}
              </span>
            </div>
          )}
        </div>

        {currentItem.phone && (
          <div className="flex items-center space-x-2 pt-2 border-t border-gray-200">
            <FaPhone className="text-crisis-blue-600" />
            <a
              href={`tel:${currentItem.phone}`}
              className="text-crisis-blue-600 hover:text-crisis-blue-700 font-medium"
            >
              {currentItem.phone}
            </a>
          </div>
        )}

        {items.length > 1 && (
          <div className="flex justify-center space-x-1 pt-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-crisis-blue-600'
                    : 'bg-gray-300'
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
