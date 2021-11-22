'use strict'

class ProductsController{
    getProductsListPage(req, res, next) {
        res.render('products/productsList');
      }

    getProductsDetailPage(req, res, next) {
        res.render('products/productsDetail');
    }

    getProductsCompare(req, res, next) {
        res.render('products/productsCompare');
      }
}

module.exports = new ProductsController;