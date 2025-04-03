// frontend/src/components/AffiliateSection/AffiliateSection.jsx
import React, { useState, useEffect } from 'react';
import './AffiliateSection.scss';

const AffiliateSection = ({ hotels }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % hotels.length);
    }, 5000); // Change toutes les 5 secondes
    return () => clearInterval(interval);
  }, [hotels.length]);

  return (
    <section className="affiliate-section">
      <h2>Nos Recommandations d’Hôtels</h2>
      <div className="affiliate-carousel">
        <div className="carousel-slide">
          <img src={hotels[currentIndex].image} alt={hotels[currentIndex].name} />
          <div className="carousel-content">
            <h3>{hotels[currentIndex].name}</h3>
            <p>{hotels[currentIndex].description}</p>
            <a href={hotels[currentIndex].url} target="_blank" rel="noopener noreferrer" className="carousel-link">
              Réserver maintenant
            </a>
          </div>
        </div>
        <div className="carousel-indicators">
          {hotels.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AffiliateSection;