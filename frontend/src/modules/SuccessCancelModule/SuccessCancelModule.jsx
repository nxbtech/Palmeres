// frontend/src/modules/SuccessCancelModule/SuccessCancelModule.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import SimpleContent from '../../components/SimpleContent/SimpleContent';
import LinkButton from '../../components/LinkButton/LinkButton';
import './SuccessCancelModule.scss';

const SuccessCancelModule = () => {
  const location = useLocation();
  const isSuccess = location.pathname.includes('checkout');

  return (
    <div className="success-cancel-module">
      <SimpleContent
        title={isSuccess ? 'Paiement réussi !' : 'Paiement annulé'}
        message={isSuccess ? 'Merci pour votre achat/don !' : 'Le paiement a été annulé. Essayez à nouveau.'}
      />
      <LinkButton to="/">Retour à l'accueil</LinkButton>
    </div>
  );
};

export default SuccessCancelModule;