
import React from 'react';

export const Pagination = ({ currentPage, totalItems, onPageChange, className='', itemsPerPage=10 }) => {
  const ITEMS_PER_PAGE = itemsPerPage; 

  // Funtion to calculate the total number of pages
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div className={`pagination-container ${className}`}>
      <span className="items-info">{(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems} items</span>
      <div className="pagination-buttons">
        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Anterior
        </button>

        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
