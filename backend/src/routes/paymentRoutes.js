const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/checkout', paymentController.createCheckoutSession);
router.post('/donate', paymentController.createDonationSession);
router.get('/verify-session', paymentController.verifySession);

module.exports = router;