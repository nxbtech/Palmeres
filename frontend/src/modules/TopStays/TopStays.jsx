// frontend/src/modules/TopStays/TopStays.jsx
import React from 'react';
import Section from '../../components/Section/Section';
import Card from '../../components/Card/Card';
import './TopStays.scss';

const TopStays = () => {
  const stays = [
    {
      title: "Hotel San Jorge",
      description: "A superior 4-star hotel nestled between pines and coves.",
      price: "€145",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/74220825.jpg",
    },
    // Ajoute les autres ici si tu veux...
  ];

  return (
    <Section title="Top Stays">
      <div className="stays-grid">
        {stays.map((stay, index) => (
          <Card
            key={index}
            title={stay.title}
            description={stay.description}
            price={stay.price}
            image={stay.image}
            actionText="Book Now"
          />
        ))}
      </div>
    </Section>
  );
};

export default TopStays;