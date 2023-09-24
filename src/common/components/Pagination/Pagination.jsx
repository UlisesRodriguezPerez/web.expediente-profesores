// src/common/Pagination/Pagination.jsx
import React from 'react';

export const Pagination = ({ currentPage, totalItems, onPageChange }) => {
  return (
    <div className="pagination-container">
      <span className="items-info">{(currentPage - 1) * 10 + 1}-{Math.min(currentPage * 10, totalItems)} of {totalItems} items</span>
      <div className="pagination-buttons">
        <button className="pagination-button" onClick={() => onPageChange('prev')} disabled={currentPage <= 1}>Anterior</button>
        <button className="pagination-button" onClick={() => onPageChange('next')} disabled={currentPage * 10 >= totalItems}>Siguiente</button>
      </div>
    </div>
  );
};
