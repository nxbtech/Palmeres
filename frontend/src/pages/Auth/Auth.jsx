// frontend/src/pages/Auth/Auth.jsx
import React from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import AuthModule from '../../modules/AuthModule/AuthModule';

const Auth = () => (
  <PageLayout
    title="Connexion / Inscription"
    subtitle="Rejoignez la communauté"
    image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742937679/banniere-connexion_owosrk.jpg"
  >
    <AuthModule />
  </PageLayout>
);

export default Auth;