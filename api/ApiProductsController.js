'use strict'
const productsService = require('../services/ProductsService');

class ApiController{
    async getSomeRating(req, res, next) {
        const countRating = 10;
        const offset = 2 + req.query.ratingPage*countRating;
        try{
            let someRating = await productsService.getSomeRating(req.query.idProduct, offset, countRating);
            res.status(200).send(someRating);
        }
        catch(error){
            console.log(error);
            res.status(500).send({error: "Đã có lỗi trên server! Vui lòng thử lại!"});
        }
    }

    async addRating(req, res, next){
        //Get data
        let {idUser, idProduct, rating, content} = req.body;

        //Write data
        try{
            let commentInf = await productsService.addRating(idUser, idProduct, rating, content);
            res.status(200).send(commentInf);
        }
        catch(error){
            console.log(error);
            res.status(500).send({error: "Đã có lỗi trên server! Vui lòng thử lại!"});
        }
    }
}


module.exports = new ApiController;