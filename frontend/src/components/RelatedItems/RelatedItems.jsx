// frontend/src/components/RelatedItems/RelatedItems.jsx
import React from 'react';
import Card from '../Card/Card';
import './RelatedItems.scss';

const RelatedItems = ({ items, onItemClick, onSeeMore }) => {
  return (
    <div className="related-items">
      <div className="related-header">
        <h2>Produits Similaires</h2>
        <p onClick={onSeeMore}>Voir Plus</p>
      </div>
      <div className="related-grid">
        {items.map((item) => (
          <Card
            key={item._id}
            image={item.image}
            title={item.name}
            description={`$${item.price.toFixed(2)}`}
            onAction={() => onItemClick(item._id)}
            actionText="Voir Détails"
            className="related-card"
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedItems;