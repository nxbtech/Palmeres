import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="section footer">
      <div className="footer__header">
        <a href="/" className="footer__logo">
          <span className="logo primary">
            <img src="./assets/images/Logo-6.png" alt="Palmeres Logo" />
          </span>
        </a>
        <ul className="social">
          <li className="social__item">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn social">
              <span className="icon twitter"></span>
            </a>
          </li>
          <li className="social__item">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="btn social">
              <span className="icon youtube"></span>
            </a>
          </li>
          <li className="social__item">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn social">
              <span className="icon facebook"></span>
            </a>
          </li>
          <li className="social__item">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn social">
              <span className="icon instagram"></span>
            </a>
          </li>
        </ul>
        <button type="button" className="btn icon">
          <span className="icon drop-up"></span>
        </button>
      </div>
      <ul className="footer__list">
        <li className="footer__item active">
          <a href="/" className="footer__link">Accueil</a>
        </li>
        <li className="footer__item">
          <a href="/guides" className="footer__link">Guides</a>
        </li>
        <li className="footer__item">
          <a href="/boutique" className="footer__link">Boutique</a>
        </li>
        <li className="footer__item">
          <a href="/forum" className="footer__link">Forum</a>
        </li>
        <li className="footer__item">
          <a href="/articles" className="footer__link">Articles</a>
        </li>
        <li className="footer__item">
          <a href="/contact" className="footer__link">Contact</a>
        </li>
      </ul>
      <div className="footer__copyright">
        <p className="desc copyright">© 2025 Palmeres - Tous droits réservés</p>
      </div>
    </footer>
  );
};

export default Footer;