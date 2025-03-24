import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout/PageLayout';
import './CoupDeCoeur.scss';

const CoupDeCoeur = () => {
  const [activeCategory, setActiveCategory] = useState('restaurant');
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/coup-de-coeur?category=${activeCategory}`)
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du chargement des coups de cœur');
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const handleCardClick = (id) => {
    navigate(`/coup-de-coeur/${id}`);
  };

  const categories = ['restaurant', 'hotel', 'agence-immo', 'artisans'];

  const featuredImages = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1887&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1618245318763-a15156d6b28c?q=80&w=1887&auto=format&fit=crop',
  ];

  // Sélectionner les 4 premiers éléments pour les "Coups de Cœur en Vedette"
  const featuredItems = items.slice(0, 4);

  return (
    <PageLayout
      title="Nos Coups de Cœur"
      subtitle="Découvrez nos recommandations"
      image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
    >
      {/* Featured Categories */}
      <div className="coup-de-coeur-categories">
        <div className="coup-de-coeur-small-container">
          <div className="coup-de-coeur-row">
            {featuredImages.map((img, index) => (
              <div key={index} className="coup-de-coeur-col-3">
                <img src={img} alt={`Catégorie ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Items */}
      <div className="coup-de-coeur-small-container">
        <h2 className="coup-de-coeur-title">Coups de Cœur en Vedette</h2>
        <div className="coup-de-coeur-row">
          {loading && <p>Chargement...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && featuredItems.length === 0 && <p>Aucun coup de cœur disponible.</p>}
          {featuredItems.map((item) => (
            <div key={item._id} className="coup-de-coeur-col-4" onClick={() => handleCardClick(item._id)}>
              <img src={item.image} alt={item.name} />
              <h4>{item.name || 'Nom par défaut'}</h4>
              <p>{item.description || 'Description par défaut'}</p>
              <button className="coup-de-coeur-btn">En savoir plus →</button>
            </div>
          ))}
        </div>
      </div>

      {/* Category Tabs and Items */}
      <div className="coup-de-coeur-small-container">
        <h2 className="coup-de-coeur-title">Nos Coups de Cœur par Catégorie</h2>
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="coup-de-coeur-row">
          {loading && <p>Chargement...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && items.length === 0 && <p>Aucun item disponible pour cette catégorie.</p>}
          {items.map((item) => (
            <div key={item._id} className="coup-de-coeur-col-4" onClick={() => handleCardClick(item._id)}>
              <img src={item.image} alt={item.name} />
              <h4>{item.name || 'Nom par défaut'}</h4>
              <p>{item.description || 'Description par défaut'}</p>
              <button className="coup-de-coeur-btn">En savoir plus →</button>
            </div>
          ))}
        </div>
      </div>

      {/* Offer Section */}
      <div className="coup-de-coeur-offer">
        <div className="coup-de-coeur-small-container">
          <div className="coup-de-coeur-row">
            <div className="coup-de-coeur-col-2">
              <img
                src={items[0]?.image || 'https://via.placeholder.com/600x300'}
                className="coup-de-coeur-offer-img"
                alt="Offre Exclusive"
              />
            </div>
            <div className="coup-de-coeur-col-2">
              <p>Exclusivement à Platja d'Aro</p>
              <h1>Promo de Fin de Saison</h1>
              <small>Jusqu’à 20% de réduction sur une sélection d’articles et services.</small>
              <a href="#items" className="coup-de-coeur-btn">Découvrir Maintenant →</a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CoupDeCoeur;