import React from 'react';
import PageLayout from '../components/PageLayout/PageLayout';

const Villas = () => {
  return (
    <PageLayout
      title="Villas"
      subtitle="Luxe à la Costa Brava"
      image="https://i.pinimg.com/564x/94/b3/d2/94b3d2d4aaeb950c498c26f19917393e.jpg"
    >
      <h1>Villas</h1>
      <p>Découvrez des villas luxueuses pour un séjour unique.</p>
      <a href="https://www.booking.com/searchresults.fr.html?city=-390625&accommodation_type=5&aid=357026" target="_blank" rel="noopener noreferrer">Voir les villas</a>
    </PageLayout>
  );
};

export default Villas;