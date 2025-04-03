// modules/CommunitySpotlight/CommunitySpotlight.jsx
import React from 'react';
import Section from '../../components/Section/Section';
import Button from '../../components/Button/Button';
import './CommunitySpotlight.scss';

const CommunitySpotlight = () => (
  <Section>
    <div className="spotlight-container">
      <img
        src="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742936904/banniere-cdc_tviwpu.jpg"
        alt="Join Our Community"
        className="spotlight-image"
      />
      <div className="spotlight-content">
        <h2>Join Our Community</h2>
        <Button href="/forum" className="spotlight-btn">Participate</Button>
      </div>
    </div>
  </Section>
);

export default CommunitySpotlight;