import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout/PageLayout';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/articles') // Ajuste l'API si elle existe
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du chargement des articles');
        return res.json();
      })
      .then((data) => {
        setArticles(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setArticles([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCardClick = (id) => {
    navigate(`/article/${id}`); // Route à définir si nécessaire
  };

  return (
    <PageLayout
      title="Articles"
      subtitle="Actualités et Conseils"
      image="https://i.pinimg.com/564x/88/48/78/884878043ee17464c8972e66effcc716.jpg"
    >
      <section className="section-p1">
        <h2>Nos Articles</h2>
        {loading && <p>Chargement des articles...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && articles.length === 0 && <p>Aucun article disponible.</p>}
        <div className="pro-container">
          {articles.map((article) => (
            <div key={article._id} className="pro" onClick={() => handleCardClick(article._id)}>
              <img src={article.image} alt={article.title} />
              <div className="des">
                <h5>{article.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default Articles;