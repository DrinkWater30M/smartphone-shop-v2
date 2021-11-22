const express = require('express');
const router = express.Router();
const productsController = require('../controller/ProductsController')

/* GET products page. */
router.get('/', productsController.getProductsListPage);

/* GET products detail page. */
router.get('/detail', productsController.getProductsDetailPage);

/* GET products compare page. */
router.get('/productsCompare', productsController.getProductsCompare);

module.exports = router;
