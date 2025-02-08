import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal; 