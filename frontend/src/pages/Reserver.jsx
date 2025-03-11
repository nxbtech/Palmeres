import React from 'react';
import PageLayout from '../components/PageLayout/PageLayout';

const Reserver = () => {
  return (
    <PageLayout
      title="Réserver"
      subtitle="Votre séjour"
      image="https://i.pinimg.com/564x/22/e0/25/22e025a2be1481376455d424593041db.jpg"
    >
      <h1>Réserver</h1>
      <p>Réservez votre séjour à Platja d’Aro via nos partenaires.</p>
      <div className="booking-options">
        <h2>Options de réservation</h2>
        <ul>
          <li><a href="https://www.booking.com/searchresults.fr.html?city=-390625&aid=357026" target="_blank" rel="noopener noreferrer">Hôtels</a></li>
          <li><a href="https://www.booking.com/searchresults.fr.html?city=-390625&accommodation_type=5&aid=357026" target="_blank" rel="noopener noreferrer">Villas</a></li>
          <li><a href="https://www.booking.com/searchresults.fr.html?city=-390625&aid=357026" target="_blank" rel="noopener noreferrer">Appartements</a></li>
        </ul>
      </div>
    </PageLayout>
  );
};

export default Reserver;