// frontend/src/components/CardGrid/CardGrid.jsx
import React from 'react';
import Card from '../Card/Card';
import './CardGrid.scss';

const CardGrid = ({ items, onCardClick, cardClassName }) => {
  return (
    <div className="card-grid">
      {items.map((item) => (
        <Card
          key={item._id}
          image={item.image}
          title={item.name || 'Guide par défaut'}
          description={item.category === 'expat' ? 'Guide pour expatriés' : 'Guide touristique'}
          onAction={() => onCardClick(item._id)}
          actionText={<i className="fas fa-info-circle"></i>}
          className={cardClassName}
        />
      ))}
    </div>
  );
};

export default CardGrid;