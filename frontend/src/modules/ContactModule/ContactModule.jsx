// frontend/src/modules/ContactModule/ContactModule.jsx
import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import './ContactModule.scss';

const ContactModule = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://formspree.io/f/contact@platjadaro.fr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      setStatus('Message envoyé avec succès !');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus('Erreur lors de l’envoi. Veuillez réessayer.');
    }
  };

  return (
    <section className="contact-module">
      <div className="contact-container">
        <h2>Contactez-nous</h2>
        <div className="contact-content">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                id="name"
                placeholder="Votre nom"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Votre email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                placeholder="Votre message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <Button type="submit" variant="primary">Envoyer</Button>
            {status && <p className="contact-status">{status}</p>}
          </form>
          <div className="contact-info">
            <h3>Nos coordonnées</h3>
            <ul className="contact-info-list">
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>Platja d’Aro, Costa Brava, Espagne</span>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <span>+34 972 123 456</span>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <span>contact@platjadaro.fr</span>
              </li>
            </ul>
            <div className="contact-social">
              <h4>Suivez-nous</h4>
              <div className="social-links">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactModule;