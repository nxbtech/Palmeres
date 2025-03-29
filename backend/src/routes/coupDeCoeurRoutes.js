const express = require('express');
const router = express.Router();
const coupDeCoeurController = require('../controllers/coupDeCoeurController');

router.get('/', coupDeCoeurController.getItems);
router.get('/:id', coupDeCoeurController.getItemById);

module.exports = router;