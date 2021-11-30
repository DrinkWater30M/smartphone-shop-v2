const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController')

/* Choice controller for /cart */
router.get('/cart', cartController.getCartPage);

/* Choice controller for /wishlist */
router.get('/wishlist', cartController.getWishlistPage);

/* Choice controller for /checkout */
router.get('/checkout', cartController.getCheckoutPage);

/* Choice controller for /thankyou */
  router.get('/thankyou', cartController.getThankyouPage);

module.exports = router;
