// frontend/src/modules/ProductDetailModule/ProductDetailModule.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import ProductInfo from '../../components/ProductInfo/ProductInfo';
import RelatedItems from '../../components/RelatedItems/RelatedItems';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './ProductDetailModule.scss';

const ProductDetailModule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) throw new Error('Produit non trouvé');
        const data = await response.json();
        setProduct(data);
        setMainImage(data.image);

        const relatedResponse = await fetch(`http://localhost:5000/api/products?category=${data.category}`);
        const relatedData = await relatedResponse.json();
        setRelatedProducts(relatedData.filter(item => item._id !== id).slice(0, 4));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
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

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return <Loader message="Chargement du produit..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onBack={() => navigate(-1)} />;
  }

  if (!product) return null;

  const images = [product.image, ...(product.additionalImages || [])];

  return (
    <div className="product-detail-module">
      <div className="product-detail-grid">
        <ImageGallery mainImage={mainImage || product.image} images={images} onImageClick={handleImageClick} />
        <ProductInfo
          product={product}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          onAddToCart={handleAddToCart}
        />
      </div>
      {relatedProducts.length > 0 && (
        <RelatedItems
          items={relatedProducts}
          onItemClick={handleProductClick}
          onSeeMore={() => navigate('/boutique')}
        />
      )}
    </div>
  );
};

export default ProductDetailModule;