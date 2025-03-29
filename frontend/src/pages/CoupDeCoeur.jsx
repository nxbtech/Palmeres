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
      .catch((err) => {
        setError(err);
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Données statiques pour l'exemple
  const staticCoupsDeCoeur = [
    {
      id: 1,
      name: 'Boutique Éclat',
      category: 'commerces',
      description: 'Vêtements tendance et locaux.',
      image: 'https://res.cloudinary.com/drnmfxkwv/image/upload/v1742928798/cdc1_iepp7b.jpg',
      rating: 4.5,
      highlighted: true,
    },
    {
      id: 2,
      name: 'Restaurant La Mer',
      category: 'restaurants',
      description: 'Cuisine méditerranéenne exquise.',
      image: 'https://res.cloudinary.com/drnmfxkwv/image/upload/v1742928795/cdc2_mo1paj.jpg',
      rating: 4.8,
      highlighted: true,
    },
    {
      id: 3,
      name: 'Artisan du Bois',
      category: 'artisans',
      description: 'Meubles faits main uniques.',
      image: 'https://res.cloudinary.com/drnmfxkwv/image/upload/v1742928790/cdc3_tlutu0.jpg',
      rating: 4.3,
      highlighted: true,
    },
    {
      id: 4,
      name: 'Immo Platja',
      category: 'agences-immo',
      description: 'Experts en immobilier local.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
      rating: 4.6,
    },
  ];

  const allItems = [...staticCoupsDeCoeur, ...items];
  const filteredItems = allItems.filter((item) => filter === 'all' || item.category === filter);
  const monthlyItems = allItems.filter((item) => item.highlighted).slice(0, 3); // 3 coups de cœur du mois
  const spotlightItem = monthlyItems[0]; // Premier item pour "Coup de Cœur du Moment"

  const handleFilterChange = (value) => setFilter(value);
  const handleCardClick = (id) => navigate(`/coup-de-coeur/${id}`);

  return (
    <PageLayout
      title="Coups de Cœur à Platja d’Aro"
      subtitle="Nos recommandations exclusives"
      image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742936904/banniere-cdc_tviwpu.jpg"
    >
      {/* Loader */}
      {loading && (
        <div className="cdc-loader">
          <div className="loader-circle"></div>
          <p>Chargement des coups de cœur...</p>
        </div>
      )}

      {/* Coup de Cœur du Moment (Grande Carte) */}
      {!loading && spotlightItem && (
        <section className="cdc-spotlight">
          <div className="cdc-container">
            <h2 className="section-title">Coup de Cœur du Moment</h2>
            <div className="spotlight-card">
              <div className="card-image" onClick={() => handleCardClick(spotlightItem.id || spotlightItem._id)}>
                <img src={spotlightItem.image} alt={spotlightItem.name} />
              </div>
              <div className="card-content">
                <h3>{spotlightItem.name}</h3>
                <p className="description">{spotlightItem.description || 'Le coup de cœur à ne pas manquer.'}</p>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fas fa-star ${i < Math.floor(spotlightItem.rating || 4) ? 'filled' : ''}`} />
                  ))}
                </div>
                <button className="pri-btn" onClick={() => handleCardClick(spotlightItem.id || spotlightItem._id)}>
                  <i className="fas fa-info-circle"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Coups de Cœur du Mois */}
      {!loading && monthlyItems.length > 0 && (
        <section className="cdc-monthly">
          <div className="cdc-container">
            <h2 className="section-title">Coups de Cœur du Mois</h2>
            <div className="monthly-grid">
              {monthlyItems.map((item) => (
                <div key={item.id || item._id} className="monthly-card">
                  <div className="card-image" onClick={() => handleCardClick(item.id || item._id)}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="card-content">
                    <h6>{item.name}</h6>
                    <p className="description">{item.description || 'Un incontournable ce mois-ci.'}</p>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star ${i < Math.floor(item.rating || 4) ? 'filled' : ''}`} />
                      ))}
                    </div>
                    <button className="pri-btn" onClick={() => handleCardClick(item.id || item._id)}>
                      <i className="fas fa-info-circle"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filtres */}
      {!loading && allItems.length > 0 && (
        <section className="cdc-filters-section">
          <div className="cdc-container">
            <div className="filters">
              <div className="filter-group">
                <label>Catégorie :</label>
                <select value={filter} onChange={(e) => handleFilterChange(e.target.value)}>
                  <option value="all">Toutes</option>
                  <option value="commerces">Commerces</option>
                  <option value="restaurants">Restaurants</option>
                  <option value="agences-immo">Agences Immo</option>
                  <option value="artisans">Artisans</option>
                </select>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tous les Coups de Cœur */}
      {!loading && filteredItems.length > 0 && (
        <section className="cdc-all-items">
          <div className="cdc-container">
            <h2 className="section-title">Tous les Coups de Cœur</h2>
            <div className="all-items-grid">
              {filteredItems.map((item) => (
                <div key={item.id || item._id} className="item-card">
                  <div className="card-image" onClick={() => handleCardClick(item.id || item._id)}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="card-content">
                    <h6>{item.name}</h6>
                    <p className="description">{item.description || 'Un coup de cœur à découvrir.'}</p>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star ${i < Math.floor(item.rating || 4) ? 'filled' : ''}`} />
                      ))}
                    </div>
                    <button className="pri-btn" onClick={() => handleCardClick(item.id || item._id)}>
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