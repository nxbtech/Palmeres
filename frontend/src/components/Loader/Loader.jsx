// frontend/src/components/Loader/Loader.jsx
import React from 'react';
import './Loader.scss';

const Loader = ({ message = 'Chargement...' }) => {
  return (
    <div className="loader">
      <div className="loader-circle"></div>
      <p>{message}</p>
    </div>
  );
};

export default Loader;