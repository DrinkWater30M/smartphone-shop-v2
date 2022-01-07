'use strict'
const userService = require('../services/UserService');

class ApiUserController{
    async getAccount(req, res, next){
        try{
            //Get id user to get info
            let idUser = req.user.MaKhachHang;

            //Get info of user
            let userInfo = await userService.getUserInformation(idUser);

            //Return data
            res.status(200).json(userInfo);
        }
        catch(error){
            console.log(error);
            res.status(500).send({error: "Đã có lỗi trên server! Vui lòng thử lại!"});
        }
    }

    async saveAccount(req, res, next){
        try{
            //Get id user to get info
            let idUser = req.user.MaKhachHang;
            let userInfo = req.body;

            //Get info of user
            await userService.updateAccount(idUser, userInfo);

            //Return data
            res.status(200).json({message: 'Cập nhật thành công!'});
        }
        catch(error){
            console.log(error);
            res.status(500).send({error: "Đã có lỗi trên server! Vui lòng thử lại!"});
        }
    }
}

module.exports = new ApiUserController;