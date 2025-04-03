// frontend/src/components/Card/Card.jsx
import React from 'react';
import './Card.scss';

const Card = ({ image, title, description, onAction, actionText, className }) => {
  return (
    <div className={`card ${className || ''}`}>
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {onAction && actionText && (
        <div className="card-action">
          <button onClick={onAction}>{actionText}</button>
        </div>
      )}
    </div>
  );
};

export default Card;