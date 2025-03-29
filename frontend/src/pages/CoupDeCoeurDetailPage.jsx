import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../components/PageLayout/PageLayout';
import './CoupDeCoeurDetailPage.scss';

const CoupDeCoeurDetailPage = () => {
  const { id } = useParams();
  const [coupDeCoeur, setCoupDeCoeur] = useState(null);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const fetchCoupDeCoeur = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/coup-de-coeur/${id}`);
        if (!response.ok) throw new Error('Coup de cœur non trouvé');
        const data = await response.json();
        setCoupDeCoeur(data);
        setMainImage(data.image); // Image principale par défaut
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCoupDeCoeur();
  }, [id]);

  const handleImageClick = (src) => {
    setMainImage(src);
  };

  if (error) return <p>{error}</p>;
  if (!coupDeCoeur) return <p>Chargement...</p>;

  return (
    <PageLayout
      title={`Détails de ${coupDeCoeur.name || 'Coup de Cœur'}`}
      subtitle="Découvrez notre recommandation"
      image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742936904/banniere-cdc_tviwpu.jpg" // Même bannière que la page principale
    >
      {/* Single Coup de Coeur */}
      <div className="coup-de-coeur-small-container coup-de-coeur-single">
        <div className="coup-de-coeur-row">
          <div className="coup-de-coeur-col-2">
            <img src={mainImage || coupDeCoeur.image} width="100%" id="CoupDeCoeurImg" alt={coupDeCoeur.name} />
            <div className="coup-de-coeur-small-img-row">
              <div className="coup-de-coeur-small-img-col">
                <img
                  src={coupDeCoeur.image}
                  width="100%"
                  className="coup-de-coeur-small-img"
                  onClick={() => handleImageClick(coupDeCoeur.image)}
                  alt="Image principale"
                />
              </div>
              {/* Ajoute d'autres images si disponibles dans ton modèle */}
              <div className="coup-de-coeur-small-img-col">
                <img
                  src="https://via.placeholder.com/100"
                  width="100%"
                  className="coup-de-coeur-small-img"
                  onClick={() => handleImageClick('https://via.placeholder.com/100')}
                  alt="Image 2"
                />
              </div>
              <div className="coup-de-coeur-small-img-col">
                <img
                  src="https://via.placeholder.com/100"
                  width="100%"
                  className="coup-de-coeur-small-img"
                  onClick={() => handleImageClick('https://via.placeholder.com/100')}
                  alt="Image 3"
                />
              </div>
            </div>
          </div>
          <div className="coup-de-coeur-col-2">
            <p>Accueil / Coups de Cœur / {coupDeCoeur.category || 'Catégorie'}</p>
            <h1>{coupDeCoeur.name || 'Nom par défaut'}</h1>
            <h4>{coupDeCoeur.category.toUpperCase()}</h4>
            <h3>Description <i className="fa fa-indent"></i></h3>
            <br />
            <p>{coupDeCoeur.description || 'Description par défaut de ce coup de cœur.'}</p>
            <a href="#contact" className="coup-de-coeur-btn">Nous Contacter</a>
          </div>
        </div>
      </div>

      {/* Related Coups de Coeur */}
      <div className="coup-de-coeur-small-container">
        <div className="coup-de-coeur-row coup-de-coeur-row-2">
          <h2>Autres Coups de Cœur</h2>
          <p>Voir Plus</p>
        </div>
      </div>
      {/* Tu peux ajouter une logique pour fetch d'autres coups de cœur ici */}
      <div className="coup-de-coeur-small-container">
        <div className="coup-de-coeur-row">
          <div className="coup-de-coeur-col-4">
            <img src="https://via.placeholder.com/200" alt="Coup de Cœur Similaire 1" />
            <h4>Exemple 1</h4>
            <p>Description courte</p>
          </div>
          <div className="coup-de-coeur-col-4">
            <img src="https://via.placeholder.com/200" alt="Coup de Cœur Similaire 2" />
            <h4>Exemple 2</h4>
            <p>Description courte</p>
          </div>
          <div className="coup-de-coeur-col-4">
            <img src="https://via.placeholder.com/200" alt="Coup de Cœur Similaire 3" />
            <h4>Exemple 3</h4>
            <p>Description courte</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CoupDeCoeurDetailPage;