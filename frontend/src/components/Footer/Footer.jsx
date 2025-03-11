import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer-container">
        <article className="footer-head">
          <div className="footer-title">
            <p>Inscrivez-vous</p>
            <h5>À la Newsletter Palmeres</h5>
          </div>
          <div className="footer-input">
            <input type="email" placeholder="Votre email" />
            <a href="/newsletter" className="footer-btn">S’inscrire</a>
          </div>
        </article>
        <article className="footer-body">
          <div className="footer-body-left">
            <div className="footer-logo">
              <img src="./assets/images/Logo-6.png" alt="Palmeres Logo" />
            </div>
            <p>
              Restez informé des dernières nouvelles, offres exclusives et événements à Platja d’Aro avec la newsletter Palmeres.
            </p>
            <div className="footer-social">
              <a href="https://twitter.com"><i className="bx bxl-twitter"></i></a>
              <a href="https://youtube.com"><i className="bx bxl-youtube"></i></a>
              <a href="https://facebook.com"><i className="bx bxl-facebook"></i></a>
              <a href="https://instagram.com"><i className="bx bxl-instagram-alt"></i></a>
            </div>
          </div>
          <div className="footer-body-right">
            <div className="footer-column">
              <h6>Notre Communauté</h6>
              <ul className="footer-list">
                <li><i className="bx bx-chevron-right"></i><a href="/forum">Forum</a></li>
                <li><i className="bx bx-chevron-right"></i><a href="/guides">Guides</a></li>
                <li><i className="bx bx-chevron-right"></i><a href="/boutique">Boutique</a></li>
                <li><i className="bx bx-chevron-right"></i><a href="/articles">Articles</a></li>
                <li><i className="bx bx-chevron-right"></i><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h6>Partenaires</h6>
              <ul className="footer-list">
                <li><i className="bx bx-chevron-right"></i><a href="https://booking.com">Booking</a></li>
                <li><i className="bx bx-chevron-right"></i><a href="https://rentalcars.com">RentalCars</a></li>
                <li><i className="bx bx-chevron-right"></i><a href="https://hostelworld.com">HostelWorld</a></li>
                <li><i className="bx bx-chevron-right"></i><a href="https://trivago.com">Trivago</a></li>
                <li><i className="bx bx-chevron-right"></i><a href="https://tripadvisor.com">TripAdvisor</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h6>Dernière Minute</h6>
              <ul className="footer-list">
                <li><i className="bx bx-chevron-right"></i><a href="/offres/ete">Platja d’Aro</a></li>
                <li><i className="bx bx-chevron-right"></i><a href="/offres/luxe">S’Agaró</a></li>
                <li><i className="bx bx-chevron-right"></i><a href="/offres/peche">Palamós</a></li>
                <li><i className="bx bx-chevron-right"></i><a href="/offres/culture">Castell d’Aro</a></li>
                <li><i className="bx bx-chevron-right"></i><a href="/offres/histoire">Sant Feliu</a></li>
              </ul>
            </div>
          </div>
        </article>
        <div className="footer-bottom">
          <p>Le meilleur site lifestyle communautaire</p>
          <p>© 2025 Palmeres - Tous droits réservés</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;