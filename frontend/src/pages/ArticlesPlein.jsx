import React from 'react';
import PageLayout from '../components/PageLayout/PageLayout';

const ArticlesPlein = () => {
  return (
    <PageLayout
      title="Article Plein Largeur"
      subtitle="Format large"
      image="https://i.pinimg.com/564x/8b/84/49/8b8449cf9de2e1880cd774be3157960b.jpg"
    >
      <h1>Article Plein Largeur</h1>
      <p>Un article affiché en pleine largeur.</p>
    </PageLayout>
  );
};

export default ArticlesPlein;