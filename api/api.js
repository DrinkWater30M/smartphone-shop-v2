const express = require('express');
const router = express.Router();
const apiProductsController = require('./ApiProductsController');
const apiCartController = require('./ApiCartController');
const apiUserController = require('./ApiUserController');
const middleware = require('../middleware/MiddleWare');

/* Get rating */
router.get('/products/detail/more-rating', apiProductsController.getSomeRating);

/* Post rating */
router.post('/products/detail/add-rating', middleware.isLogin, apiProductsController.addRating);

/* Get products in wishlist*/
router.get('/wishlist/products', middleware.isLogin, apiCartController.getWishList);

/* Post product to add to cart*/
router.post('/wishlist/add-to-cart', middleware.isLogin, apiCartController.addToCart);

/* Remove product in wishlist*/
router.delete('/wishlist/remove-product', middleware.isLogin, apiCartController.deleteProductInWishList);

/* Get products in cart*/
router.get('/cart/products', middleware.isLogin, apiCartController.getCart);

/* Remove product in cart*/
router.delete('/cart/remove-product', middleware.isLogin, apiCartController.deleteProductInCart);

/* Remove all product in cart*/
router.delete('/cart/remove-all-product', middleware.isLogin, apiCartController.deleteProductInCart);

/* Update quantity product in cart*/
router.patch('/cart/update-quantity-products', middleware.isLogin, apiCartController.updateCart);

/*Add bill*/
router.post('/checkout/add-bill', middleware.isLogin, apiCartController.addBill);

/*Get bill*/
router.get('/checkout/get-bill', middleware.isLogin, apiCartController.getBill);

/*Get information of user*/
router.get('/user/account', middleware.isLogin, apiUserController.getAccount);

/*Save information of user*/
router.post('/user/account-save', middleware.isLogin, apiUserController.saveAccount);

/*Add otp and send to email*/
router.post('/user/reset-password/otp', middleware.isLogin, apiUserController.addOTP);

/*Update password*/
router.patch('/user/reset-password/reset', middleware.isLogin, apiUserController.resetPassword);
module.exports = router;
