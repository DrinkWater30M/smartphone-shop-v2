'use strict'

class MiddleWare{
    isLogin(req, res, next){
        if(req.user){
            next();
        }
        else{
            res.redirect('/user/login');
        }
    }
}

module.exports = new MiddleWare;