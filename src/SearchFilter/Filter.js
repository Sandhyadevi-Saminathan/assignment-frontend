import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import './filter.css'

const Filter = ({ handleFilters }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    domain: [],
    gender: [],
    available: [],
  });

  const handleSelect = (filterType, value) => {
  
    const updatedFilters = { ...selectedFilters };
    
    // Check if the filter type exists in the updatedFilters, if not create an empty array for it
    if (!updatedFilters[filterType]) {
      updatedFilters[filterType] = [];
    }
  
    const currentIndex = updatedFilters[filterType].indexOf(value);
  
    if (currentIndex === -1) {
      // If the value is not already selected, add it to the array
      updatedFilters[filterType].push(value);
    } else {
      // If the value is already selected, remove it from the array
      updatedFilters[filterType].splice(currentIndex, 1);
    }
  
    // Update the state with the modified filters
    setSelectedFilters(updatedFilters);
    console.log(updatedFilters)
  
    // Call the function to handle the filters passing the updatedFilters object
    handleFilters(updatedFilters);
  };
  

  const filterOptions = [
    {
      type: 'Domain',
      values: ['IT', 'Sales',"Finance","Marketing"],
    },
    {
      type: 'Gender',
      values: ['Male', 'Female'],
    },
    {
      type: 'Available',
      values: ['true', 'false'],
    },
  ];

  return (
    <div className="filter">
      <FontAwesomeIcon
        icon={faFilter}
        className={`filter-icon ${showOptions ? 'active' : ''}`}
        onClick={() => setShowOptions(!showOptions)}
      />
      {showOptions && (
        <div className="filter-options">
          {filterOptions.map((option) => (
            <div key={option.type}>
              <h5 style={{fontFamily:"cursive",fontSize:"22px",color:"black"}}>{option.type}</h5>
              {option.values.map((value) => (
                <label key={value}>
                  <input
                    type="checkbox"
                    value={value}
                    checked={selectedFilters[option.type.toLowerCase()].includes(value)}
                    onChange={() => handleSelect(option.type.toLowerCase(), value)}
                  />
                  <span style={{fontFamily:"cursive",fontSize:"18px",color:"tomato"}}>{value}</span>
                </label>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
