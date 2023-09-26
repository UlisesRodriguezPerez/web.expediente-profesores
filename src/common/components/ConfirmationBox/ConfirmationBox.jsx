import React from 'react';
import './ConfirmationBox.css';

export const ConfirmationBox = ({ text, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-box-container">
      <div className="box-content">
        <p>{text}</p>
        <div className="button-container">
          <button onClick={onCancel} className="cancel-button">CANCELAR</button>
          <button onClick={onConfirm} className="confirm-button">AGREGAR</button>
        </div>
      </div>
    </div>
  );
};

