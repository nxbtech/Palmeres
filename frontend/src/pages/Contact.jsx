import React, { useState } from 'react';
import PageLayout from '../components/PageLayout/PageLayout';
import './Contact.scss';

const Contact = () => {
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
    <PageLayout
      title="Contact"
      subtitle="Nous contacter"
      image="https://i.pinimg.com/564x/88/48/78/884878043ee17464c8972e66effcc716.jpg"
    >
      <section className="contact-section">
        <div className="contact-container">
          <h2>Contactez-nous</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nom :</label>
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
              <label htmlFor="email">Email :</label>
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
              <label htmlFor="message">Message :</label>
              <textarea
                id="message"
                placeholder="Votre message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <button type="submit">Envoyer</button>
          </form>
          {status && <p className="status">{status}</p>}
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;