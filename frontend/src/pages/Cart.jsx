import React from 'react';
import { useCart } from '../context/CartContext';
import PageLayout from '../components/PageLayout/PageLayout';
import './Cart.scss';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  console.log('Cart state in Cart component:', cart);

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0).toFixed(2);
  };

  const handleCheckout = async () => {
    console.log('Cart contents before checkout:', JSON.stringify(cart, null, 2)); // Log pour débogage
    try {
      // Vérifier que le panier n'est pas vide
      if (!cart || cart.length === 0) {
        throw new Error('Le panier est vide');
      }
  
      const lineItems = cart.map((item) => {
        // Vérifier les champs requis
        if (!item.name || typeof item.name !== 'string') {
          throw new Error(`Nom invalide pour l'article: ${JSON.stringify(item)}`);
        }
        if (!item.price || isNaN(item.price) || Number(item.price) <= 0) {
          throw new Error(`Prix invalide pour l'article: ${JSON.stringify(item)}`);
        }
  
        return {
          price_data: {
            currency: 'eur',
            product_data: { name: item.name },
            unit_amount: Math.round(Number(item.price) * 100), // Assurer un entier
          },
          quantity: item.quantity && Number(item.quantity) > 0 ? Number(item.quantity) : 1,
        };
      });
  
      const response = await fetch('http://localhost:5000/api/payment/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: lineItems }),
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la création de la session Stripe');
      }
  
      const { id } = await response.json();
      const stripe = await import('@stripe/stripe-js').then((module) =>
        module.loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
      );
  
      if (!stripe) {
        throw new Error('Échec du chargement de Stripe');
      }
  
      const { error } = await stripe.redirectToCheckout({ sessionId: id });
      if (error) {
        console.error('Erreur Stripe:', error);
        alert(error.message);
      }
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
      alert(`Erreur: ${error.message}`);
    }
  };

  return (
    <PageLayout
      title="Panier"
      subtitle="Votre sélection"
      image="https://i.pinimg.com/564x/88/48/78/884878043ee17464c8972e66effcc716.jpg"
    >
      <section className="cart-section">
        <h2>Votre Panier</h2>
        {cart.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>{item.price} € x {item.quantity || 1}</p>
                </div>
                <button className="cart-item-remove" onClick={() => removeFromCart(index)}>
                  ×
                </button>
              </div>
            ))}
            <div className="cart-total">
              <h3>Total : {calculateTotal()} €</h3>
              <button className="cart-checkout" onClick={handleCheckout}>
                Passer au paiement
              </button>
            </div>
          </div>
        )}
      </section>
    </PageLayout>
  );
};

export default Cart;