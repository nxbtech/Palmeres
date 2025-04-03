// frontend/src/components/Header/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <h1>Palmeres</h1>
        </Link>

        {/* Navigation Links */}
        <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="header-nav-list">
            <li>
              <select
                className="destination-selector"
                onChange={(e) => navigate(`/destination/${e.target.value}`)}
                defaultValue=""
              >
                <option value="" disabled>Sélectionner une ville</option>
                <option value="platja-daro">Platja d’Aro</option>
                <option value="barcelone">Barcelone</option>
                <option value="tossa-de-mar">Tossa de Mar</option>
              </select>
            </li>
            <li><Link to="/professionals" onClick={() => setIsMenuOpen(false)}>Professionnels</Link></li>
            <li><Link to="/community" onClick={() => setIsMenuOpen(false)}>Communauté</Link></li>
            <li><Link to="/media" onClick={() => setIsMenuOpen(false)}>Média</Link></li>
          </ul>
        </nav>

        {/* Right-side Actions */}
        <div className="header-actions">
          <select className="currency-selector">
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>
          <button className="login-button" onClick={() => navigate('/auth')}>
            Se connecter
          </button>
          <button className="header-menu-toggle" onClick={toggleMenu}>
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
