'use strict'
const productService = require('../services/ProductsService');

class IndexController{
    async getIndexPage(req, res, next) {
        try{
        //Get two product min price;
        let productsRandom = await productService.getProductsList(2, 1, null, null, null, null, null, null, null, 5);
        
        //Get products max price
        let productsMaxPrice = await productService.getProductsList(8, 1, null, null, null, null, null, null, null, 4);

        //Get some product min price
        let productsMinPrice = await productService.getProductsList(5, 1, null, null, null, null, null, null, null, 3);

        //Get product have max battery
        let productMaxBattery = await productService.getProductsList(1, 1, null, null, null, null, null, null, null, 6);

        //Get product have max rom
        let productMaxRom = await productService.getProductsList(1, 1, null, null, null, null, null, null, null, 7);
        
        res.render(
          'index.hbs',
          {
            productsRandom,
            productsMaxPrice,
            productsMinPrice,
            productMaxBattery: productMaxBattery[0],
            productMaxRom: productMaxRom[0]
          }  
        );
      }
      catch(error){
        res.status(500).json({error: "Đã có lỗi gì đó trên server!"});
      }
    }
}

module.exports = new IndexController;