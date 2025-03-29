import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('FR');

  const handleAuthClick = () => {
    if (token) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Recherche :', searchQuery);
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="header">
      {/* Barre supérieure (gris) */}
      <div className="header-top">
        <div className="header-container">
          <Link to="/" className="header-logo">
            <img src="https://res.cloudinary.com/drnmfxkwv/image/upload/v1743012241/skvmhyj8imumpjjyg0va.png" alt="Palmeres Platja Logo" />
          </Link>
          <form onSubmit={handleSearch} className="header-search">
            <input
              type="text"
              className="global-search"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </form>
          <div className="header-top-right">
            <select
              className="header-language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="FR">FR</option>
              <option value="ES">ES</option>
            </select>
            <div className="header-icons">
              <button className="nav-icon-btn" onClick={handleAuthClick} title={token ? 'Profil' : 'Connexion'}>
                <i className="fas fa-user"></i>
              </button>
              <Link to="/donate" className="nav-icon-link" title="Faire un don">
                <i className="fas fa-heart"></i>
              </Link>
              <Link to="/cart" className="nav-icon-link" title="Panier">
                <i className="fas fa-shopping-cart"></i>
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </Link>
              {token && (
                <button className="nav-icon-btn logout-btn" onClick={handleLogout} title="Déconnexion">
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Barre inférieure (blanc) */}
      <div className="header-bottom">
        <div className="header-container">
          <nav className="header-nav">
            <ul className="nav-list">
              <li className="nav-item"><Link to="/" className="nav-link">Accueil</Link></li>
              <li className="nav-item"><Link to="/coup-de-coeur" className="nav-link">Coup de cœur</Link></li>
              <li className="nav-item"><Link to="/bons-plans" className="nav-link">Bons Plans</Link></li>
              <li className="nav-item"><Link to="/boutique" className="nav-link">Boutique</Link></li>
              <li className="nav-item"><Link to="/guides" className="nav-link">Guides</Link></li>
              <li className="nav-item"><Link to="/forum" className="nav-link">Forum</Link></li>
              <li className="nav-item"><Link to="/articles" className="nav-link">Articles</Link></li>
              <li className="nav-item"><Link to="/contact" className="nav-link">Contact</Link></li>
            </ul>
          </nav>
          <div className="header-social">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <label htmlFor="sub-menu__check" className="header-menu-toggle">
            <i className="bx bx-menu"></i>
          </label>
        </div>
      </div>
    </header>
  );
};

export default Header;