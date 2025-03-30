import React, { useState } from 'react';
import './Footer.scss';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Inscription à la newsletter soumise :', email);
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Colonne 1 : Services */}
          <div className="col-lg-4 col-sm-4 col-xs-12">
            <div className="single_footer">
              <h4>Services</h4>
              <ul>
                <li><a href="/boutique">Boutique</a></li>
                <li><a href="/guides">Guides</a></li>
                <li><a href="/forum">Forum</a></li>
                <li><a href="/partenariats">Partenariats</a></li>
              </ul>
            </div>
          </div>

          {/* Colonne 2 : Page Links */}
          <div className="col-md-4 col-sm-4 col-xs-12">
            <div className="single_footer single_footer_address">
              <h4>Liens Utiles</h4>
              <ul>
                <li><a href="/">Accueil</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/conditions">Conditions</a></li>
                <li><a href="/confidentialite">Confidentialité</a></li>
                <li><a href="/accessibilite">Accessibilité</a></li>
              </ul>
            </div>
          </div>

          {/* Colonne 3 : Newsletter & Social */}
          <div className="col-md-4 col-sm-4 col-xs-12">
            <div className="single_footer single_footer_address">
              <h4>Abonnez-vous</h4>
              <div className="signup_form">
                <form className="subscribe" onSubmit={handleNewsletterSubmit}>
                  <input
                    type="email"
                    className="subscribe__input"
                    placeholder="Entrez votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="subscribe__btn">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
                {submitted && <p className="subscribe_success">Inscrit !</p>}
              </div>
            </div>
            <div className="social_profile">
              <ul>
                <li>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-pinterest-p"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright & Certifications */}
        <div className="row">
          <div className="col-lg-12 col-sm-12 col-xs-12">
            <div className="footer_trust">
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              <span>Paiement sécurisé</span>
            </div>
            <p className="copyright">
              Copyright © 2025 <a href="/">Palmeres</a>. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;