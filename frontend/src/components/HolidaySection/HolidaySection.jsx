import React, { useState, useEffect } from 'react';
import platja1 from '../../assets/images/platja1.jpg';
import platja2 from '../../assets/images/platja2.jpg';
import platja3 from '../../assets/images/platja3.jpg';
import platja4 from '../../assets/images/platja4.jpg';
import platja5 from '../../assets/images/platja5.jpg';
import './HolidaySection.scss';

const HolidaySection = () => {
  const slides = [
    { title: "Plage ensoleillée", subtitle: "Détendez-vous", image: platja1 },
    { title: "Soirée vibrante", subtitle: "Profitez", image: platja2 },
    { title: "Nature sauvage", subtitle: "Découvrez", image: platja3 },
    { title: "Vue imprenable", subtitle: "Admirez", image: platja4 },
    { title: "Aventure côtière", subtitle: "Explorez", image: platja5 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change toutes les 5 secondes
    return () => clearInterval(interval); // Nettoie l'intervalle à la fin
  }, [slides.length]);

  return (
    <div className="holiday-page-wrap">
      <header className="holiday-page-header">
        <section className="holiday-main">
          {slides.map((slide, index) => (
            <article
              key={index}
              className={`holiday-slide ${index === currentIndex ? 'active' : ''}`}
              style={{ '--i': index }}
            >
              <div
                className="holiday-hero-image"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="sea-container">
                  <div className="wave"></div>
                </div>
                <a href="/boutique" className="holiday-cta-btn pri-btn">
                  Découvrez la Boutique
                </a>
              </div>
              <div className="holiday-hero-info">
                <h2>{slide.subtitle}</h2>
                <h1>{slide.title}</h1>
                <h3>Platja d’Aro - Costa Brava</h3>
              </div>
            </article>
          ))}
        </section>
      </header>
    </div>
  );
};

export default HolidaySection;