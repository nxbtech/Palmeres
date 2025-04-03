// frontend/src/pages/CoupDeCoeurDetailPage/CoupDeCoeurDetailPage.jsx
import React from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import CoupDeCoeurDetailModule from '../../modules/CoupDeCoeurDetailModule/CoupDeCoeurDetailModule';

const CoupDeCoeurDetailPage = () => (
  <PageLayout
    title="Détails du Coup de Cœur"
    subtitle="Découvrez notre recommandation"
    image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742936904/banniere-cdc_tviwpu.jpg"
  >
    <CoupDeCoeurDetailModule />
  </PageLayout>
);

export default CoupDeCoeurDetailPage;