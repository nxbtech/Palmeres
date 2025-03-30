import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout/PageLayout';
import './CoupDeCoeur.scss';

const CoupDeCoeur = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/coup-de-coeur')
      .then((res) => (res.ok ? res.json() : Promise.reject('Erreur')))
      .then((data) => {
        setItems(data);
        setError(null);
      })
      .catch((err) => setError(err.message || 'Erreur de chargement'))
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = items.filter((item) => filter === 'all' || item.category === filter);
  const monthlyItems = items.filter((item) => item.highlighted).slice(0, 3);
  const spotlightItem = monthlyItems[0];

  const handleFilterChange = (value) => setFilter(value);
  const handleCardClick = (id) => navigate(`/coup-de-coeur/${id}`);

  const filterOptions = [
    { value: 'all', label: 'Toutes', icon: 'fas fa-th' },
    { value: 'restaurant', label: 'Restaurants', icon: 'fas fa-utensils' },
    { value: 'hotel', label: 'Hôtels', icon: 'fas fa-hotel' },
    { value: 'agence-immo', label: 'Agences Immo', icon: 'fas fa-home' },
    { value: 'artisans', label: 'Artisans', icon: 'fas fa-tools' },
    { value: 'commerces', label: 'Commerces', icon: 'fas fa-shopping-bag' },
  ];

  return (
    <PageLayout
      title="Coups de Cœur à Platja d’Aro"
      subtitle="Nos recommandations exclusives"
      image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742936904/banniere-cdc_tviwpu.jpg"
    >
      {loading && (
        <div className="cdc-loader">
          <div className="loader-circle"></div>
          <p>Chargement des coups de cœur...</p>
        </div>
      )}
      {error && <p className="cdc-error">{error}</p>}

      {!loading && spotlightItem && (
        <section className="cdc-spotlight">
          <div className="cdc-container">
            <h2 className="section-title">Coup de Cœur du Moment</h2>
            <div className="spotlight-card">
              <div className="card-image" onClick={() => handleCardClick(spotlightItem._id)}>
                <img src={spotlightItem.image} alt={spotlightItem.name} />
              </div>
              <div className="card-content">
                <h3>{spotlightItem.name}</h3>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fas fa-star ${i < Math.floor(spotlightItem.rating) ? 'filled' : ''}`} />
                  ))}
                </div>
                <button className="pri-btn" onClick={() => handleCardClick(spotlightItem._id)}>
                  <i className="fas fa-info-circle"></i> Détails
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {!loading && monthlyItems.length > 0 && (
        <section className="cdc-monthly">
          <div className="cdc-container">
            <h2 className="section-title">Coups de Cœur du Mois</h2>
            <div className="monthly-grid">
              {monthlyItems.map((item) => (
                <div key={item._id} className="monthly-card">
                  <div className="card-image" onClick={() => handleCardClick(item._id)}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="card-content">
                    <h6>{item.name}</h6>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star ${i < Math.floor(item.rating) ? 'filled' : ''}`} />
                      ))}
                    </div>
                    <button className="pri-btn" onClick={() => handleCardClick(item._id)}>
                      <i className="fas fa-info-circle"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {!loading && filteredItems.length > 0 && (
        <section className="cdc-all-items">
          <div className="cdc-container">
            <h2 className="section-title">Tous les Coups de Cœur</h2>
            {items.length > 0 && (
              <div className="filters">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`pri-btn filter-btn ${filter === option.value ? 'active' : ''}`}
                    onClick={() => handleFilterChange(option.value)}
                  >
                    <i className={option.icon}></i>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            )}
            <div className="all-items-grid">
              {filteredItems.map((item) => (
                <div key={item._id} className="item-card">
                  <div className="card-image" onClick={() => handleCardClick(item._id)}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="card-content">
                    <h6>{item.name}</h6>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star ${i < Math.floor(item.rating) ? 'filled' : ''}`} />
                      ))}
                    </div>
                    <button className="pri-btn" onClick={() => handleCardClick(item._id)}>
                      <i className="fas fa-info-circle"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export default CoupDeCoeur;