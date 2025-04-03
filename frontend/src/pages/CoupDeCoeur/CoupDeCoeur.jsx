// frontend/src/pages/CoupDeCoeur/CoupDeCoeur.jsx
import React from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import CoupDeCoeurModule from '../../modules/CoupDeCoeurModule/CoupDeCoeurModule';

const CoupDeCoeur = () => (
  <PageLayout
    title="Coups de Cœur à Platja d’Aro"
    subtitle="Nos recommandations exclusives"
    image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742936904/banniere-cdc_tviwpu.jpg"
  >
    <CoupDeCoeurModule />
  </PageLayout>
);

export default CoupDeCoeur;