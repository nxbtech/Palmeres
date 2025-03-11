import React from 'react';
import PageLayout from '../components/PageLayout/PageLayout';

const ArticlesGauche = () => {
  return (
    <PageLayout
      title="Article avec Barre Gauche"
      subtitle="Format spécifique"
      image="https://i.pinimg.com/564x/d6/62/c1/d662c1c1725a7d182c1712d9f1ee106c.jpg"
    >
      <h1>Article avec Barre Gauche</h1>
      <p>Un article avec une barre latérale à gauche.</p>
    </PageLayout>
  );
};

export default ArticlesGauche;