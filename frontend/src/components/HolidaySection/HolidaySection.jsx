import React from 'react';
import './HolidaySection.scss';

const HolidaySection = () => {
  console.log('HolidaySection rendu');

  return (
    <section className="hero-section">
      <div className="hero-container">
        <h1 className="hero-title">PLATJA D’ARO</h1>
        <p className="hero-subtitle">... pas si loin</p>
        <div className="hero-info">

          <div className="social-links">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <i className="bx bxl-youtube"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="bx bxl-facebook"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="bx bxl-instagram"></i>
            </a>
          </div>
        </div>
        {/* Widget météo amélioré */}
        <div className="weather-widget">
          <div className="weather-icon">☀️</div>
          <div className="weather-details">
            <p className="weather-temp">22°C</p>
            <p className="weather-desc">Ensoleillé</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HolidaySection;