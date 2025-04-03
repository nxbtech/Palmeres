// frontend/src/modules/GuidesModule/GuidesModule.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../../components/Section/Section';
import Card from '../../components/Card/Card';
import FilterGroup from '../../components/FilterGroup/FilterGroup';
import CardGrid from '../../components/CardGrid/CardGrid';
import Loader from '../../components/Loader/Loader';
import './GuidesModule.scss';

const GuidesModule = () => {
  const [guides, setGuides] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/guides')
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du chargement des guides');
        return res.json();
      })
      .then((data) => {
        setGuides(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setGuides([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredGuides = guides.filter((guide) => filter === 'all' || guide.category === filter);
  const spotlightGuide = guides[0];
  const featuredGuides = guides.slice(0, 3);

  const handleFilterChange = (value) => setFilter(value);
  const handleCardClick = (id) => navigate(`/guide/${id}`);

  if (loading) {
    return <Loader message="Chargement des guides..." />;
  }

  if (error) {
    return <p className="guides-error">{error}</p>;
  }

  return (
    <>
      {spotlightGuide && (
        <Section title="Guide du Moment">
          <Card
            image={spotlightGuide.image}
            title={spotlightGuide.name || 'Guide par défaut'}
            description={spotlightGuide.category === 'expat' ? 'Guide pour expatriés' : 'Guide touristique'}
            onAction={() => handleCardClick(spotlightGuide._id)}
            actionText={<i className="fas fa-info-circle"></i>}
            className="spotlight-card"
          />
        </Section>
      )}

      {featuredGuides.length > 0 && (
        <Section title="Guides en Vedette">
          <CardGrid
            items={featuredGuides}
            onCardClick={handleCardClick}
            cardClassName="featured-card"
          />
        </Section>
      )}

      {guides.length > 0 && (
        <section className="guides-filters-section">
          <div className="guides-container">
            <div className="filters">
              <FilterGroup
                label="Catégorie"
                options={[
                  { value: 'all', label: 'Toutes' },
                  { value: 'tourist', label: 'Touristique' },
                  { value: 'expat', label: 'Expat' },
                ]}
                value={filter}
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </section>
      )}

      {filteredGuides.length > 0 && (
        <Section title="Tous les Guides">
          <CardGrid
            items={filteredGuides}
            onCardClick={handleCardClick}
            cardClassName="item-card"
          />
        </Section>
      )}
    </>
  );
};

export default GuidesModule;