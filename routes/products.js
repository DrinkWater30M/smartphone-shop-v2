var express = require('express');
var router = express.Router();

/* GET products page. */
router.get('/', function(req, res, next) {
  res.render('products/productsList');
});

/* GET products detail page. */
router.get('/detail', function(req, res, next) {
  res.render('products/productsDetail');
});

/* GET products compare page. */
router.get('/productsCompare', function(req, res, next) {
  res.render('products/productsCompare');
});

module.exports = router;
