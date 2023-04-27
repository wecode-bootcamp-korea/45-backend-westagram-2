const express = require('express');
const postController = require('../controllers/postController');
const { validateToken } = require('../middlewares/validate-jwt')

const router = express.Router();

router.post('', validateToken, postController.createPosts);
router.get('', postController.getAllPosts);
router.get('/user', postController.getUserPosts)
router.delete('', postController.deletePosts);
router.patch('', postController.editPosts);

module.exports = { router };

