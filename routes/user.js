const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const passport = require('../authentication/passport');
const middleware = require('../middleware/MiddleWare');

/* GET account page. */
router.get('/account', middleware.isLogin, userController.getAccountPage);

/* GET login page. */
router.get('/login', userController.getLoginPage);

/* POST login page. */
router.post('/login', passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/user/login'}
));

/* POST register page. */
router.get('/register', userController.getRegisterPage);

/* POST register page. */
router.post('/register', userController.register);

/* Log out page. */
router.get('/logout', middleware.isLogin, userController.logout);


/* GET reset password page. */
router.get('/reset-password', userController.getResetPasswordPage);

module.exports = router;
