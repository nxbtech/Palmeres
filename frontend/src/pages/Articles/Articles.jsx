// frontend/src/pages/Articles/Articles.jsx
import React from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import ArticlesModule from '../../modules/ArticlesModule/ArticlesModule';

const Articles = () => (
  <PageLayout
    title="Articles"
    subtitle="Actualités et Conseils"
    image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742936899/bannieres-articles_fkvjxn.jpg"
  >
    <ArticlesModule />
  </PageLayout>
);

export default Articles;