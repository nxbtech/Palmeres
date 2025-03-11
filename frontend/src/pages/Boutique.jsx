import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout/PageLayout';
import './Boutique.scss';

const Boutique = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const url = activeCategory === 'all' 
      ? 'http://localhost:5000/api/products' 
      : `http://localhost:5000/api/products?category=${activeCategory}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du chargement des produits');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  const categories = ['all', 'tshirts', 'casquettes', 'hotels', 'villas', 'sacs', 'serviettes', 'accessoires'];

  const fashionDreamsImages = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1887&auto=format&fit=crop',
  ];

  return (
    <PageLayout>
      <section className="boutique-upgrade">
        <marquee>
          <h2>AMÉLIOREZ VOTRE STYLE <span className="star">★</span> AMÉLIOREZ VOTRE STYLE</h2>
        </marquee>
      </section>

      <section className="boutique-fashion-dreams">
        <div className="fashion-dreams-content">
          <h2>RÊVES DE MODE EN RÉALITÉ</h2>
          <p>Révélez votre expression intérieure à travers notre collection variée de styles intemporels et de découvertes de mode uniques</p>
          <button className="learn-more-btn">En savoir plus <span className="arrow">→</span></button>
        </div>
        <div className="fashion-dreams-images">
          <div className="fashion-card">
            <img src={fashionDreamsImages[0]} alt="Plage Platja d’Aro" />
          </div>
          <div className="fashion-card">
            <img src={fashionDreamsImages[1]} alt="Café Platja d’Aro" />
          </div>
        </div>
      </section>

      <section className="boutique-section">
        <h2 className="section-title">NOS NOUVEAUX PRODUITS</h2>
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <div className="content">
          {loading && <p>Chargement...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && products.length === 0 && <p>Aucun produit disponible.</p>}
          <div className="pro-container">
            {products.map((product) => (
              <div key={product._id} className="pro" onClick={() => handleCardClick(product._id)}>
                <div className="pro-image-wrapper">
                  <img src={product.image} alt={product.name} />
                  <div className="pro-overlay">
                    <div className="pro-text">
                      <h5>{product.name}</h5>
                      <p>{product.description || 'Découvrez ce produit unique pour vos aventures quotidiennes'}</p>
                      <h4>€{product.price.toFixed(2)}</h4>
                    </div>
                    <button className="buy-btn" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>
                      Acheter maintenant <span className="arrow">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="boutique-popular-seasons">
        <h2 className="section-title">COLLECTIONS SAISONNIÈRES POPULAIRES</h2>
        <div className="season-grid">
          <div className="season-card">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" alt="Été" />
            <h3>ÉTÉ</h3>
          </div>
          <div className="season-card">
            <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1887&auto=format&fit=crop" alt="Hiver" />
            <h3>HIVER</h3>
          </div>
          <div className="season-card">
            <img src="https://images.unsplash.com/photo-1618245318763-a15156d6b28c?q=80&w=1887&auto=format&fit=crop" alt="Hiver" />
            <h3>HIVER</h3>
          </div>
          <div className="season-card">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" alt="Été" />
            <h3>ÉTÉ</h3>
          </div>
        </div>
      </section>

      <section className="boutique-sale">
        <div className="sale-image-wrapper">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" alt="Sale" />
          <h2 className="sale-title">PROMO DE FIN DE SAISON JUSQU’À 20% DE RÉDUCTION</h2>
        </div>
      </section>
    </PageLayout>
  );
};

export default Boutique;