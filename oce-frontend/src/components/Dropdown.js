import React, { useState, useRef, useEffect } from 'react';

function Dropdown({ label, icon, altText, bgColor = "bg-base-white", textColor = "text-base-white", borderColor = "border-primary-primary500", options = [], onChange, value, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const hoverTimeout = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  useEffect(() => {
    return () => {
      clearTimeout(hoverTimeout.current);
    };
  }, []);

  useEffect(() => {
    const selected = options.find(option => option.value === value);
    setSelectedOption(selected);
  }, [value, options]);

  return (
    <div 
      className={`relative inline-block text-right items-center w-full ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex justify-between items-center w-full px-3 py-2 ${bgColor} ${textColor} ${borderColor} border rounded-xl hover:bg-primary-primary500 hover:border-primary-primary600 hover:text-base-white hover:shadow-lg`}
        aria-label={altText}
      >
        <span className="font-bold text-sm">{selectedOption ? selectedOption.label : label}</span>
        <div className={`shrink-0 w-4 aspect-square transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          {icon}
        </div>
      </button>
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-full max-h-48 overflow-y-auto bg-base-white border border-gray-300 rounded-xl shadow-lg z-10"
        >
          <ul className="py-1">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer text-primary-primary600 hover:bg-gray-200"
                onClick={() => {
                  onChange(option.value); 
                  setIsOpen(false);
                  setSelectedOption(option);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;