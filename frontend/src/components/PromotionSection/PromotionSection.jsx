import React from 'react';
import { useCart } from '../../context/CartContext';
import './PromotionSection.scss';

const PromotionSection = () => {
  const { addToCart } = useCart();
  const products = [
    {
      id: '1',
      title: 'T-Shirt Platja Vibes',
      image: 'https://i.postimg.cc/kg9YYbTn/f1.jpg',
      price: 25,
      description: 'Un t-shirt élégant.',
    },
    {
      id: '2',
      title: 'T-Shirt Costa Brava',
      image: 'https://i.postimg.cc/2yhT2kvb/f2.jpg',
      price: 20,
      description: 'Parfait pour la plage.',
    },
    {
      id: '3',
      title: 'Casquette Platja Sun',
      image: 'https://i.postimg.cc/VL9DtNm2/f3.jpg',
      price: 15,
      description: 'Protège-toi du soleil.',
    },
  ];

  return (
    <section className="promo-section">
      <div className="promo-small-container">
        <h2 className="promo-title">Nos Produits Phares</h2>
        <div className="promo-row">
          {products.map((product) => (
            <div key={product.id} className="promo-col-4">
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p className="promo-desc">{product.description}</p>
              <p className="promo-price">{`€${product.price.toFixed(2)}`}</p>
              <button
                className="promo-btn"
                onClick={() => addToCart({ name: product.title, image: product.image, price: product.price })}
              >
                Ajouter au panier
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionSection;