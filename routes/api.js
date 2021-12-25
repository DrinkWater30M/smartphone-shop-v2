const express = require('express');
const router = express.Router();
const apiProductsController = require('../api/ApiProductsController');

/* Get rating */
router.get('/products/detail/more-rating', apiProductsController.getSomeRating);

/* Post rating */
router.post('/products/detail/add-rating', apiProductsController.addRating);

module.exports = router;
