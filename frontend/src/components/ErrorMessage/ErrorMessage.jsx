// frontend/src/components/ErrorMessage/ErrorMessage.jsx
import React from 'react';
import Button from '../Button/Button';
import './ErrorMessage.scss';

const ErrorMessage = ({ message, onBack }) => {
  return (
    <div className="error-message">
      <p>{message}</p>
      {onBack && <Button variant="secondary" onClick={onBack}>Retour</Button>}
    </div>
  );
};

export default ErrorMessage;