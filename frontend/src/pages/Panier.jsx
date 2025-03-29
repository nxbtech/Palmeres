import React from 'react';
import PageLayout from '../components/PageLayout/PageLayout';

const Panier = () => {
  return (
    <PageLayout
      title="Panier"
      subtitle="Votre sélection"
      image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742937680/banniere-panier_kfphnm.jpg"
    >
      <h1>Panier</h1>
      <p>Votre panier d’achat est vide pour l’instant.</p>
    </PageLayout>
  );
};

export default Panier;