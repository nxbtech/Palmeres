// frontend/src/components/ProductInfo/ProductInfo.jsx
import React from 'react';
import Button from '../Button/Button';
import './ProductInfo.scss';

const ProductInfo = ({ product, quantity, onQuantityChange, onAddToCart }) => {
  return (
    <div className="product-info">
      <p>Accueil / {product.category || 'T-Shirt'}</p>
      <h1>{product.name || 'T-Shirt Rouge Imprimé par HRX'}</h1>
      <h4>{product.price ? `$${product.price.toFixed(2)}` : '$50.00'}</h4>
      <select>
        <option value="">Sélectionner la taille</option>
        {product.sizes && product.sizes.length > 0 ? (
          product.sizes.map((size, index) => (
            <option key={index} value={size}>{size}</option>
          ))
        ) : (
          <>
            <option value="XXL">XXL</option>
            <option value="XL">XL</option>
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="S">S</option>
          </>
        )}
      </select>
      <input type="number" value={quantity} onChange={onQuantityChange} />
      <Button variant="primary" onClick={onAddToCart}>Ajouter au Panier</Button>
      <h3>Détails du Produit <i className="fa fa-indent"></i></h3>
      <p>{product.description || 'Donnez une touche de style à votre garde-robe d’été avec le T-Shirt Active HRX pour Homme. Associez-le à un short pour votre séance matinale ou à un jean pour une soirée avec les amis.'}</p>
    </div>
  );
};

export default ProductInfo;