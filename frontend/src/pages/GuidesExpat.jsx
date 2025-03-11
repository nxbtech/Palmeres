import React from 'react';
import PageLayout from '../components/PageLayout/PageLayout';

const GuidesExpat = () => {
  return (
    <PageLayout
      title="Guide Expat"
      subtitle="S’installer à Platja"
      image="https://i.pinimg.com/564x/47/e2/8c/47e28cb37314c93cdb615ff64bd2c0e5.jpg"
    >
      <h1>Guide Expat</h1>
      <p>Tout ce qu’il faut savoir pour s’installer à Platja d’Aro.</p>
      <a href="/assets/guides/guide-expat.pdf" download>Télécharger</a>
    </PageLayout>
  );
};

export default GuidesExpat;