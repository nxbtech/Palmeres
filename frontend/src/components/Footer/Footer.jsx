import React from 'react';
import './Footer.scss';

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Inscription à la newsletter soumise');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <img
            src="https://res.cloudinary.com/drnmfxkwv/image/upload/v1743012241/skvmhyj8imumpjjyg0va.png"
            className="footer-logo"
            alt="Palmeres Logo"
          />
          <p className="footer-desc">
            Palmeres - Votre destination à Platja d’Aro.
          </p>
        </div>
        <div className="footer-column">
          <h5 className="footer-title">Liens Rapides</h5>
          <ul className="footer-links">
            <li><a href="/">Accueil</a></li>
            <li><a href="/guides">Guides</a></li>
            <li><a href="/boutique">Boutique</a></li>
            <li><a href="/forum">Forum</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h5 className="footer-title">Newsletter</h5>
          <form className="footer-newsletter" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              className="footer-input"
              placeholder="Votre email"
              required
            />
            <button type="submit" className="pri-btn">S'inscrire</button>
          </form>
        </div>
      </div>
      <div className="footer-copyright">
        <p>© 2025 Palmeres - Tous droits réservés</p>
      </div>
    </footer>
  );
};

export default Footer;