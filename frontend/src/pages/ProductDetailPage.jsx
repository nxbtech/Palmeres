import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import PageLayout from '../components/PageLayout/PageLayout';
import './ProductDetailPage.scss';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) throw new Error('Produit non trouvé');
        const data = await response.json();
        setProduct(data);
        setMainImage(data.image); // Image principale par défaut
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      addToCart({ ...product, quantity });
      alert('Produit ajouté au panier !');
    } else {
      alert('Veuillez sélectionner une quantité supérieure à 0.');
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value > 0 ? value : 1);
  };

  const handleImageClick = (src) => {
    setMainImage(src);
  };

  if (error) return <p>{error}</p>;
  if (!product) return <p>Chargement...</p>;

  return (
    <PageLayout
      title="Détails du Produit"
      subtitle="Découvrez"
      image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
    >
      {/* Single Product */}
      <div className="product-small-container product-single-product">
        <div className="product-row">
          <div className="product-col-2">
            <img src={mainImage || product.image} width="100%" id="ProductImg" alt={product.name} />
            <div className="product-small-img-row">
              <div className="product-small-img-col">
                <img src={product.image} width="100%" className="product-small-img" onClick={() => handleImageClick(product.image)} alt="Image 1" />
              </div>
              <div className="product-small-img-col">
                <img src="https://via.placeholder.com/100" width="100%" className="product-small-img" onClick={() => handleImageClick('https://via.placeholder.com/100')} alt="Image 2" />
              </div>
              <div className="product-small-img-col">
                <img src="https://via.placeholder.com/100" width="100%" className="product-small-img" onClick={() => handleImageClick('https://via.placeholder.com/100')} alt="Image 3" />
              </div>
              <div className="product-small-img-col">
                <img src="https://via.placeholder.com/100" width="100%" className="product-small-img" onClick={() => handleImageClick('https://via.placeholder.com/100')} alt="Image 4" />
              </div>
            </div>
          </div>
          <div className="product-col-2">
            <p>Accueil / {product.category || 'T-Shirt'}</p>
            <h1>{product.name || 'T-Shirt Rouge Imprimé par HRX'}</h1>
            <h4>{product.price ? `$${product.price.toFixed(2)}` : '$50.00'}</h4>
            <select>
              <option>Sélectionner la taille</option>
              <option>XXL</option>
              <option>XL</option>
              <option>L</option>
              <option>M</option>
              <option>S</option>
            </select>
            <input type="number" value={quantity} onChange={handleQuantityChange} />
            <a href="#" className="product-btn" onClick={(e) => { e.preventDefault(); handleAddToCart(); }}>Ajouter au Panier</a>
            <h3>Détails du Produit <i className="fa fa-indent"></i></h3>
            <br />
            <p>{product.description || 'Donnez une touche de style à votre garde-robe d’été avec le T-Shirt Active HRX pour Homme. Associez-le à un short pour votre séance matinale ou à un jean pour une soirée avec les amis.'}</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="product-small-container">
        <div className="product-row product-row-2">
          <h2>Produits Similaires</h2>
          <p>Voir Plus</p>
        </div>
      </div>
      <div className="product-small-container">
        <div className="product-row">
          <div className="product-col-4">
            <img src="https://via.placeholder.com/200" alt="Produit Similaire 1" />
            <h4>T-Shirt Rouge Imprimé</h4>
            <div className="product-rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-o"></i>
            </div>
            <p>$50.00</p>
          </div>
          <div className="product-col-4">
            <img src="https://via.placeholder.com/200" alt="Produit Similaire 2" />
            <h4>T-Shirt Rouge Imprimé</h4>
            <div className="product-rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-o"></i>
            </div>
            <p>$50.00</p>
          </div>
          <div className="product-col-4">
            <img src="https://via.placeholder.com/200" alt="Produit Similaire 3" />
            <h4>T-Shirt Rouge Imprimé</h4>
            <div className="product-rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-o"></i>
            </div>
            <p>$50.00</p>
          </div>
          <div className="product-col-4">
            <img src="https://via.placeholder.com/200" alt="Produit Similaire 4" />
            <h4>T-Shirt Rouge Imprimé</h4>
            <div className="product-rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-o"></i>
            </div>
            <p>$50.00</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductDetailPage;