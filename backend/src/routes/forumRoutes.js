const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

router.get('/', forumController.getPosts);
router.post('/add', forumController.addPost);

module.exports = router;