import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductDetailPage.scss';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) throw new Error('Produit non trouvé');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  if (error) return <p>{error}</p>;
  if (!product) return <p>Chargement...</p>;

  return (
    <div className="product-detail-container">
      <main>
        <section className="product-info">
          <h1>{product.name}</h1>
          <p className="description">{product.description}</p>
          <div className="pill-options">
            <button className="pill-count active">1</button>
            <button className="pill-count">2</button>
            <button className="pill-count">3</button>
          </div>
          <div className="overview-info">
            <i className="info-icon">ⓘ</i> <span>Plus d’informations</span>
          </div>
        </section>
        <section className="product-image">
          <img src={product.image} alt={product.name} />
        </section>
      </main>
      <footer>
        <p className="partnership-text">Nous collaborons avec des partenaires locaux pour vous offrir les meilleurs produits de Platja d’Aro.</p>
        <div className="price-actions">
          <div className="price">{product.price} €</div>
          <div className="quantity-selector">
            <button className="quantity-button" onClick={() => handleQuantityChange(-1)}>-</button>
            <input type="number" value={quantity} min="1" className="quantity-input" readOnly />
            <button className="quantity-button" onClick={() => handleQuantityChange(1)}>+</button>
          </div>
          <button className="buy-now-button" onClick={handleAddToCart}>Ajouter au panier</button>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetailPage;