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
      const id = req.query.id;

      //Get a product with id
      let productsDetail =  await productsService.getProductsDetail(id);

      //Get a image products detail with id
      let imageProductsDetail =  await productsService.getImageProductsDetail(id);

      //Get comment of customer
      // let commentProductsDetail = await productsService.getCommentProductsDetail(id);
      // console.log(commentProductsDetail)
      //Total comment
      // let totalComments = commentProductsDetail.length;
      // console.log(totalComments)

      //return view + data
      res.render(
        'products/productsDetail', 
        {
          productsDetail: productsDetail,
          imageProductsDetail: imageProductsDetail,
          // commentProductsDetail: commentProductsDetail,
          // totalComments: {totalComments: totalComments},
        }
      );
    }

    getProductsCompare(req, res) {
        res.render('products/productsCompare');
      }
}

module.exports = new ProductsController;