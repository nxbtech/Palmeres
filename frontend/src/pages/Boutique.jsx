import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout/PageLayout';
import './Boutique.scss';

const Boutique = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du chargement des produits');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  // Sélectionner les 8 premiers produits pour Featured et Latest Products
  const featuredProducts = products.slice(0, 4);
  const latestProducts = products.slice(4, 12); // Prend jusqu'à 8 produits au total

  return (
    <PageLayout
      title="Lifestyle Platja d'Aro"
      subtitle="Découvrez le"
      image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
    >
      {/* Featured Categories */}
      <div className="boutique-categories">
        <div className="boutique-small-container">
          <div className="boutique-row">
            <div className="boutique-col-3">
              <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" alt="Mode Platja d'Aro" />
            </div>
            <div className="boutique-col-3">
              <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1887&auto=format&fit=crop" alt="Accessoires Platja" />
            </div>
            <div className="boutique-col-3">
              <img src="https://images.unsplash.com/photo-1618245318763-a15156d6b28c?q=80&w=1887&auto=format&fit=crop" alt="Décoration Côtière" />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="boutique-small-container">
        <h2 className="boutique-title">Produits en Vedette</h2>
        <div className="boutique-row">
          {loading && <p>Chargement...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && featuredProducts.length === 0 && <p>Aucun produit disponible.</p>}
          {featuredProducts.map((product) => (
            <div key={product._id} className="boutique-col-4">
              <a href={`/product/${product._id}`} onClick={(e) => { e.preventDefault(); handleCardClick(product._id); }}>
                <img src={product.image} alt={product.name} />
              </a>
              <h4>{product.name || 'T-Shirt Rouge Imprimé'}</h4>
              <div className="boutique-rating">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-o"></i>
              </div>
              <p>{product.price ? `$${product.price.toFixed(2)}` : '$50.00'}</p>
            </div>
          ))}
        </div>
        <h2 className="boutique-title">Nouveaux Produits</h2>
        <div className="boutique-row">
          {latestProducts.slice(0, 4).map((product) => (
            <div key={product._id} className="boutique-col-4">
              <a href={`/product/${product._id}`} onClick={(e) => { e.preventDefault(); handleCardClick(product._id); }}>
                <img src={product.image} alt={product.name} />
              </a>
              <h4>{product.name || 'T-Shirt Rouge Imprimé'}</h4>
              <div className="boutique-rating">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-o"></i>
              </div>
              <p>{product.price ? `$${product.price.toFixed(2)}` : '$50.00'}</p>
            </div>
          ))}
        </div>
        <div className="boutique-row">
          {latestProducts.slice(4, 8).map((product) => (
            <div key={product._id} className="boutique-col-4">
              <a href={`/product/${product._id}`} onClick={(e) => { e.preventDefault(); handleCardClick(product._id); }}>
                <img src={product.image} alt={product.name} />
              </a>
              <h4>{product.name || 'T-Shirt Rouge Imprimé'}</h4>
              <div className="boutique-rating">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-o"></i>
              </div>
              <p>{product.price ? `$${product.price.toFixed(2)}` : '$50.00'}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Offer */}
      <div className="boutique-offer">
        <div className="boutique-small-container">
          <div className="boutique-row">
            <div className="boutique-col-2">
              <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" className="boutique-offer-img" alt="Offre Exclusive" />
            </div>
            <div className="boutique-col-2">
              <p>Exclusivement Disponible sur Lifestyle Platja d'Aro</p>
              <h1>Bracelet Connecté 4</h1>
              <small>
                Le Mi Smart Band 4 propose un écran AMOLED couleur pleine touche 39,9 % plus grand (que le Mi Band 3) avec une luminosité ajustable, pour une clarté optimale.
              </small>
              <a href="#products" className="boutique-btn">Acheter Maintenant →</a>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="boutique-testimonial">
        <div className="boutique-small-container">
          <div className="boutique-row">
            <div className="boutique-col-3">
              <i className="fa fa-quote-left"></i>
              <p>
                Le Lorem Ipsum est un simple texte fictif utilisé dans l'imprimerie et la typographie. C'est le texte factice standard de l'industrie.
              </p>
              <div className="boutique-rating">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
              <img src="https://via.placeholder.com/50" alt="Sean Parker" />
              <h3>Sean Parker</h3>
            </div>
            <div className="boutique-col-3">
              <i className="fa fa-quote-left"></i>
              <p>
                Le Lorem Ipsum est un simple texte fictif utilisé dans l'imprimerie et la typographie. C'est le texte factice standard de l'industrie.
              </p>
              <div className="boutique-rating">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
              <img src="https://via.placeholder.com/50" alt="Mike Smith" />
              <h3>Mike Smith</h3>
            </div>
            <div className="boutique-col-3">
              <i className="fa fa-quote-left"></i>
              <p>
                Le Lorem Ipsum est un simple texte fictif utilisé dans l'imprimerie et la typographie. C'est le texte factice standard de l'industrie.
              </p>
              <div className="boutique-rating">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
              <img src="https://via.placeholder.com/50" alt="Mabel Joe" />
              <h3>Mabel Joe</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="boutique-brands">
        <div className="boutique-small-container">
          <div className="boutique-row">
            <div className="boutique-col-5">
              <img src="https://via.placeholder.com/160" alt="Marque 1" />
            </div>
            <div className="boutique-col-5">
              <img src="https://via.placeholder.com/160" alt="Marque 2" />
            </div>
            <div className="boutique-col-5">
              <img src="https://via.placeholder.com/160" alt="Marque 3" />
            </div>
            <div className="boutique-col-5">
              <img src="https://via.placeholder.com/160" alt="Marque 4" />
            </div>
            <div className="boutique-col-5">
              <img src="https://via.placeholder.com/160" alt="Marque 5" />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Boutique;