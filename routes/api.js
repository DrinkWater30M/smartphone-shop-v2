const express = require('express');
const router = express.Router();
const apiProductsController = require('../api/ApiProductsController');

/* Get comment */
router.get('/products/detail/comments', apiProductsController.getSomeComment);

/* Post comment */
router.post('/products/detail/add-comment', apiProductsController.addComment);

module.exports = router;
