// frontend/src/components/Banner/Banner.jsx
import React from 'react';
import Button from '../Button/Button';
import './Banner.scss';

const Banner = ({ title, description, ctaText, ctaAction, backgroundImage }) => {
  return (
    <section className="banner" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="banner-overlay"></div>
      <div className="banner-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <Button variant="primary" onClick={ctaAction}>
          {ctaText}
        </Button>
      </div>
    </section>
  );
};

export default Banner;