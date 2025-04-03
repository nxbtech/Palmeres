// frontend/src/components/FilterGroup/FilterGroup.jsx
import React from 'react';
import './FilterGroup.scss';

const FilterGroup = ({ label, type = 'select', options, value, onChange, className = '' }) => {
  if (type === 'checkbox') {
    return (
      <div className={`filter-group checkbox ${className}`}>
        <label>
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
          />
          {label}
        </label>
      </div>
    );
  }

  return (
    <div className={`filter-group ${className}`}>
      <label>{label} :</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterGroup;