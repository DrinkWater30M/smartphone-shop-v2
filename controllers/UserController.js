'use strict'
const userService = require('../services/UserService');

class UserController{
    async getAccountPage(req, res, next) {
        //Get user information
        let user = await userService.getUserInformation(req.body.email);

        res.render(
            'user/account.hbs',
            {
                user:user,
            }
        );
      }

    getLoginPage(req, res, next) {
        console.log(req.body.email, req.body.password);
        res.render("user/login.hbs", 
        { 
            error: {message: req.flash('message'),
        }
    });
    }

    logout(req, res, next){
        req.logout();
        res.redirect('/user/login');
    }
}

module.exports = new UserController