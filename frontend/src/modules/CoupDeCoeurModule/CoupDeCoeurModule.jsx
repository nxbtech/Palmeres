// frontend/src/modules/CoupDeCoeurModule/CoupDeCoeurModule.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../../components/Section/Section';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import './CoupDeCoeurModule.scss';

const CoupDeCoeurModule = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/coup-de-coeur')
      .then((res) => (res.ok ? res.json() : Promise.reject('Erreur')))
      .then((data) => {
        setItems(data);
        setError(null);
      })
      .catch((err) => setError(err.message || 'Erreur de chargement'))
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = items.filter((item) => filter === 'all' || item.category === filter);
  const monthlyItems = items.filter((item) => item.highlighted).slice(0, 3);
  const spotlightItem = monthlyItems[0];

  const handleFilterChange = (value) => setFilter(value);
  const handleCardClick = (id) => navigate(`/coup-de-coeur/${id}`);

  const filterOptions = [
    { value: 'all', label: 'Toutes', icon: 'fas fa-th' },
    { value: 'restaurant', label: 'Restaurants', icon: 'fas fa-utensils' },
    { value: 'hotel', label: 'Hôtels', icon: 'fas fa-hotel' },
    { value: 'agence-immo', label: 'Agences Immo', icon: 'fas fa-home' },
    { value: 'artisans', label: 'Artisans', icon: 'fas fa-tools' },
    { value: 'commerces', label: 'Commerces', icon: 'fas fa-shopping-bag' },
  ];

  return (
    <>
      {loading && (
        <div className="cdc-loader">
          <div className="loader-circle"></div>
          <p>Chargement des coups de cœur...</p>
        </div>
      )}
      {error && <p className="cdc-error">{error}</p>}

      {!loading && spotlightItem && (
        <Section title="Coup de Cœur du Moment">
          <Card
            image={spotlightItem.image}
            title={spotlightItem.name}
            onAction={() => handleCardClick(spotlightItem._id)}
            actionText={<><i className="fas fa-info-circle"></i> Détails</>}
            className="spotlight-card"
          />
        </Section>
      )}

      {!loading && monthlyItems.length > 0 && (
        <Section title="Coups de Cœur du Mois">
          <div className="monthly-grid">
            {monthlyItems.map((item) => (
              <Card
                key={item._id}
                image={item.image}
                title={item.name}
                onAction={() => handleCardClick(item._id)}
                actionText={<i class W="fas fa-info-circle"></i>}
                className="monthly-card"
              />
            ))}
          </div>
        </Section>
      )}

      {!loading && filteredItems.length > 0 && (
        <Section title="Tous les Coups de Cœur">
          {items.length > 0 && (
            <div className="filters">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={filter === option.value ? 'primary' : 'secondary'}
                  onClick={() => handleFilterChange(option.value)}
                  className="filter-btn"
                >
                  <i className={option.icon}></i>
                  <span>{option.label}</span>
                </Button>
              ))}
            </div>
          )}
          <div className="all-items-grid">
            {filteredItems.map((item) => (
              <Card
                key={item._id}
                image={item.image}
                title={item.name}
                onAction={() => handleCardClick(item._id)}
                actionText={<i className="fas fa-info-circle"></i>}
                className="item-card"
              />
            ))}
          </div>
        </Section>
      )}
    </>
  );
};

export default CoupDeCoeurModule;