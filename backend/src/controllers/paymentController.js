const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  try {
    const { items } = req.body;
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: { name: item.name },
        unit_amount: item.unit_amount || item.price * 100,
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin}/checkout?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
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
    res.status(500).json({ error: error.message });
  }
};

exports.verifySession = async (req, res) => {
  try {
    const { session_id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
    res.json({ status: paymentIntent.status });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la vérification de la session' });
  }
};