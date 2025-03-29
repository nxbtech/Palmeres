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
    {
      id: '4',
      title: 'Sac Platja Style',
      image: 'https://i.postimg.cc/3JqL5gL8/f4.jpg',
      price: 30,
      description: 'Idéal pour tes sorties.',
    },
  ];

  return (
    <section className="promo-section">
      <div className="promo-container">
        <h2 className="section-title">Nos Produits Phares</h2>
        <div className="promo-row">
          {products.map((product) => (
            <div key={product.id} className="promo-card">
              <div className="card-image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="card-content">
                <h6>{product.title}</h6>
                <p className="price">{`€${product.price.toFixed(2)}`}</p>
                <p className="description">{product.description}</p>
                <button
                  className="pri-btn"
                  onClick={() => addToCart({ name: product.title, image: product.image, price: product.price })}
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionSection;