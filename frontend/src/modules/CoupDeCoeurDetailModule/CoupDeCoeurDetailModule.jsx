// frontend/src/modules/CoupDeCoeurDetailModule/CoupDeCoeurDetailModule.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import './CoupDeCoeurDetailModule.scss';

const CoupDeCoeurDetailModule = () => {
  const { id } = useParams();
  const [coupDeCoeur, setCoupDeCoeur] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [activeInfo, setActiveInfo] = useState(null);

  useEffect(() => {
    const fetchCoupDeCoeur = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/coup-de-coeur/${id}`);
        if (!response.ok) throw new Error('Coup de cœur non trouvé');
        const data = await response.json();
        setCoupDeCoeur(data);
        setMainImage(data.image);

        const relatedResponse = await fetch(`http://localhost:5000/api/coup-de-coeur?category=${data.category}`);
        const relatedData = await relatedResponse.json();
        setRelatedItems(relatedData.filter(item => item._id !== id).slice(0, 3));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupDeCoeur();
  }, [id]);

  const handleImageClick = (src) => setMainImage(src);
  const toggleInfo = (key) => {
    setActiveInfo(activeInfo === key ? null : key);
  };

  if (loading) {
    return (
      <div className="cdc-loader">
        <div className="loader-circle"></div>
        <p>Chargement en cours...</p>
      </div>
    );
  }

  if (error) {
    return <p className="cdc-error">{error}</p>;
  }

  if (!coupDeCoeur) {
    return null;
  }

  return (
    <>
      <section className="cdc-detail-section">
        <div className="cdc-container">
          <div className="cdc-detail-grid">
            <div className="cdc-image-gallery">
              <div className="cdc-main-image">
                <img src={mainImage || coupDeCoeur.image} alt={coupDeCoeur.name} />
              </div>
              <div className="cdc-thumbnail-grid">
                <div className="cdc-thumbnail">
                  <img
                    src={coupDeCoeur.image}
                    alt="Image principale"
                    onClick={() => handleImageClick(coupDeCoeur.image)}
                  />
                </div>
                {coupDeCoeur.additionalImages && coupDeCoeur.additionalImages.map((img, index) => (
                  <div key={index} className="cdc-thumbnail">
                    <img
                      src={img}
                      alt={`Image ${index + 1}`}
                      onClick={() => handleImageClick(img)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="cdc-info-grid">
              <h1 className="cdc-title">{coupDeCoeur.name}</h1>
              <div className="cdc-meta">
                <span className="cdc-category">{coupDeCoeur.category.toUpperCase()}</span>
                <div className="cdc-rating">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fas fa-star ${i < Math.floor(coupDeCoeur.rating) ? 'filled' : ''}`} />
                  ))}
                  {coupDeCoeur.michelinStars > 0 && (
                    <span className="cdc-michelin">
                      {[...Array(coupDeCoeur.michelinStars)].map((_, i) => (
                        <i key={i} className="fas fa-star michelin" />
                      ))}
                    </span>
                  )}
                </div>
              </div>
              <p className="cdc-description">{coupDeCoeur.description}</p>

              <div className="cdc-details">
                <div className="cdc-icons-row">
                  {coupDeCoeur.address && (
                    <div className="cdc-detail-item">
                      <i className="fas fa-map-marker-alt" onClick={() => toggleInfo('address')}></i>
                    </div>
                  )}
                  {coupDeCoeur.distance && (
                    <div className="cdc-detail-item">
                      <i className="fas fa-ruler" onClick={() => toggleInfo('distance')}></i>
                    </div>
                  )}
                  {coupDeCoeur.website && (
                    <div className="cdc-detail-item">
                      <i className="fas fa-globe" onClick={() => toggleInfo('website')}></i>
                    </div>
                  )}
                  {coupDeCoeur.highlights && coupDeCoeur.highlights.length > 0 && (
                    <div className="cdc-detail-item">
                      <i className="fas fa-heart" onClick={() => toggleInfo('highlights')}></i>
                    </div>
                  )}
                </div>

                <div className="cdc-info-display">
                  {activeInfo === 'address' && <span>{coupDeCoeur.address}</span>}
                  {activeInfo === 'distance' && <span>{coupDeCoeur.distance} du centre-ville</span>}
                  {activeInfo === 'website' && (
                    <a href={coupDeCoeur.website} target="_blank" rel="noopener noreferrer">
                      {coupDeCoeur.website}
                    </a>
                  )}
                  {activeInfo === 'highlights' && (
                    <ul>
                      {coupDeCoeur.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedItems.length > 0 && (
        <Section title="Autres Coups de Cœur">
          <div className="cdc-related-grid">
            {relatedItems.map((item) => (
              <Card
                key={item._id}
                image={item.image}
                title={item.name}
                actionText="Découvrir"
                onAction={() => window.location.href = `/coup-de-coeur/${item._id}`}
                className="cdc-related-card"
              />
            ))}
          </div>
          <div className="cdc-see-more">
            <Button variant="secondary" href="/coup-de-coeur">
              Voir Tous les Coups de Cœur
            </Button>
          </div>
        </Section>
      )}
    </>
  );
};

export default CoupDeCoeurDetailModule;