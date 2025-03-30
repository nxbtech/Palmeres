import React, { useState, useEffect } from 'react';
import './ToursSection.scss';

const TourHero = ({ offer, onBulletClick, currentIndex, totalOffers }) => (
  <div className="tours-hero">
    <div className="tours-hero-info">
      <div className="tours-hero-grid">
        <div className="tours-hero-header">
          <h2 className="title__text">{offer.title}</h2>
          <div className="tours-hero-stars">
            {[...Array(offer.stars)].map((_, i) => (
              <i key={i} className="fas fa-star"></i>
            ))}
          </div>
        </div>
        <div className="tours-hero-details">
          <p className="tours-hero-location">
            <i className="fas fa-map-marker-alt"></i> {offer.location}
          </p>
          <p className="tours-hero-desc">{offer.desc}</p>
          <ul className="tours-hero-highlights">
            {offer.highlights.map((highlight, index) => (
              <li key={index}>
                <i
                  className={
                    index === 0
                      ? 'fas fa-water'
                      : index === 1
                      ? 'fas fa-leaf'
                      : 'fas fa-walking'
                  }
                ></i>
                {highlight}
              </li>
            ))}
          </ul>
          <div className="tours-hero-price">
            <span className="tours-hero-price-label">À partir de </span>
            <span className="tours-hero-price-value">{offer.price}</span>
          </div>
        </div>
        {offer.link ? (
          <a href={offer.link} className="pri-btn" target="_blank" rel="noopener noreferrer">
            Réserver
          </a>
        ) : (
          <span className="tours-hero-note">Réservations bientôt disponibles</span>
        )}
      </div>
    </div>
    <div className="tours-hero-image">
      <img src={offer.image} alt={offer.title} className="tours-hero-slide" />
      <div className="tours-hero-bullets">
        {Array(totalOffers)
          .fill(null)
          .map((_, index) => (
            <span
              key={index}
              className={`tours-hero-bullet ${index === currentIndex ? 'active' : ''}`}
              onClick={() => onBulletClick(index)}
            />
          ))}
      </div>
    </div>
  </div>
);

const TourOfferCard = ({ offer }) => (
  <div className="tours-offer-card">
    <img src={offer.image} alt={offer.title} className="tours-offer-image" />
    <div className="tours-offer-content">
      <div className="tours-offer-header">
        <h6>{offer.title}</h6>
        <div className="tours-offer-stars">
          {[...Array(offer.stars)].map((_, i) => (
            <i key={i} className="fas fa-star"></i>
          ))}
        </div>
      </div>
      <p className="tours-offer-location">
        <i className="fas fa-map-marker-alt"></i> {offer.location}
      </p>
      <span className="tours-offer-price">À partir de {offer.price}</span>
      {offer.link ? (
        <a href={offer.link} className="tours-offer-link" target="_blank" rel="noopener noreferrer">
          Voir plus
        </a>
      ) : (
        <span className="tours-offer-note">En savoir plus bientôt</span>
      )}
    </div>
  </div>
);

const ToursSection = () => {
  const guides = [
    {
      title: "Hotel San Jorge",
      location: "Platja d'Aro",
      desc: "Un hôtel 4 étoiles supérieur niché entre pins et criques, parfait pour une escapade relaxante.",
      price: "145 €",
      stars: 4,
      highlights: ["Front de mer", "Certificat de durabilité"],
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/74220825.jpg?k=97fac2bef7b1f3513fafc89c20c23cba540849151c29e0ddfd910086ab4517ce&o=&hp=1",
      link: null,
    },
    {
      title: "Hotel Planamar",
      location: "Platja d'Aro",
      desc: "Un hôtel 4 étoiles en bord de mer, idéal pour les familles avec une ambiance chaleureuse.",
      price: "110 €",
      stars: 4,
      highlights: ["Front de mer", "Certificat de durabilité", "300 m du centre"],
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/261807208.jpg?k=5718fcededb71d4607e29b31377bd9bd4b251706109b1f1f091a025440c91e1e&o=&hp=1",
      link: null,
    },
    {
      title: "NM Suites",
      location: "Platja d'Aro",
      desc: "Un boutique-hôtel élégant entouré de pins, avec une cuisine méditerranéenne raffinée.",
      price: "130 €",
      stars: 4,
      highlights: ["À 150 m de la plage", "Certificat de durabilité"],
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/449938484.jpg?k=e5976d755b251e6f7e6e0e36d2b9141b7de34552bc9570162cba56a2de7158cb&o=&hp=1",
      link: null,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % guides.length);
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [guides.length]);

  const handleBulletClick = (index) => {
    setCurrentIndex(index);
    setSecondsLeft(5);
  };

  return (
    <section className="tours-section">
      <div className="tours-container">
        <p className="sub-title__text">À découvrir</p>
        <h2 className="title__text --title__text-underline">Nos Hôtels Préférés</h2>
        <TourHero
          offer={guides[currentIndex]}
          onBulletClick={handleBulletClick}
          currentIndex={currentIndex}
          totalOffers={guides.length}
        />
        <div className="tours-offers-row">
          {guides.map((guide, index) => (
            <TourOfferCard key={index} offer={guide} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToursSection;