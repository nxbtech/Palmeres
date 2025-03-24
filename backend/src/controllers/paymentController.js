const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  try {
    console.log('Stripe secret key:', process.env.STRIPE_SECRET_KEY);
    console.log('Received checkout request:', req.body);

    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('Les articles sont requis et doivent être un tableau non vide');
    }

    const lineItems = items.map((item) => {
      if (!item.price_data || !item.price_data.product_data || !item.price_data.product_data.name) {
        throw new Error(`Nom de produit manquant dans l'article: ${JSON.stringify(item)}`);
      }
      if (!item.price_data.unit_amount || isNaN(item.price_data.unit_amount) || item.price_data.unit_amount <= 0) {
        throw new Error(`Montant unitaire invalide dans l'article: ${JSON.stringify(item)}`);
      }

      return {
        price_data: {
          currency: item.price_data.currency || 'eur',
          product_data: { name: item.price_data.product_data.name },
          unit_amount: item.price_data.unit_amount,
        },
        quantity: item.quantity && Number(item.quantity) > 0 ? Number(item.quantity) : 1,
      };
    });

    console.log('Line items prepared for Stripe:', lineItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin}/checkout?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    console.log('Stripe session created:', session.id);
    res.json({ id: session.id });
  } catch (error) {
    console.error('Erreur dans createCheckoutSession:', error.message, error.stack);
    res.status(500).json({ error: error.message });
  }
};

exports.createDonationSession = async (req, res) => {
  try {
    const { amount, email } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: { name: 'Donation à Platja d’Aro' },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/checkout?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    const Donation = require('../models/Donation');
    const donation = new Donation({ amount: amount / 100, donorEmail: email });
    await donation.save();

    res.json({ id: session.id });
  } catch (error) {
    console.error('Erreur dans createDonationSession:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.verifySession = async (req, res) => {
  try {
    const { session_id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
    console.log('PaymentIntent status:', paymentIntent.status); // Log pour débogage
    res.json({ status: paymentIntent.status });
  } catch (error) {
    console.error('Erreur dans verifySession:', error.message, error.stack);
    res.status(500).json({ error: 'Erreur lors de la vérification de la session' });
  }
};