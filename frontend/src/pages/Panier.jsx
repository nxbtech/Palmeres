import React from 'react';
import PageLayout from '../components/PageLayout/PageLayout';

const Panier = () => {
  return (
    <PageLayout
      title="Panier"
      subtitle="Votre sélection"
      image="https://i.pinimg.com/564x/88/48/78/884878043ee17464c8972e66effcc716.jpg"
    >
      <h1>Panier</h1>
      <p>Votre panier d’achat est vide pour l’instant.</p>
    </PageLayout>
  );
};

export default Panier;