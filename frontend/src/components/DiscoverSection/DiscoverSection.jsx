import React, { useState, useEffect } from 'react';
import './DiscoverSection.scss';

const DiscoverSection = () => {
  const [guides, setGuides] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/guides')
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du chargement des guides');
        return res.json();
      })
      .then((data) => {
        setGuides(data.slice(0, 2)); // Limite à 2 guides
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setGuides([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (guides.length === 0) return <p>Aucun guide disponible.</p>;

  return (
    <section className="discover-section">
      <div className="discover-container">
        {guides.map((guide, index) => (
          <div
            key={guide._id}
            className={`discover-card ${index === 0 ? '--expat' : '--tourism'}`}
          >
            <div className="discover-content">
              <div className="discover-label">Guide</div>
              <h4>{guide.name}</h4>
              <a href={guide.link} className="discover-btn">Découvrir</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DiscoverSection;