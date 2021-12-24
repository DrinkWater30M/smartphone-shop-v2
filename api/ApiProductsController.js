'use strict'
const productsService = require('../services/ProductsService');

class ApiController{
    async getSomeComment(req, res, next) {
        const amountComments = 10;
        let comments = await productsService.getSomeComment(req.query.id, amountComments);
        
        res.send(comments);
    }

    async addComment(req, res, next){
        //Get data
        let {idUser, idProduct, rating, content} = req.body;

        //Write data
        try{
            let commentInf = await productsService.addComment(idUser, idProduct, rating, content);
            res.send(commentInf);
        }
        catch(error){
            console.log(error);
        }
    }
}


module.exports = new ApiController;