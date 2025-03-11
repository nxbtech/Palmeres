import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout/PageLayout';
import './CoupDeCoeur.scss';

const CoupDeCoeur = () => {
  const [activeCategory, setActiveCategory] = useState('restaurant');
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/coup-de-coeur?category=${activeCategory}`)
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du chargement des items');
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const handleCardClick = (id) => {
    navigate(`/coup-de-coeur/${id}`);
  };

  const categories = ['restaurant', 'hotel', 'agence-immo', 'artisans'];

  const fashionDreamsImages = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1887&auto=format&fit=crop',
  ];

  return (
    <PageLayout>
      <section className="coup-de-coeur-fashion-dreams">
        <div className="fashion-dreams-content">
          <h2>DÉCOUVREZ VOS FAVORIS</h2>
          <p>Explorez les meilleures recommandations pour enrichir votre expérience à Platja d’Aro</p>
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

      <section className="coup-de-coeur-section">
        <h2 className="section-title">NOS COUPS DE CŒUR</h2>
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="content">
          {loading && <p>Chargement...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && items.length === 0 && <p>Aucun item disponible pour cette catégorie.</p>}
          <div className="coup-de-coeur-container">
            {items.map((item) => (
              <div key={item._id} className="coup-de-coeur-card" onClick={() => handleCardClick(item._id)}>
                <div className="coup-de-coeur-image-wrapper">
                  <img src={item.image} alt={item.name} />
                  <div className="coup-de-coeur-overlay">
                    <div className="coup-de-coeur-text">
                      <h5>{item.name}</h5>
                      <p>{item.description}</p>
                    </div>
                    <button className="learn-more-btn">En savoir plus <span className="arrow">→</span></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="coup-de-coeur-sale">
        <div className="sale-image-wrapper">
          <img src={items[0]?.image || 'https://via.placeholder.com/600x300'} alt="Sale" />
          <h2 className="sale-title">PROMO DE FIN DE SAISON JUSQU’À 20% DE RÉDUCTION</h2>
        </div>
      </section>
    </PageLayout>
  );
};

export default CoupDeCoeur;