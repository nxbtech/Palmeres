import React from 'react';
import PageLayout from '../components/PageLayout/PageLayout';

const Hotels = () => {
  return (
    <PageLayout
      title="Hôtels"
      subtitle="Confort à Platja d’Aro"
      image="https://i.pinimg.com/564x/22/e0/25/22e025a2be1481376455d424593041db.jpg"
    >
      <h1>Hôtels</h1>
      <p>Réservez votre séjour dans les meilleurs hôtels via Booking.</p>
      <a href="https://www.booking.com/searchresults.fr.html?city=-390625&aid=357026" target="_blank" rel="noopener noreferrer">Voir les hôtels</a>
    </PageLayout>
  );
};

export default Hotels;