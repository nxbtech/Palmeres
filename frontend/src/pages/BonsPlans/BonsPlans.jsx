// frontend/src/pages/BonsPlans/BonsPlans.jsx
import React from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import BonsPlansModule from '../../modules/BonsPlansModule/BonsPlansModule';

const BonsPlans = () => (
  <PageLayout
    title="Bons Plans à Platja d’Aro"
    subtitle="Économisez sur vos expériences préférées"
    image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742936904/banniere-cdc_tviwpu.jpg"
  >
    <BonsPlansModule />
  </PageLayout>
);

export default BonsPlans;