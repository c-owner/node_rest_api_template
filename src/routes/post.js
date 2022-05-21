const express = require('express');

const router = express.Router();

// Controller Methods
const postController = require('../controllers/postsController');

router.route('/post')
    .get(postController.getPosts);

router.route('/post/:id')
    .get(postController.getPostById);


 

module.exports = router;
