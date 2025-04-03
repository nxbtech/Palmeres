// frontend/src/components/Hero/Hero.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import './Hero.scss';

const Hero = ({ backgroundImage }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}&category=${searchCategory}`);
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-heading">Explorez les coulisses de votre prochaine destination</h1>

        <form onSubmit={handleSearch} className="hero-search-form">
          <div className="search-tabs">
            <button type="button" className={searchCategory === 'all' ? 'active' : ''} onClick={() => setSearchCategory('all')}>
              <i className="fas fa-search"></i> Tout
            </button>
            <button type="button" className={searchCategory === 'destinations' ? 'active' : ''} onClick={() => setSearchCategory('destinations')}>
              <i className="fas fa-map-marker-alt"></i> Destinations
            </button>
            <button type="button" className={searchCategory === 'professionals' ? 'active' : ''} onClick={() => setSearchCategory('professionals')}>
              <i className="fas fa-briefcase"></i> Pros
            </button>
            <button type="button" className={searchCategory === 'restaurants' ? 'active' : ''} onClick={() => setSearchCategory('restaurants')}>
              <i className="fas fa-utensils"></i> Restaurants
            </button>
            <button type="button" className={searchCategory === 'real-estate' ? 'active' : ''} onClick={() => setSearchCategory('real-estate')}>
              <i className="fas fa-home"></i> Immobilier
            </button>
            <button type="button" className={searchCategory === 'artisans' ? 'active' : ''} onClick={() => setSearchCategory('artisans')}>
              <i className="fas fa-tools"></i> Artisans
            </button>
          </div>
          <div className="search-input-wrapper">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Endroits, activités, pros locaux..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="accent">
              Rechercher
            </Button>
          </div>
        </form>

        <div className="hero-banner" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <span className="banner-tag">
              Communauté Palmeres <span className="beta">BETA</span>
            </span>
            <h2>Un média local, une communauté mondiale</h2>
            <p>Histoires, bons plans, rencontres – Palmeres vous connecte à l’essence des lieux, un endroit à la fois.</p>
            <Button variant="secondary" onClick={() => navigate('/community')}>
              Rejoindre la communauté
            </Button>
          </div>
        </div>

        <div className="hero-quick-links">
          <a href="#platja-daro">Platja d’Aro</a>
          <a href="#barcelone">Barcelone</a>
          <a href="#tossa-de-mar">Tossa de Mar</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
