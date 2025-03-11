import React, { useState, useEffect } from 'react';
import './ToursSection.scss';

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

  const currentOffer = offers[currentIndex];

  return (
    <section className="tours-section">
      <div className="tours-container">
        <p className="tours-subtitle">À découvrir</p>
        <h2 className="tours-title">Les Meilleurs Logements</h2>
        <div className="tours-hero">
          <div className="tours-info">
            <p className="tours-hero-subtitle">{currentOffer.subtitle}</p>
            <h3>{currentOffer.title}</h3>
            <p className="tours-desc">{currentOffer.desc}</p>
            <div className="tours-price">
              <span className="tours-new-price">{currentOffer.price}</span>
              <span className="tours-price-unit">/ nuit</span>
            </div>
            <a href={currentOffer.link} className="tours-btn" target="_blank" rel="noopener noreferrer">
              Découvrir
            </a>
          </div>
          <div className="tours-image">
            <img src={currentOffer.image} alt={currentOffer.title} className="tours-image-slide" />
            <div className="tours-bullets">
              {offers.map((_, index) => (
                <span
                  key={index}
                  className={`tours-bullet ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentIndex(index);
                    setSecondsLeft(5);
                  }}
                ></span>
              ))}
            </div>
            <div className="tours-timer">
              <span>{secondsLeft}s</span>
            </div>
          </div>
        </div>
        <div className="tours-offers">
          {offers.map((offer, index) => (
            <a
              key={index}
              href={offer.link}
              className="tours-offer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={offer.image} alt={offer.title} className="tours-offer-image" />
              <div className="tours-offer-content">
                <h5>{offer.title}</h5>
                <span className="tours-offer-price">{offer.price}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToursSection;