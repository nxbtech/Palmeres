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

  const fashionDreamsImages = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1887&auto=format&fit=crop',
  ];

  return (
    <PageLayout>
      <section className="guides-fashion-dreams">
        <div className="fashion-dreams-content">
          <h2>EXPLOREZ PLATJA D’ARO</h2>
          <p>Découvrez les meilleurs guides pour profiter pleinement de votre expérience à Platja d’Aro</p>
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

      <section className="guides-section">
        <h2 className="section-title">NOS GUIDES</h2>
        {loading && <p>Chargement...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && guides.length === 0 && <p>Aucun guide disponible.</p>}
        <div className="guides-container">
          {guides.map((guide) => (
            <div key={guide._id} className="guide-card" onClick={() => handleCardClick(guide._id)}>
              <div className="guide-image-wrapper">
                <img src={guide.image} alt={guide.name} />
                <div className="guide-overlay">
                  <div className="guide-text">
                    <h5>{guide.name}</h5>
                    <p>{guide.category === 'expat' ? 'Guide pour expatriés' : 'Guide touristique'}</p>
                  </div>
                  <a href={guide.link} className="learn-more-btn">Télécharger <span className="arrow">→</span></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="guides-sale">
        <div className="sale-image-wrapper">
          <img src={guides[0]?.image || 'https://via.placeholder.com/600x300'} alt="Sale" />
          <h2 className="sale-title">PROMO DE FIN DE SAISON JUSQU’À 20% DE RÉDUCTION</h2>
        </div>
      </section>
    </PageLayout>
  );
};

export default Guides;