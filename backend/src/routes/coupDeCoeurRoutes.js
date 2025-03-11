const express = require('express');
const router = express.Router();
const coupDeCoeurController = require('../controllers/coupDeCoeurController');

router.get('/', coupDeCoeurController.getItems);

module.exports = router;