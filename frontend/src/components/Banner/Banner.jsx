import React from 'react';
import './Banner.scss';

const Banner = ({ title, subtitle, image }) => {
  return (
    <section className="banner-section">
      <div className="banner-container">
        <div className="banner-image">
          <img src={image} alt="banner" />
          <div className="banner-overlay"></div> {/* Ajout d'un overlay pour lisibilité */}
          <div className="banner-text">
            <strong>
              <span className="banner-subtitle">{subtitle}</span>
              <br />
              <span className="banner-title">{title}</span>
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;