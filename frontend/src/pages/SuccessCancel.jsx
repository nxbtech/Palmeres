import React from 'react';
import { useLocation } from 'react-router-dom';
import './SuccessCancel.scss';

const SuccessCancel = () => {
  const location = useLocation();
  const isSuccess = location.pathname.includes('checkout');

  return (
    <div className="success-cancel">
      <h1>{isSuccess ? 'Paiement réussi !' : 'Paiement annulé'}</h1>
      <p>{isSuccess ? 'Merci pour votre achat/don !' : 'Le paiement a été annulé. Essayez à nouveau.'}</p>
      <a href="/">Retour à l'accueil</a>
    </div>
  );
};

export default SuccessCancel;