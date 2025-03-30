import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout/PageLayout';
import './Boutique.scss';

const Boutique = () => {
  const isShopReady = false; // Changez à true quand la boutique sera prête
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ price: 'all', category: 'all', isNew: false });
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isShopReady) {
      setLoading(true);
      fetch('http://localhost:5000/api/products')
        .then((res) => {
          if (!res.ok) throw new Error('Erreur lors du chargement des produits');
          return res.json();
        })
        .then((data) => {
          setProducts(data);
          setFilteredProducts(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setProducts([]);
          setFilteredProducts([]);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [isShopReady]);

  useEffect(() => {
    if (isShopReady) {
      let result = [...products];
      if (filter.price !== 'all') {
        if (filter.price === 'low') result = result.filter(p => p.price < 50);
        else if (filter.price === 'medium') result = result.filter(p => p.price >= 50 && p.price <= 100);
        else if (filter.price === 'high') result = result.filter(p => p.price > 100);
      }
      if (filter.category !== 'all') {
        result = result.filter(p => p.category === filter.category);
      }
      if (filter.isNew) {
        result = result.filter(p => p.isNew);
      }
      setFilteredProducts(result);
    }
  }, [filter, products, isShopReady]);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} ajouté au panier !`);
  };

  const handleFilterChange = (key, value) => {
    setFilter(prev => ({ ...prev, [key]: value }));
  };

  const spotlightProduct = products[0];
  const curatedProducts = products.slice(1, 6);
  const trendingProducts = products.slice(6, 11);
  const newArrivals = products.slice(11, 15);

  return (
    <PageLayout
      title={isShopReady ? "Lifestyle Platja d'Aro" : "Boutique Platja d'Aro"}
      subtitle={isShopReady ? "Redéfinissez votre style avec nous" : "Préparez-vous pour une expérience unique"}
      image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742936595/boutique-banniere_reri5b.jpg"
    >
      {!isShopReady ? (
        <section className="boutique-coming-soon">
          <div className="boutique-container">
            <h2 className="coming-soon-title">La Boutique Arrive Bientôt !</h2>
            <p className="coming-soon-text">
              Nous travaillons dur pour vous offrir notre première collection, conçue avec soin et passion. 
              Qualité et style sont nos priorités — restez à l’écoute !
            </p>
            <div className="sea-container">
              <div className="wave"></div>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Loader */}
          {loading && (
            <div className="boutique-loader">
              <div className="loader-circle"></div>
              <p>Préparation de votre expérience...</p>
            </div>
          )}

          {/* Spotlight Section */}
          {!loading && products.length > 0 && (
            <section className="boutique-spotlight">
              <div className="boutique-container">
                <h2 className="section-title">Produit Star</h2>
                <div className="spotlight-card">
                  <div className="card-image" onClick={() => handleCardClick(spotlightProduct._id)}>
                    <img src={spotlightProduct.image} alt={spotlightProduct.name} />
                  </div>
                  <div className="card-content">
                    <h3>{spotlightProduct.name}</h3>
                    <p className="price">{`$${spotlightProduct.price.toFixed(2)}`}</p>
                    <p className="description">L'élégance rencontre l'innovation dans ce produit exclusif.</p>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star ${i < 4 ? 'filled' : ''}`} />
                      ))}
                    </div>
                    <button className="pri-btn" onClick={() => handleAddToCart(spotlightProduct)}>
                      Ajouter au Panier
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Curated Collection */}
          {!loading && curatedProducts.length > 0 && (
            <section className="boutique-curated">
              <div className="boutique-container">
                <h2 className="section-title">Collection Curated</h2>
                <div className="curated-grid">
                  {curatedProducts.slice(0, 2).map((product) => (
                    <div key={product._id} className="curated-card curated-card-vertical">
                      <div className="card-image" onClick={() => handleCardClick(product._id)}>
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="card-content">
                        <h6>{product.name}</h6>
                        <p className="price">{`$${product.price.toFixed(2)}`}</p>
                        <p className="description">Un choix élégant pour votre style.</p>
                        <div className="rating">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fas fa-star ${i < 4 ? 'filled' : ''}`} />
                          ))}
                        </div>
                        <button className="pri-btn" onClick={() => handleAddToCart(product)}>
                          Ajouter
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="curated-row-stack">
                    {curatedProducts.slice(2, 5).map((product) => (
                      <div key={product._id} className="curated-card curated-card-row">
                        <div className="card-image" onClick={() => handleCardClick(product._id)}>
                          <img src={product.image} alt={product.name} />
                        </div>
                        <div className="card-content">
                          <h6>{product.name}</h6>
                          <p className="price">{`$${product.price.toFixed(2)}`}</p>
                          <div className="rating">
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className={`fas fa-star ${i < 4 ? 'filled' : ''}`} />
                            ))}
                          </div>
                          <button className="pri-btn" onClick={() => handleAddToCart(product)}>
                            <i className="fas fa-cart-plus"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Trending Now */}
          {!loading && trendingProducts.length > 0 && (
            <section className="boutique-trending">
              <div className="boutique-container">
                <h2 className="section-title">Tendances Actuelles</h2>
                <div className="trending-grid">
                  {trendingProducts.slice(0, 2).map((product) => (
                    <div key={product._id} className="trending-card trending-card-vertical">
                      <div className="card-image" onClick={() => handleCardClick(product._id)}>
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="card-content">
                        <h6>{product.name}</h6>
                        <p className="price">{`$${product.price.toFixed(2)}`}</p>
                        <p className="description">Un produit en vogue cette saison.</p>
                        <div className="rating">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fas fa-star ${i < 4 ? 'filled' : ''}`} />
                          ))}
                        </div>
                        <button className="pri-btn" onClick={() => handleAddToCart(product)}>
                          Ajouter
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="trending-row-stack">
                    {trendingProducts.slice(2, 5).map((product) => (
                      <div key={product._id} className="trending-card trending-card-row">
                        <div className="card-image" onClick={() => handleCardClick(product._id)}>
                          <img src={product.image} alt={product.name} />
                        </div>
                        <div className="card-content">
                          <h6>{product.name}</h6>
                          <p className="price">{`$${product.price.toFixed(2)}`}</p>
                          <div className="rating">
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className={`fas fa-star ${i < 4 ? 'filled' : ''}`} />
                            ))}
                          </div>
                          <button className="pri-btn" onClick={() => handleAddToCart(product)}>
                            <i className="fas fa-cart-plus"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Banner Intermédiaire */}
          {!loading && (
            <section className="boutique-banner">
              <div className="banner-content">
                <h2>Offre Exclusive -50%</h2>
                <p>Jusqu'au 15 avril, profitez de cette remise exceptionnelle !</p>
                <button className="pri-btn">Saisir l'Offre</button>
              </div>
            </section>
          )}

          {/* Tous les Articles avec Filtres */}
          {!loading && products.length > 0 && (
            <section className="boutique-all-products">
              <div className="boutique-container">
                <h2 className="section-title">Tous les Articles</h2>
                <div className="filters">
                  <div className="filter-group">
                    <label>Prix :</label>
                    <select
                      value={filter.price}
                      onChange={(e) => handleFilterChange('price', e.target.value)}
                    >
                      <option value="all">Tous</option>
                      <option value="low">Moins de 50$</option>
                      <option value="medium">50$ - 100$</option>
                      <option value="high">Plus de 100$</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>Catégorie :</label>
                    <select
                      value={filter.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                    >
                      <option value="all">Toutes</option>
                      <option value="vêtements">Vêtements</option>
                      <option value="accessoires">Accessoires</option>
                      <option value="chaussures">Chaussures</option>
                    </select>
                  </div>
                  <div className="filter-group checkbox">
                    <label>
                      <input
                        type="checkbox"
                        checked={filter.isNew}
                        onChange={(e) => handleFilterChange('isNew', e.target.checked)}
                      />
                      Nouveautés uniquement
                    </label>
                  </div>
                </div>
                <div className="all-products-grid">
                  {filteredProducts.map((product) => (
                    <div key={product._id} className="product-card">
                      <div className="card-image" onClick={() => handleCardClick(product._id)}>
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="card-content">
                        <h6>{product.name}</h6>
                        <p className="price">{`$${product.price.toFixed(2)}`}</p>
                        <p className="description">{product.description || 'Un produit élégant.'}</p>
                        <div className="rating">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fas fa-star ${i < 4 ? 'filled' : ''}`} />
                          ))}
                        </div>
                        <button className="pri-btn" onClick={() => handleAddToCart(product)}>
                          <i className="fas fa-cart-plus"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* New Arrivals */}
          {!loading && newArrivals.length > 0 && (
            <section className="boutique-new-arrivals">
              <div className="boutique-container">
                <h2 className="section-title">Nouveautés</h2>
                <div className="new-arrivals-grid">
                  {newArrivals.map((product) => (
                    <div key={product._id} className="arrival-card">
                      <div className="card-image" onClick={() => handleCardClick(product._id)}>
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="card-content">
                        <h6>{product.name}</h6>
                        <p className="price">{`$${product.price.toFixed(2)}`}</p>
                        <p className="description">Fraîchement arrivé dans notre collection.</p>
                        <div className="rating">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fas fa-star ${i < 4 ? 'filled' : ''}`} />
                          ))}
                        </div>
                        <button className="pri-btn" onClick={() => handleAddToCart(product)}>
                          Ajouter
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </PageLayout>
  );
};

export default Boutique;