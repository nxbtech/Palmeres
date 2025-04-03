// frontend/src/components/LinkButton/LinkButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './LinkButton.scss';

const LinkButton = ({ to, children }) => {
  return (
    <Link to={to} className="link-button">
      {children}
    </Link>
  );
};

export default LinkButton;