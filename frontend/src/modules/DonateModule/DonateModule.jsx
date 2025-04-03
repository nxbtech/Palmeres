// frontend/src/modules/DonateModule/DonateModule.jsx
import React, { useState } from 'react';
import DonationLevels from '../../components/DonationLevels/DonationLevels';
import DonationForm from '../../components/DonationForm/DonationForm';
import SupportSection from '../../components/SupportSection/SupportSection';
import './DonateModule.scss';

const DonateModule = () => {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const donationLevels = [
    { icon: 'fas fa-star', title: 'Ami', amount: 'À partir de 10 €' },
    { icon: 'fas fa-shield-alt', title: 'Protecteur', amount: 'À partir de 25 €' },
    { icon: 'fas fa-crown', title: 'Ambassadeur', amount: 'À partir de 50 €' },
  ];

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
    <section className="donate-module">
      <div className="donate-container">
        <h2>Devenez un Pilier de Platja d’Aro</h2>
        <p className="donate-intro">
          Chaque don compte pour maintenir notre site, enrichir nos contenus et unir la communauté francophone. Ensemble, faisons vivre Platja d’Aro !
        </p>
        <DonationLevels levels={donationLevels} />
        <DonationForm
          amount={amount}
          onAmountChange={setAmount}
          onSubmit={handleDonate}
          supportMessage={getSupportMessage(amount)}
        />
        {status && (
          <p className={status.includes('Erreur') ? 'donate-error' : 'donate-success'}>
            {status}
          </p>
        )}
        <SupportSection onSupportClick={() => alert('Contacter le support')} />
      </div>
    </section>
  );
};

export default DonateModule;