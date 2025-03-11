const express = require('express');
const router = express.Router();
const guideController = require('../controllers/guideController');

router.get('/', guideController.getGuides);

module.exports = router;