'use strict'
const userService = require('../services/UserService');

class UserController{
    //Return account page
    async getAccountPage(req, res, next) {
        try{
            //Return account page, data in this page will call ajax
            res.render('user/account.hbs');
        }
        catch(error){
            console.log(error);
            res.status(500);
        }
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

        //Register information user to database
        let statusRegister = await userService.registerAccount(email, password, req);

        if(statusRegister){
            //Auto login and redirect
            let idUser = await userService.getIdUser(email);
            let user = {MaKhachHang:idUser, Email: email};
            
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

    //Return reset password page
    getResetPasswordPage(req, res, next){
        res.render('user/reset-password.hbs');
    }
}

module.exports = new UserController