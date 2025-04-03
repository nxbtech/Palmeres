// frontend/src/modules/BoutiqueModule/BoutiqueModule.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Section from '../../components/Section/Section';
import Card from '../../components/Card/Card';
import FilterGroup from '../../components/FilterGroup/FilterGroup';
import Button from '../../components/Button/Button';
import './BoutiqueModule.scss';

const BoutiqueModule = () => {
  const isShopReady = false;
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
    <>
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
          {loading && (
            <div className="boutique-loader">
              <div className="loader-circle"></div>
              <p>Préparation de votre expérience...</p>
            </div>
          )}

          {!loading && products.length > 0 && (
            <Section title="Produit Star">
              <Card
                image={spotlightProduct.image}
                title={spotlightProduct.name}
                description="L'élégance rencontre l'innovation dans ce produit exclusif."
                price={`$${spotlightProduct.price.toFixed(2)}`}
                actionText="Ajouter au Panier"
                onAction={() => handleAddToCart(spotlightProduct)}
                onClick={() => handleCardClick(spotlightProduct._id)}
                className="spotlight-card"
              />
            </Section>
          )}

          {!loading && curatedProducts.length > 0 && (
            <Section title="Collection Curated">
              <div className="curated-grid">
                {curatedProducts.slice(0, 2).map((product) => (
                  <Card
                    key={product._id}
                    image={product.image}
                    title={product.name}
                    description="Un choix élégant pour votre style."
                    price={`$${product.price.toFixed(2)}`}
                    actionText="Ajouter"
                    onAction={() => handleAddToCart(product)}
                    onClick={() => handleCardClick(product._id)}
                    className="curated-card curated-card-vertical"
                  />
                ))}
                <div className="curated-row-stack">
                  {curatedProducts.slice(2, 5).map((product) => (
                    <Card
                      key={product._id}
                      image={product.image}
                      title={product.name}
                      price={`$${product.price.toFixed(2)}`}
                      onAction={() => handleAddToCart(product)}
                      onClick={() => handleCardClick(product._id)}
                      className="curated-card curated-card-row"
                    />
                  ))}
                </div>
              </div>
            </Section>
          )}

          {!loading && trendingProducts.length > 0 && (
            <Section title="Tendances Actuelles">
              <div className="trending-grid">
                {trendingProducts.slice(0, 2).map((product) => (
                  <Card
                    key={product._id}
                    image={product.image}
                    title={product.name}
                    description="Un produit en vogue cette saison."
                    price={`$${product.price.toFixed(2)}`}
                    actionText="Ajouter"
                    onAction={() => handleAddToCart(product)}
                    onClick={() => handleCardClick(product._id)}
                    className="trending-card trending-card-vertical"
                  />
                ))}
                <div className="trending-row-stack">
                  {trendingProducts.slice(2, 5).map((product) => (
                    <Card
                      key={product._id}
                      image={product.image}
                      title={product.name}
                      price={`$${product.price.toFixed(2)}`}
                      onAction={() => handleAddToCart(product)}
                      onClick={() => handleCardClick(product._id)}
                      className="trending-card trending-card-row"
                    />
                  ))}
                </div>
              </div>
            </Section>
          )}

          {!loading && (
            <section className="boutique-banner">
              <div className="banner-content">
                <h2>Offre Exclusive -50%</h2>
                <p>Jusqu'au 15 avril, profitez de cette remise exceptionnelle !</p>
                <Button variant="primary">Saisir l'Offre</Button>
              </div>
            </section>
          )}

          {!loading && products.length > 0 && (
            <Section title="Tous les Articles">
              <div className="filters">
                <FilterGroup
                  label="Prix"
                  options={[
                    { value: 'all', label: 'Tous' },
                    { value: 'low', label: 'Moins de 50$' },
                    { value: 'medium', label: '50$ - 100$' },
                    { value: 'high', label: 'Plus de 100$' },
                  ]}
                  value={filter.price}
                  onChange={(value) => handleFilterChange('price', value)}
                />
                <FilterGroup
                  label="Catégorie"
                  options={[
                    { value: 'all', label: 'Toutes' },
                    { value: 'vêtements', label: 'Vêtements' },
                    { value: 'accessoires', label: 'Accessoires' },
                    { value: 'chaussures', label: 'Chaussures' },
                  ]}
                  value={filter.category}
                  onChange={(value) => handleFilterChange('category', value)}
                />
                <FilterGroup
                  label="Nouveautés uniquement"
                  type="checkbox"
                  value={filter.isNew}
                  onChange={(value) => handleFilterChange('isNew', value)}
                />
              </div>
              <div className="all-products-grid">
                {filteredProducts.map((product) => (
                  <Card
                    key={product._id}
                    image={product.image}
                    title={product.name}
                    description={product.description || 'Un produit élégant.'}
                    price={`$${product.price.toFixed(2)}`}
                    onAction={() => handleAddToCart(product)}
                    onClick={() => handleCardClick(product._id)}
                    className="product-card"
                  />
                ))}
              </div>
            </Section>
          )}

          {!loading && newArrivals.length > 0 && (
            <Section title="Nouveautés">
              <div className="new-arrivals-grid">
                {newArrivals.map((product) => (
                  <Card
                    key={product._id}
                    image={product.image}
                    title={product.name}
                    description="Fraîchement arrivé dans notre collection."
                    price={`$${product.price.toFixed(2)}`}
                    actionText="Ajouter"
                    onAction={() => handleAddToCart(product)}
                    onClick={() => handleCardClick(product._id)}
                    className="arrival-card"
                  />
                ))}
              </div>
            </Section>
          )}
        </>
      )}
    </>
  );
};

export default BoutiqueModule;