// frontend/src/pages/Guides/Guides.jsx
import React from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import GuidesModule from '../../modules/GuidesModule/GuidesModule';

const Guides = () => (
  <PageLayout
    title="Nos Guides"
    subtitle="Explorez Platja d’Aro"
    image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742936902/banniere-guides_xuas76.jpg"
  >
    <GuidesModule />
  </PageLayout>
);

export default Guides;