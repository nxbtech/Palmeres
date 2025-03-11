import React from 'react';
import './ErrorPage.scss';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>Une erreur s'est produite</h1>
      <p>Désolé, quelque chose a mal tourné. Essayez de revenir à l'accueil.</p>
      <a href="/">Retour à l'accueil</a>
    </div>
  );
};

export default ErrorPage;