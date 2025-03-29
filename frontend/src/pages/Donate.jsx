import React, { useState } from 'react';
import PageLayout from '../components/PageLayout/PageLayout';
import './Donate.scss';

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const getSupportMessage = (amt) => {
    const amountNum = parseFloat(amt);
    if (!amountNum) return '';
    if (amountNum < 20) return 'Merci de contribuer à notre aventure !';
    if (amountNum < 50) return 'Vous êtes un soutien précieux pour Platja d’Aro !';
    return 'Vous êtes un véritable ambassadeur de notre communauté !';
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          donorEmail: 'donor@example.com',
        }),
      });
      if (response.ok) {
        setStatus('Merci infiniment pour votre générosité !');
        setAmount('');
      } else {
        setStatus('Erreur lors du don. Veuillez réessayer.');
      }
    } catch (error) {
      setStatus('Erreur lors du don. Veuillez réessayer.');
    }
  };

  return (
    <PageLayout
      title="Faire un don"
      subtitle="Soutenez notre mission"
      image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742937681/banniere-don_wbzrso.jpg"
    >
      <section className="donate-section">
        <div className="donate-container">
          <h2 className="title__text">Devenez un Pilier de Platja d’Aro</h2>
          <p className="donate-intro">
            Chaque don compte pour maintenir notre site, enrichir nos contenus et unir la communauté francophone. Ensemble, faisons vivre Platja d’Aro !
          </p>
          <div className="donate-levels">
            <div className="donate-level">
              <i className="fas fa-star"></i>
              <h3>Ami</h3>
              <p>À partir de 10 €</p>
            </div>
            <div className="donate-level">
              <i className="fas fa-shield-alt"></i>
              <h3>Protecteur</h3>
              <p>À partir de 25 €</p>
            </div>
            <div className="donate-level">
              <i className="fas fa-crown"></i>
              <h3>Ambassadeur</h3>
              <p>À partir de 50 €</p>
            </div>
          </div>
          <form onSubmit={handleDonate} className="donate-form">
            <div className="amount-options">
              <button type="button" onClick={() => setAmount('10')}>10 €</button>
              <button type="button" onClick={() => setAmount('25')}>25 €</button>
              <button type="button" onClick={() => setAmount('50')}>50 €</button>
            </div>
            <div className="donate-input-group">
              <input
                type="number"
                placeholder="Montant personnalisé (€)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                required
              />
              <span className="donate-currency">€</span>
            </div>
            <p className="donate-support-message">{getSupportMessage(amount)}</p>
            <button type="submit" className="pri-btn">
              <i className="fas fa-donate"></i> Donner maintenant
            </button>
          </form>
          {status && (
            <p className={status.includes('Erreur') ? 'donate-error' : 'donate-success'}>
              {status}
            </p>
          )}
          <div className="donate-support">
            <p>Des questions sur votre don ?</p>
            <button
              className="donate-support-btn"
              onClick={() => alert('Contacter le support')}
            >
              <i className="fas fa-headset"></i> Contacter le support
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Donate;