'use strict'
const userService = require('../services/UserService');

class UserController{
    //Return account page
    getAccountPage(req, res, next) {
        res.render('user/account.hbs');
    }

    //Return login page
    getLoginPage(req, res, next) {
        res.render('user/login.hbs', 
        { 
            errorLogin: {message: req.flash('message')}
        });
    }

    //Log out and redirect
    logout(req, res, next){
        req.logout();
        res.redirect('/user/login');
    }

    //Return registerpage
    getRegisterPage(req, res, next){
        res.render('user/register.hbs');
    }

    //Check and register account
    async register(req, res, next){
        //Get email and password of user
        const {email, password} = req.body;
        let user = {Email: email, Password: password};

        //Register information user to database
        let statusRegister = await userService.registerAccount(use.Email, user.Password, req);

        if(statusRegister){
            //Auto login and redirect
            req.login(user, function(err) {
                if (err) {
                    return next(err);
                }

                return res.redirect('/');
            });
        }
        else{
            //Register failure
            res.render(
                'user/register.hbs', 
                { 
                    errorRegister: {message: req.flash('message')}
                }
            );
        }
    }
}

module.exports = new UserController