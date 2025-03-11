import React from 'react';
import PageLayout from '../components/PageLayout/PageLayout';

const GuidesTourisme = () => {
  return (
    <PageLayout
      title="Guide Tourisme"
      subtitle="Découvrir la région"
      image="https://i.pinimg.com/564x/d6/62/c1/d662c1c1725a7d182c1712d9f1ee106c.jpg"
    >
      <h1>Guide Tourisme</h1>
      <p>Découvrez les meilleurs spots touristiques de la Costa Brava.</p>
      <a href="/assets/guides/guide-tourisme.pdf" download>Télécharger</a>
    </PageLayout>
  );
};

export default GuidesTourisme;