import React, { useState } from 'react';
import PageLayout from '../components/PageLayout/PageLayout';
import './Donate.scss';

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const handleDonate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(amount), donorEmail: 'donor@example.com' }),
      });
      if (response.ok) {
        setStatus('Merci pour votre don !');
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
      subtitle="Soutenez-nous"
      image="https://i.pinimg.com/564x/88/48/78/884878043ee17464c8972e66effcc716.jpg"
    >
      <section className="donate-section">
        <div className="donate-container">
          <h2>Faites un don</h2>
          <p className="donate-message">
            Vos dons nous permettent de continuer à vivre et à développer ce site pour vous offrir le meilleur de Platja d’Aro.
          </p>
          <form onSubmit={handleDonate} className="donate-form">
            <div className="amount-options">
              <button type="button" onClick={() => setAmount('10')}>10 €</button>
              <button type="button" onClick={() => setAmount('25')}>25 €</button>
              <button type="button" onClick={() => setAmount('50')}>50 €</button>
            </div>
            <input
              type="number"
              placeholder="Montant personnalisé (€)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              required
            />
            <button type="submit">Donner maintenant</button>
          </form>
          {status && <p className={status.includes('Erreur') ? 'error-status' : 'success-status'}>{status}</p>}
        </div>
      </section>
    </PageLayout>
  );
};

export default Donate;