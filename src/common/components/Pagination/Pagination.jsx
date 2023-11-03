// src/common/Pagination/Pagination.jsx
import React from 'react';

export const Pagination = ({ currentPage, totalItems, onPageChange, className='' }) => {
  
  const handlePrev = () => {
    onPageChange('prev');
  };

  const handleNext = () => {
    onPageChange('next');
  };
  
  return (
    <div className={`pagination-container ${className}`}>
      <span className="items-info">
        {(currentPage - 1) * 10 + 1}-{Math.min(currentPage * 10, totalItems)} of {totalItems} items
      </span>
      <div className="pagination-buttons">
        <button 
          className="pagination-button" 
          onClick={handlePrev}
          disabled={currentPage <= 1}
        >
          Anterior
        </button>
        <button 
          className="pagination-button" 
          onClick={handleNext} 
          disabled={currentPage * 10 >= totalItems}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
