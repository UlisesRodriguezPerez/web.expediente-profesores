// src/common/Table/Table.jsx
import React from 'react';

export const Table = ({ columns, data, className }) => {
  return (
    <table className={className}>
      <thead>
        <tr className="custom-background">
          {columns.map((col, index) => (
            <th key={`${col.header}-${index}`}>{col.header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => <td key={`${rowIndex}-${colIndex}`}>{col.render(row)}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
