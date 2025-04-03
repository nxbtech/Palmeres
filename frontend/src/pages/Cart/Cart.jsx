// frontend/src/pages/Cart/Cart.jsx
import React from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import CartModule from '../../modules/CartModule/CartModule';

const Cart = () => (
  <PageLayout
    title="Panier"
    subtitle="Votre sélection"
    image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742937680/banniere-panier_kfphnm.jpg"
  >
    <CartModule />
  </PageLayout>
);

export default Cart;