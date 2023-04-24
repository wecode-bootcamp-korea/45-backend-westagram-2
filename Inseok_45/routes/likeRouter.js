const express = require('express');
const likeController = require('../controllers/likeController');

const router = express.Router();

router.put('/', likeController.likePosts);

module.exports = { router };
