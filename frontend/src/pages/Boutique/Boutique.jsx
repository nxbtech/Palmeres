// frontend/src/pages/Boutique/Boutique.jsx
import React from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import BoutiqueModule from '../../modules/BoutiqueModule/BoutiqueModule';

const Boutique = () => (
  <PageLayout
    title="Boutique Platja d'Aro"
    subtitle="Préparez-vous pour une expérience unique"
    image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742936595/boutique-banniere_reri5b.jpg"
  >
    <BoutiqueModule />
  </PageLayout>
);

export default Boutique;