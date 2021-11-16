var express = require('express');
var router = express.Router();

/* GET cart page. */
router.get('/cart', function(req, res, next) {
  res.render('cart/cart.hbs');
});

/* GET wishlist page. */
router.get('/wishlist', function(req, res, next) {
    res.render('cart/wishlist.hbs');
  });

/* GET checkout page. */
router.get('/checkout', function(req, res, next) {
    res.render('cart/checkout.hbs');
  });

  //* GET default
  router.get('/thankyou', function(req, res, next) {
    res.render('cart/thankyou.hbs');
  });

module.exports = router;
