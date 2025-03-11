import React from 'react';
import './Card.scss';

const Card = ({ title, image, items, linkText, onClick }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        {items && (
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
        {linkText && (
          <button className="card-button" onClick={onClick}>
            {linkText} <span className="material-symbols-outlined">add_shopping_cart</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;