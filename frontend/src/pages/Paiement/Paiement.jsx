// frontend/src/pages/Paiement/Paiement.jsx
import React from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import PaiementModule from '../../modules/PaiementModule/PaiementModule';

const Paiement = () => (
  <PageLayout
    title="Paiement"
    subtitle="Finalisez votre achat"
    image="https://i.pinimg.com/564x/88/48/78/884878043ee17464c8972e66effcc716.jpg"
  >
    <PaiementModule />
  </PageLayout>
);

export default Paiement;