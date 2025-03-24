import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout/PageLayout';
import './Guides.scss';

const Guides = () => {
  const [guides, setGuides] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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

  const handleCardClick = (id) => {
    navigate(`/guide/${id}`);
  };

  // Sélectionner les 4 premiers guides pour la section "Guides en Vedette"
  const featuredGuides = guides.slice(0, 4);

  const featuredImages = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1887&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1618245318763-a15156d6b28c?q=80&w=1887&auto=format&fit=crop',
  ];

  return (
    <PageLayout
      title="Nos Guides"
      subtitle="Explorez Platja d’Aro"
      image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
    >
      {/* Featured Categories */}
      <div className="guides-categories">
        <div className="guides-small-container">
          <div className="guides-row">
            {featuredImages.map((img, index) => (
              <div key={index} className="guides-col-3">
                <img src={img} alt={`Guide ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Guides */}
      <div className="guides-small-container">
        <h2 className="guides-title">Guides en Vedette</h2>
        <div className="guides-row">
          {loading && <p>Chargement...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && featuredGuides.length === 0 && <p>Aucun guide disponible.</p>}
          {featuredGuides.map((guide) => (
            <div key={guide._id} className="guides-col-4" onClick={() => handleCardClick(guide._id)}>
              <img src={guide.image} alt={guide.name} />
              <h4>{guide.name || 'Guide par défaut'}</h4>
              <p>{guide.category === 'expat' ? 'Guide pour expatriés' : 'Guide touristique'}</p>
              <a href={guide.link} className="guides-btn">Télécharger →</a>
            </div>
          ))}
        </div>
      </div>

      {/* All Guides */}
      <div className="guides-small-container">
        <h2 className="guides-title">Tous Nos Guides</h2>
        <div className="guides-row">
          {loading && <p>Chargement...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && guides.length === 0 && <p>Aucun guide disponible.</p>}
          {guides.map((guide) => (
            <div key={guide._id} className="guides-col-4" onClick={() => handleCardClick(guide._id)}>
              <img src={guide.image} alt={guide.name} />
              <h4>{guide.name || 'Guide par défaut'}</h4>
              <p>{guide.category === 'expat' ? 'Guide pour expatriés' : 'Guide touristique'}</p>
              <a href={guide.link} className="guides-btn">Télécharger →</a>
            </div>
          ))}
        </div>
      </div>

      {/* Offer Section */}
      <div className="guides-offer">
        <div className="guides-small-container">
          <div className="guides-row">
            <div className="guides-col-2">
              <img
                src={guides[0]?.image || 'https://via.placeholder.com/600x300'}
                className="guides-offer-img"
                alt="Offre Exclusive"
              />
            </div>
            <div className="guides-col-2">
              <p>Exclusivement à Platja d'Aro</p>
              <h1>Promo de Fin de Saison</h1>
              <small>Jusqu’à 20% de réduction sur une sélection de guides et services.</small>
              <a href="#guides" className="guides-btn">Découvrir Maintenant →</a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Guides;