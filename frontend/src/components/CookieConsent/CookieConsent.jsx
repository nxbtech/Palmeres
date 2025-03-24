import React from 'react';
import './CookieConsent.scss';

const CookieConsent = ({ onAccept }) => {
  return (
    <div className="cookie-consent">
      <p>Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre politique de cookies.</p>
      <button className="cookie-btn" onClick={onAccept}>Accepter</button>
    </div>
  );
};

export default CookieConsent;