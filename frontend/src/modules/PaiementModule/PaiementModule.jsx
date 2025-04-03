// frontend/src/modules/PaiementModule/PaiementModule.jsx
import React from 'react';
import SimpleContent from '../../components/SimpleContent/SimpleContent';
import './PaiementModule.scss';

const PaiementModule = () => {
  return (
    <div className="paiement-module">
      <SimpleContent
        title="Paiement"
        message="Finalisez votre achat ici (en développement)."
      />
    </div>
  );
};

export default PaiementModule;