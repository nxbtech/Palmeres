import React, { useState } from 'react';
import PageLayout from '../components/PageLayout/PageLayout';
import './BonsPlans.scss';

const BonsPlans = () => {
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
    <PageLayout
      title="Bons Plans à Platja d’Aro"
      subtitle="Économisez sur vos expériences préférées"
      image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742936904/banniere-cdc_tviwpu.jpg"
    >
      {/* Filters */}
      <section className="bonsplans-filters-section">
        <div className="bonsplans-container">
          <div className="filters">
            <div className="filter-group">
              <label>Catégorie :</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="all">Toutes</option>
                <option value="restaurant">Restaurants</option>
                <option value="hotel">Hôtels</option>
                <option value="artisans">Artisans</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Réduction :</label>
              <select
                value={filters.discount}
                onChange={(e) => handleFilterChange('discount', e.target.value)}
              >
                <option value="all">Toutes</option>
                <option value="low">0-10%</option>
                <option value="mid">10-15%</option>
                <option value="high">15%+</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* All Deals */}
      <section className="bonsplans-all-deals">
        <div className="bonsplans-container">
          <h2 className="section-title">Nos Offres Exclusives</h2>
          <div className="deals-grid">
            {filteredDeals.map((deal) => (
              <div key={deal.id} className="deal-card">
                <div className="card-image" onClick={() => handleLinkClick(deal.link)}>
                  <img src={deal.image} alt={deal.title} />
                </div>
                <div className="card-content">
                  <h6>{deal.title}</h6>
                  <p className="price">{`À partir de ${deal.price}€ - ${deal.discount}`}</p>
                  <p className="description">{deal.description}</p>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${i < Math.floor(deal.rating) ? 'filled' : ''}`}
                      />
                    ))}
                    <span>({deal.rating.toFixed(1)})</span>
                  </div>
                  <button className="pri-btn" onClick={() => handleLinkClick(deal.link)}>
                    <i className="fas fa-arrow-right"></i> {/* Icône flèche pour "Réserver" */}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default BonsPlans;