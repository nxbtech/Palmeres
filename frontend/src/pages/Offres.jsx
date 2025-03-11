import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout/PageLayout';
import './Offres.scss';

const Offres = () => {
  const [activeCategory, setActiveCategory] = useState('meilleures');
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/offers?category=${activeCategory}`)
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du chargement des offres');
        return res.json();
      })
      .then((data) => {
        setOffers(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setOffers([]);
      })
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const handleCardClick = (id) => {
    navigate(`/offer/${id}`);
  };

  const categories = ['meilleures', 'derniere-minute'];

  return (
    <PageLayout
      title="Offres"
      subtitle="Nos meilleures offres"
      image="https://i.pinimg.com/564x/88/48/78/884878043ee17464c8972e66effcc716.jpg"
    >
      <section className="offers-section">
        <aside className="sidebar">
          <h3>Catégories</h3>
          <ul>
            {categories.map((category) => (
              <li
                key={category}
                className={activeCategory === category ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </li>
            ))}
          </ul>
        </aside>
        <div className="content">
          <h2>Nos Offres</h2>
          {loading && <p>Chargement des offres...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && offers.length === 0 && <p>Aucune offre disponible pour cette catégorie.</p>}
          <div className="offers-container">
            {offers.map((offer) => (
              <div key={offer._id} className="offer-card" onClick={() => handleCardClick(offer._id)}>
                <img src={offer.image} alt={offer.name} />
                <div className="offer-content">
                  <h5>{offer.name}</h5>
                  <p>{offer.location}</p>
                  <p>{offer.price} €</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Offres;