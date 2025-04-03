// frontend/src/pages/Donate/Donate.jsx
import React from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import DonateModule from '../../modules/DonateModule/DonateModule';

const Donate = () => (
  <PageLayout
    title="Faire un don"
    subtitle="Soutenez notre mission"
    image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742937681/banniere-don_wbzrso.jpg"
  >
    <DonateModule />
  </PageLayout>
);

export default Donate;