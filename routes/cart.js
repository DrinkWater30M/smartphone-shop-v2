const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');
const middleware = require('../middleware/MiddleWare');

/* Choice controller for /wishlist */
router.get('/wishlist', cartController.getWishlistPage);

/* Choice controller for /cart */
router.get('/cart', cartController.getCartPage);

/* Choice controller for /checkout */
router.get('/checkout', middleware.isVerify, cartController.getCheckoutPage);

/* Choice controller for /thankyou */
  router.get('/thankyou', cartController.getThankyouPage);

module.exports = router;
