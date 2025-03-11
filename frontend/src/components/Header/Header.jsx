import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <header className="header">
      <div className="header-container">
        <a href="/" className="header-logo">
          <img src="https://leloc90.github.io/loveTravel/assets/images/Logo-transparent.png" alt="Palmeres Platja Logo" />
        </a>
        <nav className="header-nav">
          <ul className="nav-list">
            <li className="nav-item"><a href="/" className="nav-link">Accueil</a></li>
            <li className="nav-item">
              <a href="/coup-de-coeur" className="nav-link">Coup de cœur</a>
              <ul className="nav-submenu">
                <li className="submenu-item"><a href="/coup-de-coeur#restaurant" className="submenu-link">Restaurants</a></li>
                <li className="submenu-item"><a href="/coup-de-coeur#hotel" className="submenu-link">Hôtels</a></li>
                <li className="submenu-item"><a href="/coup-de-coeur#agence-immo" className="submenu-link">Agences Immo</a></li>
                <li className="submenu-item"><a href="/coup-de-coeur#artisans" className="submenu-link">Artisans</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="/boutique" className="nav-link">Boutique</a>
              <ul className="nav-submenu">
                <li className="submenu-item"><a href="/boutique#tshirts" className="submenu-link">T-Shirts</a></li>
                <li className="submenu-item"><a href="/boutique#casquettes" className="submenu-link">Casquettes</a></li>
                <li className="submenu-item"><a href="/boutique#panier" className="submenu-link">Panier</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="/guides" className="nav-link">Guides</a>
              <ul className="nav-submenu">
                <li className="submenu-item"><a href="/guides#expat" className="submenu-link">Expat</a></li>
                <li className="submenu-item"><a href="/guides#tourisme" className="submenu-link">Tourisme</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="/forum" className="nav-link">Forum</a>
              <ul className="nav-submenu">
                <li className="submenu-item"><a href="/forum#expat" className="submenu-link">Expat</a></li>
                <li className="submenu-item"><a href="/forum#tourisme" className="submenu-link">Tourisme</a></li>
                <li className="submenu-item"><a href="/forum#sujets" className="submenu-link">Sujets</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="/articles" className="nav-link">Articles</a>
              <ul className="nav-submenu">
                <li className="submenu-item"><a href="/articles#recent" className="submenu-link">Récents</a></li>
                <li className="submenu-item"><a href="/articles#archives" className="submenu-link">Archives</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="/contact" className="nav-link">Contact</a>
              <ul className="nav-submenu">
                <li className="submenu-item"><a href="/contact#general" className="submenu-link">Général</a></li>
                <li className="submenu-item"><a href="/contact#support" className="submenu-link">Support</a></li>
              </ul>
            </li>
            {/* Icône pour inscription/connexion */}
            <li className="nav-item nav-icon">
              <a href="/auth" className="nav-icon-link">
                <i className="fas fa-user"></i>
              </a>
            </li>
            {/* Icône pour les dons */}
            <li className="nav-item nav-icon">
              <a href="/donate" className="nav-icon-link">
                <i className="fas fa-heart"></i>
              </a>
            </li>
            <li className="nav-item nav-icon">
              <Link to="/cart" className="nav-icon-link">
                <i className="fas fa-shopping-cart"></i>
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </Link>
            </li>
          </ul>
        </nav>
        <label htmlFor="sub-menu__check" className="header-menu-toggle">
          <i className="bx bx-menu"></i>
        </label>
      </div>
    </header>
  );
};

export default Header;