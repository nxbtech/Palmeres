// frontend/src/modules/BonsPlansModule/BonsPlansModule.jsx
import React, { useState } from 'react';
import Section from '../../components/Section/Section';
import Card from '../../components/Card/Card';
import FilterGroup from '../../components/FilterGroup/FilterGroup';
import './BonsPlansModule.scss';

const BonsPlansModule = () => {
  const [filters, setFilters] = useState({ category: 'all', discount: 'all' });

  const deals = [
    {
      id: 1,
      title: 'Dîner au Restaurant La Vista',
      category: 'restaurant',
      description: 'Repas avec vue mer à -15%.',
      image: 'https://res.cloudinary.com/drnmfxkwv/image/upload/v1742928798/cdc1_iepp7b.jpg',
      link: 'https://www.booking.com/restaurant/lavista?aid=357026',
      price: 50,
      rating: 4.5,
      discount: '15%',
    },
    {
      id: 2,
      title: 'Séjour Hôtel Costa Brava',
      category: 'hotel',
      description: 'Nuit avec petit-déjeuner inclus.',
      image: 'https://res.cloudinary.com/drnmfxkwv/image/upload/v1742928795/cdc2_mo1paj.jpg',
      link: 'https://www.booking.com/hotel/costabrava?aid=357026',
      price: 120,
      rating: 4.8,
      discount: '20%',
    },
    {
      id: 3,
      title: 'Visite Artisanale',
      category: 'artisans',
      description: 'Découverte des artisans locaux.',
      image: 'https://res.cloudinary.com/drnmfxkwv/image/upload/v1742928790/cdc3_tlutu0.jpg',
      link: 'https://www.getyourguide.com/artisans-tour?partner=357026',
      price: 30,
      rating: 4.3,
      discount: '10%',
    },
  ];

  const filteredDeals = deals.filter((deal) => {
    const categoryMatch = filters.category === 'all' || deal.category === filters.category;
    const discountMatch =
      filters.discount === 'all' ||
      (filters.discount === 'low' && parseInt(deal.discount) <= 10) ||
      (filters.discount === 'mid' && parseInt(deal.discount) > 10 && parseInt(deal.discount) <= 15) ||
      (filters.discount === 'high' && parseInt(deal.discount) > 15);
    return categoryMatch && discountMatch;
  });

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const handleLinkClick = (link) => window.open(link, '_blank');

  return (
    <>
      <section className="bonsplans-filters-section">
        <div className="bonsplans-container">
          <div className="filters">
            <FilterGroup
              label="Catégorie"
              options={[
                { value: 'all', label: 'Toutes' },
                { value: 'restaurant', label: 'Restaurants' },
                { value: 'hotel', label: 'Hôtels' },
                { value: 'artisans', label: 'Artisans' },
              ]}
              value={filters.category}
              onChange={(value) => handleFilterChange('category', value)}
            />
            <FilterGroup
              label="Réduction"
              options={[
                { value: 'all', label: 'Toutes' },
                { value: 'low', label: '0-10%' },
                { value: 'mid', label: '10-15%' },
                { value: 'high', label: '15%+' },
              ]}
              value={filters.discount}
              onChange={(value) => handleFilterChange('discount', value)}
            />
          </div>
        </div>
      </section>

      <Section title="Nos Offres Exclusives">
        <div className="deals-grid">
          {filteredDeals.map((deal) => (
            <Card
              key={deal.id}
              image={deal.image}
              title={deal.title}
              description={deal.description}
              price={`À partir de ${deal.price}€ - ${deal.discount}`}
              actionText="Réserver"
              onAction={() => handleLinkClick(deal.link)}
              className="deal-card"
            />
          ))}
        </div>
      </Section>
    </>
  );
};

export default BonsPlansModule;