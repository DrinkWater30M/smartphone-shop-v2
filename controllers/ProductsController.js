'use strict'

const productsService = require('../services/ProductsService');

class ProductsController{
    async getProductsListPage(req, res, next) {
        //Amount items per page
        const ITEMS_PER_PAGE = 12;

        //Get page from query
        let currentPage = Number.parseInt(req.query.page) || 1;

        //Get brand from query
        let currentBrand = req.query.brand || null;

        //Get color from query
        let currentColor = req.query.color || null;
        
        //Get ram from query
        let currentRam = req.query.ram || null;

        //Get rom from query
        let currentRom = req.query.rom || null;

        //Get price from query
        let currentMinPrice = Number.parseInt(req.query.min_price) || null;
        let currentMaxPrice = Number.parseInt(req.query.max_price) || null;

        //Get type sort from query
        let currentSort = Number.parseInt(req.query.sort) || 0;

        //Get data from DB
        let productsList = await productsService.getProductsList(ITEMS_PER_PAGE, currentPage, currentBrand, currentColor, currentRam, currentRom, currentMinPrice, currentMaxPrice, currentSort);

        let brandsList = await productsService.getBrandsList();

        //Get total products
        let totalProducts = productsList.length;

        res.render(
          'products/productsList', 
          {
            productsList: productsList,
            brandsList: brandsList,
            currentPage:{currentPage: currentPage},
            currentBrand: {currentBrand: currentBrand},
            currentColor: {currentColor: currentColor}, 
            currentRam: {currentRam: currentRam}, 
            currentRom: {currentRom: currentRom},
            currentPrice:{ currentMinPrice: currentMinPrice, currentMaxPrice: currentMaxPrice},
            currentSort: {currentSort: currentSort}
          } 
        );
      }

    async getProductsDetailPage(req, res) {
      //Get id product from query
      const idProduct = req.query.id;

      //Get a product with id
      let productDetail =  await productsService.getProductDetail(idProduct);

      //Get some rating of customer: 2 new rating
      let someRating = await productsService.getSomeRating(idProduct, 0, 2);

      //Total rating
      let totalRating = await productsService.totalRating(idProduct);

      //Get related products
      let relatedProducts = await productsService.getRelatedProducts(idProduct);

      //return view + data
      res.render(
        'products/productsDetail', 
        {
          productDetail, someRating, totalRating, relatedProducts
        }
      );
    }

    getProductsCompare(req, res) {
        res.render('products/productsCompare');
      }
}

module.exports = new ProductsController;