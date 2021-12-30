'use strict'
class CartController{
    getCartPage(req, res, next) {
        res.render('cart/cart.hbs');
      }

    getWishlistPage(req, res, next) {
        res.render('cart/wishlist.hbs');
    }

    getCheckoutPage(req, res, next) {
        res.render('cart/checkout.hbs');
      }

    getThankyouPage(req, res, next) {
      res.render('cart/thankyou.hbs');
    }
}


module.exports = new CartController;