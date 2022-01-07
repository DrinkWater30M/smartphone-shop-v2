'use strict'
const cartService = require('../services/CartService');
const userService = require('../services/UserService');

class CartController{ 
  //Get wishlist page
  async getWishlistPage(req, res, next) {
    try{
      //Get products of user in wishlist
      let idUser = req.user.MaKhachHang;
      let products = await cartService.getWishList(idUser);

      //Return data
      res.render(
        'cart/wishlist.hbs',
        {products}
      );
    }
    catch(error){
      console.log(error);
      res.status(500);
    }
  }

  //Get cart page
  async getCartPage(req, res, next) {
    try{
      //Get products of user in wishlist
      let idUser = req.user.MaKhachHang;
      let products = await cartService.getCart(idUser);

      //Create sub total to return
      products.forEach(product=>{
        product.ThanhTien = product.DonGia * product.SoLuongMua;
      })

      //Return data
      res.render(
        'cart/cart.hbs',
        {products}
      );
    }
    catch(error){
      console.log(error);
      res.status(500);
    }
  }

  //Get checkout page
  async getCheckoutPage(req, res, next) {
    try{
      //Get information from DB
      let idUser = req.user.MaKhachHang;
      let customer = await userService.getUserInformation(idUser);
      let products = await cartService.getCart(idUser);

      //Calculator sub total for each product
      products.forEach(product=>{
        product.ThanhTien = product.DonGia * product.SoLuongMua;
      })

      //Return data to template
      res.status(200).render(
        'cart/checkout.hbs',
        {customer, products}
      );
    }
    catch(error){
        console.log(error);
        res.status(500).send({error: "Đã có lỗi trên server! Vui lòng thử lại!"});
    }
  }

  getThankyouPage(req, res, next) {
    res.render('cart/thankyou.hbs');
  }
}


module.exports = new CartController;