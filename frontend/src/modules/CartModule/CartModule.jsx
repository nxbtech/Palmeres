// frontend/src/modules/CartModule/CartModule.jsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import Button from '../../components/Button/Button';
import './CartModule.scss';

const CartModule = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const calculateSubtotal = (item) => (item.price * (item.quantity || 1)).toFixed(2);
  const calculateTotal = () => cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0).toFixed(2);
  const tax = (parseFloat(calculateTotal()) * 0.175).toFixed(2);
  const totalWithTax = (parseFloat(calculateTotal()) + parseFloat(tax)).toFixed(2);

  const handleCheckout = async () => {
    try {
      if (!cart || cart.length === 0) {
        throw new Error('Le panier est vide');
      }

      const lineItems = cart.map((item) => {
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
            unit_amount: Math.round(Number(item.price) * 100),
          },
          quantity: item.quantity && Number(item.quantity) > 0 ? Number(item.quantity) : 1,
        };
      });

      const response = await fetch('http://localhost:5000/api/payment/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: lineItems }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la création de la session Stripe');
      }

      const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
      if (!stripePublishableKey) {
        throw new Error('Clé publique Stripe non configurée');
      }

      const stripe = await import('@stripe/stripe-js').then((module) =>
        module.loadStripe(stripePublishableKey)
      );

      if (!stripe) {
        throw new Error('Échec du chargement de Stripe');
      }

      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
      if (error) {
        console.error('Erreur lors de la redirection vers Stripe Checkout:', error);
        alert(`Erreur Stripe: ${error.message}`);
      }
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
      alert(`Erreur: ${error.message}`);
    }
  };

  const handleQuantityChange = (index, e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      updateQuantity(index, value);
    }
  };

  return (
    <div className="cart-module">
      <table>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Sous-total</th>
          </tr>
        </thead>
        <tbody>
          {cart.length === 0 ? (
            <tr>
              <td colSpan="3">Votre panier est vide.</td>
            </tr>
          ) : (
            cart.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="cart-info">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <small>Prix: {item.price} €</small>
                      <br />
                      <a href="#" onClick={(e) => { e.preventDefault(); removeFromCart(index); }}>
                        Supprimer
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  <input
                    type="number"
                    value={item.quantity || 1}
                    onChange={(e) => handleQuantityChange(index, e)}
                  />
                </td>
                <td>€{calculateSubtotal(item)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {cart.length > 0 && (
        <div className="cart-total-price">
          <table>
            <tbody>
              <tr>
                <td>Sous-total</td>
                <td>€{calculateTotal()}</td>
              </tr>
              <tr>
                <td>Taxe</td>
                <td>€{tax}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>€{totalWithTax}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <Button
        variant="primary"
        onClick={handleCheckout}
        disabled={cart.length === 0}
      >
        Passer au paiement
      </Button>
    </div>
  );
};

export default CartModule;