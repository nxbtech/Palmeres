import React, { useState, useEffect } from 'react';
import './Checkout.scss';

const Checkout = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get('session_id');

    if (sessionId) {
      fetch(`http://localhost:5000/api/payment/verify-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setMessage(data.status === 'paid' ? 'Paiement réussi !' : 'Paiement échoué.');
        })
        .catch(() => {
          setMessage('Erreur lors de la vérification du paiement.');
        });
    }
  }, []);

  return (
    <div className="checkout">
      <h1>Confirmation de paiement</h1>
      <p>{message || 'Traitement du paiement...'}</p>
      {message && <a href="/">Retour à l'accueil</a>}
    </div>
  );
};

export default Checkout;