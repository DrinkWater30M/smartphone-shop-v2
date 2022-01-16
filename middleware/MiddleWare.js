'use strict'
const userService = require('../services/UserService');
class MiddleWare{
    isLogin(req, res, next){
        if(req.user){
            next();
        }
        else{
            res.redirect('/user/login');
        }
    }

    async isVerify(req, res, next){
        let user = await userService.getUserInformation(req.user.MaKhachHang);

        //Check verify
        if(user.XacMinhTaiKhoan == 1){
            next();
        }
        else{
            res.redirect('/user/account?tab=email-verification');
        }
    }
}

module.exports = new MiddleWare;