// frontend/src/modules/ArticlesModule/ArticlesModule.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../../components/Section/Section';
import Card from '../../components/Card/Card';
import './ArticlesModule.scss';

const ArticlesModule = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/articles')
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
    navigate(`/article/${id}`);
  };

  return (
    <Section title="Nos Articles">
      {loading && <p>Chargement des articles...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && articles.length === 0 && <p>Aucun article disponible.</p>}
      <div className="articles-grid">
        {articles.map((article) => (
          <Card
            key={article._id}
            image={article.image}
            title={article.title}
            onAction={() => handleCardClick(article._id)}
          />
        ))}
      </div>
    </Section>
  );
};

export default ArticlesModule;