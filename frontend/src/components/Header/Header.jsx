import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Vérifie si l'utilisateur est connecté

  const handleAuthClick = () => {
    if (token) {
      navigate('/profile'); // Si connecté, va au profil
    } else {
      navigate('/auth'); // Sinon, va à la page de connexion/inscription
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <img src="https://leloc90.github.io/loveTravel/assets/images/Logo-transparent.png" alt="Palmeres Platja Logo" />
        </Link>
        <nav className="header-nav">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/" className="nav-link">Accueil</Link></li>
            <li className="nav-item"><Link to="/coup-de-coeur" className="nav-link">Coup de cœur</Link></li>
            <li className="nav-item"><Link to="/boutique" className="nav-link">Boutique</Link></li>
            <li className="nav-item"><Link to="/guides" className="nav-link">Guides</Link></li>
            <li className="nav-item"><Link to="/forum" className="nav-link">Forum</Link></li>
            <li className="nav-item"><Link to="/articles" className="nav-link">Articles</Link></li>
            <li className="nav-item"><Link to="/contact" className="nav-link">Contact</Link></li>
            {/* Icône pour inscription/connexion ou profil */}
            <li className="nav-item nav-icon">
              <button className="nav-icon-btn" onClick={handleAuthClick} title={token ? 'Profil' : 'Connexion'}>
                <i className="fas fa-user"></i>
              </button>
            </li>
            {/* Icône pour les dons */}
            <li className="nav-item nav-icon">
              <Link to="/donate" className="nav-icon-link" title="Faire un don">
                <i className="fas fa-heart"></i>
              </Link>
            </li>
            {/* Icône pour le panier */}
            <li className="nav-item nav-icon">
              <Link to="/cart" className="nav-icon-link" title="Panier">
                <i className="fas fa-shopping-cart"></i>
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </Link>
            </li>
            {/* Bouton de déconnexion (visible uniquement si connecté) */}
            {token && (
              <li className="nav-item nav-icon">
                <button className="nav-icon-btn logout-btn" onClick={handleLogout} title="Déconnexion">
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </li>
            )}
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