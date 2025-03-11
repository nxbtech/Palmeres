import React from 'react';
import { useCart } from '../../context/CartContext';
import Card from '../Card/Card';
import './PromotionSection.scss';

const PromotionSection = () => {
  const { addToCart } = useCart();
  const products = [
    { id: '1', title: 'T-Shirt Platja Vibes', image: 'https://i.postimg.cc/kg9YYbTn/f1.jpg', price: 25, description: 'Un t-shirt élégant.' },
    { id: '2', title: 'T-Shirt Costa Brava', image: 'https://i.postimg.cc/2yhT2kvb/f2.jpg', price: 20, description: 'Parfait pour la plage.' },
    { id: '3', title: 'Casquette Platja Sun', image: 'https://i.postimg.cc/VL9DtNm2/f3.jpg', price: 15, description: 'Protège-toi du soleil.' },
  ];

  return (
    <section className="promo-section">
      <div className="promo-container">
        <p className="promo-subtitle">Boutique</p>
        <h2 className="promo-title">Nos Produits</h2>
        <div className="promo-grid">
          {products.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              items={[`Prix: ${product.price} €`, product.description]}
              linkText="Ajouter au panier"
              onClick={() => addToCart({ name: product.title, image: product.image, price: product.price })}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionSection;