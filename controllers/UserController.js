'use strict'

class UserController{
    getAccountPage(req, res, next) {
        res.render('user/account.hbs');
      }

    getLoginPage(req, res, next) {
        res.render('user/login.hbs');
    }
}

module.exports = new UserController