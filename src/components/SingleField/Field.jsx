import React from "react";
import { useState } from "react";
import "./Field.css"

const Field = ({ dropdownOptions}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleDropdownOptionClick = (option) => {
    setInputValue(option);
    setDropdownOpen(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="dropdown-input-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onClick={toggleDropdown}
        placeholder="Enter a value or select from dropdown"
      />
      {dropdownOpen && (
        <div className="dropdown-options">
          {dropdownOptions.map((option, index) => (
            <div
              key={index}
              className="dropdown-option"
              onClick={() => handleDropdownOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Field;
