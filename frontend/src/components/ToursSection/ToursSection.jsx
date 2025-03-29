import React, { useState, useEffect } from 'react';
import './ToursSection.scss';

const TourHero = ({ offer, onBulletClick, currentIndex, totalOffers }) => (
  <div className="tours-hero">
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
    <div className="tours-hero-info">
      <p className="sub-title__text">{offer.subtitle}</p>
      <h2 className="title__text">{offer.title}</h2>
      <p className="tours-hero-desc">{offer.desc}</p>
      <div className="tours-hero-price">
        <span className="tours-hero-new-price">{offer.price}</span>
        <span className="tours-hero-price-unit">/ nuit</span>
      </div>
      <a href={offer.link} className="pri-btn" target="_blank" rel="noopener noreferrer">
        Découvrir
      </a>
    </div>
  </div>
);

const TourOfferCard = ({ offer }) => (
  <a href={offer.link} className="tours-offer-card" target="_blank" rel="noopener noreferrer">
    <img src={offer.image} alt={offer.title} className="tours-offer-image" />
    <div className="tours-offer-content">
      <h6>{offer.title}</h6>
      <span className="tours-offer-price">{offer.price}</span>
    </div>
  </a>
);

const ToursSection = () => {
  const offers = [
    {
      title: "Hôtel Spa Platja d’Aro",
      subtitle: "Costa Brava",
      desc: "Un havre de paix avec spa et panorama marin.",
      price: "199 €",
      link: "https://www.booking.com/hotel/es/spa-platja-daro.fr.html?aid=357026",
      image: "https://leloc90.github.io/loveTravel/assets/images/parallax-4.jpg",
    },
    {
      title: "Villa S’Agaró Prestige",
      subtitle: "Costa Brava",
      desc: "Élégance contemporaine et piscine exclusive.",
      price: "320 €",
      link: "https://www.booking.com/hotel/es/villa-sagaro.fr.html?aid=357026",
      image: "https://leloc90.github.io/loveTravel/assets/images/parallax-4-1.jpg",
    },
    {
      title: "Appartement Palamós",
      subtitle: "Costa Brava",
      desc: "Charme authentique à proximité du port.",
      price: "120 €",
      link: "https://www.booking.com/hotel/es/appartement-palamos.fr.html?aid=357026",
      image: "https://leloc90.github.io/loveTravel/assets/images/package-3.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [offers.length]);

  const handleBulletClick = (index) => {
    setCurrentIndex(index);
    setSecondsLeft(5);
  };

  return (
    <section className="tours-section">
      <div className="tours-container">
        <p className="sub-title__text">À découvrir</p>
        <h2 className="title__text --title__text-underline">Les Meilleurs Logements</h2>
        <TourHero
          offer={offers[currentIndex]}
          onBulletClick={handleBulletClick}
          currentIndex={currentIndex}
          totalOffers={offers.length}
        />
        <div className="tours-offers-row">
          {offers.map((offer, index) => (
            <TourOfferCard key={index} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToursSection;