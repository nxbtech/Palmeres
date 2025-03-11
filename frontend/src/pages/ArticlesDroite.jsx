import React from 'react';
import PageLayout from '../components/PageLayout/PageLayout';

const ArticlesDroite = () => {
  return (
    <PageLayout
      title="Article avec Barre Droite"
      subtitle="Format spécifique"
      image="https://i.pinimg.com/564x/47/e2/8c/47e28cb37314c93cdb615ff64bd2c0e5.jpg"
    >
      <h1>Article avec Barre Droite</h1>
      <p>Un article avec une barre latérale à droite.</p>
    </PageLayout>
  );
};

export default ArticlesDroite;