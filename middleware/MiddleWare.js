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

    async isBlock(req, res, next){
        let user = await userService.getUserInformation(req.user.MaKhachHang);

        //Check block
        if(user.is_block == 0){
            next();
        }
        else{
            req.flash('message', ['Email chưa được đăng kí! Hãy tạo tài khoản!'] );
            res.redirect('user/login');
        }
    }
}

module.exports = new MiddleWare;