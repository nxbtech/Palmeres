import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout/PageLayout';
import './Guides.scss';

const Guides = () => {
  const [guides, setGuides] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/guides')
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du chargement des guides');
        return res.json();
      })
      .then((data) => {
        setGuides(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setGuides([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredGuides = guides.filter((guide) => filter === 'all' || guide.category === filter);
  const spotlightGuide = guides[0]; // Premier guide pour "Guide du Moment"
  const featuredGuides = guides.slice(0, 3); // 3 guides pour "Guides en Vedette"

  const handleFilterChange = (value) => setFilter(value);
  const handleCardClick = (id) => navigate(`/guide/${id}`);

  return (
    <PageLayout
      title="Nos Guides"
      subtitle="Explorez Platja d’Aro"
      image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742936902/banniere-guides_xuas76.jpg"
    >
      {/* Loader */}
      {loading && (
        <div className="guides-loader">
          <div className="loader-circle"></div>
          <p>Chargement des guides...</p>
        </div>
      )}

      {/* Guide du Moment (Grande Carte) */}
      {!loading && spotlightGuide && (
        <section className="guides-spotlight">
          <div className="guides-container">
            <h2 className="section-title">Guide du Moment</h2>
            <div className="spotlight-card">
              <div className="card-image" onClick={() => handleCardClick(spotlightGuide._id)}>
                <img src={spotlightGuide.image} alt={spotlightGuide.name} />
              </div>
              <div className="card-content">
                <h3>{spotlightGuide.name || 'Guide par défaut'}</h3>
                <p className="description">
                  {spotlightGuide.category === 'expat' ? 'Guide pour expatriés' : 'Guide touristique'}
                </p>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fas fa-star ${i < Math.floor(spotlightGuide.rating || 4) ? 'filled' : ''}`} />
                  ))}
                </div>
                <button className="pri-btn" onClick={() => handleCardClick(spotlightGuide._id)}>
                  <i className="fas fa-info-circle"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Guides en Vedette */}
      {!loading && featuredGuides.length > 0 && (
        <section className="guides-featured">
          <div className="guides-container">
            <h2 className="section-title">Guides en Vedette</h2>
            <div className="featured-grid">
              {featuredGuides.map((guide) => (
                <div key={guide._id} className="featured-card">
                  <div className="card-image" onClick={() => handleCardClick(guide._id)}>
                    <img src={guide.image} alt={guide.name} />
                  </div>
                  <div className="card-content">
                    <h6>{guide.name || 'Guide par défaut'}</h6>
                    <p className="description">
                      {guide.category === 'expat' ? 'Guide pour expatriés' : 'Guide touristique'}
                    </p>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star ${i < Math.floor(guide.rating || 4) ? 'filled' : ''}`} />
                      ))}
                    </div>
                    <button className="pri-btn" onClick={() => handleCardClick(guide._id)}>
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
      {!loading && guides.length > 0 && (
        <section className="guides-filters-section">
          <div className="guides-container">
            <div className="filters">
              <div className="filter-group">
                <label>Catégorie :</label>
                <select value={filter} onChange={(e) => handleFilterChange(e.target.value)}>
                  <option value="all">Toutes</option>
                  <option value="tourist">Touristique</option>
                  <option value="expat">Expat</option>
                </select>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tous les Guides */}
      {!loading && filteredGuides.length > 0 && (
        <section className="guides-all-items">
          <div className="guides-container">
            <h2 className="section-title">Tous les Guides</h2>
            <div className="all-items-grid">
              {filteredGuides.map((guide) => (
                <div key={guide._id} className="item-card">
                  <div className="card-image" onClick={() => handleCardClick(guide._id)}>
                    <img src={guide.image} alt={guide.name} />
                  </div>
                  <div className="card-content">
                    <h6>{guide.name || 'Guide par défaut'}</h6>
                    <p className="description">
                      {guide.category === 'expat' ? 'Guide pour expatriés' : 'Guide touristique'}
                    </p>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star ${i < Math.floor(guide.rating || 4) ? 'filled' : ''}`} />
                      ))}
                    </div>
                    <button className="pri-btn" onClick={() => handleCardClick(guide._id)}>
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

export default Guides;