// frontend/src/modules/CheckoutModule/CheckoutModule.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './CheckoutModule.scss';

const CheckoutModule = () => {
  const [message, setMessage] = useState('');
  const { clearCart } = useCart();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get('session_id');

    if (sessionId) {
      fetch(`http://localhost:5000/api/payment/verify-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'succeeded') {
            setMessage('Paiement réussi !');
            clearCart();
          } else {
            setMessage('Paiement échoué.');
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la vérification:', error);
          setMessage('Erreur lors de la vérification du paiement.');
        });
    }
  }, [clearCart]);

  return (
    <div className="checkout-module">
      <h1>Confirmation de paiement</h1>
      <p>{message || 'Traitement du paiement...'}</p>
      {message && <Link to="/">Retour à l'accueil</Link>}
    </div>
  );
};

export default CheckoutModule;