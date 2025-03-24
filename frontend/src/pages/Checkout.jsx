import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext'; // Importez le contexte
import './Checkout.scss';

const Checkout = () => {
  const [message, setMessage] = useState('');
  const { clearCart } = useCart(); // Récupérez la fonction pour vider le panier

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get('session_id');

    if (sessionId) {
      fetch(`http://localhost:5000/api/payment/verify-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('Verification response:', data);
          if (data.status === 'succeeded') {
            setMessage('Paiement réussi !');
            clearCart(); // Vide le panier une fois le paiement réussi
          } else {
            setMessage('Paiement échoué.');
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la vérification:', error);
          setMessage('Erreur lors de la vérification du paiement.');
        });
    }
  }, [clearCart]); // Ajoutez clearCart comme dépendance

  return (
    <div className="checkout">
      <h1>Confirmation de paiement</h1>
      <p>{message || 'Traitement du paiement...'}</p>
      {message && <a href="/">Retour à l'accueil</a>}
    </div>
  );
};

export default Checkout;