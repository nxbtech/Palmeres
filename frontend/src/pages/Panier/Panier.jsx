// frontend/src/pages/ProductDetailPage/ProductDetailPage.jsx
import React from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import ProductDetailModule from '../../modules/ProductDetailModule/ProductDetailModule';

const ProductDetailPage = () => (
  <PageLayout
    title="Détails du Produit"
    subtitle="Découvrez"
    image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
  >
    <ProductDetailModule />
  </PageLayout>
);

export default ProductDetailPage;