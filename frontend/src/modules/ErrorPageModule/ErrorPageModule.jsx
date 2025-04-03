// frontend/src/modules/ErrorPageModule/ErrorPageModule.jsx
import React from 'react';
import SimpleContent from '../../components/SimpleContent/SimpleContent';
import LinkButton from '../../components/LinkButton/LinkButton';
import './ErrorPageModule.scss';

const ErrorPageModule = () => {
  return (
    <div className="error-page-module">
      <SimpleContent
        title="Une erreur s'est produite"
        message="Désolé, quelque chose a mal tourné. Essayez de revenir à l'accueil."
      />
      <LinkButton to="/">Retour à l'accueil</LinkButton>
    </div>
  );
};

export default ErrorPageModule;