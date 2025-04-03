// frontend/src/components/SupportSection/SupportSection.jsx
import React from 'react';
import Button from '../Button/Button';
import './SupportSection.scss';

const SupportSection = ({ onSupportClick }) => {
  return (
    <div className="support-section">
      <p>Des questions sur votre don ?</p>
      <Button
        variant="secondary"
        onClick={onSupportClick}
        className="support-btn"
      >
        <i className="fas fa-headset"></i> Contacter le support
      </Button>
    </div>
  );
};

export default SupportSection;