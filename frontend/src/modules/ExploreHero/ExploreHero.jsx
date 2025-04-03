// frontend/src/modules/ExploreHero/ExploreHero.jsx
import React, { useState, useEffect } from 'react';
import Button from '../../components/Button/Button.jsx';
import platja1 from '../../assets/images/platja1.jpg';
import platja2 from '../../assets/images/platja2.jpg';
import platja3 from '../../assets/images/platja3.jpg';
import platja4 from '../../assets/images/platja4.jpg';
import platja5 from '../../assets/images/platja5.jpg';
import './ExploreHero.scss';

const ExploreHero = () => {
  const slides = [
    { title: "Sunny Beaches", subtitle: "Relax & Unwind", image: platja1 },
    { title: "Vibrant Nights", subtitle: "Enjoy the Scene", image: platja2 },
    { title: "Wild Nature", subtitle: "Discover More", image: platja3 },
    { title: "Stunning Views", subtitle: "Take It In", image: platja4 },
    { title: "Coastal Adventures", subtitle: "Explore Now", image: platja5 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="explore-hero">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
        >
          <div className="hero-image" style={{ backgroundImage: `url(${slide.image})` }}>
            <div className="hero-overlay">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <Button href="/boutique" className="hero-cta">
                Discover More
              </Button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ExploreHero;