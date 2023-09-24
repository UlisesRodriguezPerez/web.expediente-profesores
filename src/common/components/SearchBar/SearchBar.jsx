// src/common/SearchBar/SearchBar.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const SearchBar = ({ className, value, onChange }) => {
  return (
    <div className={`${className}`}>
      <input
        type="text"
        placeholder="Búsqueda"
        className="search-input"
        value={value}
        onChange={onChange}
      />
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
    </div>
  );
};
