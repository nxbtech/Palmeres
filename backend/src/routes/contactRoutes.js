const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/send', contactController.sendContact);

module.exports = router;